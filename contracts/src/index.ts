import { z } from "zod";

export const CONTRACT_VERSION = "1.9.0";

export const AuthSessionSchema = z.object({
  sessionId: z.string(),
  userId: z.string(),
  tenantId: z.string(),
  workspaceIds: z.array(z.string()),
  roles: z.array(z.string()),
  idpProvider: z.enum(["google", "github", "email", "saml"]),
  mfaStatus: z.enum(["required", "passed", "not-required"])
});

export const WorkspaceRoleBindingSchema = z.object({
  workspaceId: z.string(),
  userId: z.string(),
  role: z.enum(["owner", "admin", "editor", "viewer", "approver", "billing-admin"]),
  grantedAt: z.string().datetime(),
  grantedBy: z.string()
});

export const WorkflowVersionSchema = z.object({
  workflowId: z.string(),
  versionId: z.string(),
  versionNumber: z.number().int().positive(),
  state: z.enum(["draft", "published", "archived"]),
  checksum: z.string(),
  sourceType: z.enum(["ui_graph", "workflow_yaml", "api_plan"]).optional(),
  compiledPlanJson: z.record(z.unknown()).optional(),
  createdAt: z.string().datetime(),
  publishedAt: z.string().datetime().optional()
});

export const WorkflowBuilderNodeSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1).optional(),
  position: z.object({
    x: z.number(),
    y: z.number()
  }),
  data: z.record(z.unknown())
});

export const WorkflowBuilderEdgeSchema = z.object({
  id: z.string().min(1),
  source: z.string().min(1),
  target: z.string().min(1),
  type: z.string().min(1).optional(),
  label: z.string().optional(),
  data: z.record(z.unknown()).optional()
});

export const WorkflowBuilderViewportSchema = z.object({
  x: z.number(),
  y: z.number(),
  zoom: z.number().positive()
});

export const WorkflowBuilderDocumentSchema = z.object({
  workflowId: z.string(),
  version: z.number().int().nonnegative(),
  nodes: z.array(WorkflowBuilderNodeSchema),
  edges: z.array(WorkflowBuilderEdgeSchema),
  viewport: WorkflowBuilderViewportSchema,
  updatedAt: z.string().datetime()
});

export const RunStateSchema = z.enum([
  "queued",
  "running",
  "waiting_approval",
  "approved",
  "denied",
  "succeeded",
  "failed",
  "aborted",
  "timed_out",
  "canceled"
]);

export const RunTriggerSourceSchema = z.enum(["ui", "api", "sdk", "cli", "hosted", "webhook"]);

export const GovernedRunRequestSchema = z.object({
  workspaceId: z.string().min(1),
  workflowVersionId: z.string().min(1),
  requiresApproval: z.boolean().default(false),
  requiredRole: z.string().min(1).optional(),
  slaPolicyId: z.string().min(1).optional(),
  idempotencyKey: z.string().min(1).max(200).optional(),
  correlationId: z.string().min(1).max(200).optional(),
  triggerSource: RunTriggerSourceSchema.default("api")
});

export const HeadlessRunRequestSchema = GovernedRunRequestSchema.extend({
  input: z.record(z.unknown()).optional()
});

export const StructuredErrorEnvelopeSchema = z.object({
  code: z.string(),
  message: z.string(),
  correlation_id: z.string().optional(),
  details: z.unknown().optional()
});

export const CanonicalPolicyRefSchema = z.object({
  ref: z.string().min(1),
  version: z.string().min(1)
});

export const CanonicalRouteRefSchema = z.object({
  provider: z.string().min(1).optional(),
  model: z.string().min(1).optional(),
  region: z.string().min(1).optional()
});

export const CanonicalRiskMetaSchema = z.object({
  score: z.number().optional(),
  decision: z.enum(["allow", "deny", "review"]).optional()
});

export const CanonicalTimingMsSchema = z.object({
  total: z.number().nonnegative(),
  policy: z.number().nonnegative().optional(),
  route: z.number().nonnegative().optional(),
  tool: z.number().nonnegative().optional()
});

export const CanonicalResponseMetaSchema = z.object({
  requestId: z.string().min(1),
  sessionId: z.string().min(1).optional(),
  executionId: z.string().min(1).optional(),
  lineageId: z.string().min(1).optional(),
  policy: CanonicalPolicyRefSchema.optional(),
  route: CanonicalRouteRefSchema.optional(),
  risk: CanonicalRiskMetaSchema.optional(),
  timingMs: CanonicalTimingMsSchema
});

export const CanonicalErrorCodeSchema = z.enum([
  "AUTH_INVALID",
  "POLICY_DENIED",
  "RISK_EXCEEDED",
  "ROUTE_UNAVAILABLE",
  "TOOL_BLOCKED",
  "RATE_LIMITED",
  "TIMEOUT",
  "INTERNAL",
  "INVALID_REQUEST"
]);

export const CanonicalErrorSchema = z.object({
  code: CanonicalErrorCodeSchema,
  message: z.string().min(1),
  status: z.number().int().min(100).max(599),
  retryable: z.boolean(),
  details: z.record(z.unknown()).optional()
});

export const CanonicalResponseEnvelopeSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    ok: z.boolean(),
    data: dataSchema.nullable(),
    meta: CanonicalResponseMetaSchema,
    error: CanonicalErrorSchema.nullable()
  });

export const V4SessionStartRequestSchema = z.object({
  workspaceId: z.string().min(1).optional(),
  agent: z.string().min(1),
  subject: z.string().min(1).optional(),
  metadata: z.record(z.unknown()).optional(),
  policy: CanonicalPolicyRefSchema.optional(),
  route: CanonicalRouteRefSchema.optional(),
  risk: CanonicalRiskMetaSchema.optional(),
  workflowVersionId: z.string().min(1).optional(),
  expiresAt: z.string().datetime().optional()
});

export const V4SessionResourceSchema = z.object({
  sessionId: z.string().min(1),
  workspaceId: z.string().min(1),
  agent: z.string().min(1),
  subject: z.string().min(1).optional(),
  metadata: z.record(z.unknown()).optional(),
  policy: CanonicalPolicyRefSchema.optional(),
  route: CanonicalRouteRefSchema.optional(),
  risk: CanonicalRiskMetaSchema.optional(),
  workflowVersionId: z.string().min(1).optional(),
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional()
});

export const V4ExecutionRequestSchema = z.object({
  input: z.record(z.unknown()),
  policy: CanonicalPolicyRefSchema.optional(),
  route: CanonicalRouteRefSchema.optional(),
  risk: CanonicalRiskMetaSchema.optional(),
  workflowVersionId: z.string().min(1).optional()
});

export const V4ExecutionResultSchema = z.object({
  run: z.record(z.unknown()),
  approval: z.record(z.unknown()).nullable().optional(),
  blocked: z.boolean(),
  policyDecisions: z.array(z.record(z.unknown())).default([]),
  entitlementDecision: z.record(z.unknown()),
  usageEntry: z.record(z.unknown()),
  boundaryDecision: z.record(z.unknown()).nullable().optional(),
  firewallDecision: z.record(z.unknown()).nullable().optional()
});

