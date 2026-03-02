package ai.driftgate.sdk;

import java.util.Map;

public final class CanonicalError {
  public final String code;
  public final String message;
  public final int status;
  public final boolean retryable;
  public final Map<String, Object> details;

  public CanonicalError(String code, String message, int status, boolean retryable, Map<String, Object> details) {
    this.code = code;
    this.message = message;
    this.status = status;
    this.retryable = retryable;
    this.details = details;
  }
}
