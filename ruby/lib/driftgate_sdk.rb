# frozen_string_literal: true

require "json"
require "net/http"
require "uri"

module DriftGateSDK
  ERROR_CODES = %w[
    AUTH_INVALID
    POLICY_DENIED
    RISK_EXCEEDED
    ROUTE_UNAVAILABLE
    TOOL_BLOCKED
    RATE_LIMITED
    TIMEOUT
    INTERNAL
  ].freeze

  class Error < StandardError
    attr_reader :code, :status, :retryable, :request_id, :details

    def initialize(code:, message:, status:, retryable:, request_id: nil, details: nil)
      super(message)
      @code = code
      @status = status
      @retryable = retryable
      @request_id = request_id
      @details = details
    end
  end

  class SessionHandle
    attr_reader :session, :start_envelope

    def initialize(client:, session:, start_envelope:)
      @client = client
      @session = session
      @start_envelope = start_envelope
    end

    def session_id
      @session.fetch("sessionId")
    end

    def execute(input:, policy: nil, route: nil, risk: nil, workflow_version_id: nil)
      payload = { input: input }
      payload[:policy] = policy if policy
      payload[:route] = route if route
      payload[:risk] = risk if risk
      payload[:workflowVersionId] = workflow_version_id if workflow_version_id
      @client.execute_session(session_id: session_id, payload: payload)
    end
  end

  class Client
    attr_accessor :api_key, :bearer_token

    def initialize(base_url:, api_key: nil, bearer_token: nil, http: Net::HTTP)
      @base_url = base_url.sub(%r{/$}, "")
      @api_key = api_key
      @bearer_token = bearer_token
      @http = http
    end

    def session
      self
    end

    def start(agent:, workspace_id: nil, subject: nil, metadata: nil, policy: nil, route: nil, risk: nil, workflow_version_id: nil, expires_at: nil)
      payload = { agent: agent }
      payload[:workspaceId] = workspace_id if workspace_id
      payload[:subject] = subject if subject
      payload[:metadata] = metadata if metadata
      payload[:policy] = policy if policy
      payload[:route] = route if route
      payload[:risk] = risk if risk
      payload[:workflowVersionId] = workflow_version_id if workflow_version_id
      payload[:expiresAt] = expires_at if expires_at

      envelope = request(method: "POST", path: "/v4/sessions.start", payload: payload)
      raise_envelope_error(envelope) unless envelope.fetch("ok")

      SessionHandle.new(client: self, session: envelope.fetch("data").fetch("session"), start_envelope: envelope)
    end

    def execute_session(session_id:, payload:)
      envelope = request(method: "POST", path: "/v4/sessions/#{session_id}/executions.execute", payload: payload)
      raise_envelope_error(envelope) unless envelope.fetch("ok")
      envelope
    end

    def execute(agent:, input:, workspace_id: nil, subject: nil, metadata: nil, policy: nil, route: nil, risk: nil, workflow_version_id: nil)
      payload = {
        agent: agent,
        input: input
      }
      payload[:workspaceId] = workspace_id if workspace_id
      payload[:subject] = subject if subject
      payload[:metadata] = metadata if metadata
      payload[:policy] = policy if policy
      payload[:route] = route if route
      payload[:risk] = risk if risk
      payload[:workflowVersionId] = workflow_version_id if workflow_version_id

      envelope = request(method: "POST", path: "/v4/execute", payload: payload)
      raise_envelope_error(envelope) unless envelope.fetch("ok")
      envelope
    end

    private

    def request(method:, path:, payload:)
      uri = URI.parse("#{@base_url}#{path}")
      request_class = Net::HTTP.const_get(method.capitalize)
      request = request_class.new(uri)
      request["content-type"] = "application/json"
      request["x-driftgate-api-key"] = @api_key if @api_key
      request["authorization"] = "Bearer #{@bearer_token}" if @bearer_token
      request.body = JSON.generate(payload)

      response = @http.start(uri.host, uri.port, use_ssl: uri.scheme == "https") do |http|
        http.request(request)
      end

      body = response.body && !response.body.empty? ? JSON.parse(response.body) : {}
      if response.code.to_i >= 400
        raise_envelope_error(body)
      end
      body
    end

    def raise_envelope_error(payload)
      if payload.is_a?(Hash) && payload["error"].is_a?(Hash)
        error = payload["error"]
        meta = payload["meta"].is_a?(Hash) ? payload["meta"] : {}
        raise Error.new(
          code: error.fetch("code", "INTERNAL"),
          message: error.fetch("message", "request failed"),
          status: error.fetch("status", 500),
          retryable: error.fetch("retryable", false),
          request_id: meta["requestId"],
          details: error["details"]
        )
      end

      raise Error.new(code: "INTERNAL", message: "request failed", status: 500, retryable: false)
    end
  end
end
