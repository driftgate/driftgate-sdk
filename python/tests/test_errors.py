from __future__ import annotations

from pathlib import Path
import sys
import unittest
from unittest.mock import patch

from _support import FakeResponse, FakeSession

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from driftgate_sdk.client import DriftGateClient  # noqa: E402
from driftgate_sdk.errors import (  # noqa: E402
    ForbiddenError,
    RateLimitedError,
    UnauthorizedError,
)
from driftgate_sdk.retries import RetryPolicy  # noqa: E402


def _status_payload(state: str = "queued") -> dict:
    return {
        "run": {
            "id": "run_123",
            "workspaceId": "ws_demo_1",
            "workflowVersionId": "wv_demo_1",
            "state": state,
            "requestedBy": "sdk-user-1",
            "requestedAt": "2026-01-01T00:00:00.000Z",
            "correlationId": "corr-123",
            "idempotencyKey": None,
            "triggerSource": "sdk",
        },
        "approval": None,
    }


class DriftGateClientErrorTest(unittest.TestCase):
    def test_unauthorized_error_mapping(self) -> None:
        session = FakeSession(
            [
                FakeResponse(
                    status_code=401,
                    payload={
                        "code": "unauthorized",
                        "message": "missing session token",
                        "correlation_id": "corr-auth",
                    },
                )
            ]
        )
        client = DriftGateClient(
            base_url="https://api.driftgate.ai",
            bearer_token="token_123",
            session=session,
        )

        with self.assertRaises(UnauthorizedError) as context:
            client.status("run_123")
        self.assertEqual(context.exception.status_code, 401)
        self.assertEqual(context.exception.correlation_id, "corr-auth")

    def test_legacy_error_envelope_mapping(self) -> None:
        session = FakeSession(
            [
                FakeResponse(
                    status_code=403,
                    payload={
                        "error": "forbidden",
                        "message": "workspace scope denied",
                        "issues": {"workspaceId": "ws_blocked"},
                    },
                )
            ]
        )
        client = DriftGateClient(
            base_url="https://api.driftgate.ai",
            bearer_token="token_123",
            session=session,
        )

        with self.assertRaises(ForbiddenError) as context:
            client.status("run_123")
        self.assertEqual(context.exception.code, "forbidden")
        self.assertEqual(context.exception.details["workspaceId"], "ws_blocked")

    def test_rate_limit_retries_for_get_then_succeeds(self) -> None:
        session = FakeSession(
            [
                FakeResponse(
                    status_code=429,
                    payload={
                        "code": "rate_limit_exceeded",
                        "message": "api key rate limit exceeded",
                    },
                ),
                FakeResponse(status_code=200, payload=_status_payload("queued")),
            ]
        )
        client = DriftGateClient(
            base_url="https://api.driftgate.ai",
            api_key="dgk_test_123",
            session=session,
            retry_policy=RetryPolicy(max_attempts=2, base_backoff_seconds=0.0, jitter_seconds=0.0),
        )

        with patch("driftgate_sdk.retries.time.sleep", return_value=None):
            status = client.status("run_123")
        self.assertEqual(status.run.id, "run_123")
        self.assertEqual(len(session.calls), 2)

    def test_rate_limit_without_retry_path_raises(self) -> None:
        session = FakeSession(
            [
                FakeResponse(
                    status_code=429,
                    payload={
                        "code": "rate_limit_exceeded",
                        "message": "api key rate limit exceeded",
                    },
                )
            ]
        )
        client = DriftGateClient(
            base_url="https://api.driftgate.ai",
            api_key="dgk_test_123",
            session=session,
        )

        with self.assertRaises(RateLimitedError):
            client.run(workspace_id="ws_demo_1", workflow_version_id="wv_demo_1")


if __name__ == "__main__":
    unittest.main()
