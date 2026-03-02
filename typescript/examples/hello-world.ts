import { DriftGateClient } from "../src/index.ts";

const dg = new DriftGateClient({ baseUrl: "https://api.driftgate.ai", sessionToken: "token" });
const session = await dg.session.start({ agent: "refund-agent" });
await session.execute({ input: { orderId: "123" } });