export const V4EphemeralExecuteRequestSchema = V4SessionStartRequestSchema.omit({
  expiresAt: true
}).extend({
  input: z.record(z.unknown())
});

export const RunStateTransitionSchema = z.object({
  runId: z.string(),
  from: RunStateSchema,
  to: RunStateSchema,
  occurredAt: z.string().datetime(),
  actor: z.string().optional(),
  reason: z.string().optional()
});

export const PolicyDecisionSchema = z.object({
  mode: z.enum(["monitor", "enforce"]),
  decision: z.enum(["allow", "deny"]),
  policyId: z.string(),
  ruleId: z.string(),
  reasonCode: z.string(),
  reasonText: z.string(),
  correlationId: z.string(),
  trace: z.record(z.unknown())
});

export const PolicyExitGateEvidenceSchema = z.object({
  runId: z.string(),
  runState: RunStateSchema,
  blocked: z.boolean(),
  traceComplete: z.boolean(),
  decisionCount: z.number().int().nonnegative(),
  blockingDecision: PolicyDecisionSchema.nullable(),
  denialEvent: z
    .object({
      eventId: z.string(),
      occurredAt: z.string().datetime(),
      policyId: z.string(),
      ruleId: z.string(),
      reasonCode: z.string(),
      reasonText: z.string(),
      correlationId: z.string()
    })
    .nullable()
});

export const EntitlementDecisionSchema = z.object({
  tenantId: z.string(),
  plan: z.string(),
  entitled: z.boolean(),
  denialReason: z.string().optional()
});

export const ArtifactManifestItemSchema = z.object({
  artifactId: z.string(),
  runId: z.string(),
  path: z.string(),
  type: z.string(),
  sha256: z.string(),
  sizeBytes: z.number().int().nonnegative()
});

export const ControlFailureSchema = z.object({
  jobId: z.string(),
  failureCategory: z.enum([
    "cursor-drift",
    "missing-run-script",
    "policy-deny",
    "network",
    "dependency-timeout",
    "unknown"
  ]),
  firstFailure: z.string().datetime(),
  blockedUntil: z.string().datetime().optional()
});

export const ControlJobStateSchema = z.enum([
  "queued",
  "running",
  "succeeded",
  "failed",
  "blocked"
]);

export const ControlJobSchema = z.object({
  id: z.string(),
  kind: z.string(),
  dispatchKey: z.string(),
  payload: z.record(z.unknown()),
  state: ControlJobStateSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  lastFailure: ControlFailureSchema.nullable()
});

export const ControlJobAttemptSchema = z.object({
  id: z.string(),
  jobId: z.string(),
  attempt: z.number().int().positive(),
  startedAt: z.string().datetime(),
  finishedAt: z.string().datetime(),
  outcome: z.enum(["succeeded", "failed", "blocked"])
});

export const ControlJobEventSchema = z.object({
  id: z.string(),
  jobId: z.string(),
  type: z.enum([
    "job.queued",
    "job.suppressed",
    "job.started",
    "job.succeeded",
    "job.failed",
    "job.blocked",
    "job.backoff_scheduled",
    "job.retried"
  ]),
  payload: z.record(z.unknown()),
  createdAt: z.string().datetime()
});

export const ControlBackoffStateSchema = z.object({
  jobId: z.string(),
  dispatchKey: z.string(),
  rootCauseKey: z.string(),
  consecutiveFailures: z.number().int().nonnegative(),
  nextRetryAt: z.string().datetime().nullable(),
  blockedUntil: z.string().datetime().nullable(),
  updatedAt: z.string().datetime()
});

export const ControlSuppressionStateSchema = z.object({
  dispatchKey: z.string(),
  blockedUntil: z.string().datetime(),
  reason: z.string(),
  updatedAt: z.string().datetime()
});

export const ControlJobScheduleRequestSchema = z.object({
  kind: z.string().min(1),
  dedupeKey: z.string().min(1).optional(),
  payload: z.record(z.unknown()).default({})
});

export const ControlJobBlockRequestSchema = z.object({
  failureCategory: ControlFailureSchema.shape.failureCategory,
  message: z.string().min(1),
  blockedUntil: z.string().datetime().optional()
});

export const ControlJobRunNextResponseSchema = z.union([
  z.object({
    processed: z.literal(false),
    reason: z.literal("queue_empty")
  }),
  z.object({
    processed: z.literal(true),
    job: ControlJobSchema,
    attempt: ControlJobAttemptSchema
  })
]);

export const GitHubDispatchControlPayloadSchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  eventType: z.string().min(1).default("control_job_requested"),
  clientPayload: z.record(z.unknown()).default({})
});

export const SamlConnectionSchema = z.object({
  workspaceId: z.string(),
  connectionId: z.string(),
  issuer: z.string().url(),
  entryPoint: z.string().url(),
  signInUrl: z.string().url(),
  certificateFingerprint: z.string().min(1),
  createdAt: z.string().datetime(),
  createdBy: z.string(),
  updatedAt: z.string().datetime(),
  updatedBy: z.string()
});

export const ScimProvisioningTokenSchema = z.object({
  workspaceId: z.string(),
  tokenId: z.string(),
  tokenPreview: z.string(),
  status: z.enum(["active", "revoked"]),
  createdAt: z.string().datetime(),
  createdBy: z.string(),
  revokedAt: z.string().datetime().optional(),
  revokedBy: z.string().optional()
});

export const ComplianceFrameworkSchema = z.enum(["soc2", "iso27001", "gdpr", "ai_act"]);

export const ComplianceFrameworkControlMappingSchema = z.object({
  framework: ComplianceFrameworkSchema,
  controlIds: z.array(z.string().min(1)).min(1),
  rationale: z.string().min(1).optional()
});

export const ComplianceExportFormatSchema = z.enum(["json", "csv", "api_feed"]);

export const CreateComplianceExportRequestSchema = z.object({
  workspaceId: z.string().min(1),
  bundleIds: z.array(z.string().min(1)).optional(),
  frameworks: z.array(ComplianceFrameworkSchema).min(1).optional(),
  format: ComplianceExportFormatSchema.optional()
});

export const ComplianceExportManifestItemSchema = z.object({
  exportId: z.string(),
  bundleId: z.string(),
  runId: z.string(),
  artifactId: z.string(),
  path: z.string(),
  type: z.string(),
  sha256: z.string(),
  sizeBytes: z.number().int().nonnegative(),
  traceability: z
    .object({
      auditEventId: z.string().min(1).optional(),
      usageEntryId: z.string().min(1).optional()
    })
    .optional(),
  frameworkMappings: z.array(ComplianceFrameworkControlMappingSchema).optional()
});

export const ComplianceExportExitGateSchema = z.object({
  workspaceId: z.string(),
  passed: z.boolean(),
  reasonCodes: z.array(z.string()),
  evaluatedAt: z.string().datetime(),
  latestExportId: z.string().optional(),
  manifestHash: z.string().optional()
});

