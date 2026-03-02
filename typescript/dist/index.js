// src/index.ts
import { setTimeout as sleep } from "timers/promises";
import { z } from "zod";
import {
  CanonicalPolicyRefSchema,
  CanonicalRiskMetaSchema,
  CanonicalRouteRefSchema,
  DataBoundaryDecisionSchema,
  EdgeInterceptorRegistrationSchema,
  EdgeInterceptorStatusSchema,
  FirewallEventsResponseSchema,
  FirewallInspectRequestSchema,
  FirewallInspectResponseSchema,
  FirewallInspectResultSchema,
  RunStateSchema,
  V4ExecutionRequestSchema,
  V4SessionResourceSchema,
  V4SessionStartRequestSchema,
  WorkflowVersionSchema
} from "@driftgate/contracts";
var HeadlessErrorEnvelopeSchema = z.object({
  code: z.string(),
  message: z.string(),
  correlation_id: z.string().optional(),
  details: z.unknown().optional()
});
var LegacyErrorEnvelopeSchema = z.object({
  error: z.string(),
  message: z.string(),
  issues: z.unknown().optional()
});
var CanonicalTimingMsSchema = z.object({
  total: z.number(),
  policy: z.number().optional(),
  route: z.number().optional(),
  tool: z.number().optional()
});
var CanonicalMetaSchema = z.object({
  requestId: z.string(),
  sessionId: z.string().optional(),
  executionId: z.string().optional(),
  lineageId: z.string().optional(),
  policy: CanonicalPolicyRefSchema.optional(),
  route: CanonicalRouteRefSchema.optional(),
  risk: CanonicalRiskMetaSchema.optional(),
  timingMs: CanonicalTimingMsSchema
});
var CanonicalErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  status: z.number(),
  retryable: z.boolean(),
  details: z.record(z.unknown()).optional()
});
var RunRecordSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  workflowVersionId: z.string(),
  state: RunStateSchema,
  correlationId: z.string(),
  idempotencyKey: z.string().nullable().optional(),
  triggerSource: z.enum(["ui", "api", "sdk", "cli", "hosted", "webhook"]),
  requestedBy: z.string(),
  requestedAt: z.string(),
  startedAt: z.string().nullable().optional(),
  completedAt: z.string().nullable().optional(),
  slaPolicyId: z.string().nullable().optional(),
  slaDueAt: z.string().nullable().optional(),
  slaViolatedAt: z.string().nullable().optional()
});
var ApprovalSchema = z.object({
  id: z.string(),
  runId: z.string(),
  requiredRole: z.string(),
  status: z.enum(["pending", "approved", "denied"]),
  createdAt: z.string(),
  decidedAt: z.string().nullable().optional(),
  decidedBy: z.string().nullable().optional()
});
var RunResponseSchema = z.object({
  run: RunRecordSchema,
  approval: ApprovalSchema.nullable().optional(),
  blocked: z.boolean().optional(),
  policyDecisions: z.array(
    z.object({
      mode: z.enum(["monitor", "enforce"]),
      decision: z.enum(["allow", "deny"]),
      policyId: z.string(),
      ruleId: z.string(),
      reasonCode: z.string(),
      reasonText: z.string(),
      correlationId: z.string(),
      trace: z.record(z.unknown())
    })
  ).optional(),
  entitlementDecision: z.object({
    id: z.string(),
    reasonCode: z.string(),
    reasonText: z.string(),
    entitled: z.boolean()
  }).optional(),
  usageEntry: z.object({
    id: z.string(),
    quantity: z.number()
  }).optional(),
  boundaryDecision: DataBoundaryDecisionSchema.nullable().optional(),
  firewallDecision: FirewallInspectResultSchema.nullable().optional()
});
var V4SessionStartDataSchema = z.object({
  session: V4SessionResourceSchema
});
var CanonicalEnvelopeSchema = (dataSchema) => z.object({
  ok: z.boolean(),
  data: dataSchema.nullable(),
  meta: CanonicalMetaSchema,
  error: CanonicalErrorSchema.nullable()
});
var V4SessionStartResponseSchema = CanonicalEnvelopeSchema(V4SessionStartDataSchema);
var V4ExecutionResponseSchema = CanonicalEnvelopeSchema(RunResponseSchema);
var V4EphemeralExecuteRequestBodySchema = V4SessionStartRequestSchema.extend({
  input: z.record(z.unknown())
});
var V4EphemeralExecuteDataSchema = z.object({
  session: V4SessionResourceSchema,
  execution: RunResponseSchema
});
var V4EphemeralExecutionResponseSchema = CanonicalEnvelopeSchema(V4EphemeralExecuteDataSchema);
var CanonicalErrorEnvelopeSchema = z.object({
  ok: z.literal(false),
  data: z.null(),
  meta: CanonicalMetaSchema,
  error: CanonicalErrorSchema
});
var RunEventsResponseSchema = z.object({
  events: z.array(
    z.object({
      id: z.string(),
      runId: z.string(),
      type: z.string(),
      payload: z.record(z.unknown()),
      createdAt: z.string()
    })
  )
});
var ApprovalsListSchema = z.object({
  approvals: z.array(
    z.object({
      approval: ApprovalSchema,
      run: RunRecordSchema
    })
  )
});
var DeployResponseSchema = z.object({
  project: z.object({
    id: z.string(),
    workspaceId: z.string(),
    name: z.string(),
    createdBy: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
  }),
  workflow: z.object({
    id: z.string(),
    projectId: z.string(),
    workspaceId: z.string(),
    name: z.string(),
    status: z.enum(["draft", "published", "archived"]),
    createdBy: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
  }),
  draft: z.object({
    workflowId: z.string(),
    workspaceId: z.string(),
    version: z.number(),
    nodes: z.array(z.unknown()),
    edges: z.array(z.unknown()),
    viewport: z.object({ x: z.number(), y: z.number(), zoom: z.number() }),
    updatedAt: z.string()
  }),
  compile: z.object({
    checksum: z.string(),
    mutationNodeIds: z.array(z.string()),
    compiledPlan: z.record(z.unknown())
  })
});
var PublishResponseSchema = z.object({
  version: WorkflowVersionSchema
});
var ConnectorRecordSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  name: z.string(),
  connectorType: z.string(),
  status: z.enum(["active", "disabled"]),
  config: z.record(z.unknown()),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});
var WorkspaceSecretRecordSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  connectorId: z.string().nullable(),
  name: z.string(),
  keyVersion: z.string(),
  metadata: z.record(z.unknown()),
  createdBy: z.string(),
  createdAt: z.string(),
  rotatedAt: z.string().nullable(),
  revokedAt: z.string().nullable(),
  maskedValue: z.string()
});
var WorkspaceWebhookRecordSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  connectorId: z.string().nullable(),
  name: z.string(),
  path: z.string(),
  targetWorkflowId: z.string(),
  status: z.enum(["active", "disabled"]),
  eventFilter: z.record(z.unknown()),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  lastReceivedAt: z.string().nullable(),
  revokedAt: z.string().nullable(),
  signingSecretConfigured: z.boolean()
});
var ConnectorListSchema = z.object({
  connectors: z.array(ConnectorRecordSchema)
});
var ConnectorMutationSchema = z.object({
  connector: ConnectorRecordSchema
});
var SecretListSchema = z.object({
  secrets: z.array(WorkspaceSecretRecordSchema)
});
var SecretMutationSchema = z.object({
  secret: WorkspaceSecretRecordSchema
});
var WebhookListSchema = z.object({
  webhooks: z.array(WorkspaceWebhookRecordSchema)
});
var WebhookMutationSchema = z.object({
  webhook: WorkspaceWebhookRecordSchema
});
var EdgeInterceptorListSchema = z.object({
  registrations: z.array(EdgeInterceptorRegistrationSchema)
});
var EdgeInterceptorMutationSchema = z.object({
  registration: EdgeInterceptorRegistrationSchema
});
var FirewallInspectBodySchema = FirewallInspectRequestSchema.omit({
  workspaceId: true
});
var DriftGateError = class extends Error {
  constructor(code, message, status, correlationId, details) {
    super(message);
    this.code = code;
    this.status = status;
    this.correlationId = correlationId;
    this.details = details;
    this.name = "DriftGateError";
  }
};
var DriftGateSessionHandle = class {
  constructor(client, session, startEnvelope) {
    this.client = client;
    this.session = session;
    this.startEnvelope = startEnvelope;
  }
  get sessionId() {
    return this.session.sessionId;
  }
  get rawEnvelope() {
    return this.startEnvelope.raw;
  }
  async execute(input) {
    return this.client.executeSession(this.session.sessionId, input);
  }
};
function isTerminalState(state) {
  return ["succeeded", "failed", "denied", "timed_out", "canceled", "aborted"].includes(state);
}
var DriftGateClient = class {
  baseUrl;
  sessionToken;
  apiKey;
  fetchImpl;
  edgeInterceptorState = null;
  session;
  approvals;
  connectors;
  secrets;
  webhooks;
  edgeInterceptors;
  firewall;
  constructor(options) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
    this.sessionToken = options.sessionToken;
    this.apiKey = options.apiKey;
    this.fetchImpl = options.fetchImpl ?? fetch;
    this.session = {
      start: async (input) => {
        const payload = V4SessionStartRequestSchema.parse(input);
        const raw = await this.request("/v4/sessions.start", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        const parsed = V4SessionStartResponseSchema.parse(raw);
        if (!parsed.ok || !parsed.data) {
          const canonicalCode = parsed.error?.code ?? "INTERNAL";
          throw new DriftGateError(
            canonicalCode,
            parsed.error?.message ?? "session.start failed",
            parsed.error?.status ?? 500,
            parsed.meta.requestId,
            parsed.error?.details
          );
        }
        const envelope = {
          ok: parsed.ok,
          data: parsed.data,
          meta: parsed.meta,
          error: parsed.error,
          raw
        };
        return new DriftGateSessionHandle(this, parsed.data.session, envelope);
      }
    };
    this.approvals = {
      list: async (workspaceId, status) => {
        const query = status ? `?status=${encodeURIComponent(status)}` : "";
        const response = await this.request(`/v1/headless/workspaces/${encodeURIComponent(workspaceId)}/approvals${query}`);
        return ApprovalsListSchema.parse(response).approvals;
      },
      approve: async (approvalId) => {
        const response = await this.request(`/v1/headless/approvals/${encodeURIComponent(approvalId)}/approve`, {
          method: "POST"
        });
        return RunResponseSchema.parse(response);
      },
      deny: async (approvalId) => {
        const response = await this.request(`/v1/headless/approvals/${encodeURIComponent(approvalId)}/deny`, {
          method: "POST"
        });
        return RunResponseSchema.parse(response);
      }
    };
    this.connectors = {
      list: async (workspaceId) => {
        const response = await this.request(
          `/v1/workspaces/${encodeURIComponent(workspaceId)}/connectors`
        );
        return ConnectorListSchema.parse(response).connectors;
      },
      create: async (workspaceId, input) => {
        const response = await this.request(
          `/v1/workspaces/${encodeURIComponent(workspaceId)}/connectors`,
          {
            method: "POST",
            body: JSON.stringify(input)
          }
        );
        return ConnectorMutationSchema.parse(response).connector;
      },
      update: async (workspaceId, connectorId, input) => {
        const response = await this.request(
          `/v1/workspaces/${encodeURIComponent(workspaceId)}/connectors/${encodeURIComponent(
            connectorId
          )}`,
          {
            method: "PATCH",
            body: JSON.stringify(input)
          }
        );
        return ConnectorMutationSchema.parse(response).connector;
      },
      delete: async (workspaceId, connectorId) => {
        const response = await this.request(
          `/v1/workspaces/${encodeURIComponent(workspaceId)}/connectors/${encodeURIComponent(
            connectorId
          )}`,
          {
            method: "DELETE"
          }
        );
        return ConnectorMutationSchema.parse(response).connector;
      }
    };
    this.secrets = {
      list: async (workspaceId) => {
        const response = await this.request(
          `/v1/workspaces/${encodeURIComponent(workspaceId)}/secrets`
        );
        return SecretListSchema.parse(response).secrets;
      },
      create: async (workspaceId, input) => {
        const response = await this.request(
          `/v1/workspaces/${encodeURIComponent(workspaceId)}/secrets`,
          {
            method: "POST",
            body: JSON.stringify(input)
          }
        );
        return SecretMutationSchema.parse(response).secret;
      },
      update: async (workspaceId, secretId, input) => {
        const response = await this.request(
          `/v1/workspaces/${encodeURIComponent(workspaceId)}/secrets/${encodeURIComponent(secretId)}`,
          {
            method: "PATCH",
            body: JSON.stringify(input)
          }
        );
        return SecretMutationSchema.parse(response).secret;
      },
      delete: async (workspaceId, secretId) => {
        const response = await this.request(
          `/v1/workspaces/${encodeURIComponent(workspaceId)}/secrets/${encodeURIComponent(secretId)}`,
          {
            method: "DELETE"
          }
        );
        return SecretMutationSchema.parse(response).secret;
      }
    };
    this.webhooks = {
      list: async (workspaceId) => {
        const response = await this.request(
          `/v1/workspaces/${encodeURIComponent(workspaceId)}/webhooks`
        );
        return WebhookListSchema.parse(response).webhooks;
      },
      create: async (workspaceId, input) => {
        const response = await this.request(
          `/v1/workspaces/${encodeURIComponent(workspaceId)}/webhooks`,
          {
            method: "POST",
            body: JSON.stringify(input)
          }
        );
        return WebhookMutationSchema.parse(response).webhook;
      },
      update: async (workspaceId, webhookId, input) => {
        const response = await this.request(
          `/v1/workspaces/${encodeURIComponent(workspaceId)}/webhooks/${encodeURIComponent(
            webhookId
          )}`,
          {
            method: "PATCH",
            body: JSON.stringify(input)
          }
        );
        return WebhookMutationSchema.parse(response).webhook;
      },
      delete: async (workspaceId, webhookId) => {
        const response = await this.request(
          `/v1/workspaces/${encodeURIComponent(workspaceId)}/webhooks/${encodeURIComponent(
            webhookId
          )}`,
          {
            method: "DELETE"
          }
        );
        return WebhookMutationSchema.parse(response).webhook;
      }
    };
    this.edgeInterceptors = {
      list: async (workspaceId) => {
        const response = await this.request(
          `/v1/workspaces/${encodeURIComponent(workspaceId)}/edge/interceptors`
        );
        return EdgeInterceptorListSchema.parse(response).registrations;
      },
      register: async (workspaceId, input) => {
        const response = await this.request(
          `/v1/workspaces/${encodeURIComponent(workspaceId)}/edge/interceptors`,
          {
            method: "POST",
            body: JSON.stringify({
              ...input,
              workspaceId
            })
          }
        );
        return EdgeInterceptorMutationSchema.parse(response).registration;
      },
      setStatus: async (workspaceId, registrationId, status) => {
        const parsedStatus = EdgeInterceptorStatusSchema.parse(status);
        const response = await this.request(
          `/v1/workspaces/${encodeURIComponent(workspaceId)}/edge/interceptors/${encodeURIComponent(
            registrationId
          )}/status`,
          {
            method: "PATCH",
            body: JSON.stringify({ status: parsedStatus })
          }
        );
        return EdgeInterceptorMutationSchema.parse(response).registration;
      }
    };
    this.firewall = {
      inspect: async (workspaceId, input) => {
        const parsedInput = FirewallInspectBodySchema.parse(input);
        const response = await this.request(
          `/v1/workspaces/${encodeURIComponent(workspaceId)}/firewall/inspect`,
          {
            method: "POST",
            body: JSON.stringify(parsedInput)
          }
        );
        return FirewallInspectResponseSchema.parse(response);
      },
      events: async (workspaceId) => {
        const response = await this.request(
          `/v1/workspaces/${encodeURIComponent(workspaceId)}/firewall/events`
        );
        return FirewallEventsResponseSchema.parse(response).events;
      }
    };
  }
  async executeSession(sessionId, input) {
    const payload = V4ExecutionRequestSchema.parse(input);
    const raw = await this.request(`/v4/sessions/${encodeURIComponent(sessionId)}/executions.execute`, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    const parsed = V4ExecutionResponseSchema.parse(raw);
    if (!parsed.ok || !parsed.data) {
      const canonicalCode = parsed.error?.code ?? "INTERNAL";
      throw new DriftGateError(
        canonicalCode,
        parsed.error?.message ?? "session.execute failed",
        parsed.error?.status ?? 500,
        parsed.meta.requestId,
        parsed.error?.details
      );
    }
    return {
      ok: parsed.ok,
      data: parsed.data,
      meta: parsed.meta,
      error: parsed.error,
      raw
    };
  }
  async execute(input) {
    const payload = V4EphemeralExecuteRequestBodySchema.parse(input);
    const raw = await this.request("/v4/execute", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    const parsed = V4EphemeralExecutionResponseSchema.parse(raw);
    if (!parsed.ok || !parsed.data) {
      const canonicalCode = parsed.error?.code ?? "INTERNAL";
      throw new DriftGateError(
        canonicalCode,
        parsed.error?.message ?? "execute failed",
        parsed.error?.status ?? 500,
        parsed.meta.requestId,
        parsed.error?.details
      );
    }
    return {
      ok: parsed.ok,
      data: parsed.data,
      meta: parsed.meta,
      error: parsed.error,
      raw
    };
  }
  async enableEdgeMode(input) {
    const registration = await this.edgeInterceptors.register(input.workspaceId, input.registration);
    this.edgeInterceptorState = {
      workspaceId: input.workspaceId,
      registration,
      enforcement: input.enforcement ?? "monitor",
      hooks: input.hooks
    };
    return registration;
  }
  disableEdgeMode() {
    this.edgeInterceptorState = null;
  }
  async run(input) {
    const edgeDecision = this.evaluateEdgeDecision(input);
    const edgeState = this.edgeInterceptorState;
    if (edgeDecision && edgeState?.hooks?.beforeRun) {
      await edgeState.hooks.beforeRun(input, edgeDecision);
    }
    if (edgeDecision && !edgeDecision.allowed) {
      if (edgeState?.hooks?.onBlocked) {
        await edgeState.hooks.onBlocked(input, edgeDecision);
      }
      if (edgeState?.enforcement === "enforce") {
        throw new DriftGateError(
          "edge_interceptor_denied",
          edgeDecision.reasonText,
          403,
          void 0,
          {
            reasonCode: edgeDecision.reasonCode,
            requiredCapabilities: edgeDecision.requiredCapabilities,
            grantedCapabilities: edgeDecision.grantedCapabilities,
            registrationId: edgeState.registration.registrationId
          }
        );
      }
    }
    const response = await this.request("/v1/headless/runs", {
      method: "POST",
      body: JSON.stringify(input)
    });
    const parsed = RunResponseSchema.parse(response);
    if (edgeDecision && edgeState?.hooks?.afterRun) {
      await edgeState.hooks.afterRun(input, edgeDecision, parsed);
    }
    return parsed;
  }
  async status(runId) {
    const response = await this.request(`/v1/headless/runs/${encodeURIComponent(runId)}`);
    return RunResponseSchema.parse(response);
  }
  async events(runId) {
    const response = await this.request(`/v1/headless/runs/${encodeURIComponent(runId)}/events`);
    return RunEventsResponseSchema.parse(response).events;
  }
  async waitForTerminal(runId, options = {}) {
    const intervalMs = options.intervalMs ?? 1500;
    const timeoutMs = options.timeoutMs ?? 12e4;
    const startedAt = Date.now();
    while (true) {
      const current = await this.status(runId);
      if (isTerminalState(current.run.state)) {
        return current;
      }
      if (Date.now() - startedAt >= timeoutMs) {
        throw new DriftGateError("timeout", `run ${runId} did not reach terminal state before timeout`, 408);
      }
      await sleep(intervalMs);
    }
  }
  async deployWorkflow(input) {
    const response = await this.request("/v1/headless/workflows/deploy", {
      method: "POST",
      body: JSON.stringify(input)
    });
    return DeployResponseSchema.parse(response);
  }
  async publishWorkflow(workflowId, workflowYaml) {
    const response = await this.request(`/v1/headless/workflows/${encodeURIComponent(workflowId)}/publish`, {
      method: "POST",
      body: JSON.stringify(workflowYaml ? { workflowYaml } : {})
    });
    const parsed = PublishResponseSchema.parse(response);
    return parsed.version;
  }
  evaluateEdgeDecision(input) {
    const state = this.edgeInterceptorState;
    if (!state || state.workspaceId !== input.workspaceId) {
      return null;
    }
    if (state.registration.status !== "active") {
      return {
        allowed: true,
        reasonCode: "edge.interceptor.disabled",
        reasonText: "Edge interceptor registration is disabled; enforcement skipped.",
        requiredCapabilities: [],
        grantedCapabilities: state.registration.capabilities
      };
    }
    const requiredCapabilities = ["runs:create"];
    const grantedCapabilities = state.registration.capabilities;
    const grantedSet = new Set(grantedCapabilities);
    const missingCapabilities = requiredCapabilities.filter(
      (capability) => !grantedSet.has(capability)
    );
    if (missingCapabilities.length === 0) {
      return {
        allowed: true,
        reasonCode: "edge.interceptor.allow",
        reasonText: "Edge interceptor capability checks passed.",
        requiredCapabilities,
        grantedCapabilities
      };
    }
    return {
      allowed: false,
      reasonCode: "edge.interceptor.denied.missing_capability",
      reasonText: `Missing required edge capabilities: ${missingCapabilities.join(", ")}`,
      requiredCapabilities,
      grantedCapabilities
    };
  }
  async request(path, init = {}) {
    const headers = new Headers(init.headers ?? {});
    if (!headers.has("content-type") && init.body) {
      headers.set("content-type", "application/json");
    }
    if (this.apiKey) {
      headers.set("x-driftgate-api-key", this.apiKey);
    } else if (this.sessionToken) {
      headers.set("authorization", `Bearer ${this.sessionToken}`);
    }
    const response = await this.fetchImpl(`${this.baseUrl}${path}`, {
      ...init,
      headers
    });
    const rawText = await response.text();
    const body = rawText.length > 0 ? safelyParseJson(rawText) : null;
    if (!response.ok) {
      const canonicalEnvelope = CanonicalErrorEnvelopeSchema.safeParse(body);
      if (canonicalEnvelope.success) {
        throw new DriftGateError(
          canonicalEnvelope.data.error.code,
          canonicalEnvelope.data.error.message,
          canonicalEnvelope.data.error.status,
          canonicalEnvelope.data.meta.requestId,
          canonicalEnvelope.data.error.details
        );
      }
      const envelope = HeadlessErrorEnvelopeSchema.safeParse(body);
      if (envelope.success) {
        throw new DriftGateError(
          envelope.data.code,
          envelope.data.message,
          response.status,
          envelope.data.correlation_id,
          envelope.data.details
        );
      }
      const legacyEnvelope = LegacyErrorEnvelopeSchema.safeParse(body);
      if (legacyEnvelope.success) {
        throw new DriftGateError(
          legacyEnvelope.data.error,
          legacyEnvelope.data.message,
          response.status,
          void 0,
          legacyEnvelope.data.issues
        );
      }
      throw new DriftGateError(
        "http_error",
        `request failed (${response.status})${rawText ? `: ${rawText}` : ""}`,
        response.status
      );
    }
    return body;
  }
};
function safelyParseJson(input) {
  try {
    return JSON.parse(input);
  } catch {
    return { raw: input };
  }
}
export {
  DriftGateClient,
  DriftGateError,
  DriftGateSessionHandle
};
//# sourceMappingURL=index.js.map