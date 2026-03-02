using System.Text.Json;
using DriftGateSdk;

namespace DriftGateSdk.Tests;

public static class EnvelopeTests
{
  public static void Main()
  {
    var request = new SessionStartRequest("refund-agent", WorkspaceId: "ws_123");
    var json = JsonSerializer.Serialize(request, new JsonSerializerOptions(JsonSerializerDefaults.Web));
    if (!json.Contains("workspaceId") || !json.Contains("agent"))
      throw new Exception("camelCase serialization failed");

    var envelopeJson = """
      {
        "ok": true,
        "data": { "session": { "sessionId": "sess_123", "workspaceId": "ws_123", "agent": "refund-agent", "createdAt": "2026-02-28T00:00:00.000Z" } },
        "meta": { "requestId": "req_1", "timingMs": { "total": 1.2 } },
        "error": null
      }
      """;

    var envelope = JsonSerializer.Deserialize<CanonicalResponse<SessionStartData>>(envelopeJson, new JsonSerializerOptions(JsonSerializerDefaults.Web));
    if (envelope is null || envelope.Meta.RequestId != "req_1" || envelope.Data is null)
      throw new Exception("envelope parse failed");
  }
}
