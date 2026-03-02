# DriftGate Ruby SDK

Canonical V4 envelope SDK for Ruby.

See canonical envelope docs: [`docs/sdk/response-envelope.md`](/Users/jordandavis/Documents/Code/DriftGateAI/driftgate-v4-sdk-wt/docs/sdk/response-envelope.md).

## Install

```bash
gem install driftgate-sdk -v 0.1.0
```

## Hello World (2 lines)

```ruby
session = DriftGateSDK::Client.new(base_url: "https://api.driftgate.ai").session.start(agent: "refund-agent")
session.execute(input: { orderId: "123" })
```

## Full Example

```ruby
client = DriftGateSDK::Client.new(base_url: "https://api.driftgate.ai", bearer_token: ENV.fetch("DRIFTGATE_TOKEN"))
session = client.session.start(
  agent: "refund-agent",
  policy: { ref: "refund", version: "2026-02" },
  route: { provider: "openai", model: "gpt-4.1-mini", region: "us-east-1" },
  risk: { decision: "review" }
)
response = session.execute(input: { orderId: "123" })
puts response.fetch("meta").fetch("requestId")
```
