# DriftGate V4 Canonical Response Envelope

All V4 SDKs and V4 API endpoints use the same wire envelope.

Public documentation host:
- `https://docs.driftgate.ai`
- OpenAPI artifacts: `https://docs.driftgate.ai/openapi/v4.yaml` and `https://docs.driftgate.ai/openapi/v4.json`

## Wire Format (JSON)

```json
{
  "ok": true,
  "data": {},
  "meta": {
    "requestId": "req_123",
    "sessionId": "sess_123",
    "executionId": "run_123",
    "lineageId": "lin_123",
    "policy": { "ref": "default", "version": "latest" },
    "route": { "provider": "openai", "model": "gpt-4.1-mini", "region": "us-east-1" },
    "risk": { "score": 12.2, "decision": "allow" },
    "timingMs": { "total": 14.7, "policy": 2.1, "route": 3.0, "tool": 5.6 }
  },
  "error": null
}
```

## Invariants

1. `meta.requestId` is always present.
2. `meta.timingMs.total` is always present.
3. Success: `ok=true`, `error=null`.
4. Failure: `ok=false`, `data=null`, `error` present.
5. Wire keys are always camelCase.

## Stable Error Codes

- `AUTH_INVALID`
- `POLICY_DENIED`
- `RISK_EXCEEDED`
- `ROUTE_UNAVAILABLE`
- `TOOL_BLOCKED`
- `RATE_LIMITED`
- `TIMEOUT`
- `INTERNAL`

## Defaults and Inheritance

- `policy` and `route` are optional on `sessions.start` and `executions.execute`.
- If omitted on `executions.execute`, backend inherits session defaults.
- If omitted on session and execute, backend applies org/workspace defaults.
- SDKs do not invent policy/route defaults locally.

## Canonical V4 Endpoints

- `POST /v4/sessions.start`
- `POST /v4/sessions/{sessionId}/executions.execute`
- `POST /v4/execute`

## CLI (V4 Canonical)

Two-command hello world:

```bash
driftgate session start --agent refund-agent
driftgate session execute <sessionId> --input '{"orderId":"123"}'
```

One-liner ephemeral mode:

```bash
driftgate execute --agent refund-agent --input '{"orderId":"123"}'
```

Execution inspection (currently backed by `/v1/headless/runs/*`):

```bash
driftgate execution status <executionId>
driftgate execution events <executionId>
driftgate execution wait <executionId> --timeout-ms 120000
```