export const CapabilityStatusSchema = z.enum(["enabled", "disabled", "preview"]);

export const CapabilityDescriptorSchema = z.object({
  key: z.string().min(1),
  status: CapabilityStatusSchema,
  version: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  config: z.record(z.unknown()).optional()
});

export const ApiSurfaceVersionSchema = z.object({
  name: z.string().min(1),
  version: z.string().min(1),
  deprecated: z.boolean().optional()
});

export const CapabilityNegotiationSchema = z.object({
  requestedSurface: z.string().min(1).optional(),
  requestedVersion: z.string().min(1).optional(),
  selectedSurface: z.string().min(1),
  selectedVersion: z.string().min(1),
  compatible: z.boolean()
});

export const CapabilitiesResponseSchema = z.object({
  generatedAt: z.string().datetime(),
  workspaceId: z.string().min(1).optional(),
  apiSurfaces: z.array(ApiSurfaceVersionSchema).default([]),
  capabilities: z.array(CapabilityDescriptorSchema).default([]),
  negotiation: CapabilityNegotiationSchema.optional()
});

export const AccessPermissionKeySchema = z.enum([
  "policy:read",
  "policy:write",
  "policy:publish",
  "policy:simulate",
  "execution:read",
  "execution:export",
  "approval:read",
  "approval:decide",
  "approval:configure",
  "audit:read",
  "audit:export",
  "audit:retention:manage",
  "connector:read",
  "connector:connect",
  "connector:disconnect",
  "workspace:user:invite",
  "workspace:user:role:set",
  "workspace:delete",
  "service-account:read",
  "service-account:write",
  "service-account:token:rotate"
]);

export const AccessRoleScopeSchema = z.enum(["org", "workspace", "environment"]);

export const AccessRoleSchema = z.object({
  id: z.string().min(1),
  key: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  scope: AccessRoleScopeSchema,
  permissions: z.array(AccessPermissionKeySchema),
  isBuiltIn: z.boolean(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional()
});

export const AccessSubjectTypeSchema = z.enum(["user", "group", "serviceAccount"]);

export const AccessRoleBindingSchema = z.object({
  id: z.string().min(1),
  scopeType: AccessRoleScopeSchema,
  scopeId: z.string().min(1),
  subjectType: AccessSubjectTypeSchema,
  subjectId: z.string().min(1),
  roleKey: z.string().min(1),
  createdAt: z.string().datetime().optional(),
  createdBy: z.string().optional()
});

export const ServiceAccountStatusSchema = z.enum(["active", "disabled"]);

export const ServiceAccountSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  workspaceId: z.string().min(1),
  environmentKey: z.string().min(1).nullable().optional(),
  status: ServiceAccountStatusSchema,
  createdAt: z.string().datetime(),
  createdByUserId: z.string().min(1),
  updatedAt: z.string().datetime().optional(),
  disabledAt: z.string().datetime().nullable().optional()
});

export const AgentIdentityStatusSchema = z.enum(["active", "disabled"]);

export const AgentProfileSchema = z.object({
  id: z.string().min(1),
  workspaceId: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  environmentKey: z.string().min(1).nullable().optional(),
  status: AgentIdentityStatusSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
  disabledAt: z.string().datetime().nullable().optional(),
  createdByUserId: z.string().min(1)
});

export const AgentKeyStatusSchema = z.enum(["active", "revoked"]);

export const AgentKeyMetadataSchema = z.object({
  keyId: z.string().min(1),
  workspaceId: z.string().min(1),
  agentId: z.string().min(1),
  name: z.string().min(1),
  keyPrefix: z.string().min(1),
  scopes: z.array(z.string().min(1)).default([]),
  rateLimitPerMinute: z.number().int().positive(),
  status: AgentKeyStatusSchema,
  createdAt: z.string().datetime(),
  revokedAt: z.string().datetime().nullable().optional()
});

export const AgentTokenClaimsSchema = z.object({
  tokenUse: z.literal("agent_execution"),
  tokenVersion: z.string().min(1).default("v1"),
  iss: z.string().min(1),
  sub: z.string().min(1),
  aud: z.string().min(1),
  jti: z.string().min(1),
  workspaceId: z.string().min(1),
  agentId: z.string().min(1),
  scopes: z.array(z.string().min(1)).default([]),
  iat: z.string().datetime(),
  exp: z.string().datetime().nullable().optional()
});

export const AgentExecutionTokenIssueRequestSchema = z.object({
  scopes: z.array(z.string().min(1)).min(1),
  ttlSeconds: z.number().int().min(1).max(3600).default(900)
});

export const AgentExecutionTokenIssueResponseSchema = z.object({
  token: z.string().min(1),
  expiresAt: z.string().datetime(),
  claims: AgentTokenClaimsSchema
});

export const AgentCapabilitySourceSchema = z.enum(["manual", "role", "token"]);
export const AgentCapabilityStatusSchema = z.enum(["active", "disabled"]);

