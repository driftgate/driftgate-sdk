# DriftGate C# SDK

Canonical V4 envelope SDK for C#.

See canonical envelope docs: [`docs/sdk/response-envelope.md`](/Users/jordandavis/Documents/Code/DriftGateAI/driftgate-v4-sdk-wt/docs/sdk/response-envelope.md).

## Install

```bash
dotnet add package DriftGate.Sdk --version 0.1.0
```

## Hello World (2 lines)

```csharp
var session = await client.Session.StartAsync(new SessionStartRequest("refund-agent"));
await session.ExecuteAsync(new ExecutionRequest(new Dictionary<string, object?> { ["orderId"] = "123" }));
```

## Full Example

```csharp
var client = new DriftGateClient("https://api.driftgate.ai", bearerToken: token);
var session = await client.Session.StartAsync(new SessionStartRequest(
  Agent: "refund-agent",
  Policy: new PolicyRef("refund", "2026-02"),
  Route: new RouteRef("openai", "gpt-4.1-mini", "us-east-1"),
  Risk: new RiskMeta(null, "review")
));
var response = await session.ExecuteAsync(new ExecutionRequest(
  Input: new Dictionary<string, object?> { ["orderId"] = "123" }
));
Console.WriteLine(response.Meta.RequestId);
```
