from __future__ import annotations

import json
from pathlib import Path
import sys
import unittest
from unittest.mock import patch

from _support import FakeResponse, FakeSession

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from driftgate_sdk.client import DriftGateClient  # noqa: E402


def _run_response(state: str = "queued", run_id: str = "run_demo_1") -> dict:
    return {
        "run": {
            "id": run_id,
            "workspaceId": "ws_demo_1",
            "workflowVersionId": "wv_demo_1",
            "state": state,
            "requestedBy": "sdk-user-1",
            "requestedAt": "2026-01-01T00:00:00.000Z",
            "correlationId": "corr-123",
            "idempotencyKey": "idem-123",
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


class DriftGateClientRunsTest(unittest.TestCase):
    def test_run_status_events_wait_for_terminal_and_approvals(self) -> None:
        session = FakeSession(
            [
                FakeResponse(status_code=201, payload=_run_response("queued", "run_001")),
                FakeResponse(status_code=200, payload=_run_response("queued", "run_001")),
                FakeResponse(
                    status_code=200,
                    payload={
                        "events": [
                            {
                                "id": "evt_1",
                                "runId": "run_001",
                                "type": "run.created",
                                "payload": {"state": "queued"},
                                "createdAt": "2026-01-01T00:00:01.000Z",
                            }
                        ]
                    },
                ),
                FakeResponse(status_code=200, payload=_run_response("queued", "run_001")),
                FakeResponse(status_code=200, payload=_run_response("succeeded", "run_001")),
                FakeResponse(
                    status_code=200,
                    payload={
                        "approvals": [
                            {
                                "approval": {
                                    "id": "ap_1",
                                    "runId": "run_001",
                                    "requiredRole": "owner",
                                    "status": "pending",
                                    "createdAt": "2026-01-01T00:00:00.000Z",
                                },
                                "run": _run_response("waiting_approval", "run_001")["run"],
                            }
                        ]
                    },
                ),
            ]
        )

        client = DriftGateClient(
            base_url="https://api.driftgate.ai",
            api_key="dgk_test_123",
            session=session,
        )

        created = client.run(
            workspace_id="ws_demo_1",
            workflow_version_id="wv_demo_1",
            input_payload={"amount": 100},
            requires_approval=True,
            required_role="owner",
            idempotency_key="idem-123",
            correlation_id="corr-123",
        )
        self.assertEqual(created.run.id, "run_001")
        self.assertEqual(created.run.trigger_source, "sdk")

        posted_payload = json.loads(session.calls[0]["data"])
        self.assertEqual(posted_payload["idempotencyKey"], "idem-123")
        self.assertEqual(posted_payload["correlationId"], "corr-123")
        self.assertEqual(posted_payload["triggerSource"], "sdk")
        self.assertEqual(session.calls[0]["headers"]["x-driftgate-api-key"], "dgk_test_123")

        status = client.status("run_001")
        self.assertEqual(status.run.state, "queued")

        events = client.events("run_001")
        self.assertEqual(len(events), 1)
        self.assertEqual(events[0].event_type, "run.created")

        with patch("driftgate_sdk.client.time.sleep", return_value=None):
            terminal = client.wait_for_terminal(
                "run_001",
                timeout_seconds=5,
                poll_interval_seconds=0.01,
            )
        self.assertEqual(terminal.run.state, "succeeded")

        approvals = client.approvals_list("ws_demo_1", status="pending")
        self.assertEqual(len(approvals), 1)
        self.assertEqual(approvals[0].approval.id, "ap_1")
        self.assertEqual(approvals[0].run.id, "run_001")


if __name__ == "__main__":
    unittest.main()
