package ai.driftgate.sdk;

import java.util.Map;

public final class Models {
  private Models() {}

  public static final class SessionResource {
    public final String sessionId;
    public final String workspaceId;
    public final String agent;

    public SessionResource(String sessionId, String workspaceId, String agent) {
      this.sessionId = sessionId;
      this.workspaceId = workspaceId;
      this.agent = agent;
    }
  }

  public static final class SessionStartRequest {
    public String workspaceId;
    public String agent;
    public String subject;
    public Map<String, Object> metadata;
    public Map<String, Object> policy;
    public Map<String, Object> route;
    public Map<String, Object> risk;
    public String workflowVersionId;
    public String expiresAt;
  }

  public static final class ExecutionRequest {
    public Map<String, Object> input;
    public Map<String, Object> policy;
    public Map<String, Object> route;
    public Map<String, Object> risk;
    public String workflowVersionId;
  }
}
