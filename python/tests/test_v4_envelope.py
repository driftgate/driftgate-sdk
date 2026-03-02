from __future__ import annotations

import json
from pathlib import Path
import sys
import unittest

from _support import FakeResponse, FakeSession

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from driftgate_sdk import DriftGateClient, DriftGateSDKError  # noqa: E402


class V4EnvelopeTests(unittest.TestCase):
    def test_session_start_and_execute_uses_camel_case_wire_keys(self) -> None:
        fake = FakeSession(
            [
                FakeResponse(
                    201,
                    {
                        "ok": True,
                        "data": {
                            "session": {
                                "sessionId": "sess_123",
                                "workspaceId": "ws_123",
                                "agent": "refund-agent",
                                "createdAt": "2026-02-28T00:00:00.000Z",
                            }
                        },
                        "meta": {
                            "requestId": "req_start",
                            "sessionId": "sess_123",
                            "timingMs": {"total": 12.2},
                        },
                        "error": None,
                    },
                ),
                FakeResponse(
                    201,
                    {
                        "ok": True,
                        "data": {
                            "run": {
                                "id": "run_123",
                                "workspaceId": "ws_123",
                                "workflowVersionId": "wv_123",
                                "state": "queued",
                                "requestedBy": "user_1",
                                "requestedAt": "2026-02-28T00:00:01.000Z",
                                "correlationId": "corr_123",
                                "triggerSource": "sdk",
                            },
                            "approval": None,
                            "blocked": False,
                            "policyDecisions": [],
                            "entitlementDecision": {
                                "id": "ent_1",
                                "reasonCode": "entitled",
                                "reasonText": "entitled",
                                "entitled": True,
                            },
                            "usageEntry": {"id": "usage_1", "quantity": 1},
                        },
                        "meta": {
                            "requestId": "req_exec",
                            "sessionId": "sess_123",
                            "executionId": "run_123",
                            "lineageId": "run_123",
                            "timingMs": {"total": 16.4},
                        },
                        "error": None,
                    },
                ),
            ]
        )
        client = DriftGateClient(base_url="https://api.driftgate.ai", bearer_token="token", session=fake)

        session = client.session.start(agent="refund-agent", workspace_id="ws_123")
        envelope = session.execute(input={"orderId": "123"})

        self.assertEqual(session.session_id, "sess_123")
        self.assertEqual(envelope.meta.execution_id, "run_123")
        self.assertEqual(len(fake.calls), 2)

        start_payload = json.loads(fake.calls[0]["data"])
        execute_payload = json.loads(fake.calls[1]["data"])
        self.assertEqual(start_payload, {"agent": "refund-agent", "workspaceId": "ws_123"})
        self.assertEqual(execute_payload, {"input": {"orderId": "123"}})

    def test_canonical_error_mapping(self) -> None:
        fake = FakeSession(
            [
                FakeResponse(
                    403,
                    {
                        "ok": False,
                        "data": None,
                        "meta": {
                            "requestId": "req_denied",
                            "timingMs": {"total": 5.1},
                        },
                        "error": {
                            "code": "POLICY_DENIED",
                            "message": "policy denied",
                            "status": 403,
                            "retryable": False,
                        },
                    },
                )
            ]
        )
        client = DriftGateClient(base_url="https://api.driftgate.ai", bearer_token="token", session=fake)

        with self.assertRaises(DriftGateSDKError) as ctx:
            client.session.start(agent="refund-agent")

        self.assertEqual(ctx.exception.code, "POLICY_DENIED")
        self.assertEqual(ctx.exception.status_code, 403)
        self.assertEqual(ctx.exception.correlation_id, "req_denied")


if __name__ == "__main__":
    unittest.main()
