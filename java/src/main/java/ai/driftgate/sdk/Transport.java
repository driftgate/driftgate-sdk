package ai.driftgate.sdk;

import java.util.Map;

public interface Transport {
  Map<String, Object> request(String method, String path, Map<String, Object> payload);
}
