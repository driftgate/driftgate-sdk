// src/index.ts
import { z } from "zod";
var CONTRACT_VERSION = "1.9.0";
var AuthSessionSchema = z.object({
  sessionId: z.string(),
  userId: z.string(),
  tenantId: z.string(),
  workspaceIds: z.array(z.string()),
  roles: z.array(z.string()),
  idpProvider: z.enum(["google", "github", "email", "saml"]),
  mfaStatus: z.enum(["required", "passed", "not-required"])
});
var WorkspaceRoleBindingSchema = z.object({
  workspaceId: z.string(),
  userId: z.string(),
  role: z.enum(["owner", "admin", "editor", "viewer", "approver", "billing-admin"]),
  grantedAt: z.string().datetime(),
  grantedBy: z.string()
});
var WorkflowVersionSchema = z.object({
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
var WorkflowBuilderNodeSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1).optional(),
  position: z.object({
    x: z.number(),
    y: z.number()
  }),
  data: z.record(z.unknown())
});
var WorkflowBuilderEdgeSchema = z.object({
  id: z.string().min(1),
  source: z.string().min(1),
  target: z.string().min(1),
  type: z.string().min(1).optional(),
  label: z.string().optional(),
  data: z.record(z.unknown()).optional()
});
var WorkflowBuilderViewportSchema = z.object({
  x: z.number(),
  y: z.number(),
  zoom: z.number().positive()
});
var WorkflowBuilderDocumentSchema = z.object({
  workflowId: z.string(),
  version: z.number().int().nonnegative(),
  nodes: z.array(WorkflowBuilderNodeSchema),
  edges: z.array(WorkflowBuilderEdgeSchema),
  viewport: WorkflowBuilderViewportSchema,
  updatedAt: z.string().datetime()
});
var RunStateSchema = z.enum([
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
var RunTriggerSourceSchema = z.enum(["ui", "api", "sdk", "cli", "hosted", "webhook"]);
var GovernedRunRequestSchema = z.object({
  workspaceId: z.string().min(1),
  workflowVersionId: z.string().min(1),
  requiresApproval: z.boolean().default(false),
  requiredRole: z.string().min(1).optional(),
  slaPolicyId: z.string().min(1).optional(),
  idempotencyKey: z.string().min(1).max(200).optional(),
  correlationId: z.string().min(1).max(200).optional(),
  triggerSource: RunTriggerSourceSchema.default("api")
});
var HeadlessRunRequestSchema = GovernedRunRequestSchema.extend({
  input: z.record(z.unknown()).optional()
});
var StructuredErrorEnvelopeSchema = z.object({
  code: z.string(),
  message: z.string(),
  correlation_id: z.string().optional(),
  details: z.unknown().optional()
});
var CanonicalPolicyRefSchema = z.object({
  ref: z.string().min(1),
  version: z.string().min(1)
});
var CanonicalRouteRefSchema = z.object({
  provider: z.string().min(1).optional(),
  model: z.string().min(1).optional(),
  region: z.string().min(1).optional()
});
var CanonicalRiskMetaSchema = z.object({
  score: z.number().optional(),
  decision: z.enum(["allow", "deny", "review"]).optional()
});
var CanonicalTimingMsSchema = z.object({
  total: z.number().nonnegative(),
  policy: z.number().nonnegative().optional(),
  route: z.number().nonnegative().optional(),
  tool: z.number().nonnegative().optional()
});
var CanonicalResponseMetaSchema = z.object({
  requestId: z.string().min(1),
  sessionId: z.string().min(1).optional(),
  executionId: z.string().min(1).optional(),
  lineageId: z.string().min(1).optional(),
  policy: CanonicalPolicyRefSchema.optional(),
  route: CanonicalRouteRefSchema.optional(),
  risk: CanonicalRiskMetaSchema.optional(),
  timingMs: CanonicalTimingMsSchema
});
var CanonicalErrorCodeSchema = z.enum([
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
var CanonicalErrorSchema = z.object({
  code: CanonicalErrorCodeSchema,
  message: z.string().min(1),
  status: z.number().int().min(100).max(599),
  retryable: z.boolean(),
  details: z.record(z.unknown()).optional()
});
var CanonicalResponseEnvelopeSchema = (dataSchema) => z.object({
  ok: z.boolean(),
  data: dataSchema.nullable(),
  meta: CanonicalResponseMetaSchema,
  error: CanonicalErrorSchema.nullable()
});
var V4SessionStartRequestSchema = z.object({
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
var V4SessionResourceSchema = z.object({
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
var V4ExecutionRequestSchema = z.object({
  input: z.record(z.unknown()),
  policy: CanonicalPolicyRefSchema.optional(),
  route: CanonicalRouteRefSchema.optional(),
  risk: CanonicalRiskMetaSchema.optional(),
  workflowVersionId: z.string().min(1).optional()
});
var V4ExecutionResultSchema = z.object({
  run: z.record(z.unknown()),
  approval: z.record(z.unknown()).nullable().optional(),
  blocked: z.boolean(),
  policyDecisions: z.array(z.record(z.unknown())).default([]),
  entitlementDecision: z.record(z.unknown()),
  usageEntry: z.record(z.unknown()),
  boundaryDecision: z.record(z.unknown()).nullable().optional(),
  firewallDecision: z.record(z.unknown()).nullable().optional()
});
var V4EphemeralExecuteRequestSchema = V4SessionStartRequestSchema.omit({
  expiresAt: true
}).extend({
  input: z.record(z.unknown())
});
var RunStateTransitionSchema = z.object({
  runId: z.string(),
  from: RunStateSchema,
  to: RunStateSchema,
  occurredAt: z.string().datetime(),
  actor: z.string().optional(),
  reason: z.string().optional()
});
var PolicyDecisionSchema = z.object({
  mode: z.enum(["monitor", "enforce"]),
  decision: z.enum(["allow", "deny"]),
  policyId: z.string(),
  ruleId: z.string(),
  reasonCode: z.string(),
  reasonText: z.string(),
  correlationId: z.string(),
  trace: z.record(z.unknown())
});
var PolicyExitGateEvidenceSchema = z.object({
  runId: z.string(),
  runState: RunStateSchema,
  blocked: z.boolean(),
  traceComplete: z.boolean(),
  decisionCount: z.number().int().nonnegative(),
  blockingDecision: PolicyDecisionSchema.nullable(),
  denialEvent: z.object({
    eventId: z.string(),
    occurredAt: z.string().datetime(),
    policyId: z.string(),
    ruleId: z.string(),
    reasonCode: z.string(),
    reasonText: z.string(),
    correlationId: z.string()
  }).nullable()
});
var EntitlementDecisionSchema = z.object({
  tenantId: z.string(),
  plan: z.string(),
  entitled: z.boolean(),
  denialReason: z.string().optional()
});
var ArtifactManifestItemSchema = z.object({
  artifactId: z.string(),
  runId: z.string(),
  path: z.string(),
  type: z.string(),
  sha256: z.string(),
  sizeBytes: z.number().int().nonnegative()
});
var ControlFailureSchema = z.object({
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
var ControlJobStateSchema = z.enum([
  "queued",
  "running",
  "succeeded",
  "failed",
  "blocked"
]);
var ControlJobSchema = z.object({
  id: z.string(),
  kind: z.string(),
  dispatchKey: z.string(),
  payload: z.record(z.unknown()),
  state: ControlJobStateSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  lastFailure: ControlFailureSchema.nullable()
});
var ControlJobAttemptSchema = z.object({
  id: z.string(),
  jobId: z.string(),
  attempt: z.number().int().positive(),
  startedAt: z.string().datetime(),
  finishedAt: z.string().datetime(),
  outcome: z.enum(["succeeded", "failed", "blocked"])
});
var ControlJobEventSchema = z.object({
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
var ControlBackoffStateSchema = z.object({
  jobId: z.string(),
  dispatchKey: z.string(),
  rootCauseKey: z.string(),
  consecutiveFailures: z.number().int().nonnegative(),
  nextRetryAt: z.string().datetime().nullable(),
  blockedUntil: z.string().datetime().nullable(),
  updatedAt: z.string().datetime()
});
var ControlSuppressionStateSchema = z.object({
  dispatchKey: z.string(),
  blockedUntil: z.string().datetime(),
  reason: z.string(),
  updatedAt: z.string().datetime()
});
var ControlJobScheduleRequestSchema = z.object({
  kind: z.string().min(1),
  dedupeKey: z.string().min(1).optional(),
  payload: z.record(z.unknown()).default({})
});
var ControlJobBlockRequestSchema = z.object({
  failureCategory: ControlFailureSchema.shape.failureCategory,
  message: z.string().min(1),
  blockedUntil: z.string().datetime().optional()
});
var ControlJobRunNextResponseSchema = z.union([
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
var GitHubDispatchControlPayloadSchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  eventType: z.string().min(1).default("control_job_requested"),
  clientPayload: z.record(z.unknown()).default({})
});
var SamlConnectionSchema = z.object({
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
var ScimProvisioningTokenSchema = z.object({
  workspaceId: z.string(),
  tokenId: z.string(),
  tokenPreview: z.string(),
  status: z.enum(["active", "revoked"]),
  createdAt: z.string().datetime(),
  createdBy: z.string(),
  revokedAt: z.string().datetime().optional(),
  revokedBy: z.string().optional()
});
var ComplianceFrameworkSchema = z.enum(["soc2", "iso27001", "gdpr", "ai_act"]);
var ComplianceFrameworkControlMappingSchema = z.object({
  framework: ComplianceFrameworkSchema,
  controlIds: z.array(z.string().min(1)).min(1),
  rationale: z.string().min(1).optional()
});
var ComplianceExportFormatSchema = z.enum(["json", "csv", "api_feed"]);
var CreateComplianceExportRequestSchema = z.object({
  workspaceId: z.string().min(1),
  bundleIds: z.array(z.string().min(1)).optional(),
  frameworks: z.array(ComplianceFrameworkSchema).min(1).optional(),
  format: ComplianceExportFormatSchema.optional()
});
var ComplianceExportManifestItemSchema = z.object({
  exportId: z.string(),
  bundleId: z.string(),
  runId: z.string(),
  artifactId: z.string(),
  path: z.string(),
  type: z.string(),
  sha256: z.string(),
  sizeBytes: z.number().int().nonnegative(),
  traceability: z.object({
    auditEventId: z.string().min(1).optional(),
    usageEntryId: z.string().min(1).optional()
  }).optional(),
  frameworkMappings: z.array(ComplianceFrameworkControlMappingSchema).optional()
});
var ComplianceExportExitGateSchema = z.object({
  workspaceId: z.string(),
  passed: z.boolean(),
  reasonCodes: z.array(z.string()),
  evaluatedAt: z.string().datetime(),
  latestExportId: z.string().optional(),
  manifestHash: z.string().optional()
});
var CapabilityStatusSchema = z.enum(["enabled", "disabled", "preview"]);
var CapabilityDescriptorSchema = z.object({
  key: z.string().min(1),
  status: CapabilityStatusSchema,
  version: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  config: z.record(z.unknown()).optional()
});
var ApiSurfaceVersionSchema = z.object({
  name: z.string().min(1),
  version: z.string().min(1),
  deprecated: z.boolean().optional()
});
var CapabilityNegotiationSchema = z.object({
  requestedSurface: z.string().min(1).optional(),
  requestedVersion: z.string().min(1).optional(),
  selectedSurface: z.string().min(1),
  selectedVersion: z.string().min(1),
  compatible: z.boolean()
});
var CapabilitiesResponseSchema = z.object({
  generatedAt: z.string().datetime(),
  workspaceId: z.string().min(1).optional(),
  apiSurfaces: z.array(ApiSurfaceVersionSchema).default([]),
  capabilities: z.array(CapabilityDescriptorSchema).default([]),
  negotiation: CapabilityNegotiationSchema.optional()
});
var AccessPermissionKeySchema = z.enum([
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
var AccessRoleScopeSchema = z.enum(["org", "workspace", "environment"]);
var AccessRoleSchema = z.object({
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
var AccessSubjectTypeSchema = z.enum(["user", "group", "serviceAccount"]);
var AccessRoleBindingSchema = z.object({
  id: z.string().min(1),
  scopeType: AccessRoleScopeSchema,
  scopeId: z.string().min(1),
  subjectType: AccessSubjectTypeSchema,
  subjectId: z.string().min(1),
  roleKey: z.string().min(1),
  createdAt: z.string().datetime().optional(),
  createdBy: z.string().optional()
});
var ServiceAccountStatusSchema = z.enum(["active", "disabled"]);
var ServiceAccountSchema = z.object({
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
var AgentIdentityStatusSchema = z.enum(["active", "disabled"]);
var AgentProfileSchema = z.object({
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
var AgentKeyStatusSchema = z.enum(["active", "revoked"]);
var AgentKeyMetadataSchema = z.object({
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
var AgentTokenClaimsSchema = z.object({
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
var AgentExecutionTokenIssueRequestSchema = z.object({
  scopes: z.array(z.string().min(1)).min(1),
  ttlSeconds: z.number().int().min(1).max(3600).default(900)
});
var AgentExecutionTokenIssueResponseSchema = z.object({
  token: z.string().min(1),
  expiresAt: z.string().datetime(),
  claims: AgentTokenClaimsSchema
});
var AgentCapabilitySourceSchema = z.enum(["manual", "role", "token"]);
var AgentCapabilityStatusSchema = z.enum(["active", "disabled"]);
var AgentCapabilitySchema = z.object({
  id: z.string().min(1),
  workspaceId: z.string().min(1),
  agentId: z.string().min(1),
  capability: z.string().min(1),
  source: AgentCapabilitySourceSchema,
  status: AgentCapabilityStatusSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});
var AgentDelegationTargetTypeSchema = z.enum(["agent", "tool", "runtime"]);
var AgentDelegationEffectSchema = z.enum(["allow", "deny"]);
var AgentDelegationStatusSchema = z.enum(["active", "disabled"]);
var AgentDelegationRuleSchema = z.object({
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
var AgentRevocationEscalationLevelSchema = z.enum([
  "none",
  "low",
  "medium",
  "high",
  "critical"
]);
var AgentRevocationEventSchema = z.object({
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
var AgentEscalationSourceSchema = z.enum(["manual", "runtime", "delegation", "revocation"]);
var AgentEscalationSeveritySchema = z.enum(["low", "medium", "high", "critical"]);
var AgentEscalationStatusSchema = z.enum(["open", "acknowledged", "resolved"]);
var AgentEscalationEventSchema = z.object({
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
var UsageTimeframeSchema = z.enum(["7d", "30d", "90d"]);
var UsageBreakdownSchema = z.enum(["total", "allowed", "blocked", "pending"]);
var UsageTimeseriesPointSchema = z.object({
  ts: z.string().datetime(),
  total: z.number().int().nonnegative(),
  allowed: z.number().int().nonnegative(),
  blocked: z.number().int().nonnegative(),
  pending: z.number().int().nonnegative(),
  environmentKey: z.string().min(1).optional()
});
var UsageTimeseriesResponseSchema = z.object({
  workspaceId: z.string().min(1),
  timeframe: UsageTimeframeSchema,
  breakdown: UsageBreakdownSchema,
  points: z.array(UsageTimeseriesPointSchema)
});
var TimelineEntityTypeSchema = z.enum(["route", "policy", "change-request"]);
var TimelineEventSchema = z.object({
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
var RouteTimelineResponseSchema = z.object({
  routeId: z.string().min(1),
  events: z.array(TimelineEventSchema)
});
var PolicyTimelineResponseSchema = z.object({
  policyId: z.string().min(1),
  events: z.array(TimelineEventSchema)
});
var ChangeRequestTimelineResponseSchema = z.object({
  changeRequestId: z.string().min(1),
  events: z.array(TimelineEventSchema)
});
var LineageNodeTypeSchema = z.enum([
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
var LineageNodeSchema = z.object({
  id: z.string().min(1),
  type: LineageNodeTypeSchema,
  label: z.string().optional(),
  occurredAt: z.string().datetime().optional(),
  attributes: z.record(z.unknown()).optional()
});
var LineageEdgeSchema = z.object({
  id: z.string().min(1),
  from: z.string().min(1),
  to: z.string().min(1),
  relation: z.string().min(1),
  occurredAt: z.string().datetime().optional(),
  attributes: z.record(z.unknown()).optional()
});
var LineageQueryRequestSchema = z.object({
  workspaceId: z.string().min(1),
  rootNodeId: z.string().min(1),
  maxDepth: z.number().int().min(1).max(8).default(3),
  includeRelations: z.array(z.string().min(1)).optional(),
  since: z.string().datetime().optional(),
  until: z.string().datetime().optional()
});
var LineageQueryResponseSchema = z.object({
  workspaceId: z.string().min(1),
  rootNodeId: z.string().min(1),
  depth: z.number().int().min(1),
  nodes: z.array(LineageNodeSchema),
  edges: z.array(LineageEdgeSchema)
});
var RiskTierSchema = z.enum(["low", "med", "high", "critical"]);
var RiskSubjectTypeSchema = z.enum([
  "run",
  "changeRequest",
  "route",
  "policy",
  "workspace"
]);
var RiskFactorSchema = z.object({
  key: z.string().min(1),
  weight: z.number(),
  value: z.number(),
  reason: z.string().optional()
});
var RiskScoreCheckRequestSchema = z.object({
  workspaceId: z.string().min(1),
  subjectType: RiskSubjectTypeSchema,
  subjectId: z.string().min(1),
  context: z.record(z.unknown()).optional()
});
var RiskScoreResultSchema = z.object({
  score: z.number().min(0).max(100),
  tier: RiskTierSchema,
  evaluatedAt: z.string().datetime(),
  factors: z.array(RiskFactorSchema).default([])
});
var RiskScoreCheckResponseSchema = z.object({
  workspaceId: z.string().min(1),
  subjectType: RiskSubjectTypeSchema,
  subjectId: z.string().min(1),
  result: RiskScoreResultSchema
});
var RiskTrendWindowSchema = z.enum(["24h", "7d", "30d", "90d"]);
var RiskTrendPointSchema = z.object({
  ts: z.string().datetime(),
  avgScore: z.number().min(0).max(100),
  p95Score: z.number().min(0).max(100),
  highCount: z.number().int().nonnegative(),
  criticalCount: z.number().int().nonnegative()
});
var RiskTrendResponseSchema = z.object({
  workspaceId: z.string().min(1),
  window: RiskTrendWindowSchema,
  points: z.array(RiskTrendPointSchema)
});
var RiskBaselineWindowSchema = z.enum(["7d", "30d", "90d"]);
var RiskBaselineSchema = z.object({
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
var RiskBaselineCaptureRequestSchema = z.object({
  workspaceId: z.string().min(1),
  window: RiskBaselineWindowSchema.default("30d"),
  subjectType: RiskSubjectTypeSchema.optional(),
  subjectId: z.string().min(1).optional()
});
var RiskBaselineCaptureResponseSchema = z.object({
  workspaceId: z.string().min(1),
  window: RiskBaselineWindowSchema,
  capturedAt: z.string().datetime(),
  baselines: z.array(RiskBaselineSchema).default([])
});
var RiskSignalTypeSchema = z.enum([
  "score_spike",
  "tier_escalation",
  "high_risk_density"
]);
var RiskSignalSeveritySchema = z.enum(["low", "med", "high", "critical"]);
var RiskAnomalySignalSchema = z.object({
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
var RiskSignalGenerateRequestSchema = z.object({
  workspaceId: z.string().min(1),
  lookbackHours: z.number().int().min(1).max(168).default(24),
  subjectType: RiskSubjectTypeSchema.optional(),
  subjectId: z.string().min(1).optional()
});
var RiskSignalGenerateResponseSchema = z.object({
  workspaceId: z.string().min(1),
  lookbackHours: z.number().int().min(1).max(168),
  generatedCount: z.number().int().nonnegative(),
  signals: z.array(RiskAnomalySignalSchema).default([])
});
var RiskSignalListResponseSchema = z.object({
  workspaceId: z.string().min(1),
  lookbackHours: z.number().int().min(1).max(168),
  signals: z.array(RiskAnomalySignalSchema).default([])
});
var DriftDimensionSchema = z.enum(["prompt", "tool", "model", "data", "risk"]);
var DriftSignalSeveritySchema = z.enum(["low", "med", "high", "critical"]);
var DriftMetricKeySchema = z.enum(["risk_score_avg"]);
var DriftMetricBaselineSchema = z.object({
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
var DriftSignalSchema = z.object({
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
var DriftSignalGenerateRequestSchema = z.object({
  workspaceId: z.string().min(1),
  lookbackHours: z.number().int().min(1).max(168).default(24),
  dimension: DriftDimensionSchema.optional(),
  entityKey: z.string().min(1).optional()
});
var DriftSignalGenerateResponseSchema = z.object({
  workspaceId: z.string().min(1),
  lookbackHours: z.number().int().min(1).max(168),
  generatedAt: z.string().datetime(),
  generatedCount: z.number().int().nonnegative(),
  signals: z.array(DriftSignalSchema).default([])
});
var DriftSignalListResponseSchema = z.object({
  workspaceId: z.string().min(1),
  lookbackHours: z.number().int().min(1).max(168),
  limit: z.number().int().min(1).max(500).optional(),
  nextCursor: z.string().datetime().optional(),
  signals: z.array(DriftSignalSchema).default([])
});
var SandboxSimulationStatusSchema = z.enum([
  "queued",
  "running",
  "succeeded",
  "failed",
  "canceled"
]);
var SandboxSimulationRequestSchema = z.object({
  workspaceId: z.string().min(1),
  scenarioKey: z.string().min(1),
  input: z.record(z.unknown()).default({}),
  initiatedBy: z.string().min(1).optional()
});
var SandboxSimulationArtifactSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  path: z.string().min(1),
  sha256: z.string().optional()
});
var SandboxPolicyPreviewSchema = z.object({
  blocked: z.boolean(),
  decisionCount: z.number().int().nonnegative(),
  denyCount: z.number().int().nonnegative(),
  decisions: z.array(PolicyDecisionSchema).default([])
});
var SandboxRiskPreviewSchema = z.object({
  subjectType: RiskSubjectTypeSchema,
  subjectId: z.string().min(1),
  result: RiskScoreResultSchema
});
var SandboxSimulationResultSchema = z.object({
  decision: z.enum(["allow", "deny", "partial"]).optional(),
  summary: z.string().optional(),
  metrics: z.record(z.number()).optional(),
  artifacts: z.array(SandboxSimulationArtifactSchema).default([]),
  policyPreview: SandboxPolicyPreviewSchema.optional(),
  riskPreview: SandboxRiskPreviewSchema.optional()
});
var SandboxSimulationRunSchema = z.object({
  simulationId: z.string().min(1),
  workspaceId: z.string().min(1),
  scenarioKey: z.string().min(1),
  status: SandboxSimulationStatusSchema,
  createdAt: z.string().datetime(),
  startedAt: z.string().datetime().optional(),
  finishedAt: z.string().datetime().optional(),
  result: SandboxSimulationResultSchema.optional()
});
var SandboxSimulationListResponseSchema = z.object({
  workspaceId: z.string().min(1),
  limit: z.number().int().min(1).max(200),
  nextCursor: z.string().datetime().optional(),
  simulations: z.array(SandboxSimulationRunSchema).default([])
});
var SandboxSimulationReplayResponseSchema = z.object({
  workspaceId: z.string().min(1),
  sourceSimulationId: z.string().min(1),
  simulation: SandboxSimulationRunSchema
});
var DataBoundaryPolicyModeSchema = z.enum(["monitor", "enforce"]);
var DataBoundaryPolicyStatusSchema = z.enum(["draft", "active", "disabled"]);
var DataBoundaryDecisionActionSchema = z.enum([
  "allow",
  "block",
  "redact",
  "mask",
  "escalate"
]);
var DataBoundaryMaskingStrategySchema = z.enum(["full", "partial", "hash", "tokenize"]);
var DataBoundaryRuleTargetSchema = z.enum([
  "input",
  "output",
  "tool_call",
  "payload",
  "metadata"
]);
var DataBoundaryRuleSchema = z.object({
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
var DataBoundaryPolicySchema = z.object({
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
var DataBoundaryRuleUpsertInputSchema = DataBoundaryRuleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var DataBoundaryPolicyCreateRequestSchema = z.object({
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
var DataBoundaryPolicyUpdateRequestSchema = z.object({
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
}).refine(
  (value) => value.name !== void 0 || value.description !== void 0 || value.mode !== void 0 || value.status !== void 0 || value.defaultAction !== void 0 || value.regionAllowlist !== void 0 || value.modelAllowlist !== void 0 || value.rules !== void 0,
  { message: "at least one update field is required", path: ["policyId"] }
);
var DataBoundaryPolicyListResponseSchema = z.object({
  workspaceId: z.string().min(1),
  policies: z.array(DataBoundaryPolicySchema).default([])
});
var DataBoundaryDecisionSchema = z.object({
  action: DataBoundaryDecisionActionSchema,
  reasonCode: z.string().min(1),
  reasonText: z.string().min(1),
  policyId: z.string().min(1).optional(),
  ruleId: z.string().min(1).optional(),
  classification: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).default([]),
  maskedFields: z.array(z.string().min(1)).default([])
});
var DataBoundaryEvaluateRequestSchema = z.object({
  workspaceId: z.string().min(1),
  payload: z.record(z.unknown()),
  context: z.record(z.unknown()).optional()
});
var DataBoundaryEvaluateResponseSchema = z.object({
  workspaceId: z.string().min(1),
  decision: DataBoundaryDecisionSchema,
  evaluatedAt: z.string().datetime()
});
var FirewallInspectionModeSchema = z.enum(["monitor", "enforce"]);
var FirewallInspectionTargetSchema = z.enum(["input", "output", "tool_call", "payload"]);
var FirewallDecisionActionSchema = z.enum(["allow", "sanitize", "deny"]);
var FirewallFindingSeveritySchema = z.enum(["low", "med", "high", "critical"]);
var FirewallFindingCategorySchema = z.enum([
  "prompt_injection",
  "secret",
  "pii",
  "malicious_payload"
]);
var FirewallInspectFindingSchema = z.object({
  ruleKey: z.string().min(1),
  category: FirewallFindingCategorySchema,
  severity: FirewallFindingSeveritySchema,
  target: FirewallInspectionTargetSchema,
  fieldPath: z.string().min(1),
  matchPreview: z.string().min(1)
});
var FirewallInspectRequestSchema = z.object({
  workspaceId: z.string().min(1),
  payload: z.record(z.unknown()),
  target: FirewallInspectionTargetSchema.default("payload"),
  context: z.record(z.unknown()).optional(),
  mode: FirewallInspectionModeSchema.default("monitor")
});
var FirewallInspectResultSchema = z.object({
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
var FirewallInspectResponseSchema = z.object({
  workspaceId: z.string().min(1),
  inspectedAt: z.string().datetime(),
  result: FirewallInspectResultSchema,
  eventId: z.string().min(1).optional()
});
var FirewallEventSchema = z.object({
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
var FirewallEventsResponseSchema = z.object({
  workspaceId: z.string().min(1),
  events: z.array(FirewallEventSchema).default([])
});
var EdgeInterceptorModeSchema = z.enum(["sdk", "sidecar", "proxy"]);
var EdgeInterceptorStatusSchema = z.enum(["active", "disabled"]);
var EdgeInterceptorRegisterRequestSchema = z.object({
  workspaceId: z.string().min(1),
  mode: EdgeInterceptorModeSchema,
  deploymentId: z.string().min(1).optional(),
  sdkVersion: z.string().min(1).optional(),
  region: z.string().min(1).optional(),
  capabilities: z.array(z.string().min(1)).default([])
});
var EdgeInterceptorRegistrationSchema = z.object({
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
export {
  AccessPermissionKeySchema,
  AccessRoleBindingSchema,
  AccessRoleSchema,
  AccessRoleScopeSchema,
  AccessSubjectTypeSchema,
  AgentCapabilitySchema,
  AgentCapabilitySourceSchema,
  AgentCapabilityStatusSchema,
  AgentDelegationEffectSchema,
  AgentDelegationRuleSchema,
  AgentDelegationStatusSchema,
  AgentDelegationTargetTypeSchema,
  AgentEscalationEventSchema,
  AgentEscalationSeveritySchema,
  AgentEscalationSourceSchema,
  AgentEscalationStatusSchema,
  AgentExecutionTokenIssueRequestSchema,
  AgentExecutionTokenIssueResponseSchema,
  AgentIdentityStatusSchema,
  AgentKeyMetadataSchema,
  AgentKeyStatusSchema,
  AgentProfileSchema,
  AgentRevocationEscalationLevelSchema,
  AgentRevocationEventSchema,
  AgentTokenClaimsSchema,
  ApiSurfaceVersionSchema,
  ArtifactManifestItemSchema,
  AuthSessionSchema,
  CONTRACT_VERSION,
  CanonicalErrorCodeSchema,
  CanonicalErrorSchema,
  CanonicalPolicyRefSchema,
  CanonicalResponseEnvelopeSchema,
  CanonicalResponseMetaSchema,
  CanonicalRiskMetaSchema,
  CanonicalRouteRefSchema,
  CanonicalTimingMsSchema,
  CapabilitiesResponseSchema,
  CapabilityDescriptorSchema,
  CapabilityNegotiationSchema,
  CapabilityStatusSchema,
  ChangeRequestTimelineResponseSchema,
  ComplianceExportExitGateSchema,
  ComplianceExportFormatSchema,
  ComplianceExportManifestItemSchema,
  ComplianceFrameworkControlMappingSchema,
  ComplianceFrameworkSchema,
  ControlBackoffStateSchema,
  ControlFailureSchema,
  ControlJobAttemptSchema,
  ControlJobBlockRequestSchema,
  ControlJobEventSchema,
  ControlJobRunNextResponseSchema,
  ControlJobScheduleRequestSchema,
  ControlJobSchema,
  ControlJobStateSchema,
  ControlSuppressionStateSchema,
  CreateComplianceExportRequestSchema,
  DataBoundaryDecisionActionSchema,
  DataBoundaryDecisionSchema,
  DataBoundaryEvaluateRequestSchema,
  DataBoundaryEvaluateResponseSchema,
  DataBoundaryMaskingStrategySchema,
  DataBoundaryPolicyCreateRequestSchema,
  DataBoundaryPolicyListResponseSchema,
  DataBoundaryPolicyModeSchema,
  DataBoundaryPolicySchema,
  DataBoundaryPolicyStatusSchema,
  DataBoundaryPolicyUpdateRequestSchema,
  DataBoundaryRuleSchema,
  DataBoundaryRuleTargetSchema,
  DataBoundaryRuleUpsertInputSchema,
  DriftDimensionSchema,
  DriftMetricBaselineSchema,
  DriftMetricKeySchema,
  DriftSignalGenerateRequestSchema,
  DriftSignalGenerateResponseSchema,
  DriftSignalListResponseSchema,
  DriftSignalSchema,
  DriftSignalSeveritySchema,
  EdgeInterceptorModeSchema,
  EdgeInterceptorRegisterRequestSchema,
  EdgeInterceptorRegistrationSchema,
  EdgeInterceptorStatusSchema,
  EntitlementDecisionSchema,
  FirewallDecisionActionSchema,
  FirewallEventSchema,
  FirewallEventsResponseSchema,
  FirewallFindingCategorySchema,
  FirewallFindingSeveritySchema,
  FirewallInspectFindingSchema,
  FirewallInspectRequestSchema,
  FirewallInspectResponseSchema,
  FirewallInspectResultSchema,
  FirewallInspectionModeSchema,
  FirewallInspectionTargetSchema,
  GitHubDispatchControlPayloadSchema,
  GovernedRunRequestSchema,
  HeadlessRunRequestSchema,
  LineageEdgeSchema,
  LineageNodeSchema,
  LineageNodeTypeSchema,
  LineageQueryRequestSchema,
  LineageQueryResponseSchema,
  PolicyDecisionSchema,
  PolicyExitGateEvidenceSchema,
  PolicyTimelineResponseSchema,
  RiskAnomalySignalSchema,
  RiskBaselineCaptureRequestSchema,
  RiskBaselineCaptureResponseSchema,
  RiskBaselineSchema,
  RiskBaselineWindowSchema,
  RiskFactorSchema,
  RiskScoreCheckRequestSchema,
  RiskScoreCheckResponseSchema,
  RiskScoreResultSchema,
  RiskSignalGenerateRequestSchema,
  RiskSignalGenerateResponseSchema,
  RiskSignalListResponseSchema,
  RiskSignalSeveritySchema,
  RiskSignalTypeSchema,
  RiskSubjectTypeSchema,
  RiskTierSchema,
  RiskTrendPointSchema,
  RiskTrendResponseSchema,
  RiskTrendWindowSchema,
  RouteTimelineResponseSchema,
  RunStateSchema,
  RunStateTransitionSchema,
  RunTriggerSourceSchema,
  SamlConnectionSchema,
  SandboxPolicyPreviewSchema,
  SandboxRiskPreviewSchema,
  SandboxSimulationArtifactSchema,
  SandboxSimulationListResponseSchema,
  SandboxSimulationReplayResponseSchema,
  SandboxSimulationRequestSchema,
  SandboxSimulationResultSchema,
  SandboxSimulationRunSchema,
  SandboxSimulationStatusSchema,
  ScimProvisioningTokenSchema,
  ServiceAccountSchema,
  ServiceAccountStatusSchema,
  StructuredErrorEnvelopeSchema,
  TimelineEntityTypeSchema,
  TimelineEventSchema,
  UsageBreakdownSchema,
  UsageTimeframeSchema,
  UsageTimeseriesPointSchema,
  UsageTimeseriesResponseSchema,
  V4EphemeralExecuteRequestSchema,
  V4ExecutionRequestSchema,
  V4ExecutionResultSchema,
  V4SessionResourceSchema,
  V4SessionStartRequestSchema,
  WorkflowBuilderDocumentSchema,
  WorkflowBuilderEdgeSchema,
  WorkflowBuilderNodeSchema,
  WorkflowBuilderViewportSchema,
  WorkflowVersionSchema,
  WorkspaceRoleBindingSchema
};
//# sourceMappingURL=index.js.map