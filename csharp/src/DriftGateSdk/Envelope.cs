using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace DriftGateSdk;

public static class CanonicalErrorCodes
{
  public const string AUTH_INVALID = "AUTH_INVALID";
  public const string POLICY_DENIED = "POLICY_DENIED";
  public const string RISK_EXCEEDED = "RISK_EXCEEDED";
  public const string ROUTE_UNAVAILABLE = "ROUTE_UNAVAILABLE";
  public const string TOOL_BLOCKED = "TOOL_BLOCKED";
  public const string RATE_LIMITED = "RATE_LIMITED";
  public const string TIMEOUT = "TIMEOUT";
  public const string INTERNAL = "INTERNAL";
}

public sealed record PolicyRef(
  [property: JsonPropertyName("ref")] string Ref,
  [property: JsonPropertyName("version")] string Version
);

public sealed record RouteRef(
  [property: JsonPropertyName("provider")] string? Provider,
  [property: JsonPropertyName("model")] string? Model,
  [property: JsonPropertyName("region")] string? Region
);

public sealed record RiskMeta(
  [property: JsonPropertyName("score")] double? Score,
  [property: JsonPropertyName("decision")] string? Decision
);

public sealed record TimingMs(
  [property: JsonPropertyName("total")] double Total,
  [property: JsonPropertyName("policy")] double? Policy,
  [property: JsonPropertyName("route")] double? Route,
  [property: JsonPropertyName("tool")] double? Tool
);

public sealed record ResponseMeta(
  [property: JsonPropertyName("requestId")] string RequestId,
  [property: JsonPropertyName("sessionId")] string? SessionId,
  [property: JsonPropertyName("executionId")] string? ExecutionId,
  [property: JsonPropertyName("lineageId")] string? LineageId,
  [property: JsonPropertyName("policy")] PolicyRef? Policy,
  [property: JsonPropertyName("route")] RouteRef? Route,
  [property: JsonPropertyName("risk")] RiskMeta? Risk,
  [property: JsonPropertyName("timingMs")] TimingMs TimingMs
);

public sealed record ResponseError(
  [property: JsonPropertyName("code")] string Code,
  [property: JsonPropertyName("message")] string Message,
  [property: JsonPropertyName("status")] int Status,
  [property: JsonPropertyName("retryable")] bool Retryable,
  [property: JsonPropertyName("details")] Dictionary<string, object?>? Details
);

public sealed record CanonicalResponse<T>(
  [property: JsonPropertyName("ok")] bool Ok,
  [property: JsonPropertyName("data")] T? Data,
  [property: JsonPropertyName("meta")] ResponseMeta Meta,
  [property: JsonPropertyName("error")] ResponseError? Error
)
{
  [JsonIgnore]
  public string RawJson { get; init; } = "";
}

public sealed record SessionResource(
  [property: JsonPropertyName("sessionId")] string SessionId,
  [property: JsonPropertyName("workspaceId")] string WorkspaceId,
  [property: JsonPropertyName("agent")] string Agent,
  [property: JsonPropertyName("createdAt")] string CreatedAt
);

public sealed record SessionStartData([property: JsonPropertyName("session")] SessionResource Session);

public sealed record SessionStartRequest(
  [property: JsonPropertyName("agent")] string Agent,
  [property: JsonPropertyName("workspaceId")] string? WorkspaceId = null,
  [property: JsonPropertyName("subject")] string? Subject = null,
  [property: JsonPropertyName("metadata")] Dictionary<string, object?>? Metadata = null,
  [property: JsonPropertyName("policy")] PolicyRef? Policy = null,
  [property: JsonPropertyName("route")] RouteRef? Route = null,
  [property: JsonPropertyName("risk")] RiskMeta? Risk = null,
  [property: JsonPropertyName("workflowVersionId")] string? WorkflowVersionId = null,
  [property: JsonPropertyName("expiresAt")] string? ExpiresAt = null
);

public sealed record ExecutionRequest(
  [property: JsonPropertyName("input")] Dictionary<string, object?> Input,
  [property: JsonPropertyName("policy")] PolicyRef? Policy = null,
  [property: JsonPropertyName("route")] RouteRef? Route = null,
  [property: JsonPropertyName("risk")] RiskMeta? Risk = null,
  [property: JsonPropertyName("workflowVersionId")] string? WorkflowVersionId = null
);

