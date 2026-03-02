from __future__ import annotations

from pathlib import Path
import sys
import unittest

from _support import FakeResponse, FakeSession

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from driftgate_sdk.client import DriftGateClient  # noqa: E402
from driftgate_sdk.errors import InvalidRequestError  # noqa: E402


def _response_for(run_id: str) -> dict:
    return {
        "run": {
            "id": run_id,
            "workspaceId": "ws_demo_1",
            "workflowVersionId": "wv_demo_1",
            "state": "queued",
            "requestedBy": "sdk-user-1",
            "requestedAt": "2026-01-01T00:00:00.000Z",
            "correlationId": "corr-123",
            "idempotencyKey": "idem-xyz",
            "triggerSource": "sdk",
        },
        "approval": None,
        "blocked": False,
        "policyDecisions": [],
        "entitlementDecision": {
            "id": "ent_1",
            "reasonCode": "within_limit",
            "reasonText": "allowed",
            "entitled": True,
        },
        "usageEntry": {"id": "usage_1", "quantity": 1},
    }


class DriftGateClientIdempotencyTest(unittest.TestCase):
    def test_same_idempotency_key_same_payload_returns_same_run(self) -> None:
        session = FakeSession(
            [
                FakeResponse(status_code=201, payload=_response_for("run_same")),
                FakeResponse(status_code=201, payload=_response_for("run_same")),
            ]
        )
        client = DriftGateClient(
            base_url="https://api.driftgate.ai",
            api_key="dgk_test_123",
            session=session,
        )

        first = client.run(
            workspace_id="ws_demo_1",
            workflow_version_id="wv_demo_1",
            input_payload={"amount": 10},
            idempotency_key="idem-xyz",
            correlation_id="corr-a",
        )
        second = client.run(
            workspace_id="ws_demo_1",
            workflow_version_id="wv_demo_1",
            input_payload={"amount": 10},
            idempotency_key="idem-xyz",
            correlation_id="corr-b",
        )
        self.assertEqual(first.run.id, second.run.id)

    def test_same_idempotency_key_different_payload_raises_conflict_like_error(self) -> None:
        session = FakeSession(
            [
                FakeResponse(status_code=201, payload=_response_for("run_same")),
                FakeResponse(
                    status_code=400,
                    payload={
                        "code": "invalid_request",
                        "message": "idempotency key already used with a different request payload",
                        "correlation_id": "corr-conflict",
                    },
                ),
            ]
        )
        client = DriftGateClient(
            base_url="https://api.driftgate.ai",
            api_key="dgk_test_123",
            session=session,
        )

        client.run(
            workspace_id="ws_demo_1",
            workflow_version_id="wv_demo_1",
            input_payload={"amount": 10},
            idempotency_key="idem-xyz",
            correlation_id="corr-a",
        )
        with self.assertRaises(InvalidRequestError) as context:
            client.run(
                workspace_id="ws_demo_1",
                workflow_version_id="wv_demo_2",
                input_payload={"amount": 999},
                idempotency_key="idem-xyz",
                correlation_id="corr-b",
            )
        self.assertEqual(context.exception.code, "invalid_request")
        self.assertEqual(context.exception.correlation_id, "corr-conflict")


if __name__ == "__main__":
    unittest.main()
