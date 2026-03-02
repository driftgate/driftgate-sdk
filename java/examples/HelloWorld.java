import ai.driftgate.sdk.DriftGateClient;
import ai.driftgate.sdk.Models;

import java.util.Map;

public final class HelloWorld {
  public static void main(String[] args) {
    DriftGateClient client = new DriftGateClient((method, path, payload) -> Map.of(
        "ok", true,
        "data", Map.of("session", Map.of("sessionId", "sess_demo", "workspaceId", "ws_demo", "agent", "refund-agent")),
        "meta", Map.of("requestId", "req_demo", "timingMs", Map.of("total", 1.0)),
        "error", null
    ));
    Models.SessionStartRequest start = new Models.SessionStartRequest();
    start.agent = "refund-agent";
    var session = client.session.start(start);
    Models.ExecutionRequest execute = new Models.ExecutionRequest();
    execute.input = Map.of("orderId", "123");
    session.execute(execute);
  }
}
