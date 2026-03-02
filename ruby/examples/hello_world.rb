# frozen_string_literal: true

require_relative "../lib/driftgate_sdk"

client = DriftGateSDK::Client.new(base_url: "https://api.driftgate.ai")
session = client.session.start(agent: "refund-agent")
session.execute(input: { orderId: "123" })
