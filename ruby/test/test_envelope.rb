# frozen_string_literal: true

require "json"
require "minitest/autorun"
require_relative "../lib/driftgate_sdk"

class FakeResponse
  attr_reader :code, :body

  def initialize(code:, body:)
    @code = code.to_s
    @body = JSON.generate(body)
  end
end

class FakeHTTP
  attr_reader :calls

  def initialize(responses)
    @responses = responses
    @calls = []
  end

  def start(_host, _port, use_ssl: false)
    _ = use_ssl
    yield self
  end

  def request(req)
    @calls << {
      path: req.path,
      method: req.method,
      body: JSON.parse(req.body)
    }
    raise "no response queued" if @responses.empty?

    @responses.shift
  end
end

class DriftGateEnvelopeTest < Minitest::Test
  def test_start_and_execute_use_camel_case_keys
    http = FakeHTTP.new([
      FakeResponse.new(
        code: 201,
        body: {
          "ok" => true,
          "data" => {
            "session" => {
              "sessionId" => "sess_123",
              "workspaceId" => "ws_123",
              "agent" => "refund-agent",
              "createdAt" => "2026-02-28T00:00:00.000Z"
            }
          },
          "meta" => {
            "requestId" => "req_1",
            "timingMs" => { "total" => 1.2 }
          },
          "error" => nil
        }
      ),
      FakeResponse.new(
        code: 201,
        body: {
          "ok" => true,
          "data" => {
            "run" => { "id" => "run_123" },
            "blocked" => false,
            "policyDecisions" => [],
            "entitlementDecision" => {},
            "usageEntry" => {}
          },
          "meta" => {
            "requestId" => "req_2",
            "executionId" => "run_123",
            "timingMs" => { "total" => 2.0 }
          },
          "error" => nil
        }
      )
    ])

    client = DriftGateSDK::Client.new(base_url: "https://api.driftgate.ai", bearer_token: "token", http: http)
    session = client.session.start(agent: "refund-agent", workspace_id: "ws_123")
    result = session.execute(input: { orderId: "123" })

    assert_equal "sess_123", session.session_id
    assert_equal "run_123", result.fetch("meta").fetch("executionId")
    assert_equal({ "agent" => "refund-agent", "workspaceId" => "ws_123" }, http.calls[0][:body])
    assert_equal({ "input" => { "orderId" => "123" } }, http.calls[1][:body])
  end

  def test_canonical_error_mapping
    http = FakeHTTP.new([
      FakeResponse.new(
        code: 403,
        body: {
          "ok" => false,
          "data" => nil,
          "meta" => { "requestId" => "req_denied", "timingMs" => { "total" => 1.0 } },
          "error" => {
            "code" => "POLICY_DENIED",
            "message" => "denied",
            "status" => 403,
            "retryable" => false
          }
        }
      )
    ])

    client = DriftGateSDK::Client.new(base_url: "https://api.driftgate.ai", bearer_token: "token", http: http)
    error = assert_raises(DriftGateSDK::Error) { client.session.start(agent: "refund-agent") }
    assert_equal "POLICY_DENIED", error.code
    assert_equal 403, error.status
    assert_equal "req_denied", error.request_id
  end
end
