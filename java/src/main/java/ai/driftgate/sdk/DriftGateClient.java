package ai.driftgate.sdk;

import java.util.HashMap;
import java.util.Map;

public final class DriftGateClient {
  private final Transport transport;
  public final SessionNamespace session;

  public DriftGateClient(Transport transport) {
    this.transport = transport;
    this.session = new SessionNamespace(this);
  }

  public CanonicalEnvelope<Map<String, Object>> execute(
      String agent,
      Map<String, Object> input,
      Map<String, Object> policy,
      Map<String, Object> route,
      Map<String, Object> risk) {
    Map<String, Object> payload = new HashMap<>();
    payload.put("agent", agent);
    payload.put("input", input);
    if (policy != null) payload.put("policy", policy);
    if (route != null) payload.put("route", route);
    if (risk != null) payload.put("risk", risk);
    Map<String, Object> envelope = transport.request("POST", "/v4/execute", payload);
    return parseEnvelope(envelope);
  }

  CanonicalEnvelope<Map<String, Object>> executeSession(String sessionId, Models.ExecutionRequest request) {
    Map<String, Object> payload = new HashMap<>();
    payload.put("input", request.input);
    if (request.policy != null) payload.put("policy", request.policy);
    if (request.route != null) payload.put("route", request.route);
    if (request.risk != null) payload.put("risk", request.risk);
    if (request.workflowVersionId != null) payload.put("workflowVersionId", request.workflowVersionId);
    Map<String, Object> envelope = transport.request("POST", "/v4/sessions/" + sessionId + "/executions.execute", payload);
    return parseEnvelope(envelope);
  }

  CanonicalEnvelope<Map<String, Object>> parseEnvelope(Map<String, Object> envelope) {
    boolean ok = Boolean.TRUE.equals(envelope.get("ok"));
    @SuppressWarnings("unchecked")
    Map<String, Object> data = (Map<String, Object>) envelope.get("data");

    @SuppressWarnings("unchecked")
    Map<String, Object> metaMap = (Map<String, Object>) envelope.get("meta");
    if (metaMap == null) metaMap = new HashMap<>();
    @SuppressWarnings("unchecked")
    Map<String, Object> timingMap = (Map<String, Object>) metaMap.get("timingMs");
    if (timingMap == null) timingMap = new HashMap<>();

    TimingMs timingMs = new TimingMs(
        number(timingMap.get("total")),
        optionalNumber(timingMap.get("policy")),
        optionalNumber(timingMap.get("route")),
        optionalNumber(timingMap.get("tool")));

    CanonicalMeta meta = new CanonicalMeta(
        string(metaMap.get("requestId")),
        optionalString(metaMap.get("sessionId")),
        optionalString(metaMap.get("executionId")),
        optionalString(metaMap.get("lineageId")),
        map(metaMap.get("policy")),
        map(metaMap.get("route")),
        map(metaMap.get("risk")),
        timingMs);

    CanonicalError error = null;
    @SuppressWarnings("unchecked")
    Map<String, Object> errorMap = (Map<String, Object>) envelope.get("error");
    if (errorMap != null) {
      error = new CanonicalError(
          string(errorMap.get("code")),
          string(errorMap.get("message")),
          (int) number(errorMap.get("status")),
          Boolean.TRUE.equals(errorMap.get("retryable")),
          map(errorMap.get("details")));
    }

    return new CanonicalEnvelope<>(ok, data, meta, error, envelope);
  }

  private static String string(Object value) {
    return value == null ? "" : String.valueOf(value);
  }

  private static String optionalString(Object value) {
    return value == null ? null : String.valueOf(value);
  }

  private static double number(Object value) {
    if (value instanceof Number) {
      return ((Number) value).doubleValue();
    }
    if (value == null) {
      return 0.0;
    }
    return Double.parseDouble(String.valueOf(value));
  }

  private static Double optionalNumber(Object value) {
    if (value == null) {
      return null;
    }
    return number(value);
  }

  @SuppressWarnings("unchecked")
  private static Map<String, Object> map(Object value) {
    if (value instanceof Map<?, ?> typed) {
      return (Map<String, Object>) typed;
    }
    return null;
  }

  public static final class SessionNamespace {
    private final DriftGateClient client;

    SessionNamespace(DriftGateClient client) {
      this.client = client;
    }

    public SessionHandle start(Models.SessionStartRequest request) {
      Map<String, Object> payload = new HashMap<>();
      payload.put("agent", request.agent);
      if (request.workspaceId != null) payload.put("workspaceId", request.workspaceId);
      if (request.subject != null) payload.put("subject", request.subject);
      if (request.metadata != null) payload.put("metadata", request.metadata);
      if (request.policy != null) payload.put("policy", request.policy);
      if (request.route != null) payload.put("route", request.route);
      if (request.risk != null) payload.put("risk", request.risk);
      if (request.workflowVersionId != null) payload.put("workflowVersionId", request.workflowVersionId);
      if (request.expiresAt != null) payload.put("expiresAt", request.expiresAt);

      Map<String, Object> envelope = client.transport.request("POST", "/v4/sessions.start", payload);
      CanonicalEnvelope<Map<String, Object>> parsed = client.parseEnvelope(envelope);
      @SuppressWarnings("unchecked")
      Map<String, Object> session = (Map<String, Object>) parsed.data.get("session");
      Models.SessionResource resource = new Models.SessionResource(
          string(session.get("sessionId")),
          string(session.get("workspaceId")),
          string(session.get("agent")));
      return new SessionHandle(client, resource, parsed);
    }
  }

  public static final class SessionHandle {
    private final DriftGateClient client;
    public final Models.SessionResource session;
    public final CanonicalEnvelope<Map<String, Object>> startEnvelope;

    SessionHandle(DriftGateClient client, Models.SessionResource session, CanonicalEnvelope<Map<String, Object>> startEnvelope) {
      this.client = client;
      this.session = session;
      this.startEnvelope = startEnvelope;
    }

    public String sessionId() {
      return session.sessionId;
    }

    public CanonicalEnvelope<Map<String, Object>> execute(Models.ExecutionRequest request) {
      return client.executeSession(session.sessionId, request);
    }
  }
}