public sealed class DriftGateSdkException : Exception
{
  public DriftGateSdkException(string code, string message, int status, bool retryable, string? requestId)
    : base(message)
  {
    Code = code;
    Status = status;
    Retryable = retryable;
    RequestId = requestId;
  }

  public string Code { get; }
  public int Status { get; }
  public bool Retryable { get; }
  public string? RequestId { get; }
}

public sealed class DriftGateSessionHandle
{
  private readonly DriftGateClient _client;

  internal DriftGateSessionHandle(DriftGateClient client, SessionResource session, CanonicalResponse<SessionStartData> startEnvelope)
  {
    _client = client;
    Session = session;
    StartEnvelope = startEnvelope;
  }

  public SessionResource Session { get; }
  public CanonicalResponse<SessionStartData> StartEnvelope { get; }

  public Task<CanonicalResponse<Dictionary<string, object?>>> ExecuteAsync(ExecutionRequest request, CancellationToken cancellationToken = default)
  {
    return _client.ExecuteSessionAsync(Session.SessionId, request, cancellationToken);
  }
}

public sealed class DriftGateClient
{
  private readonly HttpClient _http;
  private readonly JsonSerializerOptions _jsonOptions = new(JsonSerializerDefaults.Web);

  public DriftGateClient(string baseUrl, HttpClient? httpClient = null, string? bearerToken = null, string? apiKey = null)
  {
    _http = httpClient ?? new HttpClient();
    _http.BaseAddress = new Uri(baseUrl.TrimEnd('/'));
    if (!string.IsNullOrWhiteSpace(bearerToken))
      _http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", bearerToken);
    if (!string.IsNullOrWhiteSpace(apiKey))
      _http.DefaultRequestHeaders.Add("x-driftgate-api-key", apiKey);
  }

  public SessionNamespace Session => new(this);

  public async Task<CanonicalResponse<Dictionary<string, object?>>> ExecuteSessionAsync(
    string sessionId,
    ExecutionRequest request,
    CancellationToken cancellationToken = default)
  {
    return await SendAsync<ExecutionRequest, Dictionary<string, object?>>(HttpMethod.Post, $"/v4/sessions/{sessionId}/executions.execute", request, cancellationToken);
  }

  internal async Task<CanonicalResponse<TResponse>> SendAsync<TRequest, TResponse>(
    HttpMethod method,
    string path,
    TRequest payload,
    CancellationToken cancellationToken = default)
  {
    using var message = new HttpRequestMessage(method, path)
    {
      Content = new StringContent(JsonSerializer.Serialize(payload, _jsonOptions), Encoding.UTF8, "application/json")
    };

    using var response = await _http.SendAsync(message, cancellationToken);
    var raw = await response.Content.ReadAsStringAsync(cancellationToken);

    var envelope = JsonSerializer.Deserialize<CanonicalResponse<TResponse>>(raw, _jsonOptions)
      ?? throw new DriftGateSdkException(CanonicalErrorCodes.INTERNAL, "invalid response", (int)response.StatusCode, false, null);

    envelope = envelope with { RawJson = raw };

    if (!response.IsSuccessStatusCode || !envelope.Ok)
    {
      var err = envelope.Error ?? new ResponseError(CanonicalErrorCodes.INTERNAL, "request failed", (int)response.StatusCode, response.StatusCode >= System.Net.HttpStatusCode.InternalServerError, null);
      throw new DriftGateSdkException(err.Code, err.Message, err.Status, err.Retryable, envelope.Meta?.RequestId);
    }

    return envelope;
  }

  public sealed class SessionNamespace
  {
    private readonly DriftGateClient _client;

    internal SessionNamespace(DriftGateClient client)
    {
      _client = client;
    }

    public async Task<DriftGateSessionHandle> StartAsync(SessionStartRequest request, CancellationToken cancellationToken = default)
    {
      var envelope = await _client.SendAsync<SessionStartRequest, SessionStartData>(HttpMethod.Post, "/v4/sessions.start", request, cancellationToken);
      if (envelope.Data is null)
        throw new DriftGateSdkException(CanonicalErrorCodes.INTERNAL, "missing session payload", 500, false, envelope.Meta.RequestId);
      return new DriftGateSessionHandle(_client, envelope.Data.Session, envelope);
    }
  }
}
