from driftgate_sdk import DriftGateClient

client = DriftGateClient(base_url="https://api.driftgate.ai", bearer_token="token")
session = client.session.start(agent="refund-agent")
session.execute(input={"orderId": "123"})
