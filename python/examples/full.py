from driftgate_sdk import DriftGateClient

client = DriftGateClient(base_url="https://api.driftgate.ai", bearer_token="token")
session = client.session.start(
    agent="refund-agent",
    policy={"ref": "refund", "version": "2026-02"},
    route={"provider": "openai", "model": "gpt-4.1-mini", "region": "us-east-1"},
    risk={"decision": "review"},
)
response = session.execute(input={"orderId": "123"})
print(response.meta.request_id, response.meta.execution_id)
