import { DriftGateClient } from "../src/index.ts";

const dg = new DriftGateClient({
  baseUrl: "https://api.driftgate.ai",
  sessionToken: process.env.DRIFTGATE_TOKEN
});

const session = await dg.session.start({
  agent: "refund-agent",
  policy: { ref: "refund", version: "2026-02" },
  route: { provider: "openai", model: "gpt-4.1-mini", region: "us-east-1" },
  risk: { decision: "review" }
});

const response = await session.execute({
  input: { orderId: "123" }
});

console.log(response.meta.requestId, response.meta.executionId);
