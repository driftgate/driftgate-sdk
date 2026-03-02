using DriftGateSdk;

var client = new DriftGateClient("https://api.driftgate.ai", bearerToken: "token");
var session = await client.Session.StartAsync(new SessionStartRequest("refund-agent"));
await session.ExecuteAsync(new ExecutionRequest(new Dictionary<string, object?> { ["orderId"] = "123" }));
