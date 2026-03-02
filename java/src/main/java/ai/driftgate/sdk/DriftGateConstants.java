package ai.driftgate.sdk;

import java.util.List;

public final class DriftGateConstants {
  private DriftGateConstants() {}

  public static final List<String> ERROR_CODES = List.of(
      "AUTH_INVALID",
      "POLICY_DENIED",
      "RISK_EXCEEDED",
      "ROUTE_UNAVAILABLE",
      "TOOL_BLOCKED",
      "RATE_LIMITED",
      "TIMEOUT",
      "INTERNAL"
  );
}
