package ai.driftgate.sdk;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class EnvelopeTest {
  public static void main(String[] args) {
    testStartAndExecute();
    testCanonicalErrorCodes();
  }

  private static void testStartAndExecute() {
    List<Map<String, Object>> payloads = new ArrayList<>();

    Transport transport = (method, path, payload) -> {
      payloads.add(payload);
      if (path.equals("/v4/sessions.start")) {
        return mapOf(
            "ok", true,
            "data", mapOf("session", mapOf("sessionId", "sess_123", "workspaceId", "ws_123", "agent", "refund-agent")),
            "meta", mapOf("requestId", "req_1", "timingMs", mapOf("total", 1.2)),
            "error", null
        );
      }
      return mapOf(
          "ok", true,
          "data", mapOf("run", mapOf("id", "run_123")),
          "meta", mapOf("requestId", "req_2", "executionId", "run_123", "timingMs", mapOf("total", 2.3)),
          "error", null
      );
    };

    DriftGateClient client = new DriftGateClient(transport);
    Models.SessionStartRequest start = new Models.SessionStartRequest();
    start.agent = "refund-agent";
    start.workspaceId = "ws_123";

    DriftGateClient.SessionHandle session = client.session.start(start);

    Models.ExecutionRequest execute = new Models.ExecutionRequest();
    execute.input = mapOf("orderId", "123");
    CanonicalEnvelope<Map<String, Object>> envelope = session.execute(execute);

    assertTrue(session.session.sessionId.equals("sess_123"), "session id mismatch");
    assertTrue("run_123".equals(envelope.meta.executionId), "execution id mismatch");
    assertTrue(payloads.size() == 2, "expected two payloads");
    assertTrue(payloads.get(0).containsKey("workspaceId"), "workspaceId missing");
    assertTrue(payloads.get(1).containsKey("input"), "input missing");
  }

  private static void testCanonicalErrorCodes() {
    List<String> expected = List.of(
        "AUTH_INVALID",
        "POLICY_DENIED",
        "RISK_EXCEEDED",
        "ROUTE_UNAVAILABLE",
        "TOOL_BLOCKED",
        "RATE_LIMITED",
        "TIMEOUT",
        "INTERNAL"
    );
    assertTrue(DriftGateConstants.ERROR_CODES.containsAll(expected), "required error codes missing");
  }

  private static Map<String, Object> mapOf(Object... keyValues) {
    Map<String, Object> map = new HashMap<>();
    for (int i = 0; i < keyValues.length; i += 2) {
      map.put(String.valueOf(keyValues[i]), keyValues[i + 1]);
    }
    return map;
  }

  private static void assertTrue(boolean condition, String message) {
    if (!condition) {
      throw new AssertionError(message);
    }
  }
}
