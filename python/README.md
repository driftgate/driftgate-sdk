# DriftGate Python SDK

Canonical V4 envelope SDK for Python.

See canonical envelope docs: [`docs/sdk/response-envelope.md`](/Users/jordandavis/Documents/Code/DriftGateAI/driftgate-v4-sdk-wt/docs/sdk/response-envelope.md).

## Install

```bash
pip install driftgate-sdk
```

## Hello World (2 lines)

```python
session = client.session.start(agent="refund-agent")
session.execute(input={"orderId": "123"})
```

## Full Example

```python
from driftgate_sdk import DriftGateClient

client = DriftGateClient(
    base_url="https://api.driftgate.ai",
    bearer_token="token",
)

session = client.session.start(
    agent="refund-agent",
    policy={"ref": "refund", "version": "2026-02"},
    route={"provider": "openai", "model": "gpt-4.1-mini", "region": "us-east-1"},
    risk={"decision": "review"},
)

response = session.execute(input={"orderId": "123"})
print(response.meta.request_id, response.meta.execution_id)
```

## Legacy v1 Surface (Backward Compatible)

- `run(...)`
- `status(run_id)`
- `events(run_id)`
- `wait_for_terminal(run_id, timeout_seconds=..., poll_interval_seconds=...)`
- `approvals_list(workspace_id, status=None)`
- `approve(approval_id)`
- `deny(approval_id)`
