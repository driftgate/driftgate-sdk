# DriftGate TypeScript SDK

Canonical V4 envelope SDK for TypeScript.

See canonical envelope docs: [`docs/sdk/response-envelope.md`](/Users/jordandavis/Documents/Code/DriftGateAI/driftgate-v4-sdk-wt/docs/sdk/response-envelope.md).

## Install

```bash
npm i @driftgate/sdk
```

## Hello World (2 lines)

```ts
const session = await dg.session.start({ agent: "refund-agent" });
await session.execute({ input: { orderId: "123" } });
```

## Full Example

```ts
const dg = new DriftGateClient({ baseUrl: "https://api.driftgate.ai", sessionToken: process.env.DRIFTGATE_TOKEN! });
const session = await dg.session.start({
  agent: "refund-agent",
  policy: { ref: "refund", version: "2026-02" },
  route: { provider: "openai", model: "gpt-4.1-mini", region: "us-east-1" },
  risk: { decision: "review" }
});
const response = await session.execute({ input: { orderId: "123" } });
console.log(response.meta.requestId, response.meta.executionId);
```
