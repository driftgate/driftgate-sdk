package ai.driftgate.sdk;

import java.util.Map;

public final class CanonicalMeta {
  public final String requestId;
  public final String sessionId;
  public final String executionId;
  public final String lineageId;
  public final Map<String, Object> policy;
  public final Map<String, Object> route;
  public final Map<String, Object> risk;
  public final TimingMs timingMs;

  public CanonicalMeta(
      String requestId,
      String sessionId,
      String executionId,
      String lineageId,
      Map<String, Object> policy,
      Map<String, Object> route,
      Map<String, Object> risk,
      TimingMs timingMs) {
    this.requestId = requestId;
    this.sessionId = sessionId;
    this.executionId = executionId;
    this.lineageId = lineageId;
    this.policy = policy;
    this.route = route;
    this.risk = risk;
    this.timingMs = timingMs;
  }
}
