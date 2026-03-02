import { z } from 'zod';
import { V4SessionStartRequestSchema, V4SessionResourceSchema, V4ExecutionRequestSchema, EdgeInterceptorRegistration, EdgeInterceptorRegisterRequest, EdgeInterceptorStatus, FirewallInspectRequest, FirewallInspectResponse, FirewallEvent, WorkflowVersion, PolicyDecision } from '@driftgate/contracts';

declare const CanonicalMetaSchema: z.ZodObject<{
    requestId: z.ZodString;
    sessionId: z.ZodOptional<z.ZodString>;
    executionId: z.ZodOptional<z.ZodString>;
    lineageId: z.ZodOptional<z.ZodString>;
    policy: z.ZodOptional<z.ZodObject<{
        ref: z.ZodString;
        version: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        version: string;
        ref: string;
    }, {
        version: string;
        ref: string;
    }>>;
    route: z.ZodOptional<z.ZodObject<{
        provider: z.ZodOptional<z.ZodString>;
        model: z.ZodOptional<z.ZodString>;
        region: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        provider?: string | undefined;
        model?: string | undefined;
        region?: string | undefined;
    }, {
        provider?: string | undefined;
        model?: string | undefined;
        region?: string | undefined;
    }>>;
    risk: z.ZodOptional<z.ZodObject<{
        score: z.ZodOptional<z.ZodNumber>;
        decision: z.ZodOptional<z.ZodEnum<["allow", "deny", "review"]>>;
    }, "strip", z.ZodTypeAny, {
        score?: number | undefined;
        decision?: "allow" | "deny" | "review" | undefined;
    }, {
        score?: number | undefined;
        decision?: "allow" | "deny" | "review" | undefined;
    }>>;
    timingMs: z.ZodObject<{
        total: z.ZodNumber;
        policy: z.ZodOptional<z.ZodNumber>;
        route: z.ZodOptional<z.ZodNumber>;
        tool: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        total: number;
        policy?: number | undefined;
        route?: number | undefined;
        tool?: number | undefined;
    }, {
        total: number;
        policy?: number | undefined;
        route?: number | undefined;
        tool?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    requestId: string;
    timingMs: {
        total: number;
        policy?: number | undefined;
        route?: number | undefined;
        tool?: number | undefined;
    };
    policy?: {
        version: string;
        ref: string;
    } | undefined;
    route?: {
        provider?: string | undefined;
        model?: string | undefined;
        region?: string | undefined;
    } | undefined;
    sessionId?: string | undefined;
    executionId?: string | undefined;
    lineageId?: string | undefined;
    risk?: {
        score?: number | undefined;
        decision?: "allow" | "deny" | "review" | undefined;
    } | undefined;
}, {
    requestId: string;
    timingMs: {
        total: number;
        policy?: number | undefined;
        route?: number | undefined;
        tool?: number | undefined;
    };
    policy?: {
        version: string;
        ref: string;
    } | undefined;
    route?: {
        provider?: string | undefined;
        model?: string | undefined;
        region?: string | undefined;
    } | undefined;
    sessionId?: string | undefined;
    executionId?: string | undefined;
    lineageId?: string | undefined;
    risk?: {
        score?: number | undefined;
        decision?: "allow" | "deny" | "review" | undefined;
    } | undefined;
}>;
declare const CanonicalErrorSchema: z.ZodObject<{
    code: z.ZodString;
    message: z.ZodString;
    status: z.ZodNumber;
    retryable: z.ZodBoolean;
    details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    code: string;
    message: string;
    status: number;
    retryable: boolean;
    details?: Record<string, unknown> | undefined;
}, {
    code: string;
    message: string;
    status: number;
    retryable: boolean;
    details?: Record<string, unknown> | undefined;
}>;
declare const REQUIRED_V4_ERROR_CODES: readonly ["AUTH_INVALID", "POLICY_DENIED", "RISK_EXCEEDED", "ROUTE_UNAVAILABLE", "TOOL_BLOCKED", "RATE_LIMITED", "TIMEOUT", "INTERNAL"];
declare const RunResponseSchema: z.ZodObject<{
    run: z.ZodObject<{
        id: z.ZodString;
        workspaceId: z.ZodString;
        workflowVersionId: z.ZodString;
        state: z.ZodEnum<["queued", "running", "waiting_approval", "approved", "denied", "succeeded", "failed", "aborted", "timed_out", "canceled"]>;
        correlationId: z.ZodString;
        idempotencyKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        triggerSource: z.ZodEnum<["ui", "api", "sdk", "cli", "hosted", "webhook"]>;
        requestedBy: z.ZodString;
        requestedAt: z.ZodString;
        startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        completedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        slaPolicyId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        slaDueAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        slaViolatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        workspaceId: string;
        workflowVersionId: string;
        state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
        correlationId: string;
        triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
        requestedBy: string;
        requestedAt: string;
        idempotencyKey?: string | null | undefined;
        startedAt?: string | null | undefined;
        completedAt?: string | null | undefined;
        slaPolicyId?: string | null | undefined;
        slaDueAt?: string | null | undefined;
        slaViolatedAt?: string | null | undefined;
    }, {
        id: string;
        workspaceId: string;
        workflowVersionId: string;
        state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
        correlationId: string;
        triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
        requestedBy: string;
        requestedAt: string;
        idempotencyKey?: string | null | undefined;
        startedAt?: string | null | undefined;
        completedAt?: string | null | undefined;
        slaPolicyId?: string | null | undefined;
        slaDueAt?: string | null | undefined;
        slaViolatedAt?: string | null | undefined;
    }>;
    approval: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        runId: z.ZodString;
        requiredRole: z.ZodString;
        status: z.ZodEnum<["pending", "approved", "denied"]>;
        createdAt: z.ZodString;
        decidedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        decidedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        status: "approved" | "denied" | "pending";
        id: string;
        runId: string;
        requiredRole: string;
        createdAt: string;
        decidedAt?: string | null | undefined;
        decidedBy?: string | null | undefined;
    }, {
        status: "approved" | "denied" | "pending";
        id: string;
        runId: string;
        requiredRole: string;
        createdAt: string;
        decidedAt?: string | null | undefined;
        decidedBy?: string | null | undefined;
    }>>>;
    blocked: z.ZodOptional<z.ZodBoolean>;
    policyDecisions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        mode: z.ZodEnum<["monitor", "enforce"]>;
        decision: z.ZodEnum<["allow", "deny"]>;
        policyId: z.ZodString;
        ruleId: z.ZodString;
        reasonCode: z.ZodString;
        reasonText: z.ZodString;
        correlationId: z.ZodString;
        trace: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        correlationId: string;
        mode: "monitor" | "enforce";
        decision: "allow" | "deny";
        policyId: string;
        ruleId: string;
        reasonCode: string;
        reasonText: string;
        trace: Record<string, unknown>;
    }, {
        correlationId: string;
        mode: "monitor" | "enforce";
        decision: "allow" | "deny";
        policyId: string;
        ruleId: string;
        reasonCode: string;
        reasonText: string;
        trace: Record<string, unknown>;
    }>, "many">>;
    entitlementDecision: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        reasonCode: z.ZodString;
        reasonText: z.ZodString;
        entitled: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        id: string;
        reasonCode: string;
        reasonText: string;
        entitled: boolean;
    }, {
        id: string;
        reasonCode: string;
        reasonText: string;
        entitled: boolean;
    }>>;
    usageEntry: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        quantity: number;
    }, {
        id: string;
        quantity: number;
    }>>;
    boundaryDecision: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        action: z.ZodEnum<["allow", "block", "redact", "mask", "escalate"]>;
        reasonCode: z.ZodString;
        reasonText: z.ZodString;
        policyId: z.ZodOptional<z.ZodString>;
        ruleId: z.ZodOptional<z.ZodString>;
        classification: z.ZodOptional<z.ZodString>;
        tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        maskedFields: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        reasonCode: string;
        reasonText: string;
        action: "allow" | "block" | "redact" | "mask" | "escalate";
        tags: string[];
        maskedFields: string[];
        policyId?: string | undefined;
        ruleId?: string | undefined;
        classification?: string | undefined;
    }, {
        reasonCode: string;
        reasonText: string;
        action: "allow" | "block" | "redact" | "mask" | "escalate";
        policyId?: string | undefined;
        ruleId?: string | undefined;
        classification?: string | undefined;
        tags?: string[] | undefined;
        maskedFields?: string[] | undefined;
    }>>>;
    firewallDecision: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        action: z.ZodEnum<["allow", "sanitize", "deny"]>;
        reasonCode: z.ZodString;
        reasonText: z.ZodString;
        findings: z.ZodDefault<z.ZodArray<z.ZodObject<{
            ruleKey: z.ZodString;
            category: z.ZodEnum<["prompt_injection", "secret", "pii", "malicious_payload"]>;
            severity: z.ZodEnum<["low", "med", "high", "critical"]>;
            target: z.ZodEnum<["input", "output", "tool_call", "payload"]>;
            fieldPath: z.ZodString;
            matchPreview: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            target: "input" | "payload" | "output" | "tool_call";
            severity: "low" | "high" | "critical" | "med";
            ruleKey: string;
            category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
            fieldPath: string;
            matchPreview: string;
        }, {
            target: "input" | "payload" | "output" | "tool_call";
            severity: "low" | "high" | "critical" | "med";
            ruleKey: string;
            category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
            fieldPath: string;
            matchPreview: string;
        }>, "many">>;
        redactions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        blockedTools: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        blockedDomains: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        sanitizedPayload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        score: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        score: number;
        reasonCode: string;
        reasonText: string;
        action: "allow" | "deny" | "sanitize";
        findings: {
            target: "input" | "payload" | "output" | "tool_call";
            severity: "low" | "high" | "critical" | "med";
            ruleKey: string;
            category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
            fieldPath: string;
            matchPreview: string;
        }[];
        redactions: string[];
        blockedTools: string[];
        blockedDomains: string[];
        sanitizedPayload?: Record<string, unknown> | undefined;
    }, {
        score: number;
        reasonCode: string;
        reasonText: string;
        action: "allow" | "deny" | "sanitize";
        findings?: {
            target: "input" | "payload" | "output" | "tool_call";
            severity: "low" | "high" | "critical" | "med";
            ruleKey: string;
            category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
            fieldPath: string;
            matchPreview: string;
        }[] | undefined;
        redactions?: string[] | undefined;
        blockedTools?: string[] | undefined;
        blockedDomains?: string[] | undefined;
        sanitizedPayload?: Record<string, unknown> | undefined;
    }>>>;
}, "strip", z.ZodTypeAny, {
    run: {
        id: string;
        workspaceId: string;
        workflowVersionId: string;
        state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
        correlationId: string;
        triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
        requestedBy: string;
        requestedAt: string;
        idempotencyKey?: string | null | undefined;
        startedAt?: string | null | undefined;
        completedAt?: string | null | undefined;
        slaPolicyId?: string | null | undefined;
        slaDueAt?: string | null | undefined;
        slaViolatedAt?: string | null | undefined;
    };
    approval?: {
        status: "approved" | "denied" | "pending";
        id: string;
        runId: string;
        requiredRole: string;
        createdAt: string;
        decidedAt?: string | null | undefined;
        decidedBy?: string | null | undefined;
    } | null | undefined;
    blocked?: boolean | undefined;
    policyDecisions?: {
        correlationId: string;
        mode: "monitor" | "enforce";
        decision: "allow" | "deny";
        policyId: string;
        ruleId: string;
        reasonCode: string;
        reasonText: string;
        trace: Record<string, unknown>;
    }[] | undefined;
    entitlementDecision?: {
        id: string;
        reasonCode: string;
        reasonText: string;
        entitled: boolean;
    } | undefined;
    usageEntry?: {
        id: string;
        quantity: number;
    } | undefined;
    boundaryDecision?: {
        reasonCode: string;
        reasonText: string;
        action: "allow" | "block" | "redact" | "mask" | "escalate";
        tags: string[];
        maskedFields: string[];
        policyId?: string | undefined;
        ruleId?: string | undefined;
        classification?: string | undefined;
    } | null | undefined;
    firewallDecision?: {
        score: number;
        reasonCode: string;
        reasonText: string;
        action: "allow" | "deny" | "sanitize";
        findings: {
            target: "input" | "payload" | "output" | "tool_call";
            severity: "low" | "high" | "critical" | "med";
            ruleKey: string;
            category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
            fieldPath: string;
            matchPreview: string;
        }[];
        redactions: string[];
        blockedTools: string[];
        blockedDomains: string[];
        sanitizedPayload?: Record<string, unknown> | undefined;
    } | null | undefined;
}, {
    run: {
        id: string;
        workspaceId: string;
        workflowVersionId: string;
        state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
        correlationId: string;
        triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
        requestedBy: string;
        requestedAt: string;
        idempotencyKey?: string | null | undefined;
        startedAt?: string | null | undefined;
        completedAt?: string | null | undefined;
        slaPolicyId?: string | null | undefined;
        slaDueAt?: string | null | undefined;
        slaViolatedAt?: string | null | undefined;
    };
    approval?: {
        status: "approved" | "denied" | "pending";
        id: string;
        runId: string;
        requiredRole: string;
        createdAt: string;
        decidedAt?: string | null | undefined;
        decidedBy?: string | null | undefined;
    } | null | undefined;
    blocked?: boolean | undefined;
    policyDecisions?: {
        correlationId: string;
        mode: "monitor" | "enforce";
        decision: "allow" | "deny";
        policyId: string;
        ruleId: string;
        reasonCode: string;
        reasonText: string;
        trace: Record<string, unknown>;
    }[] | undefined;
    entitlementDecision?: {
        id: string;
        reasonCode: string;
        reasonText: string;
        entitled: boolean;
    } | undefined;
    usageEntry?: {
        id: string;
        quantity: number;
    } | undefined;
    boundaryDecision?: {
        reasonCode: string;
        reasonText: string;
        action: "allow" | "block" | "redact" | "mask" | "escalate";
        policyId?: string | undefined;
        ruleId?: string | undefined;
        classification?: string | undefined;
        tags?: string[] | undefined;
        maskedFields?: string[] | undefined;
    } | null | undefined;
    firewallDecision?: {
        score: number;
        reasonCode: string;
        reasonText: string;
        action: "allow" | "deny" | "sanitize";
        findings?: {
            target: "input" | "payload" | "output" | "tool_call";
            severity: "low" | "high" | "critical" | "med";
            ruleKey: string;
            category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
            fieldPath: string;
            matchPreview: string;
        }[] | undefined;
        redactions?: string[] | undefined;
        blockedTools?: string[] | undefined;
        blockedDomains?: string[] | undefined;
        sanitizedPayload?: Record<string, unknown> | undefined;
    } | null | undefined;
}>;
declare const V4SessionStartDataSchema: z.ZodObject<{
    session: z.ZodObject<{
        sessionId: z.ZodString;
        workspaceId: z.ZodString;
        agent: z.ZodString;
        subject: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        policy: z.ZodOptional<z.ZodObject<{
            ref: z.ZodString;
            version: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            version: string;
            ref: string;
        }, {
            version: string;
            ref: string;
        }>>;
        route: z.ZodOptional<z.ZodObject<{
            provider: z.ZodOptional<z.ZodString>;
            model: z.ZodOptional<z.ZodString>;
            region: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        }, {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        }>>;
        risk: z.ZodOptional<z.ZodObject<{
            score: z.ZodOptional<z.ZodNumber>;
            decision: z.ZodOptional<z.ZodEnum<["allow", "deny", "review"]>>;
        }, "strip", z.ZodTypeAny, {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        }, {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        }>>;
        workflowVersionId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        expiresAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        sessionId: string;
        workspaceId: string;
        createdAt: string;
        agent: string;
        workflowVersionId?: string | undefined;
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
        subject?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        expiresAt?: string | undefined;
    }, {
        sessionId: string;
        workspaceId: string;
        createdAt: string;
        agent: string;
        workflowVersionId?: string | undefined;
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
        subject?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        expiresAt?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    session: {
        sessionId: string;
        workspaceId: string;
        createdAt: string;
        agent: string;
        workflowVersionId?: string | undefined;
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
        subject?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        expiresAt?: string | undefined;
    };
}, {
    session: {
        sessionId: string;
        workspaceId: string;
        createdAt: string;
        agent: string;
        workflowVersionId?: string | undefined;
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
        subject?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        expiresAt?: string | undefined;
    };
}>;
declare const V4SessionStartResponseSchema: z.ZodObject<{
    ok: z.ZodBoolean;
    data: z.ZodNullable<z.ZodObject<{
        session: z.ZodObject<{
            sessionId: z.ZodString;
            workspaceId: z.ZodString;
            agent: z.ZodString;
            subject: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            policy: z.ZodOptional<z.ZodObject<{
                ref: z.ZodString;
                version: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                version: string;
                ref: string;
            }, {
                version: string;
                ref: string;
            }>>;
            route: z.ZodOptional<z.ZodObject<{
                provider: z.ZodOptional<z.ZodString>;
                model: z.ZodOptional<z.ZodString>;
                region: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                provider?: string | undefined;
                model?: string | undefined;
                region?: string | undefined;
            }, {
                provider?: string | undefined;
                model?: string | undefined;
                region?: string | undefined;
            }>>;
            risk: z.ZodOptional<z.ZodObject<{
                score: z.ZodOptional<z.ZodNumber>;
                decision: z.ZodOptional<z.ZodEnum<["allow", "deny", "review"]>>;
            }, "strip", z.ZodTypeAny, {
                score?: number | undefined;
                decision?: "allow" | "deny" | "review" | undefined;
            }, {
                score?: number | undefined;
                decision?: "allow" | "deny" | "review" | undefined;
            }>>;
            workflowVersionId: z.ZodOptional<z.ZodString>;
            createdAt: z.ZodString;
            expiresAt: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            sessionId: string;
            workspaceId: string;
            createdAt: string;
            agent: string;
            workflowVersionId?: string | undefined;
            policy?: {
                version: string;
                ref: string;
            } | undefined;
            route?: {
                provider?: string | undefined;
                model?: string | undefined;
                region?: string | undefined;
            } | undefined;
            risk?: {
                score?: number | undefined;
                decision?: "allow" | "deny" | "review" | undefined;
            } | undefined;
            subject?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            expiresAt?: string | undefined;
        }, {
            sessionId: string;
            workspaceId: string;
            createdAt: string;
            agent: string;
            workflowVersionId?: string | undefined;
            policy?: {
                version: string;
                ref: string;
            } | undefined;
            route?: {
                provider?: string | undefined;
                model?: string | undefined;
                region?: string | undefined;
            } | undefined;
            risk?: {
                score?: number | undefined;
                decision?: "allow" | "deny" | "review" | undefined;
            } | undefined;
            subject?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            expiresAt?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        session: {
            sessionId: string;
            workspaceId: string;
            createdAt: string;
            agent: string;
            workflowVersionId?: string | undefined;
            policy?: {
                version: string;
                ref: string;
            } | undefined;
            route?: {
                provider?: string | undefined;
                model?: string | undefined;
                region?: string | undefined;
            } | undefined;
            risk?: {
                score?: number | undefined;
                decision?: "allow" | "deny" | "review" | undefined;
            } | undefined;
            subject?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            expiresAt?: string | undefined;
        };
    }, {
        session: {
            sessionId: string;
            workspaceId: string;
            createdAt: string;
            agent: string;
            workflowVersionId?: string | undefined;
            policy?: {
                version: string;
                ref: string;
            } | undefined;
            route?: {
                provider?: string | undefined;
                model?: string | undefined;
                region?: string | undefined;
            } | undefined;
            risk?: {
                score?: number | undefined;
                decision?: "allow" | "deny" | "review" | undefined;
            } | undefined;
            subject?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            expiresAt?: string | undefined;
        };
    }>>;
    meta: z.ZodObject<{
        requestId: z.ZodString;
        sessionId: z.ZodOptional<z.ZodString>;
        executionId: z.ZodOptional<z.ZodString>;
        lineageId: z.ZodOptional<z.ZodString>;
        policy: z.ZodOptional<z.ZodObject<{
            ref: z.ZodString;
            version: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            version: string;
            ref: string;
        }, {
            version: string;
            ref: string;
        }>>;
        route: z.ZodOptional<z.ZodObject<{
            provider: z.ZodOptional<z.ZodString>;
            model: z.ZodOptional<z.ZodString>;
            region: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        }, {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        }>>;
        risk: z.ZodOptional<z.ZodObject<{
            score: z.ZodOptional<z.ZodNumber>;
            decision: z.ZodOptional<z.ZodEnum<["allow", "deny", "review"]>>;
        }, "strip", z.ZodTypeAny, {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        }, {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        }>>;
        timingMs: z.ZodObject<{
            total: z.ZodNumber;
            policy: z.ZodOptional<z.ZodNumber>;
            route: z.ZodOptional<z.ZodNumber>;
            tool: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            total: number;
            policy?: number | undefined;
            route?: number | undefined;
            tool?: number | undefined;
        }, {
            total: number;
            policy?: number | undefined;
            route?: number | undefined;
            tool?: number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        requestId: string;
        timingMs: {
            total: number;
            policy?: number | undefined;
            route?: number | undefined;
            tool?: number | undefined;
        };
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        sessionId?: string | undefined;
        executionId?: string | undefined;
        lineageId?: string | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
    }, {
        requestId: string;
        timingMs: {
            total: number;
            policy?: number | undefined;
            route?: number | undefined;
            tool?: number | undefined;
        };
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        sessionId?: string | undefined;
        executionId?: string | undefined;
        lineageId?: string | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
    }>;
    error: z.ZodNullable<z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
        status: z.ZodNumber;
        retryable: z.ZodBoolean;
        details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        message: string;
        status: number;
        retryable: boolean;
        details?: Record<string, unknown> | undefined;
    }, {
        code: string;
        message: string;
        status: number;
        retryable: boolean;
        details?: Record<string, unknown> | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    error: {
        code: string;
        message: string;
        status: number;
        retryable: boolean;
        details?: Record<string, unknown> | undefined;
    } | null;
    ok: boolean;
    data: {
        session: {
            sessionId: string;
            workspaceId: string;
            createdAt: string;
            agent: string;
            workflowVersionId?: string | undefined;
            policy?: {
                version: string;
                ref: string;
            } | undefined;
            route?: {
                provider?: string | undefined;
                model?: string | undefined;
                region?: string | undefined;
            } | undefined;
            risk?: {
                score?: number | undefined;
                decision?: "allow" | "deny" | "review" | undefined;
            } | undefined;
            subject?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            expiresAt?: string | undefined;
        };
    } | null;
    meta: {
        requestId: string;
        timingMs: {
            total: number;
            policy?: number | undefined;
            route?: number | undefined;
            tool?: number | undefined;
        };
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        sessionId?: string | undefined;
        executionId?: string | undefined;
        lineageId?: string | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
    };
}, {
    error: {
        code: string;
        message: string;
        status: number;
        retryable: boolean;
        details?: Record<string, unknown> | undefined;
    } | null;
    ok: boolean;
    data: {
        session: {
            sessionId: string;
            workspaceId: string;
            createdAt: string;
            agent: string;
            workflowVersionId?: string | undefined;
            policy?: {
                version: string;
                ref: string;
            } | undefined;
            route?: {
                provider?: string | undefined;
                model?: string | undefined;
                region?: string | undefined;
            } | undefined;
            risk?: {
                score?: number | undefined;
                decision?: "allow" | "deny" | "review" | undefined;
            } | undefined;
            subject?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            expiresAt?: string | undefined;
        };
    } | null;
    meta: {
        requestId: string;
        timingMs: {
            total: number;
            policy?: number | undefined;
            route?: number | undefined;
            tool?: number | undefined;
        };
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        sessionId?: string | undefined;
        executionId?: string | undefined;
        lineageId?: string | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
    };
}>;
declare const V4ExecutionResponseSchema: z.ZodObject<{
    ok: z.ZodBoolean;
    data: z.ZodNullable<z.ZodObject<{
        run: z.ZodObject<{
            id: z.ZodString;
            workspaceId: z.ZodString;
            workflowVersionId: z.ZodString;
            state: z.ZodEnum<["queued", "running", "waiting_approval", "approved", "denied", "succeeded", "failed", "aborted", "timed_out", "canceled"]>;
            correlationId: z.ZodString;
            idempotencyKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            triggerSource: z.ZodEnum<["ui", "api", "sdk", "cli", "hosted", "webhook"]>;
            requestedBy: z.ZodString;
            requestedAt: z.ZodString;
            startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            completedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            slaPolicyId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            slaDueAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            slaViolatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            workspaceId: string;
            workflowVersionId: string;
            state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
            correlationId: string;
            triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
            requestedBy: string;
            requestedAt: string;
            idempotencyKey?: string | null | undefined;
            startedAt?: string | null | undefined;
            completedAt?: string | null | undefined;
            slaPolicyId?: string | null | undefined;
            slaDueAt?: string | null | undefined;
            slaViolatedAt?: string | null | undefined;
        }, {
            id: string;
            workspaceId: string;
            workflowVersionId: string;
            state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
            correlationId: string;
            triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
            requestedBy: string;
            requestedAt: string;
            idempotencyKey?: string | null | undefined;
            startedAt?: string | null | undefined;
            completedAt?: string | null | undefined;
            slaPolicyId?: string | null | undefined;
            slaDueAt?: string | null | undefined;
            slaViolatedAt?: string | null | undefined;
        }>;
        approval: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            runId: z.ZodString;
            requiredRole: z.ZodString;
            status: z.ZodEnum<["pending", "approved", "denied"]>;
            createdAt: z.ZodString;
            decidedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            decidedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            status: "approved" | "denied" | "pending";
            id: string;
            runId: string;
            requiredRole: string;
            createdAt: string;
            decidedAt?: string | null | undefined;
            decidedBy?: string | null | undefined;
        }, {
            status: "approved" | "denied" | "pending";
            id: string;
            runId: string;
            requiredRole: string;
            createdAt: string;
            decidedAt?: string | null | undefined;
            decidedBy?: string | null | undefined;
        }>>>;
        blocked: z.ZodOptional<z.ZodBoolean>;
        policyDecisions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            mode: z.ZodEnum<["monitor", "enforce"]>;
            decision: z.ZodEnum<["allow", "deny"]>;
            policyId: z.ZodString;
            ruleId: z.ZodString;
            reasonCode: z.ZodString;
            reasonText: z.ZodString;
            correlationId: z.ZodString;
            trace: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            correlationId: string;
            mode: "monitor" | "enforce";
            decision: "allow" | "deny";
            policyId: string;
            ruleId: string;
            reasonCode: string;
            reasonText: string;
            trace: Record<string, unknown>;
        }, {
            correlationId: string;
            mode: "monitor" | "enforce";
            decision: "allow" | "deny";
            policyId: string;
            ruleId: string;
            reasonCode: string;
            reasonText: string;
            trace: Record<string, unknown>;
        }>, "many">>;
        entitlementDecision: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            reasonCode: z.ZodString;
            reasonText: z.ZodString;
            entitled: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            id: string;
            reasonCode: string;
            reasonText: string;
            entitled: boolean;
        }, {
            id: string;
            reasonCode: string;
            reasonText: string;
            entitled: boolean;
        }>>;
        usageEntry: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            quantity: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            quantity: number;
        }, {
            id: string;
            quantity: number;
        }>>;
        boundaryDecision: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            action: z.ZodEnum<["allow", "block", "redact", "mask", "escalate"]>;
            reasonCode: z.ZodString;
            reasonText: z.ZodString;
            policyId: z.ZodOptional<z.ZodString>;
            ruleId: z.ZodOptional<z.ZodString>;
            classification: z.ZodOptional<z.ZodString>;
            tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            maskedFields: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            reasonCode: string;
            reasonText: string;
            action: "allow" | "block" | "redact" | "mask" | "escalate";
            tags: string[];
            maskedFields: string[];
            policyId?: string | undefined;
            ruleId?: string | undefined;
            classification?: string | undefined;
        }, {
            reasonCode: string;
            reasonText: string;
            action: "allow" | "block" | "redact" | "mask" | "escalate";
            policyId?: string | undefined;
            ruleId?: string | undefined;
            classification?: string | undefined;
            tags?: string[] | undefined;
            maskedFields?: string[] | undefined;
        }>>>;
        firewallDecision: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            action: z.ZodEnum<["allow", "sanitize", "deny"]>;
            reasonCode: z.ZodString;
            reasonText: z.ZodString;
            findings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                ruleKey: z.ZodString;
                category: z.ZodEnum<["prompt_injection", "secret", "pii", "malicious_payload"]>;
                severity: z.ZodEnum<["low", "med", "high", "critical"]>;
                target: z.ZodEnum<["input", "output", "tool_call", "payload"]>;
                fieldPath: z.ZodString;
                matchPreview: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                target: "input" | "payload" | "output" | "tool_call";
                severity: "low" | "high" | "critical" | "med";
                ruleKey: string;
                category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                fieldPath: string;
                matchPreview: string;
            }, {
                target: "input" | "payload" | "output" | "tool_call";
                severity: "low" | "high" | "critical" | "med";
                ruleKey: string;
                category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                fieldPath: string;
                matchPreview: string;
            }>, "many">>;
            redactions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            blockedTools: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            blockedDomains: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            sanitizedPayload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            score: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            score: number;
            reasonCode: string;
            reasonText: string;
            action: "allow" | "deny" | "sanitize";
            findings: {
                target: "input" | "payload" | "output" | "tool_call";
                severity: "low" | "high" | "critical" | "med";
                ruleKey: string;
                category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                fieldPath: string;
                matchPreview: string;
            }[];
            redactions: string[];
            blockedTools: string[];
            blockedDomains: string[];
            sanitizedPayload?: Record<string, unknown> | undefined;
        }, {
            score: number;
            reasonCode: string;
            reasonText: string;
            action: "allow" | "deny" | "sanitize";
            findings?: {
                target: "input" | "payload" | "output" | "tool_call";
                severity: "low" | "high" | "critical" | "med";
                ruleKey: string;
                category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                fieldPath: string;
                matchPreview: string;
            }[] | undefined;
            redactions?: string[] | undefined;
            blockedTools?: string[] | undefined;
            blockedDomains?: string[] | undefined;
            sanitizedPayload?: Record<string, unknown> | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        run: {
            id: string;
            workspaceId: string;
            workflowVersionId: string;
            state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
            correlationId: string;
            triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
            requestedBy: string;
            requestedAt: string;
            idempotencyKey?: string | null | undefined;
            startedAt?: string | null | undefined;
            completedAt?: string | null | undefined;
            slaPolicyId?: string | null | undefined;
            slaDueAt?: string | null | undefined;
            slaViolatedAt?: string | null | undefined;
        };
        approval?: {
            status: "approved" | "denied" | "pending";
            id: string;
            runId: string;
            requiredRole: string;
            createdAt: string;
            decidedAt?: string | null | undefined;
            decidedBy?: string | null | undefined;
        } | null | undefined;
        blocked?: boolean | undefined;
        policyDecisions?: {
            correlationId: string;
            mode: "monitor" | "enforce";
            decision: "allow" | "deny";
            policyId: string;
            ruleId: string;
            reasonCode: string;
            reasonText: string;
            trace: Record<string, unknown>;
        }[] | undefined;
        entitlementDecision?: {
            id: string;
            reasonCode: string;
            reasonText: string;
            entitled: boolean;
        } | undefined;
        usageEntry?: {
            id: string;
            quantity: number;
        } | undefined;
        boundaryDecision?: {
            reasonCode: string;
            reasonText: string;
            action: "allow" | "block" | "redact" | "mask" | "escalate";
            tags: string[];
            maskedFields: string[];
            policyId?: string | undefined;
            ruleId?: string | undefined;
            classification?: string | undefined;
        } | null | undefined;
        firewallDecision?: {
            score: number;
            reasonCode: string;
            reasonText: string;
            action: "allow" | "deny" | "sanitize";
            findings: {
                target: "input" | "payload" | "output" | "tool_call";
                severity: "low" | "high" | "critical" | "med";
                ruleKey: string;
                category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                fieldPath: string;
                matchPreview: string;
            }[];
            redactions: string[];
            blockedTools: string[];
            blockedDomains: string[];
            sanitizedPayload?: Record<string, unknown> | undefined;
        } | null | undefined;
    }, {
        run: {
            id: string;
            workspaceId: string;
            workflowVersionId: string;
            state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
            correlationId: string;
            triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
            requestedBy: string;
            requestedAt: string;
            idempotencyKey?: string | null | undefined;
            startedAt?: string | null | undefined;
            completedAt?: string | null | undefined;
            slaPolicyId?: string | null | undefined;
            slaDueAt?: string | null | undefined;
            slaViolatedAt?: string | null | undefined;
        };
        approval?: {
            status: "approved" | "denied" | "pending";
            id: string;
            runId: string;
            requiredRole: string;
            createdAt: string;
            decidedAt?: string | null | undefined;
            decidedBy?: string | null | undefined;
        } | null | undefined;
        blocked?: boolean | undefined;
        policyDecisions?: {
            correlationId: string;
            mode: "monitor" | "enforce";
            decision: "allow" | "deny";
            policyId: string;
            ruleId: string;
            reasonCode: string;
            reasonText: string;
            trace: Record<string, unknown>;
        }[] | undefined;
        entitlementDecision?: {
            id: string;
            reasonCode: string;
            reasonText: string;
            entitled: boolean;
        } | undefined;
        usageEntry?: {
            id: string;
            quantity: number;
        } | undefined;
        boundaryDecision?: {
            reasonCode: string;
            reasonText: string;
            action: "allow" | "block" | "redact" | "mask" | "escalate";
            policyId?: string | undefined;
            ruleId?: string | undefined;
            classification?: string | undefined;
            tags?: string[] | undefined;
            maskedFields?: string[] | undefined;
        } | null | undefined;
        firewallDecision?: {
            score: number;
            reasonCode: string;
            reasonText: string;
            action: "allow" | "deny" | "sanitize";
            findings?: {
                target: "input" | "payload" | "output" | "tool_call";
                severity: "low" | "high" | "critical" | "med";
                ruleKey: string;
                category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                fieldPath: string;
                matchPreview: string;
            }[] | undefined;
            redactions?: string[] | undefined;
            blockedTools?: string[] | undefined;
            blockedDomains?: string[] | undefined;
            sanitizedPayload?: Record<string, unknown> | undefined;
        } | null | undefined;
    }>>;
    meta: z.ZodObject<{
        requestId: z.ZodString;
        sessionId: z.ZodOptional<z.ZodString>;
        executionId: z.ZodOptional<z.ZodString>;
        lineageId: z.ZodOptional<z.ZodString>;
        policy: z.ZodOptional<z.ZodObject<{
            ref: z.ZodString;
            version: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            version: string;
            ref: string;
        }, {
            version: string;
            ref: string;
        }>>;
        route: z.ZodOptional<z.ZodObject<{
            provider: z.ZodOptional<z.ZodString>;
            model: z.ZodOptional<z.ZodString>;
            region: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        }, {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        }>>;
        risk: z.ZodOptional<z.ZodObject<{
            score: z.ZodOptional<z.ZodNumber>;
            decision: z.ZodOptional<z.ZodEnum<["allow", "deny", "review"]>>;
        }, "strip", z.ZodTypeAny, {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        }, {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        }>>;
        timingMs: z.ZodObject<{
            total: z.ZodNumber;
            policy: z.ZodOptional<z.ZodNumber>;
            route: z.ZodOptional<z.ZodNumber>;
            tool: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            total: number;
            policy?: number | undefined;
            route?: number | undefined;
            tool?: number | undefined;
        }, {
            total: number;
            policy?: number | undefined;
            route?: number | undefined;
            tool?: number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        requestId: string;
        timingMs: {
            total: number;
            policy?: number | undefined;
            route?: number | undefined;
            tool?: number | undefined;
        };
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        sessionId?: string | undefined;
        executionId?: string | undefined;
        lineageId?: string | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
    }, {
        requestId: string;
        timingMs: {
            total: number;
            policy?: number | undefined;
            route?: number | undefined;
            tool?: number | undefined;
        };
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        sessionId?: string | undefined;
        executionId?: string | undefined;
        lineageId?: string | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
    }>;
    error: z.ZodNullable<z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
        status: z.ZodNumber;
        retryable: z.ZodBoolean;
        details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        message: string;
        status: number;
        retryable: boolean;
        details?: Record<string, unknown> | undefined;
    }, {
        code: string;
        message: string;
        status: number;
        retryable: boolean;
        details?: Record<string, unknown> | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    error: {
        code: string;
        message: string;
        status: number;
        retryable: boolean;
        details?: Record<string, unknown> | undefined;
    } | null;
    ok: boolean;
    data: {
        run: {
            id: string;
            workspaceId: string;
            workflowVersionId: string;
            state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
            correlationId: string;
            triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
            requestedBy: string;
            requestedAt: string;
            idempotencyKey?: string | null | undefined;
            startedAt?: string | null | undefined;
            completedAt?: string | null | undefined;
            slaPolicyId?: string | null | undefined;
            slaDueAt?: string | null | undefined;
            slaViolatedAt?: string | null | undefined;
        };
        approval?: {
            status: "approved" | "denied" | "pending";
            id: string;
            runId: string;
            requiredRole: string;
            createdAt: string;
            decidedAt?: string | null | undefined;
            decidedBy?: string | null | undefined;
        } | null | undefined;
        blocked?: boolean | undefined;
        policyDecisions?: {
            correlationId: string;
            mode: "monitor" | "enforce";
            decision: "allow" | "deny";
            policyId: string;
            ruleId: string;
            reasonCode: string;
            reasonText: string;
            trace: Record<string, unknown>;
        }[] | undefined;
        entitlementDecision?: {
            id: string;
            reasonCode: string;
            reasonText: string;
            entitled: boolean;
        } | undefined;
        usageEntry?: {
            id: string;
            quantity: number;
        } | undefined;
        boundaryDecision?: {
            reasonCode: string;
            reasonText: string;
            action: "allow" | "block" | "redact" | "mask" | "escalate";
            tags: string[];
            maskedFields: string[];
            policyId?: string | undefined;
            ruleId?: string | undefined;
            classification?: string | undefined;
        } | null | undefined;
        firewallDecision?: {
            score: number;
            reasonCode: string;
            reasonText: string;
            action: "allow" | "deny" | "sanitize";
            findings: {
                target: "input" | "payload" | "output" | "tool_call";
                severity: "low" | "high" | "critical" | "med";
                ruleKey: string;
                category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                fieldPath: string;
                matchPreview: string;
            }[];
            redactions: string[];
            blockedTools: string[];
            blockedDomains: string[];
            sanitizedPayload?: Record<string, unknown> | undefined;
        } | null | undefined;
    } | null;
    meta: {
        requestId: string;
        timingMs: {
            total: number;
            policy?: number | undefined;
            route?: number | undefined;
            tool?: number | undefined;
        };
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        sessionId?: string | undefined;
        executionId?: string | undefined;
        lineageId?: string | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
    };
}, {
    error: {
        code: string;
        message: string;
        status: number;
        retryable: boolean;
        details?: Record<string, unknown> | undefined;
    } | null;
    ok: boolean;
    data: {
        run: {
            id: string;
            workspaceId: string;
            workflowVersionId: string;
            state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
            correlationId: string;
            triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
            requestedBy: string;
            requestedAt: string;
            idempotencyKey?: string | null | undefined;
            startedAt?: string | null | undefined;
            completedAt?: string | null | undefined;
            slaPolicyId?: string | null | undefined;
            slaDueAt?: string | null | undefined;
            slaViolatedAt?: string | null | undefined;
        };
        approval?: {
            status: "approved" | "denied" | "pending";
            id: string;
            runId: string;
            requiredRole: string;
            createdAt: string;
            decidedAt?: string | null | undefined;
            decidedBy?: string | null | undefined;
        } | null | undefined;
        blocked?: boolean | undefined;
        policyDecisions?: {
            correlationId: string;
            mode: "monitor" | "enforce";
            decision: "allow" | "deny";
            policyId: string;
            ruleId: string;
            reasonCode: string;
            reasonText: string;
            trace: Record<string, unknown>;
        }[] | undefined;
        entitlementDecision?: {
            id: string;
            reasonCode: string;
            reasonText: string;
            entitled: boolean;
        } | undefined;
        usageEntry?: {
            id: string;
            quantity: number;
        } | undefined;
        boundaryDecision?: {
            reasonCode: string;
            reasonText: string;
            action: "allow" | "block" | "redact" | "mask" | "escalate";
            policyId?: string | undefined;
            ruleId?: string | undefined;
            classification?: string | undefined;
            tags?: string[] | undefined;
            maskedFields?: string[] | undefined;
        } | null | undefined;
        firewallDecision?: {
            score: number;
            reasonCode: string;
            reasonText: string;
            action: "allow" | "deny" | "sanitize";
            findings?: {
                target: "input" | "payload" | "output" | "tool_call";
                severity: "low" | "high" | "critical" | "med";
                ruleKey: string;
                category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                fieldPath: string;
                matchPreview: string;
            }[] | undefined;
            redactions?: string[] | undefined;
            blockedTools?: string[] | undefined;
            blockedDomains?: string[] | undefined;
            sanitizedPayload?: Record<string, unknown> | undefined;
        } | null | undefined;
    } | null;
    meta: {
        requestId: string;
        timingMs: {
            total: number;
            policy?: number | undefined;
            route?: number | undefined;
            tool?: number | undefined;
        };
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        sessionId?: string | undefined;
        executionId?: string | undefined;
        lineageId?: string | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
    };
}>;
declare const V4EphemeralExecuteDataSchema: z.ZodObject<{
    session: z.ZodObject<{
        sessionId: z.ZodString;
        workspaceId: z.ZodString;
        agent: z.ZodString;
        subject: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        policy: z.ZodOptional<z.ZodObject<{
            ref: z.ZodString;
            version: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            version: string;
            ref: string;
        }, {
            version: string;
            ref: string;
        }>>;
        route: z.ZodOptional<z.ZodObject<{
            provider: z.ZodOptional<z.ZodString>;
            model: z.ZodOptional<z.ZodString>;
            region: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        }, {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        }>>;
        risk: z.ZodOptional<z.ZodObject<{
            score: z.ZodOptional<z.ZodNumber>;
            decision: z.ZodOptional<z.ZodEnum<["allow", "deny", "review"]>>;
        }, "strip", z.ZodTypeAny, {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        }, {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        }>>;
        workflowVersionId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        expiresAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        sessionId: string;
        workspaceId: string;
        createdAt: string;
        agent: string;
        workflowVersionId?: string | undefined;
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
        subject?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        expiresAt?: string | undefined;
    }, {
        sessionId: string;
        workspaceId: string;
        createdAt: string;
        agent: string;
        workflowVersionId?: string | undefined;
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
        subject?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        expiresAt?: string | undefined;
    }>;
    execution: z.ZodObject<{
        run: z.ZodObject<{
            id: z.ZodString;
            workspaceId: z.ZodString;
            workflowVersionId: z.ZodString;
            state: z.ZodEnum<["queued", "running", "waiting_approval", "approved", "denied", "succeeded", "failed", "aborted", "timed_out", "canceled"]>;
            correlationId: z.ZodString;
            idempotencyKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            triggerSource: z.ZodEnum<["ui", "api", "sdk", "cli", "hosted", "webhook"]>;
            requestedBy: z.ZodString;
            requestedAt: z.ZodString;
            startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            completedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            slaPolicyId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            slaDueAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            slaViolatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            workspaceId: string;
            workflowVersionId: string;
            state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
            correlationId: string;
            triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
            requestedBy: string;
            requestedAt: string;
            idempotencyKey?: string | null | undefined;
            startedAt?: string | null | undefined;
            completedAt?: string | null | undefined;
            slaPolicyId?: string | null | undefined;
            slaDueAt?: string | null | undefined;
            slaViolatedAt?: string | null | undefined;
        }, {
            id: string;
            workspaceId: string;
            workflowVersionId: string;
            state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
            correlationId: string;
            triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
            requestedBy: string;
            requestedAt: string;
            idempotencyKey?: string | null | undefined;
            startedAt?: string | null | undefined;
            completedAt?: string | null | undefined;
            slaPolicyId?: string | null | undefined;
            slaDueAt?: string | null | undefined;
            slaViolatedAt?: string | null | undefined;
        }>;
        approval: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            runId: z.ZodString;
            requiredRole: z.ZodString;
            status: z.ZodEnum<["pending", "approved", "denied"]>;
            createdAt: z.ZodString;
            decidedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            decidedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            status: "approved" | "denied" | "pending";
            id: string;
            runId: string;
            requiredRole: string;
            createdAt: string;
            decidedAt?: string | null | undefined;
            decidedBy?: string | null | undefined;
        }, {
            status: "approved" | "denied" | "pending";
            id: string;
            runId: string;
            requiredRole: string;
            createdAt: string;
            decidedAt?: string | null | undefined;
            decidedBy?: string | null | undefined;
        }>>>;
        blocked: z.ZodOptional<z.ZodBoolean>;
        policyDecisions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            mode: z.ZodEnum<["monitor", "enforce"]>;
            decision: z.ZodEnum<["allow", "deny"]>;
            policyId: z.ZodString;
            ruleId: z.ZodString;
            reasonCode: z.ZodString;
            reasonText: z.ZodString;
            correlationId: z.ZodString;
            trace: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            correlationId: string;
            mode: "monitor" | "enforce";
            decision: "allow" | "deny";
            policyId: string;
            ruleId: string;
            reasonCode: string;
            reasonText: string;
            trace: Record<string, unknown>;
        }, {
            correlationId: string;
            mode: "monitor" | "enforce";
            decision: "allow" | "deny";
            policyId: string;
            ruleId: string;
            reasonCode: string;
            reasonText: string;
            trace: Record<string, unknown>;
        }>, "many">>;
        entitlementDecision: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            reasonCode: z.ZodString;
            reasonText: z.ZodString;
            entitled: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            id: string;
            reasonCode: string;
            reasonText: string;
            entitled: boolean;
        }, {
            id: string;
            reasonCode: string;
            reasonText: string;
            entitled: boolean;
        }>>;
        usageEntry: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            quantity: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            quantity: number;
        }, {
            id: string;
            quantity: number;
        }>>;
        boundaryDecision: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            action: z.ZodEnum<["allow", "block", "redact", "mask", "escalate"]>;
            reasonCode: z.ZodString;
            reasonText: z.ZodString;
            policyId: z.ZodOptional<z.ZodString>;
            ruleId: z.ZodOptional<z.ZodString>;
            classification: z.ZodOptional<z.ZodString>;
            tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            maskedFields: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            reasonCode: string;
            reasonText: string;
            action: "allow" | "block" | "redact" | "mask" | "escalate";
            tags: string[];
            maskedFields: string[];
            policyId?: string | undefined;
            ruleId?: string | undefined;
            classification?: string | undefined;
        }, {
            reasonCode: string;
            reasonText: string;
            action: "allow" | "block" | "redact" | "mask" | "escalate";
            policyId?: string | undefined;
            ruleId?: string | undefined;
            classification?: string | undefined;
            tags?: string[] | undefined;
            maskedFields?: string[] | undefined;
        }>>>;
        firewallDecision: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            action: z.ZodEnum<["allow", "sanitize", "deny"]>;
            reasonCode: z.ZodString;
            reasonText: z.ZodString;
            findings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                ruleKey: z.ZodString;
                category: z.ZodEnum<["prompt_injection", "secret", "pii", "malicious_payload"]>;
                severity: z.ZodEnum<["low", "med", "high", "critical"]>;
                target: z.ZodEnum<["input", "output", "tool_call", "payload"]>;
                fieldPath: z.ZodString;
                matchPreview: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                target: "input" | "payload" | "output" | "tool_call";
                severity: "low" | "high" | "critical" | "med";
                ruleKey: string;
                category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                fieldPath: string;
                matchPreview: string;
            }, {
                target: "input" | "payload" | "output" | "tool_call";
                severity: "low" | "high" | "critical" | "med";
                ruleKey: string;
                category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                fieldPath: string;
                matchPreview: string;
            }>, "many">>;
            redactions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            blockedTools: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            blockedDomains: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            sanitizedPayload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            score: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            score: number;
            reasonCode: string;
            reasonText: string;
            action: "allow" | "deny" | "sanitize";
            findings: {
                target: "input" | "payload" | "output" | "tool_call";
                severity: "low" | "high" | "critical" | "med";
                ruleKey: string;
                category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                fieldPath: string;
                matchPreview: string;
            }[];
            redactions: string[];
            blockedTools: string[];
            blockedDomains: string[];
            sanitizedPayload?: Record<string, unknown> | undefined;
        }, {
            score: number;
            reasonCode: string;
            reasonText: string;
            action: "allow" | "deny" | "sanitize";
            findings?: {
                target: "input" | "payload" | "output" | "tool_call";
                severity: "low" | "high" | "critical" | "med";
                ruleKey: string;
                category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                fieldPath: string;
                matchPreview: string;
            }[] | undefined;
            redactions?: string[] | undefined;
            blockedTools?: string[] | undefined;
            blockedDomains?: string[] | undefined;
            sanitizedPayload?: Record<string, unknown> | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        run: {
            id: string;
            workspaceId: string;
            workflowVersionId: string;
            state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
            correlationId: string;
            triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
            requestedBy: string;
            requestedAt: string;
            idempotencyKey?: string | null | undefined;
            startedAt?: string | null | undefined;
            completedAt?: string | null | undefined;
            slaPolicyId?: string | null | undefined;
            slaDueAt?: string | null | undefined;
            slaViolatedAt?: string | null | undefined;
        };
        approval?: {
            status: "approved" | "denied" | "pending";
            id: string;
            runId: string;
            requiredRole: string;
            createdAt: string;
            decidedAt?: string | null | undefined;
            decidedBy?: string | null | undefined;
        } | null | undefined;
        blocked?: boolean | undefined;
        policyDecisions?: {
            correlationId: string;
            mode: "monitor" | "enforce";
            decision: "allow" | "deny";
            policyId: string;
            ruleId: string;
            reasonCode: string;
            reasonText: string;
            trace: Record<string, unknown>;
        }[] | undefined;
        entitlementDecision?: {
            id: string;
            reasonCode: string;
            reasonText: string;
            entitled: boolean;
        } | undefined;
        usageEntry?: {
            id: string;
            quantity: number;
        } | undefined;
        boundaryDecision?: {
            reasonCode: string;
            reasonText: string;
            action: "allow" | "block" | "redact" | "mask" | "escalate";
            tags: string[];
            maskedFields: string[];
            policyId?: string | undefined;
            ruleId?: string | undefined;
            classification?: string | undefined;
        } | null | undefined;
        firewallDecision?: {
            score: number;
            reasonCode: string;
            reasonText: string;
            action: "allow" | "deny" | "sanitize";
            findings: {
                target: "input" | "payload" | "output" | "tool_call";
                severity: "low" | "high" | "critical" | "med";
                ruleKey: string;
                category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                fieldPath: string;
                matchPreview: string;
            }[];
            redactions: string[];
            blockedTools: string[];
            blockedDomains: string[];
            sanitizedPayload?: Record<string, unknown> | undefined;
        } | null | undefined;
    }, {
        run: {
            id: string;
            workspaceId: string;
            workflowVersionId: string;
            state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
            correlationId: string;
            triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
            requestedBy: string;
            requestedAt: string;
            idempotencyKey?: string | null | undefined;
            startedAt?: string | null | undefined;
            completedAt?: string | null | undefined;
            slaPolicyId?: string | null | undefined;
            slaDueAt?: string | null | undefined;
            slaViolatedAt?: string | null | undefined;
        };
        approval?: {
            status: "approved" | "denied" | "pending";
            id: string;
            runId: string;
            requiredRole: string;
            createdAt: string;
            decidedAt?: string | null | undefined;
            decidedBy?: string | null | undefined;
        } | null | undefined;
        blocked?: boolean | undefined;
        policyDecisions?: {
            correlationId: string;
            mode: "monitor" | "enforce";
            decision: "allow" | "deny";
            policyId: string;
            ruleId: string;
            reasonCode: string;
            reasonText: string;
            trace: Record<string, unknown>;
        }[] | undefined;
        entitlementDecision?: {
            id: string;
            reasonCode: string;
            reasonText: string;
            entitled: boolean;
        } | undefined;
        usageEntry?: {
            id: string;
            quantity: number;
        } | undefined;
        boundaryDecision?: {
            reasonCode: string;
            reasonText: string;
            action: "allow" | "block" | "redact" | "mask" | "escalate";
            policyId?: string | undefined;
            ruleId?: string | undefined;
            classification?: string | undefined;
            tags?: string[] | undefined;
            maskedFields?: string[] | undefined;
        } | null | undefined;
        firewallDecision?: {
            score: number;
            reasonCode: string;
            reasonText: string;
            action: "allow" | "deny" | "sanitize";
            findings?: {
                target: "input" | "payload" | "output" | "tool_call";
                severity: "low" | "high" | "critical" | "med";
                ruleKey: string;
                category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                fieldPath: string;
                matchPreview: string;
            }[] | undefined;
            redactions?: string[] | undefined;
            blockedTools?: string[] | undefined;
            blockedDomains?: string[] | undefined;
            sanitizedPayload?: Record<string, unknown> | undefined;
        } | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    session: {
        sessionId: string;
        workspaceId: string;
        createdAt: string;
        agent: string;
        workflowVersionId?: string | undefined;
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
        subject?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        expiresAt?: string | undefined;
    };
    execution: {
        run: {
            id: string;
            workspaceId: string;
            workflowVersionId: string;
            state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
            correlationId: string;
            triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
            requestedBy: string;
            requestedAt: string;
            idempotencyKey?: string | null | undefined;
            startedAt?: string | null | undefined;
            completedAt?: string | null | undefined;
            slaPolicyId?: string | null | undefined;
            slaDueAt?: string | null | undefined;
            slaViolatedAt?: string | null | undefined;
        };
        approval?: {
            status: "approved" | "denied" | "pending";
            id: string;
            runId: string;
            requiredRole: string;
            createdAt: string;
            decidedAt?: string | null | undefined;
            decidedBy?: string | null | undefined;
        } | null | undefined;
        blocked?: boolean | undefined;
        policyDecisions?: {
            correlationId: string;
            mode: "monitor" | "enforce";
            decision: "allow" | "deny";
            policyId: string;
            ruleId: string;
            reasonCode: string;
            reasonText: string;
            trace: Record<string, unknown>;
        }[] | undefined;
        entitlementDecision?: {
            id: string;
            reasonCode: string;
            reasonText: string;
            entitled: boolean;
        } | undefined;
        usageEntry?: {
            id: string;
            quantity: number;
        } | undefined;
        boundaryDecision?: {
            reasonCode: string;
            reasonText: string;
            action: "allow" | "block" | "redact" | "mask" | "escalate";
            tags: string[];
            maskedFields: string[];
            policyId?: string | undefined;
            ruleId?: string | undefined;
            classification?: string | undefined;
        } | null | undefined;
        firewallDecision?: {
            score: number;
            reasonCode: string;
            reasonText: string;
            action: "allow" | "deny" | "sanitize";
            findings: {
                target: "input" | "payload" | "output" | "tool_call";
                severity: "low" | "high" | "critical" | "med";
                ruleKey: string;
                category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                fieldPath: string;
                matchPreview: string;
            }[];
            redactions: string[];
            blockedTools: string[];
            blockedDomains: string[];
            sanitizedPayload?: Record<string, unknown> | undefined;
        } | null | undefined;
    };
}, {
    session: {
        sessionId: string;
        workspaceId: string;
        createdAt: string;
        agent: string;
        workflowVersionId?: string | undefined;
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
        subject?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        expiresAt?: string | undefined;
    };
    execution: {
        run: {
            id: string;
            workspaceId: string;
            workflowVersionId: string;
            state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
            correlationId: string;
            triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
            requestedBy: string;
            requestedAt: string;
            idempotencyKey?: string | null | undefined;
            startedAt?: string | null | undefined;
            completedAt?: string | null | undefined;
            slaPolicyId?: string | null | undefined;
            slaDueAt?: string | null | undefined;
            slaViolatedAt?: string | null | undefined;
        };
        approval?: {
            status: "approved" | "denied" | "pending";
            id: string;
            runId: string;
            requiredRole: string;
            createdAt: string;
            decidedAt?: string | null | undefined;
            decidedBy?: string | null | undefined;
        } | null | undefined;
        blocked?: boolean | undefined;
        policyDecisions?: {
            correlationId: string;
            mode: "monitor" | "enforce";
            decision: "allow" | "deny";
            policyId: string;
            ruleId: string;
            reasonCode: string;
            reasonText: string;
            trace: Record<string, unknown>;
        }[] | undefined;
        entitlementDecision?: {
            id: string;
            reasonCode: string;
            reasonText: string;
            entitled: boolean;
        } | undefined;
        usageEntry?: {
            id: string;
            quantity: number;
        } | undefined;
        boundaryDecision?: {
            reasonCode: string;
            reasonText: string;
            action: "allow" | "block" | "redact" | "mask" | "escalate";
            policyId?: string | undefined;
            ruleId?: string | undefined;
            classification?: string | undefined;
            tags?: string[] | undefined;
            maskedFields?: string[] | undefined;
        } | null | undefined;
        firewallDecision?: {
            score: number;
            reasonCode: string;
            reasonText: string;
            action: "allow" | "deny" | "sanitize";
            findings?: {
                target: "input" | "payload" | "output" | "tool_call";
                severity: "low" | "high" | "critical" | "med";
                ruleKey: string;
                category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                fieldPath: string;
                matchPreview: string;
            }[] | undefined;
            redactions?: string[] | undefined;
            blockedTools?: string[] | undefined;
            blockedDomains?: string[] | undefined;
            sanitizedPayload?: Record<string, unknown> | undefined;
        } | null | undefined;
    };
}>;
declare const V4EphemeralExecutionResponseSchema: z.ZodObject<{
    ok: z.ZodBoolean;
    data: z.ZodNullable<z.ZodObject<{
        session: z.ZodObject<{
            sessionId: z.ZodString;
            workspaceId: z.ZodString;
            agent: z.ZodString;
            subject: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            policy: z.ZodOptional<z.ZodObject<{
                ref: z.ZodString;
                version: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                version: string;
                ref: string;
            }, {
                version: string;
                ref: string;
            }>>;
            route: z.ZodOptional<z.ZodObject<{
                provider: z.ZodOptional<z.ZodString>;
                model: z.ZodOptional<z.ZodString>;
                region: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                provider?: string | undefined;
                model?: string | undefined;
                region?: string | undefined;
            }, {
                provider?: string | undefined;
                model?: string | undefined;
                region?: string | undefined;
            }>>;
            risk: z.ZodOptional<z.ZodObject<{
                score: z.ZodOptional<z.ZodNumber>;
                decision: z.ZodOptional<z.ZodEnum<["allow", "deny", "review"]>>;
            }, "strip", z.ZodTypeAny, {
                score?: number | undefined;
                decision?: "allow" | "deny" | "review" | undefined;
            }, {
                score?: number | undefined;
                decision?: "allow" | "deny" | "review" | undefined;
            }>>;
            workflowVersionId: z.ZodOptional<z.ZodString>;
            createdAt: z.ZodString;
            expiresAt: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            sessionId: string;
            workspaceId: string;
            createdAt: string;
            agent: string;
            workflowVersionId?: string | undefined;
            policy?: {
                version: string;
                ref: string;
            } | undefined;
            route?: {
                provider?: string | undefined;
                model?: string | undefined;
                region?: string | undefined;
            } | undefined;
            risk?: {
                score?: number | undefined;
                decision?: "allow" | "deny" | "review" | undefined;
            } | undefined;
            subject?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            expiresAt?: string | undefined;
        }, {
            sessionId: string;
            workspaceId: string;
            createdAt: string;
            agent: string;
            workflowVersionId?: string | undefined;
            policy?: {
                version: string;
                ref: string;
            } | undefined;
            route?: {
                provider?: string | undefined;
                model?: string | undefined;
                region?: string | undefined;
            } | undefined;
            risk?: {
                score?: number | undefined;
                decision?: "allow" | "deny" | "review" | undefined;
            } | undefined;
            subject?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            expiresAt?: string | undefined;
        }>;
        execution: z.ZodObject<{
            run: z.ZodObject<{
                id: z.ZodString;
                workspaceId: z.ZodString;
                workflowVersionId: z.ZodString;
                state: z.ZodEnum<["queued", "running", "waiting_approval", "approved", "denied", "succeeded", "failed", "aborted", "timed_out", "canceled"]>;
                correlationId: z.ZodString;
                idempotencyKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                triggerSource: z.ZodEnum<["ui", "api", "sdk", "cli", "hosted", "webhook"]>;
                requestedBy: z.ZodString;
                requestedAt: z.ZodString;
                startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                completedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                slaPolicyId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                slaDueAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                slaViolatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                workspaceId: string;
                workflowVersionId: string;
                state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
                correlationId: string;
                triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
                requestedBy: string;
                requestedAt: string;
                idempotencyKey?: string | null | undefined;
                startedAt?: string | null | undefined;
                completedAt?: string | null | undefined;
                slaPolicyId?: string | null | undefined;
                slaDueAt?: string | null | undefined;
                slaViolatedAt?: string | null | undefined;
            }, {
                id: string;
                workspaceId: string;
                workflowVersionId: string;
                state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
                correlationId: string;
                triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
                requestedBy: string;
                requestedAt: string;
                idempotencyKey?: string | null | undefined;
                startedAt?: string | null | undefined;
                completedAt?: string | null | undefined;
                slaPolicyId?: string | null | undefined;
                slaDueAt?: string | null | undefined;
                slaViolatedAt?: string | null | undefined;
            }>;
            approval: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                id: z.ZodString;
                runId: z.ZodString;
                requiredRole: z.ZodString;
                status: z.ZodEnum<["pending", "approved", "denied"]>;
                createdAt: z.ZodString;
                decidedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                decidedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                status: "approved" | "denied" | "pending";
                id: string;
                runId: string;
                requiredRole: string;
                createdAt: string;
                decidedAt?: string | null | undefined;
                decidedBy?: string | null | undefined;
            }, {
                status: "approved" | "denied" | "pending";
                id: string;
                runId: string;
                requiredRole: string;
                createdAt: string;
                decidedAt?: string | null | undefined;
                decidedBy?: string | null | undefined;
            }>>>;
            blocked: z.ZodOptional<z.ZodBoolean>;
            policyDecisions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                mode: z.ZodEnum<["monitor", "enforce"]>;
                decision: z.ZodEnum<["allow", "deny"]>;
                policyId: z.ZodString;
                ruleId: z.ZodString;
                reasonCode: z.ZodString;
                reasonText: z.ZodString;
                correlationId: z.ZodString;
                trace: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                correlationId: string;
                mode: "monitor" | "enforce";
                decision: "allow" | "deny";
                policyId: string;
                ruleId: string;
                reasonCode: string;
                reasonText: string;
                trace: Record<string, unknown>;
            }, {
                correlationId: string;
                mode: "monitor" | "enforce";
                decision: "allow" | "deny";
                policyId: string;
                ruleId: string;
                reasonCode: string;
                reasonText: string;
                trace: Record<string, unknown>;
            }>, "many">>;
            entitlementDecision: z.ZodOptional<z.ZodObject<{
                id: z.ZodString;
                reasonCode: z.ZodString;
                reasonText: z.ZodString;
                entitled: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                id: string;
                reasonCode: string;
                reasonText: string;
                entitled: boolean;
            }, {
                id: string;
                reasonCode: string;
                reasonText: string;
                entitled: boolean;
            }>>;
            usageEntry: z.ZodOptional<z.ZodObject<{
                id: z.ZodString;
                quantity: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                id: string;
                quantity: number;
            }, {
                id: string;
                quantity: number;
            }>>;
            boundaryDecision: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                action: z.ZodEnum<["allow", "block", "redact", "mask", "escalate"]>;
                reasonCode: z.ZodString;
                reasonText: z.ZodString;
                policyId: z.ZodOptional<z.ZodString>;
                ruleId: z.ZodOptional<z.ZodString>;
                classification: z.ZodOptional<z.ZodString>;
                tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                maskedFields: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                reasonCode: string;
                reasonText: string;
                action: "allow" | "block" | "redact" | "mask" | "escalate";
                tags: string[];
                maskedFields: string[];
                policyId?: string | undefined;
                ruleId?: string | undefined;
                classification?: string | undefined;
            }, {
                reasonCode: string;
                reasonText: string;
                action: "allow" | "block" | "redact" | "mask" | "escalate";
                policyId?: string | undefined;
                ruleId?: string | undefined;
                classification?: string | undefined;
                tags?: string[] | undefined;
                maskedFields?: string[] | undefined;
            }>>>;
            firewallDecision: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                action: z.ZodEnum<["allow", "sanitize", "deny"]>;
                reasonCode: z.ZodString;
                reasonText: z.ZodString;
                findings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    ruleKey: z.ZodString;
                    category: z.ZodEnum<["prompt_injection", "secret", "pii", "malicious_payload"]>;
                    severity: z.ZodEnum<["low", "med", "high", "critical"]>;
                    target: z.ZodEnum<["input", "output", "tool_call", "payload"]>;
                    fieldPath: z.ZodString;
                    matchPreview: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    target: "input" | "payload" | "output" | "tool_call";
                    severity: "low" | "high" | "critical" | "med";
                    ruleKey: string;
                    category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                    fieldPath: string;
                    matchPreview: string;
                }, {
                    target: "input" | "payload" | "output" | "tool_call";
                    severity: "low" | "high" | "critical" | "med";
                    ruleKey: string;
                    category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                    fieldPath: string;
                    matchPreview: string;
                }>, "many">>;
                redactions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                blockedTools: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                blockedDomains: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                sanitizedPayload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                score: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                score: number;
                reasonCode: string;
                reasonText: string;
                action: "allow" | "deny" | "sanitize";
                findings: {
                    target: "input" | "payload" | "output" | "tool_call";
                    severity: "low" | "high" | "critical" | "med";
                    ruleKey: string;
                    category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                    fieldPath: string;
                    matchPreview: string;
                }[];
                redactions: string[];
                blockedTools: string[];
                blockedDomains: string[];
                sanitizedPayload?: Record<string, unknown> | undefined;
            }, {
                score: number;
                reasonCode: string;
                reasonText: string;
                action: "allow" | "deny" | "sanitize";
                findings?: {
                    target: "input" | "payload" | "output" | "tool_call";
                    severity: "low" | "high" | "critical" | "med";
                    ruleKey: string;
                    category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                    fieldPath: string;
                    matchPreview: string;
                }[] | undefined;
                redactions?: string[] | undefined;
                blockedTools?: string[] | undefined;
                blockedDomains?: string[] | undefined;
                sanitizedPayload?: Record<string, unknown> | undefined;
            }>>>;
        }, "strip", z.ZodTypeAny, {
            run: {
                id: string;
                workspaceId: string;
                workflowVersionId: string;
                state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
                correlationId: string;
                triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
                requestedBy: string;
                requestedAt: string;
                idempotencyKey?: string | null | undefined;
                startedAt?: string | null | undefined;
                completedAt?: string | null | undefined;
                slaPolicyId?: string | null | undefined;
                slaDueAt?: string | null | undefined;
                slaViolatedAt?: string | null | undefined;
            };
            approval?: {
                status: "approved" | "denied" | "pending";
                id: string;
                runId: string;
                requiredRole: string;
                createdAt: string;
                decidedAt?: string | null | undefined;
                decidedBy?: string | null | undefined;
            } | null | undefined;
            blocked?: boolean | undefined;
            policyDecisions?: {
                correlationId: string;
                mode: "monitor" | "enforce";
                decision: "allow" | "deny";
                policyId: string;
                ruleId: string;
                reasonCode: string;
                reasonText: string;
                trace: Record<string, unknown>;
            }[] | undefined;
            entitlementDecision?: {
                id: string;
                reasonCode: string;
                reasonText: string;
                entitled: boolean;
            } | undefined;
            usageEntry?: {
                id: string;
                quantity: number;
            } | undefined;
            boundaryDecision?: {
                reasonCode: string;
                reasonText: string;
                action: "allow" | "block" | "redact" | "mask" | "escalate";
                tags: string[];
                maskedFields: string[];
                policyId?: string | undefined;
                ruleId?: string | undefined;
                classification?: string | undefined;
            } | null | undefined;
            firewallDecision?: {
                score: number;
                reasonCode: string;
                reasonText: string;
                action: "allow" | "deny" | "sanitize";
                findings: {
                    target: "input" | "payload" | "output" | "tool_call";
                    severity: "low" | "high" | "critical" | "med";
                    ruleKey: string;
                    category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                    fieldPath: string;
                    matchPreview: string;
                }[];
                redactions: string[];
                blockedTools: string[];
                blockedDomains: string[];
                sanitizedPayload?: Record<string, unknown> | undefined;
            } | null | undefined;
        }, {
            run: {
                id: string;
                workspaceId: string;
                workflowVersionId: string;
                state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
                correlationId: string;
                triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
                requestedBy: string;
                requestedAt: string;
                idempotencyKey?: string | null | undefined;
                startedAt?: string | null | undefined;
                completedAt?: string | null | undefined;
                slaPolicyId?: string | null | undefined;
                slaDueAt?: string | null | undefined;
                slaViolatedAt?: string | null | undefined;
            };
            approval?: {
                status: "approved" | "denied" | "pending";
                id: string;
                runId: string;
                requiredRole: string;
                createdAt: string;
                decidedAt?: string | null | undefined;
                decidedBy?: string | null | undefined;
            } | null | undefined;
            blocked?: boolean | undefined;
            policyDecisions?: {
                correlationId: string;
                mode: "monitor" | "enforce";
                decision: "allow" | "deny";
                policyId: string;
                ruleId: string;
                reasonCode: string;
                reasonText: string;
                trace: Record<string, unknown>;
            }[] | undefined;
            entitlementDecision?: {
                id: string;
                reasonCode: string;
                reasonText: string;
                entitled: boolean;
            } | undefined;
            usageEntry?: {
                id: string;
                quantity: number;
            } | undefined;
            boundaryDecision?: {
                reasonCode: string;
                reasonText: string;
                action: "allow" | "block" | "redact" | "mask" | "escalate";
                policyId?: string | undefined;
                ruleId?: string | undefined;
                classification?: string | undefined;
                tags?: string[] | undefined;
                maskedFields?: string[] | undefined;
            } | null | undefined;
            firewallDecision?: {
                score: number;
                reasonCode: string;
                reasonText: string;
                action: "allow" | "deny" | "sanitize";
                findings?: {
                    target: "input" | "payload" | "output" | "tool_call";
                    severity: "low" | "high" | "critical" | "med";
                    ruleKey: string;
                    category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                    fieldPath: string;
                    matchPreview: string;
                }[] | undefined;
                redactions?: string[] | undefined;
                blockedTools?: string[] | undefined;
                blockedDomains?: string[] | undefined;
                sanitizedPayload?: Record<string, unknown> | undefined;
            } | null | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        session: {
            sessionId: string;
            workspaceId: string;
            createdAt: string;
            agent: string;
            workflowVersionId?: string | undefined;
            policy?: {
                version: string;
                ref: string;
            } | undefined;
            route?: {
                provider?: string | undefined;
                model?: string | undefined;
                region?: string | undefined;
            } | undefined;
            risk?: {
                score?: number | undefined;
                decision?: "allow" | "deny" | "review" | undefined;
            } | undefined;
            subject?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            expiresAt?: string | undefined;
        };
        execution: {
            run: {
                id: string;
                workspaceId: string;
                workflowVersionId: string;
                state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
                correlationId: string;
                triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
                requestedBy: string;
                requestedAt: string;
                idempotencyKey?: string | null | undefined;
                startedAt?: string | null | undefined;
                completedAt?: string | null | undefined;
                slaPolicyId?: string | null | undefined;
                slaDueAt?: string | null | undefined;
                slaViolatedAt?: string | null | undefined;
            };
            approval?: {
                status: "approved" | "denied" | "pending";
                id: string;
                runId: string;
                requiredRole: string;
                createdAt: string;
                decidedAt?: string | null | undefined;
                decidedBy?: string | null | undefined;
            } | null | undefined;
            blocked?: boolean | undefined;
            policyDecisions?: {
                correlationId: string;
                mode: "monitor" | "enforce";
                decision: "allow" | "deny";
                policyId: string;
                ruleId: string;
                reasonCode: string;
                reasonText: string;
                trace: Record<string, unknown>;
            }[] | undefined;
            entitlementDecision?: {
                id: string;
                reasonCode: string;
                reasonText: string;
                entitled: boolean;
            } | undefined;
            usageEntry?: {
                id: string;
                quantity: number;
            } | undefined;
            boundaryDecision?: {
                reasonCode: string;
                reasonText: string;
                action: "allow" | "block" | "redact" | "mask" | "escalate";
                tags: string[];
                maskedFields: string[];
                policyId?: string | undefined;
                ruleId?: string | undefined;
                classification?: string | undefined;
            } | null | undefined;
            firewallDecision?: {
                score: number;
                reasonCode: string;
                reasonText: string;
                action: "allow" | "deny" | "sanitize";
                findings: {
                    target: "input" | "payload" | "output" | "tool_call";
                    severity: "low" | "high" | "critical" | "med";
                    ruleKey: string;
                    category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                    fieldPath: string;
                    matchPreview: string;
                }[];
                redactions: string[];
                blockedTools: string[];
                blockedDomains: string[];
                sanitizedPayload?: Record<string, unknown> | undefined;
            } | null | undefined;
        };
    }, {
        session: {
            sessionId: string;
            workspaceId: string;
            createdAt: string;
            agent: string;
            workflowVersionId?: string | undefined;
            policy?: {
                version: string;
                ref: string;
            } | undefined;
            route?: {
                provider?: string | undefined;
                model?: string | undefined;
                region?: string | undefined;
            } | undefined;
            risk?: {
                score?: number | undefined;
                decision?: "allow" | "deny" | "review" | undefined;
            } | undefined;
            subject?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            expiresAt?: string | undefined;
        };
        execution: {
            run: {
                id: string;
                workspaceId: string;
                workflowVersionId: string;
                state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
                correlationId: string;
                triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
                requestedBy: string;
                requestedAt: string;
                idempotencyKey?: string | null | undefined;
                startedAt?: string | null | undefined;
                completedAt?: string | null | undefined;
                slaPolicyId?: string | null | undefined;
                slaDueAt?: string | null | undefined;
                slaViolatedAt?: string | null | undefined;
            };
            approval?: {
                status: "approved" | "denied" | "pending";
                id: string;
                runId: string;
                requiredRole: string;
                createdAt: string;
                decidedAt?: string | null | undefined;
                decidedBy?: string | null | undefined;
            } | null | undefined;
            blocked?: boolean | undefined;
            policyDecisions?: {
                correlationId: string;
                mode: "monitor" | "enforce";
                decision: "allow" | "deny";
                policyId: string;
                ruleId: string;
                reasonCode: string;
                reasonText: string;
                trace: Record<string, unknown>;
            }[] | undefined;
            entitlementDecision?: {
                id: string;
                reasonCode: string;
                reasonText: string;
                entitled: boolean;
            } | undefined;
            usageEntry?: {
                id: string;
                quantity: number;
            } | undefined;
            boundaryDecision?: {
                reasonCode: string;
                reasonText: string;
                action: "allow" | "block" | "redact" | "mask" | "escalate";
                policyId?: string | undefined;
                ruleId?: string | undefined;
                classification?: string | undefined;
                tags?: string[] | undefined;
                maskedFields?: string[] | undefined;
            } | null | undefined;
            firewallDecision?: {
                score: number;
                reasonCode: string;
                reasonText: string;
                action: "allow" | "deny" | "sanitize";
                findings?: {
                    target: "input" | "payload" | "output" | "tool_call";
                    severity: "low" | "high" | "critical" | "med";
                    ruleKey: string;
                    category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                    fieldPath: string;
                    matchPreview: string;
                }[] | undefined;
                redactions?: string[] | undefined;
                blockedTools?: string[] | undefined;
                blockedDomains?: string[] | undefined;
                sanitizedPayload?: Record<string, unknown> | undefined;
            } | null | undefined;
        };
    }>>;
    meta: z.ZodObject<{
        requestId: z.ZodString;
        sessionId: z.ZodOptional<z.ZodString>;
        executionId: z.ZodOptional<z.ZodString>;
        lineageId: z.ZodOptional<z.ZodString>;
        policy: z.ZodOptional<z.ZodObject<{
            ref: z.ZodString;
            version: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            version: string;
            ref: string;
        }, {
            version: string;
            ref: string;
        }>>;
        route: z.ZodOptional<z.ZodObject<{
            provider: z.ZodOptional<z.ZodString>;
            model: z.ZodOptional<z.ZodString>;
            region: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        }, {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        }>>;
        risk: z.ZodOptional<z.ZodObject<{
            score: z.ZodOptional<z.ZodNumber>;
            decision: z.ZodOptional<z.ZodEnum<["allow", "deny", "review"]>>;
        }, "strip", z.ZodTypeAny, {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        }, {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        }>>;
        timingMs: z.ZodObject<{
            total: z.ZodNumber;
            policy: z.ZodOptional<z.ZodNumber>;
            route: z.ZodOptional<z.ZodNumber>;
            tool: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            total: number;
            policy?: number | undefined;
            route?: number | undefined;
            tool?: number | undefined;
        }, {
            total: number;
            policy?: number | undefined;
            route?: number | undefined;
            tool?: number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        requestId: string;
        timingMs: {
            total: number;
            policy?: number | undefined;
            route?: number | undefined;
            tool?: number | undefined;
        };
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        sessionId?: string | undefined;
        executionId?: string | undefined;
        lineageId?: string | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
    }, {
        requestId: string;
        timingMs: {
            total: number;
            policy?: number | undefined;
            route?: number | undefined;
            tool?: number | undefined;
        };
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        sessionId?: string | undefined;
        executionId?: string | undefined;
        lineageId?: string | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
    }>;
    error: z.ZodNullable<z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
        status: z.ZodNumber;
        retryable: z.ZodBoolean;
        details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        message: string;
        status: number;
        retryable: boolean;
        details?: Record<string, unknown> | undefined;
    }, {
        code: string;
        message: string;
        status: number;
        retryable: boolean;
        details?: Record<string, unknown> | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    error: {
        code: string;
        message: string;
        status: number;
        retryable: boolean;
        details?: Record<string, unknown> | undefined;
    } | null;
    ok: boolean;
    data: {
        session: {
            sessionId: string;
            workspaceId: string;
            createdAt: string;
            agent: string;
            workflowVersionId?: string | undefined;
            policy?: {
                version: string;
                ref: string;
            } | undefined;
            route?: {
                provider?: string | undefined;
                model?: string | undefined;
                region?: string | undefined;
            } | undefined;
            risk?: {
                score?: number | undefined;
                decision?: "allow" | "deny" | "review" | undefined;
            } | undefined;
            subject?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            expiresAt?: string | undefined;
        };
        execution: {
            run: {
                id: string;
                workspaceId: string;
                workflowVersionId: string;
                state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
                correlationId: string;
                triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
                requestedBy: string;
                requestedAt: string;
                idempotencyKey?: string | null | undefined;
                startedAt?: string | null | undefined;
                completedAt?: string | null | undefined;
                slaPolicyId?: string | null | undefined;
                slaDueAt?: string | null | undefined;
                slaViolatedAt?: string | null | undefined;
            };
            approval?: {
                status: "approved" | "denied" | "pending";
                id: string;
                runId: string;
                requiredRole: string;
                createdAt: string;
                decidedAt?: string | null | undefined;
                decidedBy?: string | null | undefined;
            } | null | undefined;
            blocked?: boolean | undefined;
            policyDecisions?: {
                correlationId: string;
                mode: "monitor" | "enforce";
                decision: "allow" | "deny";
                policyId: string;
                ruleId: string;
                reasonCode: string;
                reasonText: string;
                trace: Record<string, unknown>;
            }[] | undefined;
            entitlementDecision?: {
                id: string;
                reasonCode: string;
                reasonText: string;
                entitled: boolean;
            } | undefined;
            usageEntry?: {
                id: string;
                quantity: number;
            } | undefined;
            boundaryDecision?: {
                reasonCode: string;
                reasonText: string;
                action: "allow" | "block" | "redact" | "mask" | "escalate";
                tags: string[];
                maskedFields: string[];
                policyId?: string | undefined;
                ruleId?: string | undefined;
                classification?: string | undefined;
            } | null | undefined;
            firewallDecision?: {
                score: number;
                reasonCode: string;
                reasonText: string;
                action: "allow" | "deny" | "sanitize";
                findings: {
                    target: "input" | "payload" | "output" | "tool_call";
                    severity: "low" | "high" | "critical" | "med";
                    ruleKey: string;
                    category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                    fieldPath: string;
                    matchPreview: string;
                }[];
                redactions: string[];
                blockedTools: string[];
                blockedDomains: string[];
                sanitizedPayload?: Record<string, unknown> | undefined;
            } | null | undefined;
        };
    } | null;
    meta: {
        requestId: string;
        timingMs: {
            total: number;
            policy?: number | undefined;
            route?: number | undefined;
            tool?: number | undefined;
        };
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        sessionId?: string | undefined;
        executionId?: string | undefined;
        lineageId?: string | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
    };
}, {
    error: {
        code: string;
        message: string;
        status: number;
        retryable: boolean;
        details?: Record<string, unknown> | undefined;
    } | null;
    ok: boolean;
    data: {
        session: {
            sessionId: string;
            workspaceId: string;
            createdAt: string;
            agent: string;
            workflowVersionId?: string | undefined;
            policy?: {
                version: string;
                ref: string;
            } | undefined;
            route?: {
                provider?: string | undefined;
                model?: string | undefined;
                region?: string | undefined;
            } | undefined;
            risk?: {
                score?: number | undefined;
                decision?: "allow" | "deny" | "review" | undefined;
            } | undefined;
            subject?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            expiresAt?: string | undefined;
        };
        execution: {
            run: {
                id: string;
                workspaceId: string;
                workflowVersionId: string;
                state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
                correlationId: string;
                triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
                requestedBy: string;
                requestedAt: string;
                idempotencyKey?: string | null | undefined;
                startedAt?: string | null | undefined;
                completedAt?: string | null | undefined;
                slaPolicyId?: string | null | undefined;
                slaDueAt?: string | null | undefined;
                slaViolatedAt?: string | null | undefined;
            };
            approval?: {
                status: "approved" | "denied" | "pending";
                id: string;
                runId: string;
                requiredRole: string;
                createdAt: string;
                decidedAt?: string | null | undefined;
                decidedBy?: string | null | undefined;
            } | null | undefined;
            blocked?: boolean | undefined;
            policyDecisions?: {
                correlationId: string;
                mode: "monitor" | "enforce";
                decision: "allow" | "deny";
                policyId: string;
                ruleId: string;
                reasonCode: string;
                reasonText: string;
                trace: Record<string, unknown>;
            }[] | undefined;
            entitlementDecision?: {
                id: string;
                reasonCode: string;
                reasonText: string;
                entitled: boolean;
            } | undefined;
            usageEntry?: {
                id: string;
                quantity: number;
            } | undefined;
            boundaryDecision?: {
                reasonCode: string;
                reasonText: string;
                action: "allow" | "block" | "redact" | "mask" | "escalate";
                policyId?: string | undefined;
                ruleId?: string | undefined;
                classification?: string | undefined;
                tags?: string[] | undefined;
                maskedFields?: string[] | undefined;
            } | null | undefined;
            firewallDecision?: {
                score: number;
                reasonCode: string;
                reasonText: string;
                action: "allow" | "deny" | "sanitize";
                findings?: {
                    target: "input" | "payload" | "output" | "tool_call";
                    severity: "low" | "high" | "critical" | "med";
                    ruleKey: string;
                    category: "prompt_injection" | "secret" | "pii" | "malicious_payload";
                    fieldPath: string;
                    matchPreview: string;
                }[] | undefined;
                redactions?: string[] | undefined;
                blockedTools?: string[] | undefined;
                blockedDomains?: string[] | undefined;
                sanitizedPayload?: Record<string, unknown> | undefined;
            } | null | undefined;
        };
    } | null;
    meta: {
        requestId: string;
        timingMs: {
            total: number;
            policy?: number | undefined;
            route?: number | undefined;
            tool?: number | undefined;
        };
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        sessionId?: string | undefined;
        executionId?: string | undefined;
        lineageId?: string | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
    };
}>;
declare const RunEventsResponseSchema: z.ZodObject<{
    events: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        runId: z.ZodString;
        type: z.ZodString;
        payload: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        id: string;
        runId: string;
        createdAt: string;
        payload: Record<string, unknown>;
    }, {
        type: string;
        id: string;
        runId: string;
        createdAt: string;
        payload: Record<string, unknown>;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    events: {
        type: string;
        id: string;
        runId: string;
        createdAt: string;
        payload: Record<string, unknown>;
    }[];
}, {
    events: {
        type: string;
        id: string;
        runId: string;
        createdAt: string;
        payload: Record<string, unknown>;
    }[];
}>;
declare const ApprovalsListSchema: z.ZodObject<{
    approvals: z.ZodArray<z.ZodObject<{
        approval: z.ZodObject<{
            id: z.ZodString;
            runId: z.ZodString;
            requiredRole: z.ZodString;
            status: z.ZodEnum<["pending", "approved", "denied"]>;
            createdAt: z.ZodString;
            decidedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            decidedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            status: "approved" | "denied" | "pending";
            id: string;
            runId: string;
            requiredRole: string;
            createdAt: string;
            decidedAt?: string | null | undefined;
            decidedBy?: string | null | undefined;
        }, {
            status: "approved" | "denied" | "pending";
            id: string;
            runId: string;
            requiredRole: string;
            createdAt: string;
            decidedAt?: string | null | undefined;
            decidedBy?: string | null | undefined;
        }>;
        run: z.ZodObject<{
            id: z.ZodString;
            workspaceId: z.ZodString;
            workflowVersionId: z.ZodString;
            state: z.ZodEnum<["queued", "running", "waiting_approval", "approved", "denied", "succeeded", "failed", "aborted", "timed_out", "canceled"]>;
            correlationId: z.ZodString;
            idempotencyKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            triggerSource: z.ZodEnum<["ui", "api", "sdk", "cli", "hosted", "webhook"]>;
            requestedBy: z.ZodString;
            requestedAt: z.ZodString;
            startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            completedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            slaPolicyId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            slaDueAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            slaViolatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            workspaceId: string;
            workflowVersionId: string;
            state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
            correlationId: string;
            triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
            requestedBy: string;
            requestedAt: string;
            idempotencyKey?: string | null | undefined;
            startedAt?: string | null | undefined;
            completedAt?: string | null | undefined;
            slaPolicyId?: string | null | undefined;
            slaDueAt?: string | null | undefined;
            slaViolatedAt?: string | null | undefined;
        }, {
            id: string;
            workspaceId: string;
            workflowVersionId: string;
            state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
            correlationId: string;
            triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
            requestedBy: string;
            requestedAt: string;
            idempotencyKey?: string | null | undefined;
            startedAt?: string | null | undefined;
            completedAt?: string | null | undefined;
            slaPolicyId?: string | null | undefined;
            slaDueAt?: string | null | undefined;
            slaViolatedAt?: string | null | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        run: {
            id: string;
            workspaceId: string;
            workflowVersionId: string;
            state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
            correlationId: string;
            triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
            requestedBy: string;
            requestedAt: string;
            idempotencyKey?: string | null | undefined;
            startedAt?: string | null | undefined;
            completedAt?: string | null | undefined;
            slaPolicyId?: string | null | undefined;
            slaDueAt?: string | null | undefined;
            slaViolatedAt?: string | null | undefined;
        };
        approval: {
            status: "approved" | "denied" | "pending";
            id: string;
            runId: string;
            requiredRole: string;
            createdAt: string;
            decidedAt?: string | null | undefined;
            decidedBy?: string | null | undefined;
        };
    }, {
        run: {
            id: string;
            workspaceId: string;
            workflowVersionId: string;
            state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
            correlationId: string;
            triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
            requestedBy: string;
            requestedAt: string;
            idempotencyKey?: string | null | undefined;
            startedAt?: string | null | undefined;
            completedAt?: string | null | undefined;
            slaPolicyId?: string | null | undefined;
            slaDueAt?: string | null | undefined;
            slaViolatedAt?: string | null | undefined;
        };
        approval: {
            status: "approved" | "denied" | "pending";
            id: string;
            runId: string;
            requiredRole: string;
            createdAt: string;
            decidedAt?: string | null | undefined;
            decidedBy?: string | null | undefined;
        };
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    approvals: {
        run: {
            id: string;
            workspaceId: string;
            workflowVersionId: string;
            state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
            correlationId: string;
            triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
            requestedBy: string;
            requestedAt: string;
            idempotencyKey?: string | null | undefined;
            startedAt?: string | null | undefined;
            completedAt?: string | null | undefined;
            slaPolicyId?: string | null | undefined;
            slaDueAt?: string | null | undefined;
            slaViolatedAt?: string | null | undefined;
        };
        approval: {
            status: "approved" | "denied" | "pending";
            id: string;
            runId: string;
            requiredRole: string;
            createdAt: string;
            decidedAt?: string | null | undefined;
            decidedBy?: string | null | undefined;
        };
    }[];
}, {
    approvals: {
        run: {
            id: string;
            workspaceId: string;
            workflowVersionId: string;
            state: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
            correlationId: string;
            triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
            requestedBy: string;
            requestedAt: string;
            idempotencyKey?: string | null | undefined;
            startedAt?: string | null | undefined;
            completedAt?: string | null | undefined;
            slaPolicyId?: string | null | undefined;
            slaDueAt?: string | null | undefined;
            slaViolatedAt?: string | null | undefined;
        };
        approval: {
            status: "approved" | "denied" | "pending";
            id: string;
            runId: string;
            requiredRole: string;
            createdAt: string;
            decidedAt?: string | null | undefined;
            decidedBy?: string | null | undefined;
        };
    }[];
}>;
declare const DeployResponseSchema: z.ZodObject<{
    project: z.ZodObject<{
        id: z.ZodString;
        workspaceId: z.ZodString;
        name: z.ZodString;
        createdBy: z.ZodString;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        workspaceId: string;
        createdAt: string;
        name: string;
        createdBy: string;
        updatedAt: string;
    }, {
        id: string;
        workspaceId: string;
        createdAt: string;
        name: string;
        createdBy: string;
        updatedAt: string;
    }>;
    workflow: z.ZodObject<{
        id: z.ZodString;
        projectId: z.ZodString;
        workspaceId: z.ZodString;
        name: z.ZodString;
        status: z.ZodEnum<["draft", "published", "archived"]>;
        createdBy: z.ZodString;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "draft" | "published" | "archived";
        id: string;
        workspaceId: string;
        createdAt: string;
        name: string;
        createdBy: string;
        updatedAt: string;
        projectId: string;
    }, {
        status: "draft" | "published" | "archived";
        id: string;
        workspaceId: string;
        createdAt: string;
        name: string;
        createdBy: string;
        updatedAt: string;
        projectId: string;
    }>;
    draft: z.ZodObject<{
        workflowId: z.ZodString;
        workspaceId: z.ZodString;
        version: z.ZodNumber;
        nodes: z.ZodArray<z.ZodUnknown, "many">;
        edges: z.ZodArray<z.ZodUnknown, "many">;
        viewport: z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
            zoom: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
            zoom: number;
        }, {
            x: number;
            y: number;
            zoom: number;
        }>;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        workspaceId: string;
        updatedAt: string;
        workflowId: string;
        version: number;
        nodes: unknown[];
        edges: unknown[];
        viewport: {
            x: number;
            y: number;
            zoom: number;
        };
    }, {
        workspaceId: string;
        updatedAt: string;
        workflowId: string;
        version: number;
        nodes: unknown[];
        edges: unknown[];
        viewport: {
            x: number;
            y: number;
            zoom: number;
        };
    }>;
    compile: z.ZodObject<{
        checksum: z.ZodString;
        mutationNodeIds: z.ZodArray<z.ZodString, "many">;
        compiledPlan: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        checksum: string;
        mutationNodeIds: string[];
        compiledPlan: Record<string, unknown>;
    }, {
        checksum: string;
        mutationNodeIds: string[];
        compiledPlan: Record<string, unknown>;
    }>;
}, "strip", z.ZodTypeAny, {
    project: {
        id: string;
        workspaceId: string;
        createdAt: string;
        name: string;
        createdBy: string;
        updatedAt: string;
    };
    workflow: {
        status: "draft" | "published" | "archived";
        id: string;
        workspaceId: string;
        createdAt: string;
        name: string;
        createdBy: string;
        updatedAt: string;
        projectId: string;
    };
    draft: {
        workspaceId: string;
        updatedAt: string;
        workflowId: string;
        version: number;
        nodes: unknown[];
        edges: unknown[];
        viewport: {
            x: number;
            y: number;
            zoom: number;
        };
    };
    compile: {
        checksum: string;
        mutationNodeIds: string[];
        compiledPlan: Record<string, unknown>;
    };
}, {
    project: {
        id: string;
        workspaceId: string;
        createdAt: string;
        name: string;
        createdBy: string;
        updatedAt: string;
    };
    workflow: {
        status: "draft" | "published" | "archived";
        id: string;
        workspaceId: string;
        createdAt: string;
        name: string;
        createdBy: string;
        updatedAt: string;
        projectId: string;
    };
    draft: {
        workspaceId: string;
        updatedAt: string;
        workflowId: string;
        version: number;
        nodes: unknown[];
        edges: unknown[];
        viewport: {
            x: number;
            y: number;
            zoom: number;
        };
    };
    compile: {
        checksum: string;
        mutationNodeIds: string[];
        compiledPlan: Record<string, unknown>;
    };
}>;
declare const ConnectorRecordSchema: z.ZodObject<{
    id: z.ZodString;
    workspaceId: z.ZodString;
    name: z.ZodString;
    connectorType: z.ZodString;
    status: z.ZodEnum<["active", "disabled"]>;
    config: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    createdBy: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "active" | "disabled";
    id: string;
    workspaceId: string;
    createdAt: string;
    name: string;
    createdBy: string;
    updatedAt: string;
    connectorType: string;
    config: Record<string, unknown>;
}, {
    status: "active" | "disabled";
    id: string;
    workspaceId: string;
    createdAt: string;
    name: string;
    createdBy: string;
    updatedAt: string;
    connectorType: string;
    config: Record<string, unknown>;
}>;
declare const WorkspaceSecretRecordSchema: z.ZodObject<{
    id: z.ZodString;
    workspaceId: z.ZodString;
    connectorId: z.ZodNullable<z.ZodString>;
    name: z.ZodString;
    keyVersion: z.ZodString;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    createdBy: z.ZodString;
    createdAt: z.ZodString;
    rotatedAt: z.ZodNullable<z.ZodString>;
    revokedAt: z.ZodNullable<z.ZodString>;
    maskedValue: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    workspaceId: string;
    createdAt: string;
    metadata: Record<string, unknown>;
    name: string;
    createdBy: string;
    connectorId: string | null;
    keyVersion: string;
    rotatedAt: string | null;
    revokedAt: string | null;
    maskedValue: string;
}, {
    id: string;
    workspaceId: string;
    createdAt: string;
    metadata: Record<string, unknown>;
    name: string;
    createdBy: string;
    connectorId: string | null;
    keyVersion: string;
    rotatedAt: string | null;
    revokedAt: string | null;
    maskedValue: string;
}>;
declare const WorkspaceWebhookRecordSchema: z.ZodObject<{
    id: z.ZodString;
    workspaceId: z.ZodString;
    connectorId: z.ZodNullable<z.ZodString>;
    name: z.ZodString;
    path: z.ZodString;
    targetWorkflowId: z.ZodString;
    status: z.ZodEnum<["active", "disabled"]>;
    eventFilter: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    createdBy: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    lastReceivedAt: z.ZodNullable<z.ZodString>;
    revokedAt: z.ZodNullable<z.ZodString>;
    signingSecretConfigured: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    path: string;
    status: "active" | "disabled";
    id: string;
    workspaceId: string;
    createdAt: string;
    name: string;
    createdBy: string;
    updatedAt: string;
    connectorId: string | null;
    revokedAt: string | null;
    targetWorkflowId: string;
    eventFilter: Record<string, unknown>;
    lastReceivedAt: string | null;
    signingSecretConfigured: boolean;
}, {
    path: string;
    status: "active" | "disabled";
    id: string;
    workspaceId: string;
    createdAt: string;
    name: string;
    createdBy: string;
    updatedAt: string;
    connectorId: string | null;
    revokedAt: string | null;
    targetWorkflowId: string;
    eventFilter: Record<string, unknown>;
    lastReceivedAt: string | null;
    signingSecretConfigured: boolean;
}>;
declare class DriftGateError extends Error {
    readonly code: string;
    readonly status: number;
    readonly correlationId?: string | undefined;
    readonly details?: unknown | undefined;
    constructor(code: string, message: string, status: number, correlationId?: string | undefined, details?: unknown | undefined);
}
type DriftGateClientOptions = {
    baseUrl: string;
    sessionToken?: string;
    apiKey?: string;
    fetchImpl?: typeof fetch;
};
type DriftGateRunInput = {
    workspaceId: string;
    workflowVersionId: string;
    requiresApproval?: boolean;
    requiredRole?: string;
    slaPolicyId?: string;
    idempotencyKey?: string;
    correlationId?: string;
    triggerSource?: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
    input?: Record<string, unknown>;
};
type DriftGateCanonicalMeta = z.infer<typeof CanonicalMetaSchema>;
type DriftGateCanonicalError = z.infer<typeof CanonicalErrorSchema>;
type DriftGateCanonicalErrorCode = (typeof REQUIRED_V4_ERROR_CODES)[number];
type DriftGateCanonicalResponse<T> = {
    ok: boolean;
    data: T | null;
    meta: DriftGateCanonicalMeta;
    error: DriftGateCanonicalError | null;
    raw: unknown;
};
type DriftGateSessionStartInput = z.input<typeof V4SessionStartRequestSchema>;
type DriftGateSessionExecuteInput = z.input<typeof V4ExecutionRequestSchema>;
type DriftGateEphemeralExecuteInput = z.input<typeof V4SessionStartRequestSchema> & {
    input: Record<string, unknown>;
};
type DriftGateSessionStartEnvelope = z.infer<typeof V4SessionStartResponseSchema>;
type DriftGateExecutionEnvelope = z.infer<typeof V4ExecutionResponseSchema>;
type DriftGateEphemeralExecutionEnvelope = z.infer<typeof V4EphemeralExecutionResponseSchema>;
type WaitForTerminalOptions = {
    intervalMs?: number;
    timeoutMs?: number;
};
type DeployWorkflowInput = {
    workspaceId: string;
    workflowYaml: string;
    projectId?: string;
    projectName?: string;
    workflowId?: string;
    workflowName?: string;
};
type ConnectorCreateInput = {
    name: string;
    connectorType: string;
    status?: "active" | "disabled";
    config?: Record<string, unknown>;
};
type ConnectorUpdateInput = {
    name?: string;
    connectorType?: string;
    status?: "active" | "disabled";
    config?: Record<string, unknown>;
};
type SecretCreateInput = {
    connectorId?: string | null;
    name: string;
    value: string;
    keyVersion?: string;
    metadata?: Record<string, unknown>;
};
type SecretUpdateInput = {
    connectorId?: string | null;
    name?: string;
    value?: string;
    keyVersion?: string;
    metadata?: Record<string, unknown>;
};
type WebhookExecutionOptions = {
    requiresApproval?: boolean;
    requiredRole?: string;
    slaPolicyId?: string;
};
type WebhookCreateInput = {
    connectorId?: string | null;
    name: string;
    path: string;
    targetWorkflowId: string;
    status?: "active" | "disabled";
    eventFilter?: Record<string, unknown>;
    execution?: WebhookExecutionOptions;
    signingSecret: string;
};
type WebhookUpdateInput = {
    connectorId?: string | null;
    name?: string;
    path?: string;
    targetWorkflowId?: string;
    status?: "active" | "disabled";
    eventFilter?: Record<string, unknown>;
    execution?: WebhookExecutionOptions;
    signingSecret?: string;
};
type EdgeInterceptorRegisterInput = Omit<EdgeInterceptorRegisterRequest, "workspaceId">;
type FirewallInspectInput = Omit<FirewallInspectRequest, "workspaceId">;
type EdgeInterceptorEnforcementMode = "monitor" | "enforce";
type EdgeInterceptorDecision = {
    allowed: boolean;
    reasonCode: string;
    reasonText: string;
    requiredCapabilities: string[];
    grantedCapabilities: string[];
};
type EdgeInterceptorHooks = {
    beforeRun?: (input: DriftGateRunInput, decision: EdgeInterceptorDecision) => void | Promise<void>;
    onBlocked?: (input: DriftGateRunInput, decision: EdgeInterceptorDecision) => void | Promise<void>;
    afterRun?: (input: DriftGateRunInput, decision: EdgeInterceptorDecision, response: z.infer<typeof RunResponseSchema>) => void | Promise<void>;
};
type EdgeInterceptorEnableInput = {
    workspaceId: string;
    registration: EdgeInterceptorRegisterInput;
    enforcement?: EdgeInterceptorEnforcementMode;
    hooks?: EdgeInterceptorHooks;
};
declare class DriftGateSessionHandle {
    private readonly client;
    readonly session: z.infer<typeof V4SessionResourceSchema>;
    readonly startEnvelope: DriftGateCanonicalResponse<z.infer<typeof V4SessionStartDataSchema>>;
    constructor(client: DriftGateClient, session: z.infer<typeof V4SessionResourceSchema>, startEnvelope: DriftGateCanonicalResponse<z.infer<typeof V4SessionStartDataSchema>>);
    get sessionId(): string;
    get rawEnvelope(): unknown;
    execute(input: DriftGateSessionExecuteInput): Promise<DriftGateCanonicalResponse<z.infer<typeof RunResponseSchema>>>;
}
declare class DriftGateClient {
    private readonly baseUrl;
    private readonly sessionToken?;
    private readonly apiKey?;
    private readonly fetchImpl;
    private edgeInterceptorState;
    readonly session: {
        start: (input: DriftGateSessionStartInput) => Promise<DriftGateSessionHandle>;
    };
    readonly approvals: {
        list: (workspaceId: string, status?: "pending" | "approved" | "denied") => Promise<z.infer<typeof ApprovalsListSchema>["approvals"]>;
        approve: (approvalId: string) => Promise<z.infer<typeof RunResponseSchema>>;
        deny: (approvalId: string) => Promise<z.infer<typeof RunResponseSchema>>;
    };
    readonly connectors: {
        list: (workspaceId: string) => Promise<z.infer<typeof ConnectorRecordSchema>[]>;
        create: (workspaceId: string, input: ConnectorCreateInput) => Promise<z.infer<typeof ConnectorRecordSchema>>;
        update: (workspaceId: string, connectorId: string, input: ConnectorUpdateInput) => Promise<z.infer<typeof ConnectorRecordSchema>>;
        delete: (workspaceId: string, connectorId: string) => Promise<z.infer<typeof ConnectorRecordSchema>>;
    };
    readonly secrets: {
        list: (workspaceId: string) => Promise<z.infer<typeof WorkspaceSecretRecordSchema>[]>;
        create: (workspaceId: string, input: SecretCreateInput) => Promise<z.infer<typeof WorkspaceSecretRecordSchema>>;
        update: (workspaceId: string, secretId: string, input: SecretUpdateInput) => Promise<z.infer<typeof WorkspaceSecretRecordSchema>>;
        delete: (workspaceId: string, secretId: string) => Promise<z.infer<typeof WorkspaceSecretRecordSchema>>;
    };
    readonly webhooks: {
        list: (workspaceId: string) => Promise<z.infer<typeof WorkspaceWebhookRecordSchema>[]>;
        create: (workspaceId: string, input: WebhookCreateInput) => Promise<z.infer<typeof WorkspaceWebhookRecordSchema>>;
        update: (workspaceId: string, webhookId: string, input: WebhookUpdateInput) => Promise<z.infer<typeof WorkspaceWebhookRecordSchema>>;
        delete: (workspaceId: string, webhookId: string) => Promise<z.infer<typeof WorkspaceWebhookRecordSchema>>;
    };
    readonly edgeInterceptors: {
        list: (workspaceId: string) => Promise<EdgeInterceptorRegistration[]>;
        register: (workspaceId: string, input: EdgeInterceptorRegisterInput) => Promise<EdgeInterceptorRegistration>;
        setStatus: (workspaceId: string, registrationId: string, status: EdgeInterceptorStatus) => Promise<EdgeInterceptorRegistration>;
    };
    readonly firewall: {
        inspect: (workspaceId: string, input: FirewallInspectInput) => Promise<FirewallInspectResponse>;
        events: (workspaceId: string) => Promise<FirewallEvent[]>;
    };
    constructor(options: DriftGateClientOptions);
    executeSession(sessionId: string, input: DriftGateSessionExecuteInput): Promise<DriftGateCanonicalResponse<z.infer<typeof RunResponseSchema>>>;
    execute(input: DriftGateEphemeralExecuteInput): Promise<DriftGateCanonicalResponse<z.infer<typeof V4EphemeralExecuteDataSchema>>>;
    enableEdgeMode(input: EdgeInterceptorEnableInput): Promise<EdgeInterceptorRegistration>;
    disableEdgeMode(): void;
    run(input: DriftGateRunInput): Promise<z.infer<typeof RunResponseSchema>>;
    status(runId: string): Promise<z.infer<typeof RunResponseSchema>>;
    events(runId: string): Promise<z.infer<typeof RunEventsResponseSchema>["events"]>;
    waitForTerminal(runId: string, options?: WaitForTerminalOptions): Promise<z.infer<typeof RunResponseSchema>>;
    deployWorkflow(input: DeployWorkflowInput): Promise<z.infer<typeof DeployResponseSchema>>;
    publishWorkflow(workflowId: string, workflowYaml?: string): Promise<WorkflowVersion>;
    private evaluateEdgeDecision;
    private request;
}
type DriftGateRunResponse = z.infer<typeof RunResponseSchema>;
type DriftGateRunEvent = z.infer<typeof RunEventsResponseSchema>["events"][number];
type DriftGatePolicyDecision = PolicyDecision;
type DriftGateEdgeInterceptorRegistration = EdgeInterceptorRegistration;
type DriftGateEdgeInterceptorDecision = EdgeInterceptorDecision;
type DriftGateFirewallInspectInput = FirewallInspectInput;
type DriftGateFirewallInspectResponse = FirewallInspectResponse;
type DriftGateFirewallEvent = FirewallEvent;

export { type ConnectorCreateInput, type ConnectorUpdateInput, type DeployWorkflowInput, type DriftGateCanonicalError, type DriftGateCanonicalErrorCode, type DriftGateCanonicalMeta, type DriftGateCanonicalResponse, DriftGateClient, type DriftGateClientOptions, type DriftGateEdgeInterceptorDecision, type DriftGateEdgeInterceptorRegistration, type DriftGateEphemeralExecuteInput, type DriftGateEphemeralExecutionEnvelope, DriftGateError, type DriftGateExecutionEnvelope, type DriftGateFirewallEvent, type DriftGateFirewallInspectInput, type DriftGateFirewallInspectResponse, type DriftGatePolicyDecision, type DriftGateRunEvent, type DriftGateRunInput, type DriftGateRunResponse, type DriftGateSessionExecuteInput, DriftGateSessionHandle, type DriftGateSessionStartEnvelope, type DriftGateSessionStartInput, type EdgeInterceptorDecision, type EdgeInterceptorEnableInput, type EdgeInterceptorEnforcementMode, type EdgeInterceptorHooks, type EdgeInterceptorRegisterInput, type FirewallInspectInput, type SecretCreateInput, type SecretUpdateInput, type WaitForTerminalOptions, type WebhookCreateInput, type WebhookExecutionOptions, type WebhookUpdateInput };
