package ai.driftgate.sdk;

import java.util.Map;

public final class CanonicalEnvelope<T> {
  public final boolean ok;
  public final T data;
  public final CanonicalMeta meta;
  public final CanonicalError error;
  public final Map<String, Object> raw;

  public CanonicalEnvelope(boolean ok, T data, CanonicalMeta meta, CanonicalError error, Map<String, Object> raw) {
    this.ok = ok;
    this.data = data;
    this.meta = meta;
    this.error = error;
    this.raw = raw;
  }
}