export const AgentCapabilitySchema = z.object({
  id: z.string().min(1),
  workspaceId: z.string().min(1),
  agentId: z.string().min(1),
  capability: z.string().min(1),
  source: AgentCapabilitySourceSchema,
  status: AgentCapabilityStatusSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export const AgentDelegationTargetTypeSchema = z.enum(["agent", "tool", "runtime"]);
export const AgentDelegationEffectSchema = z.enum(["allow", "deny"]);
export const AgentDelegationStatusSchema = z.enum(["active", "disabled"]);

export const AgentDelegationRuleSchema = z.object({
  id: z.string().min(1),
  workspaceId: z.string().min(1),
  sourceAgentId: z.string().min(1),
  targetType: AgentDelegationTargetTypeSchema,
  targetId: z.string().min(1),
  capability: z.string().min(1),
  effect: AgentDelegationEffectSchema,
  status: AgentDelegationStatusSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export const AgentRevocationEscalationLevelSchema = z.enum([
  "none",
  "low",
  "medium",
  "high",
  "critical"
]);

export const AgentRevocationEventSchema = z.object({
  id: z.string().min(1),
  workspaceId: z.string().min(1),
  agentId: z.string().min(1),
  reasonCode: z.string().min(1),
  reasonText: z.string().min(1).nullable().optional(),
  escalationLevel: AgentRevocationEscalationLevelSchema,
  requestedByUserId: z.string().min(1),
  correlationId: z.string().min(1).nullable().optional(),
  tokenRevocationCount: z.number().int().nonnegative(),
  previousStatus: AgentIdentityStatusSchema,
  currentStatus: AgentIdentityStatusSchema,
  effectiveAt: z.string().datetime(),
  propagationWindowSeconds: z.number().int().nonnegative(),
  createdAt: z.string().datetime()
});

export const AgentEscalationSourceSchema = z.enum(["manual", "runtime", "delegation", "revocation"]);
export const AgentEscalationSeveritySchema = z.enum(["low", "medium", "high", "critical"]);
export const AgentEscalationStatusSchema = z.enum(["open", "acknowledged", "resolved"]);

export const AgentEscalationEventSchema = z.object({
  id: z.string().min(1),
  workspaceId: z.string().min(1),
  agentId: z.string().min(1),
  source: AgentEscalationSourceSchema,
  severity: AgentEscalationSeveritySchema,
  status: AgentEscalationStatusSchema,
  summary: z.string().min(1),
  details: z.record(z.unknown()).optional(),
  createdByUserId: z.string().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  resolvedAt: z.string().datetime().nullable().optional(),
  resolutionNote: z.string().nullable().optional()
});

export const UsageTimeframeSchema = z.enum(["7d", "30d", "90d"]);
export const UsageBreakdownSchema = z.enum(["total", "allowed", "blocked", "pending"]);

export const UsageTimeseriesPointSchema = z.object({
  ts: z.string().datetime(),
  total: z.number().int().nonnegative(),
  allowed: z.number().int().nonnegative(),
  blocked: z.number().int().nonnegative(),
  pending: z.number().int().nonnegative(),
  environmentKey: z.string().min(1).optional()
});

export const UsageTimeseriesResponseSchema = z.object({
  workspaceId: z.string().min(1),
  timeframe: UsageTimeframeSchema,
  breakdown: UsageBreakdownSchema,
  points: z.array(UsageTimeseriesPointSchema)
});

export const TimelineEntityTypeSchema = z.enum(["route", "policy", "change-request"]);

export const TimelineEventSchema = z.object({
  id: z.string().min(1),
  entityType: TimelineEntityTypeSchema,
  entityId: z.string().min(1),
  action: z.string().min(1),
  summary: z.string().min(1),
  actor: z.string().min(1),
  occurredAt: z.string().datetime(),
  versionId: z.string().min(1).optional(),
  versionNumber: z.number().int().positive().optional(),
  environmentKey: z.string().min(1).optional(),
  metadata: z.record(z.unknown()).optional()
});

export const RouteTimelineResponseSchema = z.object({
  routeId: z.string().min(1),
  events: z.array(TimelineEventSchema)
});

export const PolicyTimelineResponseSchema = z.object({
  policyId: z.string().min(1),
  events: z.array(TimelineEventSchema)
});

export const ChangeRequestTimelineResponseSchema = z.object({
  changeRequestId: z.string().min(1),
  events: z.array(TimelineEventSchema)
});

export const LineageNodeTypeSchema = z.enum([
  "run",
  "policyDecision",
  "approval",
  "artifact",
  "export",
  "changeRequest",
  "route",
  "policy",
  "workflowVersion",
  "riskScore",
  "agent",
  "prompt",
  "model",
  "tool",
  "api",
  "dataset",
  "risk",
  "outcome"
]);

export const LineageNodeSchema = z.object({
  id: z.string().min(1),
  type: LineageNodeTypeSchema,
  label: z.string().optional(),
  occurredAt: z.string().datetime().optional(),
  attributes: z.record(z.unknown()).optional()
});

export const LineageEdgeSchema = z.object({
  id: z.string().min(1),
  from: z.string().min(1),
  to: z.string().min(1),
  relation: z.string().min(1),
  occurredAt: z.string().datetime().optional(),
  attributes: z.record(z.unknown()).optional()
});

export const LineageQueryRequestSchema = z.object({
  workspaceId: z.string().min(1),
  rootNodeId: z.string().min(1),
  maxDepth: z.number().int().min(1).max(8).default(3),
  includeRelations: z.array(z.string().min(1)).optional(),
  since: z.string().datetime().optional(),
  until: z.string().datetime().optional()
});

export const LineageQueryResponseSchema = z.object({
  workspaceId: z.string().min(1),
  rootNodeId: z.string().min(1),
  depth: z.number().int().min(1),
  nodes: z.array(LineageNodeSchema),
  edges: z.array(LineageEdgeSchema)
});

export const RiskTierSchema = z.enum(["low", "med", "high", "critical"]);
export const RiskSubjectTypeSchema = z.enum([
  "run",
  "changeRequest",
  "route",
  "policy",
  "workspace"
]);

export const RiskFactorSchema = z.object({
  key: z.string().min(1),
  weight: z.number(),
  value: z.number(),
  reason: z.string().optional()
});

export const RiskScoreCheckRequestSchema = z.object({
  workspaceId: z.string().min(1),
  subjectType: RiskSubjectTypeSchema,
  subjectId: z.string().min(1),
  context: z.record(z.unknown()).optional()
});

export const RiskScoreResultSchema = z.object({
  score: z.number().min(0).max(100),
  tier: RiskTierSchema,
  evaluatedAt: z.string().datetime(),
  factors: z.array(RiskFactorSchema).default([])
});

export const RiskScoreCheckResponseSchema = z.object({
  workspaceId: z.string().min(1),
  subjectType: RiskSubjectTypeSchema,
  subjectId: z.string().min(1),
  result: RiskScoreResultSchema
});

export const RiskTrendWindowSchema = z.enum(["24h", "7d", "30d", "90d"]);

export const RiskTrendPointSchema = z.object({
  ts: z.string().datetime(),
  avgScore: z.number().min(0).max(100),
  p95Score: z.number().min(0).max(100),
  highCount: z.number().int().nonnegative(),
  criticalCount: z.number().int().nonnegative()
});

export const RiskTrendResponseSchema = z.object({
  workspaceId: z.string().min(1),
  window: RiskTrendWindowSchema,
  points: z.array(RiskTrendPointSchema)
});

export const RiskBaselineWindowSchema = z.enum(["7d", "30d", "90d"]);

export const RiskBaselineSchema = z.object({
  id: z.string().min(1),
  workspaceId: z.string().min(1),
  subjectType: RiskSubjectTypeSchema,
  subjectId: z.string().min(1),
  window: RiskBaselineWindowSchema,
  sampleSize: z.number().int().nonnegative(),
  avgScore: z.number().min(0).max(100),
  p95Score: z.number().min(0).max(100),
  highRate: z.number().min(0).max(1),
  criticalRate: z.number().min(0).max(1),
  capturedAt: z.string().datetime()
});

export const RiskBaselineCaptureRequestSchema = z.object({
  workspaceId: z.string().min(1),
  window: RiskBaselineWindowSchema.default("30d"),
  subjectType: RiskSubjectTypeSchema.optional(),
  subjectId: z.string().min(1).optional()
});

export const RiskBaselineCaptureResponseSchema = z.object({
  workspaceId: z.string().min(1),
  window: RiskBaselineWindowSchema,
  capturedAt: z.string().datetime(),
  baselines: z.array(RiskBaselineSchema).default([])
});

export const RiskSignalTypeSchema = z.enum([
  "score_spike",
  "tier_escalation",
  "high_risk_density"
]);

export const RiskSignalSeveritySchema = z.enum(["low", "med", "high", "critical"]);

export const RiskAnomalySignalSchema = z.object({
  id: z.string().min(1),
  workspaceId: z.string().min(1),
  subjectType: RiskSubjectTypeSchema,
  subjectId: z.string().min(1),
  riskScoreId: z.string().min(1),
  baselineId: z.string().min(1),
  signalType: RiskSignalTypeSchema,
  severity: RiskSignalSeveritySchema,
  score: z.number().min(0).max(100),
  baselineScore: z.number().min(0).max(100),
  delta: z.number(),
  details: z.record(z.unknown()).default({}),
  detectedAt: z.string().datetime()
});

export const RiskSignalGenerateRequestSchema = z.object({
  workspaceId: z.string().min(1),
  lookbackHours: z.number().int().min(1).max(168).default(24),
  subjectType: RiskSubjectTypeSchema.optional(),
  subjectId: z.string().min(1).optional()
});

export const RiskSignalGenerateResponseSchema = z.object({
  workspaceId: z.string().min(1),
  lookbackHours: z.number().int().min(1).max(168),
  generatedCount: z.number().int().nonnegative(),
  signals: z.array(RiskAnomalySignalSchema).default([])
});

export const RiskSignalListResponseSchema = z.object({
  workspaceId: z.string().min(1),
  lookbackHours: z.number().int().min(1).max(168),
  signals: z.array(RiskAnomalySignalSchema).default([])
});

export const DriftDimensionSchema = z.enum(["prompt", "tool", "model", "data", "risk"]);
export const DriftSignalSeveritySchema = z.enum(["low", "med", "high", "critical"]);
export const DriftMetricKeySchema = z.enum(["risk_score_avg"]);

export const DriftMetricBaselineSchema = z.object({
  id: z.string().min(1),
  workspaceId: z.string().min(1),
  dimension: DriftDimensionSchema,
  entityKey: z.string().min(1),
  metricKey: DriftMetricKeySchema,
  lookbackHours: z.number().int().min(1).max(168),
  sampleSize: z.number().int().nonnegative(),
  avgScore: z.number().min(0).max(100),
  p95Score: z.number().min(0).max(100),
  highRate: z.number().min(0).max(1),
  criticalRate: z.number().min(0).max(1),
  capturedAt: z.string().datetime()
});

export const DriftSignalSchema = z.object({
  id: z.string().min(1),
  workspaceId: z.string().min(1),
  dimension: DriftDimensionSchema,
  entityKey: z.string().min(1),
  metricKey: DriftMetricKeySchema,
  baselineId: z.string().min(1),
  sampleSize: z.number().int().nonnegative(),
  baselineSampleSize: z.number().int().nonnegative(),
  score: z.number().min(0).max(100),
  baselineScore: z.number().min(0).max(100),
  delta: z.number(),
  deltaRatio: z.number(),
  severity: DriftSignalSeveritySchema,
  details: z.record(z.unknown()).default({}),
  detectedAt: z.string().datetime()
});

export const DriftSignalGenerateRequestSchema = z.object({
  workspaceId: z.string().min(1),
  lookbackHours: z.number().int().min(1).max(168).default(24),
  dimension: DriftDimensionSchema.optional(),
  entityKey: z.string().min(1).optional()
});

export const DriftSignalGenerateResponseSchema = z.object({
  workspaceId: z.string().min(1),
  lookbackHours: z.number().int().min(1).max(168),
  generatedAt: z.string().datetime(),
  generatedCount: z.number().int().nonnegative(),
  signals: z.array(DriftSignalSchema).default([])
});

export const DriftSignalListResponseSchema = z.object({
  workspaceId: z.string().min(1),
  lookbackHours: z.number().int().min(1).max(168),
  limit: z.number().int().min(1).max(500).optional(),
  nextCursor: z.string().datetime().optional(),
  signals: z.array(DriftSignalSchema).default([])
});

export const SandboxSimulationStatusSchema = z.enum([
  "queued",
  "running",
  "succeeded",
  "failed",
  "canceled"
]);

export const SandboxSimulationRequestSchema = z.object({
  workspaceId: z.string().min(1),
  scenarioKey: z.string().min(1),
  input: z.record(z.unknown()).default({}),
  initiatedBy: z.string().min(1).optional()
});

export const SandboxSimulationArtifactSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  path: z.string().min(1),
  sha256: z.string().optional()
});

export const SandboxPolicyPreviewSchema = z.object({
  blocked: z.boolean(),
  decisionCount: z.number().int().nonnegative(),
  denyCount: z.number().int().nonnegative(),
  decisions: z.array(PolicyDecisionSchema).default([])
});

export const SandboxRiskPreviewSchema = z.object({
  subjectType: RiskSubjectTypeSchema,
  subjectId: z.string().min(1),
  result: RiskScoreResultSchema
});

export const SandboxSimulationResultSchema = z.object({
  decision: z.enum(["allow", "deny", "partial"]).optional(),
  summary: z.string().optional(),
  metrics: z.record(z.number()).optional(),
  artifacts: z.array(SandboxSimulationArtifactSchema).default([]),
  policyPreview: SandboxPolicyPreviewSchema.optional(),
  riskPreview: SandboxRiskPreviewSchema.optional()
});

export const SandboxSimulationRunSchema = z.object({
  simulationId: z.string().min(1),
  workspaceId: z.string().min(1),
  scenarioKey: z.string().min(1),
  status: SandboxSimulationStatusSchema,
  createdAt: z.string().datetime(),
  startedAt: z.string().datetime().optional(),
  finishedAt: z.string().datetime().optional(),
  result: SandboxSimulationResultSchema.optional()
});

export const SandboxSimulationListResponseSchema = z.object({
  workspaceId: z.string().min(1),
  limit: z.number().int().min(1).max(200),
  nextCursor: z.string().datetime().optional(),
  simulations: z.array(SandboxSimulationRunSchema).default([])
});

export const SandboxSimulationReplayResponseSchema = z.object({
  workspaceId: z.string().min(1),
  sourceSimulationId: z.string().min(1),
  simulation: SandboxSimulationRunSchema
});

export const DataBoundaryPolicyModeSchema = z.enum(["monitor", "enforce"]);
export const DataBoundaryPolicyStatusSchema = z.enum(["draft", "active", "disabled"]);
export const DataBoundaryDecisionActionSchema = z.enum([
  "allow",
  "block",
  "redact",
  "mask",
  "escalate"
]);
export const DataBoundaryMaskingStrategySchema = z.enum(["full", "partial", "hash", "tokenize"]);
export const DataBoundaryRuleTargetSchema = z.enum([
  "input",
  "output",
  "tool_call",
  "payload",
  "metadata"
]);

export const DataBoundaryRuleSchema = z.object({
  id: z.string().min(1),
  ruleKey: z.string().min(1),
  description: z.string().optional(),
  classification: z.string().min(1),
  tags: z.array(z.string().min(1)).default([]),
  target: DataBoundaryRuleTargetSchema,
  matchPattern: z.string().min(1),
  action: DataBoundaryDecisionActionSchema,
  maskingStrategy: DataBoundaryMaskingStrategySchema.optional(),
  enabled: z.boolean().default(true),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional()
});

export const DataBoundaryPolicySchema = z.object({
  id: z.string().min(1),
  workspaceId: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  mode: DataBoundaryPolicyModeSchema,
  status: DataBoundaryPolicyStatusSchema,
  defaultAction: DataBoundaryDecisionActionSchema,
  regionAllowlist: z.array(z.string().min(1)).default([]),
  modelAllowlist: z.array(z.string().min(1)).default([]),
  rules: z.array(DataBoundaryRuleSchema).default([]),
  createdBy: z.string().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export const DataBoundaryRuleUpsertInputSchema = DataBoundaryRuleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const DataBoundaryPolicyCreateRequestSchema = z.object({
  workspaceId: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  mode: DataBoundaryPolicyModeSchema.default("enforce"),
  status: DataBoundaryPolicyStatusSchema.default("active"),
  defaultAction: DataBoundaryDecisionActionSchema.default("allow"),
  regionAllowlist: z.array(z.string().min(1)).default([]),
  modelAllowlist: z.array(z.string().min(1)).default([]),
  rules: z.array(DataBoundaryRuleUpsertInputSchema).min(1)
});

export const DataBoundaryPolicyUpdateRequestSchema = z
  .object({
    workspaceId: z.string().min(1),
    policyId: z.string().min(1),
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    mode: DataBoundaryPolicyModeSchema.optional(),
    status: DataBoundaryPolicyStatusSchema.optional(),
    defaultAction: DataBoundaryDecisionActionSchema.optional(),
    regionAllowlist: z.array(z.string().min(1)).optional(),
    modelAllowlist: z.array(z.string().min(1)).optional(),
    rules: z.array(DataBoundaryRuleUpsertInputSchema).min(1).optional()
  })
  .refine(
    (value) =>
      value.name !== undefined ||
      value.description !== undefined ||
      value.mode !== undefined ||
      value.status !== undefined ||
      value.defaultAction !== undefined ||
      value.regionAllowlist !== undefined ||
      value.modelAllowlist !== undefined ||
      value.rules !== undefined,
    { message: "at least one update field is required", path: ["policyId"] }
  );

export const DataBoundaryPolicyListResponseSchema = z.object({
  workspaceId: z.string().min(1),
  policies: z.array(DataBoundaryPolicySchema).default([])
});

export const DataBoundaryDecisionSchema = z.object({
  action: DataBoundaryDecisionActionSchema,
  reasonCode: z.string().min(1),
  reasonText: z.string().min(1),
  policyId: z.string().min(1).optional(),
  ruleId: z.string().min(1).optional(),
  classification: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).default([]),
  maskedFields: z.array(z.string().min(1)).default([])
});

export const DataBoundaryEvaluateRequestSchema = z.object({
  workspaceId: z.string().min(1),
  payload: z.record(z.unknown()),
  context: z.record(z.unknown()).optional()
});

export const DataBoundaryEvaluateResponseSchema = z.object({
  workspaceId: z.string().min(1),
  decision: DataBoundaryDecisionSchema,
  evaluatedAt: z.string().datetime()
});

export const FirewallInspectionModeSchema = z.enum(["monitor", "enforce"]);
export const FirewallInspectionTargetSchema = z.enum(["input", "output", "tool_call", "payload"]);
export const FirewallDecisionActionSchema = z.enum(["allow", "sanitize", "deny"]);
export const FirewallFindingSeveritySchema = z.enum(["low", "med", "high", "critical"]);
export const FirewallFindingCategorySchema = z.enum([
  "prompt_injection",
  "secret",
  "pii",
  "malicious_payload"
]);

export const FirewallInspectFindingSchema = z.object({
  ruleKey: z.string().min(1),
  category: FirewallFindingCategorySchema,
  severity: FirewallFindingSeveritySchema,
  target: FirewallInspectionTargetSchema,
  fieldPath: z.string().min(1),
  matchPreview: z.string().min(1)
});

export const FirewallInspectRequestSchema = z.object({
  workspaceId: z.string().min(1),
  payload: z.record(z.unknown()),
  target: FirewallInspectionTargetSchema.default("payload"),
  context: z.record(z.unknown()).optional(),
  mode: FirewallInspectionModeSchema.default("monitor")
});

export const FirewallInspectResultSchema = z.object({
  action: FirewallDecisionActionSchema,
  reasonCode: z.string().min(1),
  reasonText: z.string().min(1),
  findings: z.array(FirewallInspectFindingSchema).default([]),
  redactions: z.array(z.string().min(1)).default([]),
  blockedTools: z.array(z.string().min(1)).default([]),
  blockedDomains: z.array(z.string().min(1)).default([]),
  sanitizedPayload: z.record(z.unknown()).optional(),
  score: z.number().int().nonnegative()
});

export const FirewallInspectResponseSchema = z.object({
  workspaceId: z.string().min(1),
  inspectedAt: z.string().datetime(),
  result: FirewallInspectResultSchema,
  eventId: z.string().min(1).optional()
});

export const FirewallEventSchema = z.object({
  eventId: z.string().min(1),
  workspaceId: z.string().min(1),
  actorId: z.string().min(1),
  action: z.string().min(1),
  resourceId: z.string().min(1),
  resultAction: FirewallDecisionActionSchema,
  findingsCount: z.number().int().nonnegative(),
  highestSeverity: FirewallFindingSeveritySchema.optional(),
  reasonCode: z.string().min(1).optional(),
  occurredAt: z.string().datetime()
});

export const FirewallEventsResponseSchema = z.object({
  workspaceId: z.string().min(1),
  events: z.array(FirewallEventSchema).default([])
});

export const EdgeInterceptorModeSchema = z.enum(["sdk", "sidecar", "proxy"]);
export const EdgeInterceptorStatusSchema = z.enum(["active", "disabled"]);

export const EdgeInterceptorRegisterRequestSchema = z.object({
  workspaceId: z.string().min(1),
  mode: EdgeInterceptorModeSchema,
  deploymentId: z.string().min(1).optional(),
  sdkVersion: z.string().min(1).optional(),
  region: z.string().min(1).optional(),
  capabilities: z.array(z.string().min(1)).default([])
});

export const EdgeInterceptorRegistrationSchema = z.object({
  registrationId: z.string().min(1),
  workspaceId: z.string().min(1),
  mode: EdgeInterceptorModeSchema,
  deploymentId: z.string().min(1).optional(),
  sdkVersion: z.string().min(1).optional(),
  region: z.string().min(1).optional(),
  capabilities: z.array(z.string().min(1)).default([]),
  status: EdgeInterceptorStatusSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export type AuthSession = z.infer<typeof AuthSessionSchema>;
export type WorkspaceRoleBinding = z.infer<typeof WorkspaceRoleBindingSchema>;
export type WorkflowVersion = z.infer<typeof WorkflowVersionSchema>;
export type WorkflowBuilderNode = z.infer<typeof WorkflowBuilderNodeSchema>;
export type WorkflowBuilderEdge = z.infer<typeof WorkflowBuilderEdgeSchema>;
export type WorkflowBuilderViewport = z.infer<typeof WorkflowBuilderViewportSchema>;
export type WorkflowBuilderDocument = z.infer<typeof WorkflowBuilderDocumentSchema>;
export type PolicyDecision = z.infer<typeof PolicyDecisionSchema>;
export type PolicyExitGateEvidence = z.infer<typeof PolicyExitGateEvidenceSchema>;
export type RunState = z.infer<typeof RunStateSchema>;
export type HeadlessRunRequest = z.infer<typeof HeadlessRunRequestSchema>;
export type StructuredErrorEnvelope = z.infer<typeof StructuredErrorEnvelopeSchema>;
export type CanonicalPolicyRef = z.infer<typeof CanonicalPolicyRefSchema>;
export type CanonicalRouteRef = z.infer<typeof CanonicalRouteRefSchema>;
export type CanonicalRiskMeta = z.infer<typeof CanonicalRiskMetaSchema>;
export type CanonicalTimingMs = z.infer<typeof CanonicalTimingMsSchema>;
export type CanonicalResponseMeta = z.infer<typeof CanonicalResponseMetaSchema>;
export type CanonicalErrorCode = z.infer<typeof CanonicalErrorCodeSchema>;
export type CanonicalError = z.infer<typeof CanonicalErrorSchema>;
export type V4SessionStartRequest = z.infer<typeof V4SessionStartRequestSchema>;
export type V4SessionResource = z.infer<typeof V4SessionResourceSchema>;
export type V4ExecutionRequest = z.infer<typeof V4ExecutionRequestSchema>;
export type V4ExecutionResult = z.infer<typeof V4ExecutionResultSchema>;
export type V4EphemeralExecuteRequest = z.infer<typeof V4EphemeralExecuteRequestSchema>;
export type RunStateTransition = z.infer<typeof RunStateTransitionSchema>;
export type EntitlementDecision = z.infer<typeof EntitlementDecisionSchema>;
export type ArtifactManifestItem = z.infer<typeof ArtifactManifestItemSchema>;
export type ControlFailure = z.infer<typeof ControlFailureSchema>;
export type ControlJobState = z.infer<typeof ControlJobStateSchema>;
export type ControlJob = z.infer<typeof ControlJobSchema>;
export type ControlJobAttempt = z.infer<typeof ControlJobAttemptSchema>;
export type ControlJobEvent = z.infer<typeof ControlJobEventSchema>;
export type ControlBackoffState = z.infer<typeof ControlBackoffStateSchema>;
export type ControlSuppressionState = z.infer<typeof ControlSuppressionStateSchema>;
export type ControlJobScheduleRequest = z.infer<typeof ControlJobScheduleRequestSchema>;
export type ControlJobBlockRequest = z.infer<typeof ControlJobBlockRequestSchema>;
export type ControlJobRunNextResponse = z.infer<typeof ControlJobRunNextResponseSchema>;
export type GitHubDispatchControlPayload = z.infer<typeof GitHubDispatchControlPayloadSchema>;
export type SamlConnection = z.infer<typeof SamlConnectionSchema>;
export type ScimProvisioningToken = z.infer<typeof ScimProvisioningTokenSchema>;
export type ComplianceFramework = z.infer<typeof ComplianceFrameworkSchema>;
export type ComplianceFrameworkControlMapping = z.infer<
  typeof ComplianceFrameworkControlMappingSchema
>;
export type ComplianceExportFormat = z.infer<typeof ComplianceExportFormatSchema>;
export type CreateComplianceExportRequest = z.infer<typeof CreateComplianceExportRequestSchema>;
export type ComplianceExportManifestItem = z.infer<typeof ComplianceExportManifestItemSchema>;
export type ComplianceExportExitGate = z.infer<typeof ComplianceExportExitGateSchema>;
export type CapabilityStatus = z.infer<typeof CapabilityStatusSchema>;
export type CapabilityDescriptor = z.infer<typeof CapabilityDescriptorSchema>;
export type ApiSurfaceVersion = z.infer<typeof ApiSurfaceVersionSchema>;
export type CapabilityNegotiation = z.infer<typeof CapabilityNegotiationSchema>;
export type CapabilitiesResponse = z.infer<typeof CapabilitiesResponseSchema>;
export type AccessPermissionKey = z.infer<typeof AccessPermissionKeySchema>;
export type AccessRoleScope = z.infer<typeof AccessRoleScopeSchema>;
export type AccessRole = z.infer<typeof AccessRoleSchema>;
export type AccessSubjectType = z.infer<typeof AccessSubjectTypeSchema>;
export type AccessRoleBinding = z.infer<typeof AccessRoleBindingSchema>;
export type ServiceAccountStatus = z.infer<typeof ServiceAccountStatusSchema>;
export type ServiceAccount = z.infer<typeof ServiceAccountSchema>;
export type AgentIdentityStatus = z.infer<typeof AgentIdentityStatusSchema>;
export type AgentProfile = z.infer<typeof AgentProfileSchema>;
export type AgentKeyStatus = z.infer<typeof AgentKeyStatusSchema>;
export type AgentKeyMetadata = z.infer<typeof AgentKeyMetadataSchema>;
export type AgentTokenClaims = z.infer<typeof AgentTokenClaimsSchema>;
export type AgentExecutionTokenIssueRequest = z.infer<typeof AgentExecutionTokenIssueRequestSchema>;
export type AgentExecutionTokenIssueResponse = z.infer<typeof AgentExecutionTokenIssueResponseSchema>;
export type AgentCapabilitySource = z.infer<typeof AgentCapabilitySourceSchema>;
export type AgentCapabilityStatus = z.infer<typeof AgentCapabilityStatusSchema>;
export type AgentCapability = z.infer<typeof AgentCapabilitySchema>;
export type AgentDelegationTargetType = z.infer<typeof AgentDelegationTargetTypeSchema>;
export type AgentDelegationEffect = z.infer<typeof AgentDelegationEffectSchema>;
export type AgentDelegationStatus = z.infer<typeof AgentDelegationStatusSchema>;
export type AgentDelegationRule = z.infer<typeof AgentDelegationRuleSchema>;
export type AgentRevocationEscalationLevel = z.infer<typeof AgentRevocationEscalationLevelSchema>;
export type AgentRevocationEvent = z.infer<typeof AgentRevocationEventSchema>;
export type AgentEscalationSource = z.infer<typeof AgentEscalationSourceSchema>;
export type AgentEscalationSeverity = z.infer<typeof AgentEscalationSeveritySchema>;
export type AgentEscalationStatus = z.infer<typeof AgentEscalationStatusSchema>;
export type AgentEscalationEvent = z.infer<typeof AgentEscalationEventSchema>;
export type UsageTimeframe = z.infer<typeof UsageTimeframeSchema>;
export type UsageBreakdown = z.infer<typeof UsageBreakdownSchema>;
export type UsageTimeseriesPoint = z.infer<typeof UsageTimeseriesPointSchema>;
export type UsageTimeseriesResponse = z.infer<typeof UsageTimeseriesResponseSchema>;
export type TimelineEntityType = z.infer<typeof TimelineEntityTypeSchema>;
export type TimelineEvent = z.infer<typeof TimelineEventSchema>;
export type RouteTimelineResponse = z.infer<typeof RouteTimelineResponseSchema>;
export type PolicyTimelineResponse = z.infer<typeof PolicyTimelineResponseSchema>;
export type ChangeRequestTimelineResponse = z.infer<typeof ChangeRequestTimelineResponseSchema>;
export type LineageNodeType = z.infer<typeof LineageNodeTypeSchema>;
export type LineageNode = z.infer<typeof LineageNodeSchema>;
export type LineageEdge = z.infer<typeof LineageEdgeSchema>;
export type LineageQueryRequest = z.infer<typeof LineageQueryRequestSchema>;
export type LineageQueryResponse = z.infer<typeof LineageQueryResponseSchema>;
export type RiskTier = z.infer<typeof RiskTierSchema>;
export type RiskSubjectType = z.infer<typeof RiskSubjectTypeSchema>;
export type RiskFactor = z.infer<typeof RiskFactorSchema>;
export type RiskScoreCheckRequest = z.infer<typeof RiskScoreCheckRequestSchema>;
export type RiskScoreResult = z.infer<typeof RiskScoreResultSchema>;
export type RiskScoreCheckResponse = z.infer<typeof RiskScoreCheckResponseSchema>;
export type RiskTrendWindow = z.infer<typeof RiskTrendWindowSchema>;
export type RiskTrendPoint = z.infer<typeof RiskTrendPointSchema>;
export type RiskTrendResponse = z.infer<typeof RiskTrendResponseSchema>;
export type RiskBaselineWindow = z.infer<typeof RiskBaselineWindowSchema>;
export type RiskBaseline = z.infer<typeof RiskBaselineSchema>;
export type RiskBaselineCaptureRequest = z.infer<typeof RiskBaselineCaptureRequestSchema>;
export type RiskBaselineCaptureResponse = z.infer<typeof RiskBaselineCaptureResponseSchema>;
export type RiskSignalType = z.infer<typeof RiskSignalTypeSchema>;
export type RiskSignalSeverity = z.infer<typeof RiskSignalSeveritySchema>;
export type RiskAnomalySignal = z.infer<typeof RiskAnomalySignalSchema>;
export type RiskSignalGenerateRequest = z.infer<typeof RiskSignalGenerateRequestSchema>;
export type RiskSignalGenerateResponse = z.infer<typeof RiskSignalGenerateResponseSchema>;
export type RiskSignalListResponse = z.infer<typeof RiskSignalListResponseSchema>;
export type DriftDimension = z.infer<typeof DriftDimensionSchema>;
export type DriftSignalSeverity = z.infer<typeof DriftSignalSeveritySchema>;
export type DriftMetricKey = z.infer<typeof DriftMetricKeySchema>;
export type DriftMetricBaseline = z.infer<typeof DriftMetricBaselineSchema>;
export type DriftSignal = z.infer<typeof DriftSignalSchema>;
export type DriftSignalGenerateRequest = z.infer<typeof DriftSignalGenerateRequestSchema>;
export type DriftSignalGenerateResponse = z.infer<typeof DriftSignalGenerateResponseSchema>;
export type DriftSignalListResponse = z.infer<typeof DriftSignalListResponseSchema>;
export type SandboxSimulationStatus = z.infer<typeof SandboxSimulationStatusSchema>;
export type SandboxSimulationRequest = z.infer<typeof SandboxSimulationRequestSchema>;
export type SandboxSimulationArtifact = z.infer<typeof SandboxSimulationArtifactSchema>;
export type SandboxPolicyPreview = z.infer<typeof SandboxPolicyPreviewSchema>;
export type SandboxRiskPreview = z.infer<typeof SandboxRiskPreviewSchema>;
export type SandboxSimulationResult = z.infer<typeof SandboxSimulationResultSchema>;
export type SandboxSimulationRun = z.infer<typeof SandboxSimulationRunSchema>;
export type SandboxSimulationListResponse = z.infer<typeof SandboxSimulationListResponseSchema>;
export type SandboxSimulationReplayResponse = z.infer<typeof SandboxSimulationReplayResponseSchema>;
export type DataBoundaryPolicyMode = z.infer<typeof DataBoundaryPolicyModeSchema>;
export type DataBoundaryPolicyStatus = z.infer<typeof DataBoundaryPolicyStatusSchema>;
export type DataBoundaryDecisionAction = z.infer<typeof DataBoundaryDecisionActionSchema>;
export type DataBoundaryMaskingStrategy = z.infer<typeof DataBoundaryMaskingStrategySchema>;
export type DataBoundaryRuleTarget = z.infer<typeof DataBoundaryRuleTargetSchema>;
export type DataBoundaryRule = z.infer<typeof DataBoundaryRuleSchema>;
export type DataBoundaryPolicy = z.infer<typeof DataBoundaryPolicySchema>;
export type DataBoundaryRuleUpsertInput = z.infer<typeof DataBoundaryRuleUpsertInputSchema>;
export type DataBoundaryPolicyCreateRequest = z.infer<typeof DataBoundaryPolicyCreateRequestSchema>;
export type DataBoundaryPolicyUpdateRequest = z.infer<typeof DataBoundaryPolicyUpdateRequestSchema>;
export type DataBoundaryPolicyListResponse = z.infer<typeof DataBoundaryPolicyListResponseSchema>;
export type DataBoundaryDecision = z.infer<typeof DataBoundaryDecisionSchema>;
export type DataBoundaryEvaluateRequest = z.infer<typeof DataBoundaryEvaluateRequestSchema>;
export type DataBoundaryEvaluateResponse = z.infer<typeof DataBoundaryEvaluateResponseSchema>;
export type FirewallInspectionMode = z.infer<typeof FirewallInspectionModeSchema>;
export type FirewallInspectionTarget = z.infer<typeof FirewallInspectionTargetSchema>;
export type FirewallDecisionAction = z.infer<typeof FirewallDecisionActionSchema>;
export type FirewallFindingSeverity = z.infer<typeof FirewallFindingSeveritySchema>;
export type FirewallFindingCategory = z.infer<typeof FirewallFindingCategorySchema>;
export type FirewallInspectFinding = z.infer<typeof FirewallInspectFindingSchema>;
export type FirewallInspectRequest = z.infer<typeof FirewallInspectRequestSchema>;
export type FirewallInspectResult = z.infer<typeof FirewallInspectResultSchema>;
export type FirewallInspectResponse = z.infer<typeof FirewallInspectResponseSchema>;
export type FirewallEvent = z.infer<typeof FirewallEventSchema>;
export type FirewallEventsResponse = z.infer<typeof FirewallEventsResponseSchema>;
export type EdgeInterceptorMode = z.infer<typeof EdgeInterceptorModeSchema>;
export type EdgeInterceptorStatus = z.infer<typeof EdgeInterceptorStatusSchema>;
export type EdgeInterceptorRegisterRequest = z.infer<typeof EdgeInterceptorRegisterRequestSchema>;
export type EdgeInterceptorRegistration = z.infer<typeof EdgeInterceptorRegistrationSchema>;
