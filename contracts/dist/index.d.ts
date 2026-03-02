import { z } from 'zod';

declare const CONTRACT_VERSION = "1.9.0";
declare const AuthSessionSchema: z.ZodObject<{
    sessionId: z.ZodString;
    userId: z.ZodString;
    tenantId: z.ZodString;
    workspaceIds: z.ZodArray<z.ZodString, "many">;
    roles: z.ZodArray<z.ZodString, "many">;
    idpProvider: z.ZodEnum<["google", "github", "email", "saml"]>;
    mfaStatus: z.ZodEnum<["required", "passed", "not-required"]>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    userId: string;
    tenantId: string;
    workspaceIds: string[];
    roles: string[];
    idpProvider: "google" | "github" | "email" | "saml";
    mfaStatus: "required" | "passed" | "not-required";
}, {
    sessionId: string;
    userId: string;
    tenantId: string;
    workspaceIds: string[];
    roles: string[];
    idpProvider: "google" | "github" | "email" | "saml";
    mfaStatus: "required" | "passed" | "not-required";
}>;
declare const WorkspaceRoleBindingSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    userId: z.ZodString;
    role: z.ZodEnum<["owner", "admin", "editor", "viewer", "approver", "billing-admin"]>;
    grantedAt: z.ZodString;
    grantedBy: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
    workspaceId: string;
    role: "owner" | "admin" | "editor" | "viewer" | "approver" | "billing-admin";
    grantedAt: string;
    grantedBy: string;
}, {
    userId: string;
    workspaceId: string;
    role: "owner" | "admin" | "editor" | "viewer" | "approver" | "billing-admin";
    grantedAt: string;
    grantedBy: string;
}>;
declare const WorkflowVersionSchema: z.ZodObject<{
    workflowId: z.ZodString;
    versionId: z.ZodString;
    versionNumber: z.ZodNumber;
    state: z.ZodEnum<["draft", "published", "archived"]>;
    checksum: z.ZodString;
    sourceType: z.ZodOptional<z.ZodEnum<["ui_graph", "workflow_yaml", "api_plan"]>>;
    compiledPlanJson: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    createdAt: z.ZodString;
    publishedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    workflowId: string;
    versionId: string;
    versionNumber: number;
    state: "draft" | "published" | "archived";
    checksum: string;
    createdAt: string;
    sourceType?: "ui_graph" | "workflow_yaml" | "api_plan" | undefined;
    compiledPlanJson?: Record<string, unknown> | undefined;
    publishedAt?: string | undefined;
}, {
    workflowId: string;
    versionId: string;
    versionNumber: number;
    state: "draft" | "published" | "archived";
    checksum: string;
    createdAt: string;
    sourceType?: "ui_graph" | "workflow_yaml" | "api_plan" | undefined;
    compiledPlanJson?: Record<string, unknown> | undefined;
    publishedAt?: string | undefined;
}>;
declare const WorkflowBuilderNodeSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodOptional<z.ZodString>;
    position: z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>;
    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    id: string;
    position: {
        x: number;
        y: number;
    };
    data: Record<string, unknown>;
    type?: string | undefined;
}, {
    id: string;
    position: {
        x: number;
        y: number;
    };
    data: Record<string, unknown>;
    type?: string | undefined;
}>;
declare const WorkflowBuilderEdgeSchema: z.ZodObject<{
    id: z.ZodString;
    source: z.ZodString;
    target: z.ZodString;
    type: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
    data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    source: string;
    target: string;
    type?: string | undefined;
    data?: Record<string, unknown> | undefined;
    label?: string | undefined;
}, {
    id: string;
    source: string;
    target: string;
    type?: string | undefined;
    data?: Record<string, unknown> | undefined;
    label?: string | undefined;
}>;
declare const WorkflowBuilderViewportSchema: z.ZodObject<{
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
declare const WorkflowBuilderDocumentSchema: z.ZodObject<{
    workflowId: z.ZodString;
    version: z.ZodNumber;
    nodes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodOptional<z.ZodString>;
        position: z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>;
        data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        position: {
            x: number;
            y: number;
        };
        data: Record<string, unknown>;
        type?: string | undefined;
    }, {
        id: string;
        position: {
            x: number;
            y: number;
        };
        data: Record<string, unknown>;
        type?: string | undefined;
    }>, "many">;
    edges: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        source: z.ZodString;
        target: z.ZodString;
        type: z.ZodOptional<z.ZodString>;
        label: z.ZodOptional<z.ZodString>;
        data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        source: string;
        target: string;
        type?: string | undefined;
        data?: Record<string, unknown> | undefined;
        label?: string | undefined;
    }, {
        id: string;
        source: string;
        target: string;
        type?: string | undefined;
        data?: Record<string, unknown> | undefined;
        label?: string | undefined;
    }>, "many">;
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
    workflowId: string;
    version: number;
    nodes: {
        id: string;
        position: {
            x: number;
            y: number;
        };
        data: Record<string, unknown>;
        type?: string | undefined;
    }[];
    edges: {
        id: string;
        source: string;
        target: string;
        type?: string | undefined;
        data?: Record<string, unknown> | undefined;
        label?: string | undefined;
    }[];
    viewport: {
        x: number;
        y: number;
        zoom: number;
    };
    updatedAt: string;
}, {
    workflowId: string;
    version: number;
    nodes: {
        id: string;
        position: {
            x: number;
            y: number;
        };
        data: Record<string, unknown>;
        type?: string | undefined;
    }[];
    edges: {
        id: string;
        source: string;
        target: string;
        type?: string | undefined;
        data?: Record<string, unknown> | undefined;
        label?: string | undefined;
    }[];
    viewport: {
        x: number;
        y: number;
        zoom: number;
    };
    updatedAt: string;
}>;
declare const RunStateSchema: z.ZodEnum<["queued", "running", "waiting_approval", "approved", "denied", "succeeded", "failed", "aborted", "timed_out", "canceled"]>;
declare const RunTriggerSourceSchema: z.ZodEnum<["ui", "api", "sdk", "cli", "hosted", "webhook"]>;
declare const GovernedRunRequestSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    workflowVersionId: z.ZodString;
    requiresApproval: z.ZodDefault<z.ZodBoolean>;
    requiredRole: z.ZodOptional<z.ZodString>;
    slaPolicyId: z.ZodOptional<z.ZodString>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
    correlationId: z.ZodOptional<z.ZodString>;
    triggerSource: z.ZodDefault<z.ZodEnum<["ui", "api", "sdk", "cli", "hosted", "webhook"]>>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    workflowVersionId: string;
    requiresApproval: boolean;
    triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
    requiredRole?: string | undefined;
    slaPolicyId?: string | undefined;
    idempotencyKey?: string | undefined;
    correlationId?: string | undefined;
}, {
    workspaceId: string;
    workflowVersionId: string;
    requiresApproval?: boolean | undefined;
    requiredRole?: string | undefined;
    slaPolicyId?: string | undefined;
    idempotencyKey?: string | undefined;
    correlationId?: string | undefined;
    triggerSource?: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook" | undefined;
}>;
declare const HeadlessRunRequestSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    workflowVersionId: z.ZodString;
    requiresApproval: z.ZodDefault<z.ZodBoolean>;
    requiredRole: z.ZodOptional<z.ZodString>;
    slaPolicyId: z.ZodOptional<z.ZodString>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
    correlationId: z.ZodOptional<z.ZodString>;
    triggerSource: z.ZodDefault<z.ZodEnum<["ui", "api", "sdk", "cli", "hosted", "webhook"]>>;
} & {
    input: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    workflowVersionId: string;
    requiresApproval: boolean;
    triggerSource: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook";
    requiredRole?: string | undefined;
    slaPolicyId?: string | undefined;
    idempotencyKey?: string | undefined;
    correlationId?: string | undefined;
    input?: Record<string, unknown> | undefined;
}, {
    workspaceId: string;
    workflowVersionId: string;
    requiresApproval?: boolean | undefined;
    requiredRole?: string | undefined;
    slaPolicyId?: string | undefined;
    idempotencyKey?: string | undefined;
    correlationId?: string | undefined;
    triggerSource?: "ui" | "api" | "sdk" | "cli" | "hosted" | "webhook" | undefined;
    input?: Record<string, unknown> | undefined;
}>;
declare const StructuredErrorEnvelopeSchema: z.ZodObject<{
    code: z.ZodString;
    message: z.ZodString;
    correlation_id: z.ZodOptional<z.ZodString>;
    details: z.ZodOptional<z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    code: string;
    message: string;
    correlation_id?: string | undefined;
    details?: unknown;
}, {
    code: string;
    message: string;
    correlation_id?: string | undefined;
    details?: unknown;
}>;
declare const CanonicalPolicyRefSchema: z.ZodObject<{
    ref: z.ZodString;
    version: z.ZodString;
}, "strip", z.ZodTypeAny, {
    version: string;
    ref: string;
}, {
    version: string;
    ref: string;
}>;
declare const CanonicalRouteRefSchema: z.ZodObject<{
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
}>;
declare const CanonicalRiskMetaSchema: z.ZodObject<{
    score: z.ZodOptional<z.ZodNumber>;
    decision: z.ZodOptional<z.ZodEnum<["allow", "deny", "review"]>>;
}, "strip", z.ZodTypeAny, {
    score?: number | undefined;
    decision?: "allow" | "deny" | "review" | undefined;
}, {
    score?: number | undefined;
    decision?: "allow" | "deny" | "review" | undefined;
}>;
declare const CanonicalTimingMsSchema: z.ZodObject<{
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
declare const CanonicalResponseMetaSchema: z.ZodObject<{
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
    sessionId?: string | undefined;
    policy?: {
        version: string;
        ref: string;
    } | undefined;
    route?: {
        provider?: string | undefined;
        model?: string | undefined;
        region?: string | undefined;
    } | undefined;
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
    sessionId?: string | undefined;
    policy?: {
        version: string;
        ref: string;
    } | undefined;
    route?: {
        provider?: string | undefined;
        model?: string | undefined;
        region?: string | undefined;
    } | undefined;
    executionId?: string | undefined;
    lineageId?: string | undefined;
    risk?: {
        score?: number | undefined;
        decision?: "allow" | "deny" | "review" | undefined;
    } | undefined;
}>;
declare const CanonicalErrorCodeSchema: z.ZodEnum<["AUTH_INVALID", "POLICY_DENIED", "RISK_EXCEEDED", "ROUTE_UNAVAILABLE", "TOOL_BLOCKED", "RATE_LIMITED", "TIMEOUT", "INTERNAL", "INVALID_REQUEST"]>;
declare const CanonicalErrorSchema: z.ZodObject<{
    code: z.ZodEnum<["AUTH_INVALID", "POLICY_DENIED", "RISK_EXCEEDED", "ROUTE_UNAVAILABLE", "TOOL_BLOCKED", "RATE_LIMITED", "TIMEOUT", "INTERNAL", "INVALID_REQUEST"]>;
    message: z.ZodString;
    status: z.ZodNumber;
    retryable: z.ZodBoolean;
    details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    status: number;
    code: "AUTH_INVALID" | "POLICY_DENIED" | "RISK_EXCEEDED" | "ROUTE_UNAVAILABLE" | "TOOL_BLOCKED" | "RATE_LIMITED" | "TIMEOUT" | "INTERNAL" | "INVALID_REQUEST";
    message: string;
    retryable: boolean;
    details?: Record<string, unknown> | undefined;
}, {
    status: number;
    code: "AUTH_INVALID" | "POLICY_DENIED" | "RISK_EXCEEDED" | "ROUTE_UNAVAILABLE" | "TOOL_BLOCKED" | "RATE_LIMITED" | "TIMEOUT" | "INTERNAL" | "INVALID_REQUEST";
    message: string;
    retryable: boolean;
    details?: Record<string, unknown> | undefined;
}>;
declare const CanonicalResponseEnvelopeSchema: <T extends z.ZodTypeAny>(dataSchema: T) => z.ZodObject<{
    ok: z.ZodBoolean;
    data: z.ZodNullable<T>;
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
        sessionId?: string | undefined;
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
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
        sessionId?: string | undefined;
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        executionId?: string | undefined;
        lineageId?: string | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
    }>;
    error: z.ZodNullable<z.ZodObject<{
        code: z.ZodEnum<["AUTH_INVALID", "POLICY_DENIED", "RISK_EXCEEDED", "ROUTE_UNAVAILABLE", "TOOL_BLOCKED", "RATE_LIMITED", "TIMEOUT", "INTERNAL", "INVALID_REQUEST"]>;
        message: z.ZodString;
        status: z.ZodNumber;
        retryable: z.ZodBoolean;
        details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        status: number;
        code: "AUTH_INVALID" | "POLICY_DENIED" | "RISK_EXCEEDED" | "ROUTE_UNAVAILABLE" | "TOOL_BLOCKED" | "RATE_LIMITED" | "TIMEOUT" | "INTERNAL" | "INVALID_REQUEST";
        message: string;
        retryable: boolean;
        details?: Record<string, unknown> | undefined;
    }, {
        status: number;
        code: "AUTH_INVALID" | "POLICY_DENIED" | "RISK_EXCEEDED" | "ROUTE_UNAVAILABLE" | "TOOL_BLOCKED" | "RATE_LIMITED" | "TIMEOUT" | "INTERNAL" | "INVALID_REQUEST";
        message: string;
        retryable: boolean;
        details?: Record<string, unknown> | undefined;
    }>>;
}, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    ok: z.ZodBoolean;
    data: z.ZodNullable<T>;
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
        sessionId?: string | undefined;
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
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
        sessionId?: string | undefined;
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        executionId?: string | undefined;
        lineageId?: string | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
    }>;
    error: z.ZodNullable<z.ZodObject<{
        code: z.ZodEnum<["AUTH_INVALID", "POLICY_DENIED", "RISK_EXCEEDED", "ROUTE_UNAVAILABLE", "TOOL_BLOCKED", "RATE_LIMITED", "TIMEOUT", "INTERNAL", "INVALID_REQUEST"]>;
        message: z.ZodString;
        status: z.ZodNumber;
        retryable: z.ZodBoolean;
        details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        status: number;
        code: "AUTH_INVALID" | "POLICY_DENIED" | "RISK_EXCEEDED" | "ROUTE_UNAVAILABLE" | "TOOL_BLOCKED" | "RATE_LIMITED" | "TIMEOUT" | "INTERNAL" | "INVALID_REQUEST";
        message: string;
        retryable: boolean;
        details?: Record<string, unknown> | undefined;
    }, {
        status: number;
        code: "AUTH_INVALID" | "POLICY_DENIED" | "RISK_EXCEEDED" | "ROUTE_UNAVAILABLE" | "TOOL_BLOCKED" | "RATE_LIMITED" | "TIMEOUT" | "INTERNAL" | "INVALID_REQUEST";
        message: string;
        retryable: boolean;
        details?: Record<string, unknown> | undefined;
    }>>;
}>, any> extends infer T_1 ? { [k in keyof T_1]: T_1[k]; } : never, z.baseObjectInputType<{
    ok: z.ZodBoolean;
    data: z.ZodNullable<T>;
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
        sessionId?: string | undefined;
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
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
        sessionId?: string | undefined;
        policy?: {
            version: string;
            ref: string;
        } | undefined;
        route?: {
            provider?: string | undefined;
            model?: string | undefined;
            region?: string | undefined;
        } | undefined;
        executionId?: string | undefined;
        lineageId?: string | undefined;
        risk?: {
            score?: number | undefined;
            decision?: "allow" | "deny" | "review" | undefined;
        } | undefined;
    }>;
    error: z.ZodNullable<z.ZodObject<{
        code: z.ZodEnum<["AUTH_INVALID", "POLICY_DENIED", "RISK_EXCEEDED", "ROUTE_UNAVAILABLE", "TOOL_BLOCKED", "RATE_LIMITED", "TIMEOUT", "INTERNAL", "INVALID_REQUEST"]>;
        message: z.ZodString;
        status: z.ZodNumber;
        retryable: z.ZodBoolean;
        details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        status: number;
        code: "AUTH_INVALID" | "POLICY_DENIED" | "RISK_EXCEEDED" | "ROUTE_UNAVAILABLE" | "TOOL_BLOCKED" | "RATE_LIMITED" | "TIMEOUT" | "INTERNAL" | "INVALID_REQUEST";
        message: string;
        retryable: boolean;
        details?: Record<string, unknown> | undefined;
    }, {
        status: number;
        code: "AUTH_INVALID" | "POLICY_DENIED" | "RISK_EXCEEDED" | "ROUTE_UNAVAILABLE" | "TOOL_BLOCKED" | "RATE_LIMITED" | "TIMEOUT" | "INTERNAL" | "INVALID_REQUEST";
        message: string;
        retryable: boolean;
        details?: Record<string, unknown> | undefined;
    }>>;
}> extends infer T_2 ? { [k_1 in keyof T_2]: T_2[k_1]; } : never>;
declare const V4SessionStartRequestSchema: z.ZodObject<{
    workspaceId: z.ZodOptional<z.ZodString>;
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
    expiresAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    agent: string;
    workspaceId?: string | undefined;
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
    agent: string;
    workspaceId?: string | undefined;
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
declare const V4SessionResourceSchema: z.ZodObject<{
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
declare const V4ExecutionRequestSchema: z.ZodObject<{
    input: z.ZodRecord<z.ZodString, z.ZodUnknown>;
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
}, "strip", z.ZodTypeAny, {
    input: Record<string, unknown>;
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
}, {
    input: Record<string, unknown>;
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
}>;
declare const V4ExecutionResultSchema: z.ZodObject<{
    run: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    approval: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    blocked: z.ZodBoolean;
    policyDecisions: z.ZodDefault<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
    entitlementDecision: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    usageEntry: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    boundaryDecision: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    firewallDecision: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
}, "strip", z.ZodTypeAny, {
    run: Record<string, unknown>;
    blocked: boolean;
    policyDecisions: Record<string, unknown>[];
    entitlementDecision: Record<string, unknown>;
    usageEntry: Record<string, unknown>;
    approval?: Record<string, unknown> | null | undefined;
    boundaryDecision?: Record<string, unknown> | null | undefined;
    firewallDecision?: Record<string, unknown> | null | undefined;
}, {
    run: Record<string, unknown>;
    blocked: boolean;
    entitlementDecision: Record<string, unknown>;
    usageEntry: Record<string, unknown>;
    approval?: Record<string, unknown> | null | undefined;
    policyDecisions?: Record<string, unknown>[] | undefined;
    boundaryDecision?: Record<string, unknown> | null | undefined;
    firewallDecision?: Record<string, unknown> | null | undefined;
}>;
declare const V4EphemeralExecuteRequestSchema: z.ZodObject<Omit<{
    workspaceId: z.ZodOptional<z.ZodString>;
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
    expiresAt: z.ZodOptional<z.ZodString>;
}, "expiresAt"> & {
    input: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    input: Record<string, unknown>;
    agent: string;
    workspaceId?: string | undefined;
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
}, {
    input: Record<string, unknown>;
    agent: string;
    workspaceId?: string | undefined;
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
}>;
declare const RunStateTransitionSchema: z.ZodObject<{
    runId: z.ZodString;
    from: z.ZodEnum<["queued", "running", "waiting_approval", "approved", "denied", "succeeded", "failed", "aborted", "timed_out", "canceled"]>;
    to: z.ZodEnum<["queued", "running", "waiting_approval", "approved", "denied", "succeeded", "failed", "aborted", "timed_out", "canceled"]>;
    occurredAt: z.ZodString;
    actor: z.ZodOptional<z.ZodString>;
    reason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    runId: string;
    from: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
    to: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
    occurredAt: string;
    actor?: string | undefined;
    reason?: string | undefined;
}, {
    runId: string;
    from: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
    to: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
    occurredAt: string;
    actor?: string | undefined;
    reason?: string | undefined;
}>;
declare const PolicyDecisionSchema: z.ZodObject<{
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
    decision: "allow" | "deny";
    mode: "monitor" | "enforce";
    policyId: string;
    ruleId: string;
    reasonCode: string;
    reasonText: string;
    trace: Record<string, unknown>;
}, {
    correlationId: string;
    decision: "allow" | "deny";
    mode: "monitor" | "enforce";
    policyId: string;
    ruleId: string;
    reasonCode: string;
    reasonText: string;
    trace: Record<string, unknown>;
}>;
declare const PolicyExitGateEvidenceSchema: z.ZodObject<{
    runId: z.ZodString;
    runState: z.ZodEnum<["queued", "running", "waiting_approval", "approved", "denied", "succeeded", "failed", "aborted", "timed_out", "canceled"]>;
    blocked: z.ZodBoolean;
    traceComplete: z.ZodBoolean;
    decisionCount: z.ZodNumber;
    blockingDecision: z.ZodNullable<z.ZodObject<{
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
        decision: "allow" | "deny";
        mode: "monitor" | "enforce";
        policyId: string;
        ruleId: string;
        reasonCode: string;
        reasonText: string;
        trace: Record<string, unknown>;
    }, {
        correlationId: string;
        decision: "allow" | "deny";
        mode: "monitor" | "enforce";
        policyId: string;
        ruleId: string;
        reasonCode: string;
        reasonText: string;
        trace: Record<string, unknown>;
    }>>;
    denialEvent: z.ZodNullable<z.ZodObject<{
        eventId: z.ZodString;
        occurredAt: z.ZodString;
        policyId: z.ZodString;
        ruleId: z.ZodString;
        reasonCode: z.ZodString;
        reasonText: z.ZodString;
        correlationId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        correlationId: string;
        occurredAt: string;
        policyId: string;
        ruleId: string;
        reasonCode: string;
        reasonText: string;
        eventId: string;
    }, {
        correlationId: string;
        occurredAt: string;
        policyId: string;
        ruleId: string;
        reasonCode: string;
        reasonText: string;
        eventId: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    blocked: boolean;
    runId: string;
    runState: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
    traceComplete: boolean;
    decisionCount: number;
    blockingDecision: {
        correlationId: string;
        decision: "allow" | "deny";
        mode: "monitor" | "enforce";
        policyId: string;
        ruleId: string;
        reasonCode: string;
        reasonText: string;
        trace: Record<string, unknown>;
    } | null;
    denialEvent: {
        correlationId: string;
        occurredAt: string;
        policyId: string;
        ruleId: string;
        reasonCode: string;
        reasonText: string;
        eventId: string;
    } | null;
}, {
    blocked: boolean;
    runId: string;
    runState: "aborted" | "queued" | "running" | "waiting_approval" | "approved" | "denied" | "succeeded" | "failed" | "timed_out" | "canceled";
    traceComplete: boolean;
    decisionCount: number;
    blockingDecision: {
        correlationId: string;
        decision: "allow" | "deny";
        mode: "monitor" | "enforce";
        policyId: string;
        ruleId: string;
        reasonCode: string;
        reasonText: string;
        trace: Record<string, unknown>;
    } | null;
    denialEvent: {
        correlationId: string;
        occurredAt: string;
        policyId: string;
        ruleId: string;
        reasonCode: string;
        reasonText: string;
        eventId: string;
    } | null;
}>;
declare const EntitlementDecisionSchema: z.ZodObject<{
    tenantId: z.ZodString;
    plan: z.ZodString;
    entitled: z.ZodBoolean;
    denialReason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    tenantId: string;
    plan: string;
    entitled: boolean;
    denialReason?: string | undefined;
}, {
    tenantId: string;
    plan: string;
    entitled: boolean;
    denialReason?: string | undefined;
}>;
declare const ArtifactManifestItemSchema: z.ZodObject<{
    artifactId: z.ZodString;
    runId: z.ZodString;
    path: z.ZodString;
    type: z.ZodString;
    sha256: z.ZodString;
    sizeBytes: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    path: string;
    type: string;
    runId: string;
    artifactId: string;
    sha256: string;
    sizeBytes: number;
}, {
    path: string;
    type: string;
    runId: string;
    artifactId: string;
    sha256: string;
    sizeBytes: number;
}>;
declare const ControlFailureSchema: z.ZodObject<{
    jobId: z.ZodString;
    failureCategory: z.ZodEnum<["cursor-drift", "missing-run-script", "policy-deny", "network", "dependency-timeout", "unknown"]>;
    firstFailure: z.ZodString;
    blockedUntil: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    jobId: string;
    failureCategory: "unknown" | "cursor-drift" | "missing-run-script" | "policy-deny" | "network" | "dependency-timeout";
    firstFailure: string;
    blockedUntil?: string | undefined;
}, {
    jobId: string;
    failureCategory: "unknown" | "cursor-drift" | "missing-run-script" | "policy-deny" | "network" | "dependency-timeout";
    firstFailure: string;
    blockedUntil?: string | undefined;
}>;
declare const ControlJobStateSchema: z.ZodEnum<["queued", "running", "succeeded", "failed", "blocked"]>;
declare const ControlJobSchema: z.ZodObject<{
    id: z.ZodString;
    kind: z.ZodString;
    dispatchKey: z.ZodString;
    payload: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    state: z.ZodEnum<["queued", "running", "succeeded", "failed", "blocked"]>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    lastFailure: z.ZodNullable<z.ZodObject<{
        jobId: z.ZodString;
        failureCategory: z.ZodEnum<["cursor-drift", "missing-run-script", "policy-deny", "network", "dependency-timeout", "unknown"]>;
        firstFailure: z.ZodString;
        blockedUntil: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        jobId: string;
        failureCategory: "unknown" | "cursor-drift" | "missing-run-script" | "policy-deny" | "network" | "dependency-timeout";
        firstFailure: string;
        blockedUntil?: string | undefined;
    }, {
        jobId: string;
        failureCategory: "unknown" | "cursor-drift" | "missing-run-script" | "policy-deny" | "network" | "dependency-timeout";
        firstFailure: string;
        blockedUntil?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    state: "queued" | "running" | "succeeded" | "failed" | "blocked";
    createdAt: string;
    id: string;
    updatedAt: string;
    kind: string;
    dispatchKey: string;
    payload: Record<string, unknown>;
    lastFailure: {
        jobId: string;
        failureCategory: "unknown" | "cursor-drift" | "missing-run-script" | "policy-deny" | "network" | "dependency-timeout";
        firstFailure: string;
        blockedUntil?: string | undefined;
    } | null;
}, {
    state: "queued" | "running" | "succeeded" | "failed" | "blocked";
    createdAt: string;
    id: string;
    updatedAt: string;
    kind: string;
    dispatchKey: string;
    payload: Record<string, unknown>;
    lastFailure: {
        jobId: string;
        failureCategory: "unknown" | "cursor-drift" | "missing-run-script" | "policy-deny" | "network" | "dependency-timeout";
        firstFailure: string;
        blockedUntil?: string | undefined;
    } | null;
}>;
declare const ControlJobAttemptSchema: z.ZodObject<{
    id: z.ZodString;
    jobId: z.ZodString;
    attempt: z.ZodNumber;
    startedAt: z.ZodString;
    finishedAt: z.ZodString;
    outcome: z.ZodEnum<["succeeded", "failed", "blocked"]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    jobId: string;
    attempt: number;
    startedAt: string;
    finishedAt: string;
    outcome: "succeeded" | "failed" | "blocked";
}, {
    id: string;
    jobId: string;
    attempt: number;
    startedAt: string;
    finishedAt: string;
    outcome: "succeeded" | "failed" | "blocked";
}>;
declare const ControlJobEventSchema: z.ZodObject<{
    id: z.ZodString;
    jobId: z.ZodString;
    type: z.ZodEnum<["job.queued", "job.suppressed", "job.started", "job.succeeded", "job.failed", "job.blocked", "job.backoff_scheduled", "job.retried"]>;
    payload: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "job.queued" | "job.suppressed" | "job.started" | "job.succeeded" | "job.failed" | "job.blocked" | "job.backoff_scheduled" | "job.retried";
    createdAt: string;
    id: string;
    jobId: string;
    payload: Record<string, unknown>;
}, {
    type: "job.queued" | "job.suppressed" | "job.started" | "job.succeeded" | "job.failed" | "job.blocked" | "job.backoff_scheduled" | "job.retried";
    createdAt: string;
    id: string;
    jobId: string;
    payload: Record<string, unknown>;
}>;
declare const ControlBackoffStateSchema: z.ZodObject<{
    jobId: z.ZodString;
    dispatchKey: z.ZodString;
    rootCauseKey: z.ZodString;
    consecutiveFailures: z.ZodNumber;
    nextRetryAt: z.ZodNullable<z.ZodString>;
    blockedUntil: z.ZodNullable<z.ZodString>;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    updatedAt: string;
    jobId: string;
    blockedUntil: string | null;
    dispatchKey: string;
    rootCauseKey: string;
    consecutiveFailures: number;
    nextRetryAt: string | null;
}, {
    updatedAt: string;
    jobId: string;
    blockedUntil: string | null;
    dispatchKey: string;
    rootCauseKey: string;
    consecutiveFailures: number;
    nextRetryAt: string | null;
}>;
declare const ControlSuppressionStateSchema: z.ZodObject<{
    dispatchKey: z.ZodString;
    blockedUntil: z.ZodString;
    reason: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    updatedAt: string;
    reason: string;
    blockedUntil: string;
    dispatchKey: string;
}, {
    updatedAt: string;
    reason: string;
    blockedUntil: string;
    dispatchKey: string;
}>;
declare const ControlJobScheduleRequestSchema: z.ZodObject<{
    kind: z.ZodString;
    dedupeKey: z.ZodOptional<z.ZodString>;
    payload: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    kind: string;
    payload: Record<string, unknown>;
    dedupeKey?: string | undefined;
}, {
    kind: string;
    payload?: Record<string, unknown> | undefined;
    dedupeKey?: string | undefined;
}>;
declare const ControlJobBlockRequestSchema: z.ZodObject<{
    failureCategory: z.ZodEnum<["cursor-drift", "missing-run-script", "policy-deny", "network", "dependency-timeout", "unknown"]>;
    message: z.ZodString;
    blockedUntil: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    message: string;
    failureCategory: "unknown" | "cursor-drift" | "missing-run-script" | "policy-deny" | "network" | "dependency-timeout";
    blockedUntil?: string | undefined;
}, {
    message: string;
    failureCategory: "unknown" | "cursor-drift" | "missing-run-script" | "policy-deny" | "network" | "dependency-timeout";
    blockedUntil?: string | undefined;
}>;
declare const ControlJobRunNextResponseSchema: z.ZodUnion<[z.ZodObject<{
    processed: z.ZodLiteral<false>;
    reason: z.ZodLiteral<"queue_empty">;
}, "strip", z.ZodTypeAny, {
    reason: "queue_empty";
    processed: false;
}, {
    reason: "queue_empty";
    processed: false;
}>, z.ZodObject<{
    processed: z.ZodLiteral<true>;
    job: z.ZodObject<{
        id: z.ZodString;
        kind: z.ZodString;
        dispatchKey: z.ZodString;
        payload: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        state: z.ZodEnum<["queued", "running", "succeeded", "failed", "blocked"]>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        lastFailure: z.ZodNullable<z.ZodObject<{
            jobId: z.ZodString;
            failureCategory: z.ZodEnum<["cursor-drift", "missing-run-script", "policy-deny", "network", "dependency-timeout", "unknown"]>;
            firstFailure: z.ZodString;
            blockedUntil: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            jobId: string;
            failureCategory: "unknown" | "cursor-drift" | "missing-run-script" | "policy-deny" | "network" | "dependency-timeout";
            firstFailure: string;
            blockedUntil?: string | undefined;
        }, {
            jobId: string;
            failureCategory: "unknown" | "cursor-drift" | "missing-run-script" | "policy-deny" | "network" | "dependency-timeout";
            firstFailure: string;
            blockedUntil?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        state: "queued" | "running" | "succeeded" | "failed" | "blocked";
        createdAt: string;
        id: string;
        updatedAt: string;
        kind: string;
        dispatchKey: string;
        payload: Record<string, unknown>;
        lastFailure: {
            jobId: string;
            failureCategory: "unknown" | "cursor-drift" | "missing-run-script" | "policy-deny" | "network" | "dependency-timeout";
            firstFailure: string;
            blockedUntil?: string | undefined;
        } | null;
    }, {
        state: "queued" | "running" | "succeeded" | "failed" | "blocked";
        createdAt: string;
        id: string;
        updatedAt: string;
        kind: string;
        dispatchKey: string;
        payload: Record<string, unknown>;
        lastFailure: {
            jobId: string;
            failureCategory: "unknown" | "cursor-drift" | "missing-run-script" | "policy-deny" | "network" | "dependency-timeout";
            firstFailure: string;
            blockedUntil?: string | undefined;
        } | null;
    }>;
    attempt: z.ZodObject<{
        id: z.ZodString;
        jobId: z.ZodString;
        attempt: z.ZodNumber;
        startedAt: z.ZodString;
        finishedAt: z.ZodString;
        outcome: z.ZodEnum<["succeeded", "failed", "blocked"]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        jobId: string;
        attempt: number;
        startedAt: string;
        finishedAt: string;
        outcome: "succeeded" | "failed" | "blocked";
    }, {
        id: string;
        jobId: string;
        attempt: number;
        startedAt: string;
        finishedAt: string;
        outcome: "succeeded" | "failed" | "blocked";
    }>;
}, "strip", z.ZodTypeAny, {
    attempt: {
        id: string;
        jobId: string;
        attempt: number;
        startedAt: string;
        finishedAt: string;
        outcome: "succeeded" | "failed" | "blocked";
    };
    processed: true;
    job: {
        state: "queued" | "running" | "succeeded" | "failed" | "blocked";
        createdAt: string;
        id: string;
        updatedAt: string;
        kind: string;
        dispatchKey: string;
        payload: Record<string, unknown>;
        lastFailure: {
            jobId: string;
            failureCategory: "unknown" | "cursor-drift" | "missing-run-script" | "policy-deny" | "network" | "dependency-timeout";
            firstFailure: string;
            blockedUntil?: string | undefined;
        } | null;
    };
}, {
    attempt: {
        id: string;
        jobId: string;
        attempt: number;
        startedAt: string;
        finishedAt: string;
        outcome: "succeeded" | "failed" | "blocked";
    };
    processed: true;
    job: {
        state: "queued" | "running" | "succeeded" | "failed" | "blocked";
        createdAt: string;
        id: string;
        updatedAt: string;
        kind: string;
        dispatchKey: string;
        payload: Record<string, unknown>;
        lastFailure: {
            jobId: string;
            failureCategory: "unknown" | "cursor-drift" | "missing-run-script" | "policy-deny" | "network" | "dependency-timeout";
            firstFailure: string;
            blockedUntil?: string | undefined;
        } | null;
    };
}>]>;
declare const GitHubDispatchControlPayloadSchema: z.ZodObject<{
    owner: z.ZodString;
    repo: z.ZodString;
    eventType: z.ZodDefault<z.ZodString>;
    clientPayload: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
    eventType: string;
    clientPayload: Record<string, unknown>;
}, {
    owner: string;
    repo: string;
    eventType?: string | undefined;
    clientPayload?: Record<string, unknown> | undefined;
}>;
declare const SamlConnectionSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    connectionId: z.ZodString;
    issuer: z.ZodString;
    entryPoint: z.ZodString;
    signInUrl: z.ZodString;
    certificateFingerprint: z.ZodString;
    createdAt: z.ZodString;
    createdBy: z.ZodString;
    updatedAt: z.ZodString;
    updatedBy: z.ZodString;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    createdAt: string;
    updatedAt: string;
    connectionId: string;
    issuer: string;
    entryPoint: string;
    signInUrl: string;
    certificateFingerprint: string;
    createdBy: string;
    updatedBy: string;
}, {
    workspaceId: string;
    createdAt: string;
    updatedAt: string;
    connectionId: string;
    issuer: string;
    entryPoint: string;
    signInUrl: string;
    certificateFingerprint: string;
    createdBy: string;
    updatedBy: string;
}>;
declare const ScimProvisioningTokenSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    tokenId: z.ZodString;
    tokenPreview: z.ZodString;
    status: z.ZodEnum<["active", "revoked"]>;
    createdAt: z.ZodString;
    createdBy: z.ZodString;
    revokedAt: z.ZodOptional<z.ZodString>;
    revokedBy: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "revoked";
    workspaceId: string;
    createdAt: string;
    createdBy: string;
    tokenId: string;
    tokenPreview: string;
    revokedAt?: string | undefined;
    revokedBy?: string | undefined;
}, {
    status: "active" | "revoked";
    workspaceId: string;
    createdAt: string;
    createdBy: string;
    tokenId: string;
    tokenPreview: string;
    revokedAt?: string | undefined;
    revokedBy?: string | undefined;
}>;
declare const ComplianceFrameworkSchema: z.ZodEnum<["soc2", "iso27001", "gdpr", "ai_act"]>;
declare const ComplianceFrameworkControlMappingSchema: z.ZodObject<{
    framework: z.ZodEnum<["soc2", "iso27001", "gdpr", "ai_act"]>;
    controlIds: z.ZodArray<z.ZodString, "many">;
    rationale: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    framework: "soc2" | "iso27001" | "gdpr" | "ai_act";
    controlIds: string[];
    rationale?: string | undefined;
}, {
    framework: "soc2" | "iso27001" | "gdpr" | "ai_act";
    controlIds: string[];
    rationale?: string | undefined;
}>;
declare const ComplianceExportFormatSchema: z.ZodEnum<["json", "csv", "api_feed"]>;
declare const CreateComplianceExportRequestSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    bundleIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    frameworks: z.ZodOptional<z.ZodArray<z.ZodEnum<["soc2", "iso27001", "gdpr", "ai_act"]>, "many">>;
    format: z.ZodOptional<z.ZodEnum<["json", "csv", "api_feed"]>>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    bundleIds?: string[] | undefined;
    frameworks?: ("soc2" | "iso27001" | "gdpr" | "ai_act")[] | undefined;
    format?: "json" | "csv" | "api_feed" | undefined;
}, {
    workspaceId: string;
    bundleIds?: string[] | undefined;
    frameworks?: ("soc2" | "iso27001" | "gdpr" | "ai_act")[] | undefined;
    format?: "json" | "csv" | "api_feed" | undefined;
}>;
declare const ComplianceExportManifestItemSchema: z.ZodObject<{
    exportId: z.ZodString;
    bundleId: z.ZodString;
    runId: z.ZodString;
    artifactId: z.ZodString;
    path: z.ZodString;
    type: z.ZodString;
    sha256: z.ZodString;
    sizeBytes: z.ZodNumber;
    traceability: z.ZodOptional<z.ZodObject<{
        auditEventId: z.ZodOptional<z.ZodString>;
        usageEntryId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        auditEventId?: string | undefined;
        usageEntryId?: string | undefined;
    }, {
        auditEventId?: string | undefined;
        usageEntryId?: string | undefined;
    }>>;
    frameworkMappings: z.ZodOptional<z.ZodArray<z.ZodObject<{
        framework: z.ZodEnum<["soc2", "iso27001", "gdpr", "ai_act"]>;
        controlIds: z.ZodArray<z.ZodString, "many">;
        rationale: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        framework: "soc2" | "iso27001" | "gdpr" | "ai_act";
        controlIds: string[];
        rationale?: string | undefined;
    }, {
        framework: "soc2" | "iso27001" | "gdpr" | "ai_act";
        controlIds: string[];
        rationale?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    path: string;
    type: string;
    runId: string;
    artifactId: string;
    sha256: string;
    sizeBytes: number;
    exportId: string;
    bundleId: string;
    traceability?: {
        auditEventId?: string | undefined;
        usageEntryId?: string | undefined;
    } | undefined;
    frameworkMappings?: {
        framework: "soc2" | "iso27001" | "gdpr" | "ai_act";
        controlIds: string[];
        rationale?: string | undefined;
    }[] | undefined;
}, {
    path: string;
    type: string;
    runId: string;
    artifactId: string;
    sha256: string;
    sizeBytes: number;
    exportId: string;
    bundleId: string;
    traceability?: {
        auditEventId?: string | undefined;
        usageEntryId?: string | undefined;
    } | undefined;
    frameworkMappings?: {
        framework: "soc2" | "iso27001" | "gdpr" | "ai_act";
        controlIds: string[];
        rationale?: string | undefined;
    }[] | undefined;
}>;
declare const ComplianceExportExitGateSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    passed: z.ZodBoolean;
    reasonCodes: z.ZodArray<z.ZodString, "many">;
    evaluatedAt: z.ZodString;
    latestExportId: z.ZodOptional<z.ZodString>;
    manifestHash: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    passed: boolean;
    workspaceId: string;
    reasonCodes: string[];
    evaluatedAt: string;
    latestExportId?: string | undefined;
    manifestHash?: string | undefined;
}, {
    passed: boolean;
    workspaceId: string;
    reasonCodes: string[];
    evaluatedAt: string;
    latestExportId?: string | undefined;
    manifestHash?: string | undefined;
}>;
declare const CapabilityStatusSchema: z.ZodEnum<["enabled", "disabled", "preview"]>;
declare const CapabilityDescriptorSchema: z.ZodObject<{
    key: z.ZodString;
    status: z.ZodEnum<["enabled", "disabled", "preview"]>;
    version: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    config: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    status: "enabled" | "disabled" | "preview";
    key: string;
    version?: string | undefined;
    description?: string | undefined;
    config?: Record<string, unknown> | undefined;
}, {
    status: "enabled" | "disabled" | "preview";
    key: string;
    version?: string | undefined;
    description?: string | undefined;
    config?: Record<string, unknown> | undefined;
}>;
declare const ApiSurfaceVersionSchema: z.ZodObject<{
    name: z.ZodString;
    version: z.ZodString;
    deprecated: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    version: string;
    name: string;
    deprecated?: boolean | undefined;
}, {
    version: string;
    name: string;
    deprecated?: boolean | undefined;
}>;
declare const CapabilityNegotiationSchema: z.ZodObject<{
    requestedSurface: z.ZodOptional<z.ZodString>;
    requestedVersion: z.ZodOptional<z.ZodString>;
    selectedSurface: z.ZodString;
    selectedVersion: z.ZodString;
    compatible: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    selectedSurface: string;
    selectedVersion: string;
    compatible: boolean;
    requestedSurface?: string | undefined;
    requestedVersion?: string | undefined;
}, {
    selectedSurface: string;
    selectedVersion: string;
    compatible: boolean;
    requestedSurface?: string | undefined;
    requestedVersion?: string | undefined;
}>;
declare const CapabilitiesResponseSchema: z.ZodObject<{
    generatedAt: z.ZodString;
    workspaceId: z.ZodOptional<z.ZodString>;
    apiSurfaces: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        version: z.ZodString;
        deprecated: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        name: string;
        deprecated?: boolean | undefined;
    }, {
        version: string;
        name: string;
        deprecated?: boolean | undefined;
    }>, "many">>;
    capabilities: z.ZodDefault<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        status: z.ZodEnum<["enabled", "disabled", "preview"]>;
        version: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        config: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        status: "enabled" | "disabled" | "preview";
        key: string;
        version?: string | undefined;
        description?: string | undefined;
        config?: Record<string, unknown> | undefined;
    }, {
        status: "enabled" | "disabled" | "preview";
        key: string;
        version?: string | undefined;
        description?: string | undefined;
        config?: Record<string, unknown> | undefined;
    }>, "many">>;
    negotiation: z.ZodOptional<z.ZodObject<{
        requestedSurface: z.ZodOptional<z.ZodString>;
        requestedVersion: z.ZodOptional<z.ZodString>;
        selectedSurface: z.ZodString;
        selectedVersion: z.ZodString;
        compatible: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        selectedSurface: string;
        selectedVersion: string;
        compatible: boolean;
        requestedSurface?: string | undefined;
        requestedVersion?: string | undefined;
    }, {
        selectedSurface: string;
        selectedVersion: string;
        compatible: boolean;
        requestedSurface?: string | undefined;
        requestedVersion?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    generatedAt: string;
    apiSurfaces: {
        version: string;
        name: string;
        deprecated?: boolean | undefined;
    }[];
    capabilities: {
        status: "enabled" | "disabled" | "preview";
        key: string;
        version?: string | undefined;
        description?: string | undefined;
        config?: Record<string, unknown> | undefined;
    }[];
    workspaceId?: string | undefined;
    negotiation?: {
        selectedSurface: string;
        selectedVersion: string;
        compatible: boolean;
        requestedSurface?: string | undefined;
        requestedVersion?: string | undefined;
    } | undefined;
}, {
    generatedAt: string;
    workspaceId?: string | undefined;
    apiSurfaces?: {
        version: string;
        name: string;
        deprecated?: boolean | undefined;
    }[] | undefined;
    capabilities?: {
        status: "enabled" | "disabled" | "preview";
        key: string;
        version?: string | undefined;
        description?: string | undefined;
        config?: Record<string, unknown> | undefined;
    }[] | undefined;
    negotiation?: {
        selectedSurface: string;
        selectedVersion: string;
        compatible: boolean;
        requestedSurface?: string | undefined;
        requestedVersion?: string | undefined;
    } | undefined;
}>;
declare const AccessPermissionKeySchema: z.ZodEnum<["policy:read", "policy:write", "policy:publish", "policy:simulate", "execution:read", "execution:export", "approval:read", "approval:decide", "approval:configure", "audit:read", "audit:export", "audit:retention:manage", "connector:read", "connector:connect", "connector:disconnect", "workspace:user:invite", "workspace:user:role:set", "workspace:delete", "service-account:read", "service-account:write", "service-account:token:rotate"]>;
declare const AccessRoleScopeSchema: z.ZodEnum<["org", "workspace", "environment"]>;
declare const AccessRoleSchema: z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    scope: z.ZodEnum<["org", "workspace", "environment"]>;
    permissions: z.ZodArray<z.ZodEnum<["policy:read", "policy:write", "policy:publish", "policy:simulate", "execution:read", "execution:export", "approval:read", "approval:decide", "approval:configure", "audit:read", "audit:export", "audit:retention:manage", "connector:read", "connector:connect", "connector:disconnect", "workspace:user:invite", "workspace:user:role:set", "workspace:delete", "service-account:read", "service-account:write", "service-account:token:rotate"]>, "many">;
    isBuiltIn: z.ZodBoolean;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    key: string;
    name: string;
    scope: "org" | "workspace" | "environment";
    permissions: ("policy:read" | "policy:write" | "policy:publish" | "policy:simulate" | "execution:read" | "execution:export" | "approval:read" | "approval:decide" | "approval:configure" | "audit:read" | "audit:export" | "audit:retention:manage" | "connector:read" | "connector:connect" | "connector:disconnect" | "workspace:user:invite" | "workspace:user:role:set" | "workspace:delete" | "service-account:read" | "service-account:write" | "service-account:token:rotate")[];
    isBuiltIn: boolean;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    description?: string | undefined;
}, {
    id: string;
    key: string;
    name: string;
    scope: "org" | "workspace" | "environment";
    permissions: ("policy:read" | "policy:write" | "policy:publish" | "policy:simulate" | "execution:read" | "execution:export" | "approval:read" | "approval:decide" | "approval:configure" | "audit:read" | "audit:export" | "audit:retention:manage" | "connector:read" | "connector:connect" | "connector:disconnect" | "workspace:user:invite" | "workspace:user:role:set" | "workspace:delete" | "service-account:read" | "service-account:write" | "service-account:token:rotate")[];
    isBuiltIn: boolean;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    description?: string | undefined;
}>;
declare const AccessSubjectTypeSchema: z.ZodEnum<["user", "group", "serviceAccount"]>;
declare const AccessRoleBindingSchema: z.ZodObject<{
    id: z.ZodString;
    scopeType: z.ZodEnum<["org", "workspace", "environment"]>;
    scopeId: z.ZodString;
    subjectType: z.ZodEnum<["user", "group", "serviceAccount"]>;
    subjectId: z.ZodString;
    roleKey: z.ZodString;
    createdAt: z.ZodOptional<z.ZodString>;
    createdBy: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    scopeType: "org" | "workspace" | "environment";
    scopeId: string;
    subjectType: "user" | "group" | "serviceAccount";
    subjectId: string;
    roleKey: string;
    createdAt?: string | undefined;
    createdBy?: string | undefined;
}, {
    id: string;
    scopeType: "org" | "workspace" | "environment";
    scopeId: string;
    subjectType: "user" | "group" | "serviceAccount";
    subjectId: string;
    roleKey: string;
    createdAt?: string | undefined;
    createdBy?: string | undefined;
}>;
declare const ServiceAccountStatusSchema: z.ZodEnum<["active", "disabled"]>;
declare const ServiceAccountSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    workspaceId: z.ZodString;
    environmentKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodEnum<["active", "disabled"]>;
    createdAt: z.ZodString;
    createdByUserId: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodString>;
    disabledAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "disabled";
    workspaceId: string;
    createdAt: string;
    id: string;
    name: string;
    createdByUserId: string;
    updatedAt?: string | undefined;
    description?: string | undefined;
    environmentKey?: string | null | undefined;
    disabledAt?: string | null | undefined;
}, {
    status: "active" | "disabled";
    workspaceId: string;
    createdAt: string;
    id: string;
    name: string;
    createdByUserId: string;
    updatedAt?: string | undefined;
    description?: string | undefined;
    environmentKey?: string | null | undefined;
    disabledAt?: string | null | undefined;
}>;
declare const AgentIdentityStatusSchema: z.ZodEnum<["active", "disabled"]>;
declare const AgentProfileSchema: z.ZodObject<{
    id: z.ZodString;
    workspaceId: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    environmentKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodEnum<["active", "disabled"]>;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodString>;
    disabledAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdByUserId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "active" | "disabled";
    workspaceId: string;
    createdAt: string;
    id: string;
    name: string;
    createdByUserId: string;
    updatedAt?: string | undefined;
    description?: string | undefined;
    environmentKey?: string | null | undefined;
    disabledAt?: string | null | undefined;
}, {
    status: "active" | "disabled";
    workspaceId: string;
    createdAt: string;
    id: string;
    name: string;
    createdByUserId: string;
    updatedAt?: string | undefined;
    description?: string | undefined;
    environmentKey?: string | null | undefined;
    disabledAt?: string | null | undefined;
}>;
declare const AgentKeyStatusSchema: z.ZodEnum<["active", "revoked"]>;
declare const AgentKeyMetadataSchema: z.ZodObject<{
    keyId: z.ZodString;
    workspaceId: z.ZodString;
    agentId: z.ZodString;
    name: z.ZodString;
    keyPrefix: z.ZodString;
    scopes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    rateLimitPerMinute: z.ZodNumber;
    status: z.ZodEnum<["active", "revoked"]>;
    createdAt: z.ZodString;
    revokedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "revoked";
    workspaceId: string;
    createdAt: string;
    name: string;
    keyId: string;
    agentId: string;
    keyPrefix: string;
    scopes: string[];
    rateLimitPerMinute: number;
    revokedAt?: string | null | undefined;
}, {
    status: "active" | "revoked";
    workspaceId: string;
    createdAt: string;
    name: string;
    keyId: string;
    agentId: string;
    keyPrefix: string;
    rateLimitPerMinute: number;
    revokedAt?: string | null | undefined;
    scopes?: string[] | undefined;
}>;
declare const AgentTokenClaimsSchema: z.ZodObject<{
    tokenUse: z.ZodLiteral<"agent_execution">;
    tokenVersion: z.ZodDefault<z.ZodString>;
    iss: z.ZodString;
    sub: z.ZodString;
    aud: z.ZodString;
    jti: z.ZodString;
    workspaceId: z.ZodString;
    agentId: z.ZodString;
    scopes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    iat: z.ZodString;
    exp: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    agentId: string;
    scopes: string[];
    tokenUse: "agent_execution";
    tokenVersion: string;
    iss: string;
    sub: string;
    aud: string;
    jti: string;
    iat: string;
    exp?: string | null | undefined;
}, {
    workspaceId: string;
    agentId: string;
    tokenUse: "agent_execution";
    iss: string;
    sub: string;
    aud: string;
    jti: string;
    iat: string;
    scopes?: string[] | undefined;
    tokenVersion?: string | undefined;
    exp?: string | null | undefined;
}>;
declare const AgentExecutionTokenIssueRequestSchema: z.ZodObject<{
    scopes: z.ZodArray<z.ZodString, "many">;
    ttlSeconds: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    scopes: string[];
    ttlSeconds: number;
}, {
    scopes: string[];
    ttlSeconds?: number | undefined;
}>;
declare const AgentExecutionTokenIssueResponseSchema: z.ZodObject<{
    token: z.ZodString;
    expiresAt: z.ZodString;
    claims: z.ZodObject<{
        tokenUse: z.ZodLiteral<"agent_execution">;
        tokenVersion: z.ZodDefault<z.ZodString>;
        iss: z.ZodString;
        sub: z.ZodString;
        aud: z.ZodString;
        jti: z.ZodString;
        workspaceId: z.ZodString;
        agentId: z.ZodString;
        scopes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        iat: z.ZodString;
        exp: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        workspaceId: string;
        agentId: string;
        scopes: string[];
        tokenUse: "agent_execution";
        tokenVersion: string;
        iss: string;
        sub: string;
        aud: string;
        jti: string;
        iat: string;
        exp?: string | null | undefined;
    }, {
        workspaceId: string;
        agentId: string;
        tokenUse: "agent_execution";
        iss: string;
        sub: string;
        aud: string;
        jti: string;
        iat: string;
        scopes?: string[] | undefined;
        tokenVersion?: string | undefined;
        exp?: string | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    expiresAt: string;
    token: string;
    claims: {
        workspaceId: string;
        agentId: string;
        scopes: string[];
        tokenUse: "agent_execution";
        tokenVersion: string;
        iss: string;
        sub: string;
        aud: string;
        jti: string;
        iat: string;
        exp?: string | null | undefined;
    };
}, {
    expiresAt: string;
    token: string;
    claims: {
        workspaceId: string;
        agentId: string;
        tokenUse: "agent_execution";
        iss: string;
        sub: string;
        aud: string;
        jti: string;
        iat: string;
        scopes?: string[] | undefined;
        tokenVersion?: string | undefined;
        exp?: string | null | undefined;
    };
}>;
declare const AgentCapabilitySourceSchema: z.ZodEnum<["manual", "role", "token"]>;
declare const AgentCapabilityStatusSchema: z.ZodEnum<["active", "disabled"]>;
declare const AgentCapabilitySchema: z.ZodObject<{
    id: z.ZodString;
    workspaceId: z.ZodString;
    agentId: z.ZodString;
    capability: z.ZodString;
    source: z.ZodEnum<["manual", "role", "token"]>;
    status: z.ZodEnum<["active", "disabled"]>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "active" | "disabled";
    workspaceId: string;
    createdAt: string;
    id: string;
    source: "role" | "token" | "manual";
    updatedAt: string;
    agentId: string;
    capability: string;
}, {
    status: "active" | "disabled";
    workspaceId: string;
    createdAt: string;
    id: string;
    source: "role" | "token" | "manual";
    updatedAt: string;
    agentId: string;
    capability: string;
}>;
declare const AgentDelegationTargetTypeSchema: z.ZodEnum<["agent", "tool", "runtime"]>;
declare const AgentDelegationEffectSchema: z.ZodEnum<["allow", "deny"]>;
declare const AgentDelegationStatusSchema: z.ZodEnum<["active", "disabled"]>;
declare const AgentDelegationRuleSchema: z.ZodObject<{
    id: z.ZodString;
    workspaceId: z.ZodString;
    sourceAgentId: z.ZodString;
    targetType: z.ZodEnum<["agent", "tool", "runtime"]>;
    targetId: z.ZodString;
    capability: z.ZodString;
    effect: z.ZodEnum<["allow", "deny"]>;
    status: z.ZodEnum<["active", "disabled"]>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "active" | "disabled";
    workspaceId: string;
    createdAt: string;
    id: string;
    updatedAt: string;
    capability: string;
    sourceAgentId: string;
    targetType: "tool" | "agent" | "runtime";
    targetId: string;
    effect: "allow" | "deny";
}, {
    status: "active" | "disabled";
    workspaceId: string;
    createdAt: string;
    id: string;
    updatedAt: string;
    capability: string;
    sourceAgentId: string;
    targetType: "tool" | "agent" | "runtime";
    targetId: string;
    effect: "allow" | "deny";
}>;
declare const AgentRevocationEscalationLevelSchema: z.ZodEnum<["none", "low", "medium", "high", "critical"]>;
declare const AgentRevocationEventSchema: z.ZodObject<{
    id: z.ZodString;
    workspaceId: z.ZodString;
    agentId: z.ZodString;
    reasonCode: z.ZodString;
    reasonText: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    escalationLevel: z.ZodEnum<["none", "low", "medium", "high", "critical"]>;
    requestedByUserId: z.ZodString;
    correlationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    tokenRevocationCount: z.ZodNumber;
    previousStatus: z.ZodEnum<["active", "disabled"]>;
    currentStatus: z.ZodEnum<["active", "disabled"]>;
    effectiveAt: z.ZodString;
    propagationWindowSeconds: z.ZodNumber;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    createdAt: string;
    id: string;
    reasonCode: string;
    agentId: string;
    escalationLevel: "none" | "low" | "medium" | "high" | "critical";
    requestedByUserId: string;
    tokenRevocationCount: number;
    previousStatus: "active" | "disabled";
    currentStatus: "active" | "disabled";
    effectiveAt: string;
    propagationWindowSeconds: number;
    correlationId?: string | null | undefined;
    reasonText?: string | null | undefined;
}, {
    workspaceId: string;
    createdAt: string;
    id: string;
    reasonCode: string;
    agentId: string;
    escalationLevel: "none" | "low" | "medium" | "high" | "critical";
    requestedByUserId: string;
    tokenRevocationCount: number;
    previousStatus: "active" | "disabled";
    currentStatus: "active" | "disabled";
    effectiveAt: string;
    propagationWindowSeconds: number;
    correlationId?: string | null | undefined;
    reasonText?: string | null | undefined;
}>;
declare const AgentEscalationSourceSchema: z.ZodEnum<["manual", "runtime", "delegation", "revocation"]>;
declare const AgentEscalationSeveritySchema: z.ZodEnum<["low", "medium", "high", "critical"]>;
declare const AgentEscalationStatusSchema: z.ZodEnum<["open", "acknowledged", "resolved"]>;
declare const AgentEscalationEventSchema: z.ZodObject<{
    id: z.ZodString;
    workspaceId: z.ZodString;
    agentId: z.ZodString;
    source: z.ZodEnum<["manual", "runtime", "delegation", "revocation"]>;
    severity: z.ZodEnum<["low", "medium", "high", "critical"]>;
    status: z.ZodEnum<["open", "acknowledged", "resolved"]>;
    summary: z.ZodString;
    details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    createdByUserId: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    resolvedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    resolutionNote: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    status: "open" | "acknowledged" | "resolved";
    workspaceId: string;
    createdAt: string;
    id: string;
    source: "manual" | "runtime" | "delegation" | "revocation";
    updatedAt: string;
    createdByUserId: string;
    agentId: string;
    severity: "low" | "medium" | "high" | "critical";
    summary: string;
    details?: Record<string, unknown> | undefined;
    resolvedAt?: string | null | undefined;
    resolutionNote?: string | null | undefined;
}, {
    status: "open" | "acknowledged" | "resolved";
    workspaceId: string;
    createdAt: string;
    id: string;
    source: "manual" | "runtime" | "delegation" | "revocation";
    updatedAt: string;
    createdByUserId: string;
    agentId: string;
    severity: "low" | "medium" | "high" | "critical";
    summary: string;
    details?: Record<string, unknown> | undefined;
    resolvedAt?: string | null | undefined;
    resolutionNote?: string | null | undefined;
}>;
declare const UsageTimeframeSchema: z.ZodEnum<["7d", "30d", "90d"]>;
declare const UsageBreakdownSchema: z.ZodEnum<["total", "allowed", "blocked", "pending"]>;
declare const UsageTimeseriesPointSchema: z.ZodObject<{
    ts: z.ZodString;
    total: z.ZodNumber;
    allowed: z.ZodNumber;
    blocked: z.ZodNumber;
    pending: z.ZodNumber;
    environmentKey: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    total: number;
    blocked: number;
    allowed: number;
    pending: number;
    ts: string;
    environmentKey?: string | undefined;
}, {
    total: number;
    blocked: number;
    allowed: number;
    pending: number;
    ts: string;
    environmentKey?: string | undefined;
}>;
declare const UsageTimeseriesResponseSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    timeframe: z.ZodEnum<["7d", "30d", "90d"]>;
    breakdown: z.ZodEnum<["total", "allowed", "blocked", "pending"]>;
    points: z.ZodArray<z.ZodObject<{
        ts: z.ZodString;
        total: z.ZodNumber;
        allowed: z.ZodNumber;
        blocked: z.ZodNumber;
        pending: z.ZodNumber;
        environmentKey: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        total: number;
        blocked: number;
        allowed: number;
        pending: number;
        ts: string;
        environmentKey?: string | undefined;
    }, {
        total: number;
        blocked: number;
        allowed: number;
        pending: number;
        ts: string;
        environmentKey?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    timeframe: "7d" | "30d" | "90d";
    breakdown: "total" | "blocked" | "allowed" | "pending";
    points: {
        total: number;
        blocked: number;
        allowed: number;
        pending: number;
        ts: string;
        environmentKey?: string | undefined;
    }[];
}, {
    workspaceId: string;
    timeframe: "7d" | "30d" | "90d";
    breakdown: "total" | "blocked" | "allowed" | "pending";
    points: {
        total: number;
        blocked: number;
        allowed: number;
        pending: number;
        ts: string;
        environmentKey?: string | undefined;
    }[];
}>;
declare const TimelineEntityTypeSchema: z.ZodEnum<["route", "policy", "change-request"]>;
declare const TimelineEventSchema: z.ZodObject<{
    id: z.ZodString;
    entityType: z.ZodEnum<["route", "policy", "change-request"]>;
    entityId: z.ZodString;
    action: z.ZodString;
    summary: z.ZodString;
    actor: z.ZodString;
    occurredAt: z.ZodString;
    versionId: z.ZodOptional<z.ZodString>;
    versionNumber: z.ZodOptional<z.ZodNumber>;
    environmentKey: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    occurredAt: string;
    actor: string;
    summary: string;
    entityType: "policy" | "route" | "change-request";
    entityId: string;
    action: string;
    versionId?: string | undefined;
    versionNumber?: number | undefined;
    metadata?: Record<string, unknown> | undefined;
    environmentKey?: string | undefined;
}, {
    id: string;
    occurredAt: string;
    actor: string;
    summary: string;
    entityType: "policy" | "route" | "change-request";
    entityId: string;
    action: string;
    versionId?: string | undefined;
    versionNumber?: number | undefined;
    metadata?: Record<string, unknown> | undefined;
    environmentKey?: string | undefined;
}>;
declare const RouteTimelineResponseSchema: z.ZodObject<{
    routeId: z.ZodString;
    events: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        entityType: z.ZodEnum<["route", "policy", "change-request"]>;
        entityId: z.ZodString;
        action: z.ZodString;
        summary: z.ZodString;
        actor: z.ZodString;
        occurredAt: z.ZodString;
        versionId: z.ZodOptional<z.ZodString>;
        versionNumber: z.ZodOptional<z.ZodNumber>;
        environmentKey: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        occurredAt: string;
        actor: string;
        summary: string;
        entityType: "policy" | "route" | "change-request";
        entityId: string;
        action: string;
        versionId?: string | undefined;
        versionNumber?: number | undefined;
        metadata?: Record<string, unknown> | undefined;
        environmentKey?: string | undefined;
    }, {
        id: string;
        occurredAt: string;
        actor: string;
        summary: string;
        entityType: "policy" | "route" | "change-request";
        entityId: string;
        action: string;
        versionId?: string | undefined;
        versionNumber?: number | undefined;
        metadata?: Record<string, unknown> | undefined;
        environmentKey?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    routeId: string;
    events: {
        id: string;
        occurredAt: string;
        actor: string;
        summary: string;
        entityType: "policy" | "route" | "change-request";
        entityId: string;
        action: string;
        versionId?: string | undefined;
        versionNumber?: number | undefined;
        metadata?: Record<string, unknown> | undefined;
        environmentKey?: string | undefined;
    }[];
}, {
    routeId: string;
    events: {
        id: string;
        occurredAt: string;
        actor: string;
        summary: string;
        entityType: "policy" | "route" | "change-request";
        entityId: string;
        action: string;
        versionId?: string | undefined;
        versionNumber?: number | undefined;
        metadata?: Record<string, unknown> | undefined;
        environmentKey?: string | undefined;
    }[];
}>;
declare const PolicyTimelineResponseSchema: z.ZodObject<{
    policyId: z.ZodString;
    events: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        entityType: z.ZodEnum<["route", "policy", "change-request"]>;
        entityId: z.ZodString;
        action: z.ZodString;
        summary: z.ZodString;
        actor: z.ZodString;
        occurredAt: z.ZodString;
        versionId: z.ZodOptional<z.ZodString>;
        versionNumber: z.ZodOptional<z.ZodNumber>;
        environmentKey: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        occurredAt: string;
        actor: string;
        summary: string;
        entityType: "policy" | "route" | "change-request";
        entityId: string;
        action: string;
        versionId?: string | undefined;
        versionNumber?: number | undefined;
        metadata?: Record<string, unknown> | undefined;
        environmentKey?: string | undefined;
    }, {
        id: string;
        occurredAt: string;
        actor: string;
        summary: string;
        entityType: "policy" | "route" | "change-request";
        entityId: string;
        action: string;
        versionId?: string | undefined;
        versionNumber?: number | undefined;
        metadata?: Record<string, unknown> | undefined;
        environmentKey?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    policyId: string;
    events: {
        id: string;
        occurredAt: string;
        actor: string;
        summary: string;
        entityType: "policy" | "route" | "change-request";
        entityId: string;
        action: string;
        versionId?: string | undefined;
        versionNumber?: number | undefined;
        metadata?: Record<string, unknown> | undefined;
        environmentKey?: string | undefined;
    }[];
}, {
    policyId: string;
    events: {
        id: string;
        occurredAt: string;
        actor: string;
        summary: string;
        entityType: "policy" | "route" | "change-request";
        entityId: string;
        action: string;
        versionId?: string | undefined;
        versionNumber?: number | undefined;
        metadata?: Record<string, unknown> | undefined;
        environmentKey?: string | undefined;
    }[];
}>;
declare const ChangeRequestTimelineResponseSchema: z.ZodObject<{
    changeRequestId: z.ZodString;
    events: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        entityType: z.ZodEnum<["route", "policy", "change-request"]>;
        entityId: z.ZodString;
        action: z.ZodString;
        summary: z.ZodString;
        actor: z.ZodString;
        occurredAt: z.ZodString;
        versionId: z.ZodOptional<z.ZodString>;
        versionNumber: z.ZodOptional<z.ZodNumber>;
        environmentKey: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        occurredAt: string;
        actor: string;
        summary: string;
        entityType: "policy" | "route" | "change-request";
        entityId: string;
        action: string;
        versionId?: string | undefined;
        versionNumber?: number | undefined;
        metadata?: Record<string, unknown> | undefined;
        environmentKey?: string | undefined;
    }, {
        id: string;
        occurredAt: string;
        actor: string;
        summary: string;
        entityType: "policy" | "route" | "change-request";
        entityId: string;
        action: string;
        versionId?: string | undefined;
        versionNumber?: number | undefined;
        metadata?: Record<string, unknown> | undefined;
        environmentKey?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    events: {
        id: string;
        occurredAt: string;
        actor: string;
        summary: string;
        entityType: "policy" | "route" | "change-request";
        entityId: string;
        action: string;
        versionId?: string | undefined;
        versionNumber?: number | undefined;
        metadata?: Record<string, unknown> | undefined;
        environmentKey?: string | undefined;
    }[];
    changeRequestId: string;
}, {
    events: {
        id: string;
        occurredAt: string;
        actor: string;
        summary: string;
        entityType: "policy" | "route" | "change-request";
        entityId: string;
        action: string;
        versionId?: string | undefined;
        versionNumber?: number | undefined;
        metadata?: Record<string, unknown> | undefined;
        environmentKey?: string | undefined;
    }[];
    changeRequestId: string;
}>;
declare const LineageNodeTypeSchema: z.ZodEnum<["run", "policyDecision", "approval", "artifact", "export", "changeRequest", "route", "policy", "workflowVersion", "riskScore", "agent", "prompt", "model", "tool", "api", "dataset", "risk", "outcome"]>;
declare const LineageNodeSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["run", "policyDecision", "approval", "artifact", "export", "changeRequest", "route", "policy", "workflowVersion", "riskScore", "agent", "prompt", "model", "tool", "api", "dataset", "risk", "outcome"]>;
    label: z.ZodOptional<z.ZodString>;
    occurredAt: z.ZodOptional<z.ZodString>;
    attributes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    type: "api" | "model" | "policy" | "route" | "tool" | "risk" | "agent" | "run" | "approval" | "outcome" | "policyDecision" | "artifact" | "export" | "changeRequest" | "workflowVersion" | "riskScore" | "prompt" | "dataset";
    id: string;
    label?: string | undefined;
    occurredAt?: string | undefined;
    attributes?: Record<string, unknown> | undefined;
}, {
    type: "api" | "model" | "policy" | "route" | "tool" | "risk" | "agent" | "run" | "approval" | "outcome" | "policyDecision" | "artifact" | "export" | "changeRequest" | "workflowVersion" | "riskScore" | "prompt" | "dataset";
    id: string;
    label?: string | undefined;
    occurredAt?: string | undefined;
    attributes?: Record<string, unknown> | undefined;
}>;
declare const LineageEdgeSchema: z.ZodObject<{
    id: z.ZodString;
    from: z.ZodString;
    to: z.ZodString;
    relation: z.ZodString;
    occurredAt: z.ZodOptional<z.ZodString>;
    attributes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    from: string;
    to: string;
    relation: string;
    occurredAt?: string | undefined;
    attributes?: Record<string, unknown> | undefined;
}, {
    id: string;
    from: string;
    to: string;
    relation: string;
    occurredAt?: string | undefined;
    attributes?: Record<string, unknown> | undefined;
}>;
declare const LineageQueryRequestSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    rootNodeId: z.ZodString;
    maxDepth: z.ZodDefault<z.ZodNumber>;
    includeRelations: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    since: z.ZodOptional<z.ZodString>;
    until: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    rootNodeId: string;
    maxDepth: number;
    includeRelations?: string[] | undefined;
    since?: string | undefined;
    until?: string | undefined;
}, {
    workspaceId: string;
    rootNodeId: string;
    maxDepth?: number | undefined;
    includeRelations?: string[] | undefined;
    since?: string | undefined;
    until?: string | undefined;
}>;
declare const LineageQueryResponseSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    rootNodeId: z.ZodString;
    depth: z.ZodNumber;
    nodes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["run", "policyDecision", "approval", "artifact", "export", "changeRequest", "route", "policy", "workflowVersion", "riskScore", "agent", "prompt", "model", "tool", "api", "dataset", "risk", "outcome"]>;
        label: z.ZodOptional<z.ZodString>;
        occurredAt: z.ZodOptional<z.ZodString>;
        attributes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        type: "api" | "model" | "policy" | "route" | "tool" | "risk" | "agent" | "run" | "approval" | "outcome" | "policyDecision" | "artifact" | "export" | "changeRequest" | "workflowVersion" | "riskScore" | "prompt" | "dataset";
        id: string;
        label?: string | undefined;
        occurredAt?: string | undefined;
        attributes?: Record<string, unknown> | undefined;
    }, {
        type: "api" | "model" | "policy" | "route" | "tool" | "risk" | "agent" | "run" | "approval" | "outcome" | "policyDecision" | "artifact" | "export" | "changeRequest" | "workflowVersion" | "riskScore" | "prompt" | "dataset";
        id: string;
        label?: string | undefined;
        occurredAt?: string | undefined;
        attributes?: Record<string, unknown> | undefined;
    }>, "many">;
    edges: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        from: z.ZodString;
        to: z.ZodString;
        relation: z.ZodString;
        occurredAt: z.ZodOptional<z.ZodString>;
        attributes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        from: string;
        to: string;
        relation: string;
        occurredAt?: string | undefined;
        attributes?: Record<string, unknown> | undefined;
    }, {
        id: string;
        from: string;
        to: string;
        relation: string;
        occurredAt?: string | undefined;
        attributes?: Record<string, unknown> | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    nodes: {
        type: "api" | "model" | "policy" | "route" | "tool" | "risk" | "agent" | "run" | "approval" | "outcome" | "policyDecision" | "artifact" | "export" | "changeRequest" | "workflowVersion" | "riskScore" | "prompt" | "dataset";
        id: string;
        label?: string | undefined;
        occurredAt?: string | undefined;
        attributes?: Record<string, unknown> | undefined;
    }[];
    edges: {
        id: string;
        from: string;
        to: string;
        relation: string;
        occurredAt?: string | undefined;
        attributes?: Record<string, unknown> | undefined;
    }[];
    rootNodeId: string;
    depth: number;
}, {
    workspaceId: string;
    nodes: {
        type: "api" | "model" | "policy" | "route" | "tool" | "risk" | "agent" | "run" | "approval" | "outcome" | "policyDecision" | "artifact" | "export" | "changeRequest" | "workflowVersion" | "riskScore" | "prompt" | "dataset";
        id: string;
        label?: string | undefined;
        occurredAt?: string | undefined;
        attributes?: Record<string, unknown> | undefined;
    }[];
    edges: {
        id: string;
        from: string;
        to: string;
        relation: string;
        occurredAt?: string | undefined;
        attributes?: Record<string, unknown> | undefined;
    }[];
    rootNodeId: string;
    depth: number;
}>;
declare const RiskTierSchema: z.ZodEnum<["low", "med", "high", "critical"]>;
declare const RiskSubjectTypeSchema: z.ZodEnum<["run", "changeRequest", "route", "policy", "workspace"]>;
declare const RiskFactorSchema: z.ZodObject<{
    key: z.ZodString;
    weight: z.ZodNumber;
    value: z.ZodNumber;
    reason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    value: number;
    key: string;
    weight: number;
    reason?: string | undefined;
}, {
    value: number;
    key: string;
    weight: number;
    reason?: string | undefined;
}>;
declare const RiskScoreCheckRequestSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    subjectType: z.ZodEnum<["run", "changeRequest", "route", "policy", "workspace"]>;
    subjectId: z.ZodString;
    context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
    subjectId: string;
    context?: Record<string, unknown> | undefined;
}, {
    workspaceId: string;
    subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
    subjectId: string;
    context?: Record<string, unknown> | undefined;
}>;
declare const RiskScoreResultSchema: z.ZodObject<{
    score: z.ZodNumber;
    tier: z.ZodEnum<["low", "med", "high", "critical"]>;
    evaluatedAt: z.ZodString;
    factors: z.ZodDefault<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        weight: z.ZodNumber;
        value: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        value: number;
        key: string;
        weight: number;
        reason?: string | undefined;
    }, {
        value: number;
        key: string;
        weight: number;
        reason?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    score: number;
    evaluatedAt: string;
    tier: "low" | "high" | "critical" | "med";
    factors: {
        value: number;
        key: string;
        weight: number;
        reason?: string | undefined;
    }[];
}, {
    score: number;
    evaluatedAt: string;
    tier: "low" | "high" | "critical" | "med";
    factors?: {
        value: number;
        key: string;
        weight: number;
        reason?: string | undefined;
    }[] | undefined;
}>;
declare const RiskScoreCheckResponseSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    subjectType: z.ZodEnum<["run", "changeRequest", "route", "policy", "workspace"]>;
    subjectId: z.ZodString;
    result: z.ZodObject<{
        score: z.ZodNumber;
        tier: z.ZodEnum<["low", "med", "high", "critical"]>;
        evaluatedAt: z.ZodString;
        factors: z.ZodDefault<z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            weight: z.ZodNumber;
            value: z.ZodNumber;
            reason: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            value: number;
            key: string;
            weight: number;
            reason?: string | undefined;
        }, {
            value: number;
            key: string;
            weight: number;
            reason?: string | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        score: number;
        evaluatedAt: string;
        tier: "low" | "high" | "critical" | "med";
        factors: {
            value: number;
            key: string;
            weight: number;
            reason?: string | undefined;
        }[];
    }, {
        score: number;
        evaluatedAt: string;
        tier: "low" | "high" | "critical" | "med";
        factors?: {
            value: number;
            key: string;
            weight: number;
            reason?: string | undefined;
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
    subjectId: string;
    result: {
        score: number;
        evaluatedAt: string;
        tier: "low" | "high" | "critical" | "med";
        factors: {
            value: number;
            key: string;
            weight: number;
            reason?: string | undefined;
        }[];
    };
}, {
    workspaceId: string;
    subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
    subjectId: string;
    result: {
        score: number;
        evaluatedAt: string;
        tier: "low" | "high" | "critical" | "med";
        factors?: {
            value: number;
            key: string;
            weight: number;
            reason?: string | undefined;
        }[] | undefined;
    };
}>;
declare const RiskTrendWindowSchema: z.ZodEnum<["24h", "7d", "30d", "90d"]>;
declare const RiskTrendPointSchema: z.ZodObject<{
    ts: z.ZodString;
    avgScore: z.ZodNumber;
    p95Score: z.ZodNumber;
    highCount: z.ZodNumber;
    criticalCount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    ts: string;
    avgScore: number;
    p95Score: number;
    highCount: number;
    criticalCount: number;
}, {
    ts: string;
    avgScore: number;
    p95Score: number;
    highCount: number;
    criticalCount: number;
}>;
declare const RiskTrendResponseSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    window: z.ZodEnum<["24h", "7d", "30d", "90d"]>;
    points: z.ZodArray<z.ZodObject<{
        ts: z.ZodString;
        avgScore: z.ZodNumber;
        p95Score: z.ZodNumber;
        highCount: z.ZodNumber;
        criticalCount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        ts: string;
        avgScore: number;
        p95Score: number;
        highCount: number;
        criticalCount: number;
    }, {
        ts: string;
        avgScore: number;
        p95Score: number;
        highCount: number;
        criticalCount: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    points: {
        ts: string;
        avgScore: number;
        p95Score: number;
        highCount: number;
        criticalCount: number;
    }[];
    window: "7d" | "30d" | "90d" | "24h";
}, {
    workspaceId: string;
    points: {
        ts: string;
        avgScore: number;
        p95Score: number;
        highCount: number;
        criticalCount: number;
    }[];
    window: "7d" | "30d" | "90d" | "24h";
}>;
declare const RiskBaselineWindowSchema: z.ZodEnum<["7d", "30d", "90d"]>;
declare const RiskBaselineSchema: z.ZodObject<{
    id: z.ZodString;
    workspaceId: z.ZodString;
    subjectType: z.ZodEnum<["run", "changeRequest", "route", "policy", "workspace"]>;
    subjectId: z.ZodString;
    window: z.ZodEnum<["7d", "30d", "90d"]>;
    sampleSize: z.ZodNumber;
    avgScore: z.ZodNumber;
    p95Score: z.ZodNumber;
    highRate: z.ZodNumber;
    criticalRate: z.ZodNumber;
    capturedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    id: string;
    subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
    subjectId: string;
    avgScore: number;
    p95Score: number;
    window: "7d" | "30d" | "90d";
    sampleSize: number;
    highRate: number;
    criticalRate: number;
    capturedAt: string;
}, {
    workspaceId: string;
    id: string;
    subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
    subjectId: string;
    avgScore: number;
    p95Score: number;
    window: "7d" | "30d" | "90d";
    sampleSize: number;
    highRate: number;
    criticalRate: number;
    capturedAt: string;
}>;
declare const RiskBaselineCaptureRequestSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    window: z.ZodDefault<z.ZodEnum<["7d", "30d", "90d"]>>;
    subjectType: z.ZodOptional<z.ZodEnum<["run", "changeRequest", "route", "policy", "workspace"]>>;
    subjectId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    window: "7d" | "30d" | "90d";
    subjectType?: "policy" | "route" | "run" | "workspace" | "changeRequest" | undefined;
    subjectId?: string | undefined;
}, {
    workspaceId: string;
    subjectType?: "policy" | "route" | "run" | "workspace" | "changeRequest" | undefined;
    subjectId?: string | undefined;
    window?: "7d" | "30d" | "90d" | undefined;
}>;
declare const RiskBaselineCaptureResponseSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    window: z.ZodEnum<["7d", "30d", "90d"]>;
    capturedAt: z.ZodString;
    baselines: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        workspaceId: z.ZodString;
        subjectType: z.ZodEnum<["run", "changeRequest", "route", "policy", "workspace"]>;
        subjectId: z.ZodString;
        window: z.ZodEnum<["7d", "30d", "90d"]>;
        sampleSize: z.ZodNumber;
        avgScore: z.ZodNumber;
        p95Score: z.ZodNumber;
        highRate: z.ZodNumber;
        criticalRate: z.ZodNumber;
        capturedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        workspaceId: string;
        id: string;
        subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
        subjectId: string;
        avgScore: number;
        p95Score: number;
        window: "7d" | "30d" | "90d";
        sampleSize: number;
        highRate: number;
        criticalRate: number;
        capturedAt: string;
    }, {
        workspaceId: string;
        id: string;
        subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
        subjectId: string;
        avgScore: number;
        p95Score: number;
        window: "7d" | "30d" | "90d";
        sampleSize: number;
        highRate: number;
        criticalRate: number;
        capturedAt: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    window: "7d" | "30d" | "90d";
    capturedAt: string;
    baselines: {
        workspaceId: string;
        id: string;
        subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
        subjectId: string;
        avgScore: number;
        p95Score: number;
        window: "7d" | "30d" | "90d";
        sampleSize: number;
        highRate: number;
        criticalRate: number;
        capturedAt: string;
    }[];
}, {
    workspaceId: string;
    window: "7d" | "30d" | "90d";
    capturedAt: string;
    baselines?: {
        workspaceId: string;
        id: string;
        subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
        subjectId: string;
        avgScore: number;
        p95Score: number;
        window: "7d" | "30d" | "90d";
        sampleSize: number;
        highRate: number;
        criticalRate: number;
        capturedAt: string;
    }[] | undefined;
}>;
declare const RiskSignalTypeSchema: z.ZodEnum<["score_spike", "tier_escalation", "high_risk_density"]>;
declare const RiskSignalSeveritySchema: z.ZodEnum<["low", "med", "high", "critical"]>;
declare const RiskAnomalySignalSchema: z.ZodObject<{
    id: z.ZodString;
    workspaceId: z.ZodString;
    subjectType: z.ZodEnum<["run", "changeRequest", "route", "policy", "workspace"]>;
    subjectId: z.ZodString;
    riskScoreId: z.ZodString;
    baselineId: z.ZodString;
    signalType: z.ZodEnum<["score_spike", "tier_escalation", "high_risk_density"]>;
    severity: z.ZodEnum<["low", "med", "high", "critical"]>;
    score: z.ZodNumber;
    baselineScore: z.ZodNumber;
    delta: z.ZodNumber;
    details: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    detectedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    id: string;
    details: Record<string, unknown>;
    score: number;
    subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
    subjectId: string;
    severity: "low" | "high" | "critical" | "med";
    riskScoreId: string;
    baselineId: string;
    signalType: "score_spike" | "tier_escalation" | "high_risk_density";
    baselineScore: number;
    delta: number;
    detectedAt: string;
}, {
    workspaceId: string;
    id: string;
    score: number;
    subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
    subjectId: string;
    severity: "low" | "high" | "critical" | "med";
    riskScoreId: string;
    baselineId: string;
    signalType: "score_spike" | "tier_escalation" | "high_risk_density";
    baselineScore: number;
    delta: number;
    detectedAt: string;
    details?: Record<string, unknown> | undefined;
}>;
declare const RiskSignalGenerateRequestSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    lookbackHours: z.ZodDefault<z.ZodNumber>;
    subjectType: z.ZodOptional<z.ZodEnum<["run", "changeRequest", "route", "policy", "workspace"]>>;
    subjectId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    lookbackHours: number;
    subjectType?: "policy" | "route" | "run" | "workspace" | "changeRequest" | undefined;
    subjectId?: string | undefined;
}, {
    workspaceId: string;
    subjectType?: "policy" | "route" | "run" | "workspace" | "changeRequest" | undefined;
    subjectId?: string | undefined;
    lookbackHours?: number | undefined;
}>;
declare const RiskSignalGenerateResponseSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    lookbackHours: z.ZodNumber;
    generatedCount: z.ZodNumber;
    signals: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        workspaceId: z.ZodString;
        subjectType: z.ZodEnum<["run", "changeRequest", "route", "policy", "workspace"]>;
        subjectId: z.ZodString;
        riskScoreId: z.ZodString;
        baselineId: z.ZodString;
        signalType: z.ZodEnum<["score_spike", "tier_escalation", "high_risk_density"]>;
        severity: z.ZodEnum<["low", "med", "high", "critical"]>;
        score: z.ZodNumber;
        baselineScore: z.ZodNumber;
        delta: z.ZodNumber;
        details: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        detectedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        workspaceId: string;
        id: string;
        details: Record<string, unknown>;
        score: number;
        subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
        subjectId: string;
        severity: "low" | "high" | "critical" | "med";
        riskScoreId: string;
        baselineId: string;
        signalType: "score_spike" | "tier_escalation" | "high_risk_density";
        baselineScore: number;
        delta: number;
        detectedAt: string;
    }, {
        workspaceId: string;
        id: string;
        score: number;
        subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
        subjectId: string;
        severity: "low" | "high" | "critical" | "med";
        riskScoreId: string;
        baselineId: string;
        signalType: "score_spike" | "tier_escalation" | "high_risk_density";
        baselineScore: number;
        delta: number;
        detectedAt: string;
        details?: Record<string, unknown> | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    lookbackHours: number;
    generatedCount: number;
    signals: {
        workspaceId: string;
        id: string;
        details: Record<string, unknown>;
        score: number;
        subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
        subjectId: string;
        severity: "low" | "high" | "critical" | "med";
        riskScoreId: string;
        baselineId: string;
        signalType: "score_spike" | "tier_escalation" | "high_risk_density";
        baselineScore: number;
        delta: number;
        detectedAt: string;
    }[];
}, {
    workspaceId: string;
    lookbackHours: number;
    generatedCount: number;
    signals?: {
        workspaceId: string;
        id: string;
        score: number;
        subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
        subjectId: string;
        severity: "low" | "high" | "critical" | "med";
        riskScoreId: string;
        baselineId: string;
        signalType: "score_spike" | "tier_escalation" | "high_risk_density";
        baselineScore: number;
        delta: number;
        detectedAt: string;
        details?: Record<string, unknown> | undefined;
    }[] | undefined;
}>;
declare const RiskSignalListResponseSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    lookbackHours: z.ZodNumber;
    signals: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        workspaceId: z.ZodString;
        subjectType: z.ZodEnum<["run", "changeRequest", "route", "policy", "workspace"]>;
        subjectId: z.ZodString;
        riskScoreId: z.ZodString;
        baselineId: z.ZodString;
        signalType: z.ZodEnum<["score_spike", "tier_escalation", "high_risk_density"]>;
        severity: z.ZodEnum<["low", "med", "high", "critical"]>;
        score: z.ZodNumber;
        baselineScore: z.ZodNumber;
        delta: z.ZodNumber;
        details: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        detectedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        workspaceId: string;
        id: string;
        details: Record<string, unknown>;
        score: number;
        subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
        subjectId: string;
        severity: "low" | "high" | "critical" | "med";
        riskScoreId: string;
        baselineId: string;
        signalType: "score_spike" | "tier_escalation" | "high_risk_density";
        baselineScore: number;
        delta: number;
        detectedAt: string;
    }, {
        workspaceId: string;
        id: string;
        score: number;
        subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
        subjectId: string;
        severity: "low" | "high" | "critical" | "med";
        riskScoreId: string;
        baselineId: string;
        signalType: "score_spike" | "tier_escalation" | "high_risk_density";
        baselineScore: number;
        delta: number;
        detectedAt: string;
        details?: Record<string, unknown> | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    lookbackHours: number;
    signals: {
        workspaceId: string;
        id: string;
        details: Record<string, unknown>;
        score: number;
        subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
        subjectId: string;
        severity: "low" | "high" | "critical" | "med";
        riskScoreId: string;
        baselineId: string;
        signalType: "score_spike" | "tier_escalation" | "high_risk_density";
        baselineScore: number;
        delta: number;
        detectedAt: string;
    }[];
}, {
    workspaceId: string;
    lookbackHours: number;
    signals?: {
        workspaceId: string;
        id: string;
        score: number;
        subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
        subjectId: string;
        severity: "low" | "high" | "critical" | "med";
        riskScoreId: string;
        baselineId: string;
        signalType: "score_spike" | "tier_escalation" | "high_risk_density";
        baselineScore: number;
        delta: number;
        detectedAt: string;
        details?: Record<string, unknown> | undefined;
    }[] | undefined;
}>;
declare const DriftDimensionSchema: z.ZodEnum<["prompt", "tool", "model", "data", "risk"]>;
declare const DriftSignalSeveritySchema: z.ZodEnum<["low", "med", "high", "critical"]>;
declare const DriftMetricKeySchema: z.ZodEnum<["risk_score_avg"]>;
declare const DriftMetricBaselineSchema: z.ZodObject<{
    id: z.ZodString;
    workspaceId: z.ZodString;
    dimension: z.ZodEnum<["prompt", "tool", "model", "data", "risk"]>;
    entityKey: z.ZodString;
    metricKey: z.ZodEnum<["risk_score_avg"]>;
    lookbackHours: z.ZodNumber;
    sampleSize: z.ZodNumber;
    avgScore: z.ZodNumber;
    p95Score: z.ZodNumber;
    highRate: z.ZodNumber;
    criticalRate: z.ZodNumber;
    capturedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    id: string;
    avgScore: number;
    p95Score: number;
    sampleSize: number;
    highRate: number;
    criticalRate: number;
    capturedAt: string;
    lookbackHours: number;
    dimension: "data" | "model" | "tool" | "risk" | "prompt";
    entityKey: string;
    metricKey: "risk_score_avg";
}, {
    workspaceId: string;
    id: string;
    avgScore: number;
    p95Score: number;
    sampleSize: number;
    highRate: number;
    criticalRate: number;
    capturedAt: string;
    lookbackHours: number;
    dimension: "data" | "model" | "tool" | "risk" | "prompt";
    entityKey: string;
    metricKey: "risk_score_avg";
}>;
declare const DriftSignalSchema: z.ZodObject<{
    id: z.ZodString;
    workspaceId: z.ZodString;
    dimension: z.ZodEnum<["prompt", "tool", "model", "data", "risk"]>;
    entityKey: z.ZodString;
    metricKey: z.ZodEnum<["risk_score_avg"]>;
    baselineId: z.ZodString;
    sampleSize: z.ZodNumber;
    baselineSampleSize: z.ZodNumber;
    score: z.ZodNumber;
    baselineScore: z.ZodNumber;
    delta: z.ZodNumber;
    deltaRatio: z.ZodNumber;
    severity: z.ZodEnum<["low", "med", "high", "critical"]>;
    details: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    detectedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    id: string;
    details: Record<string, unknown>;
    score: number;
    severity: "low" | "high" | "critical" | "med";
    sampleSize: number;
    baselineId: string;
    baselineScore: number;
    delta: number;
    detectedAt: string;
    dimension: "data" | "model" | "tool" | "risk" | "prompt";
    entityKey: string;
    metricKey: "risk_score_avg";
    baselineSampleSize: number;
    deltaRatio: number;
}, {
    workspaceId: string;
    id: string;
    score: number;
    severity: "low" | "high" | "critical" | "med";
    sampleSize: number;
    baselineId: string;
    baselineScore: number;
    delta: number;
    detectedAt: string;
    dimension: "data" | "model" | "tool" | "risk" | "prompt";
    entityKey: string;
    metricKey: "risk_score_avg";
    baselineSampleSize: number;
    deltaRatio: number;
    details?: Record<string, unknown> | undefined;
}>;
declare const DriftSignalGenerateRequestSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    lookbackHours: z.ZodDefault<z.ZodNumber>;
    dimension: z.ZodOptional<z.ZodEnum<["prompt", "tool", "model", "data", "risk"]>>;
    entityKey: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    lookbackHours: number;
    dimension?: "data" | "model" | "tool" | "risk" | "prompt" | undefined;
    entityKey?: string | undefined;
}, {
    workspaceId: string;
    lookbackHours?: number | undefined;
    dimension?: "data" | "model" | "tool" | "risk" | "prompt" | undefined;
    entityKey?: string | undefined;
}>;
declare const DriftSignalGenerateResponseSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    lookbackHours: z.ZodNumber;
    generatedAt: z.ZodString;
    generatedCount: z.ZodNumber;
    signals: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        workspaceId: z.ZodString;
        dimension: z.ZodEnum<["prompt", "tool", "model", "data", "risk"]>;
        entityKey: z.ZodString;
        metricKey: z.ZodEnum<["risk_score_avg"]>;
        baselineId: z.ZodString;
        sampleSize: z.ZodNumber;
        baselineSampleSize: z.ZodNumber;
        score: z.ZodNumber;
        baselineScore: z.ZodNumber;
        delta: z.ZodNumber;
        deltaRatio: z.ZodNumber;
        severity: z.ZodEnum<["low", "med", "high", "critical"]>;
        details: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        detectedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        workspaceId: string;
        id: string;
        details: Record<string, unknown>;
        score: number;
        severity: "low" | "high" | "critical" | "med";
        sampleSize: number;
        baselineId: string;
        baselineScore: number;
        delta: number;
        detectedAt: string;
        dimension: "data" | "model" | "tool" | "risk" | "prompt";
        entityKey: string;
        metricKey: "risk_score_avg";
        baselineSampleSize: number;
        deltaRatio: number;
    }, {
        workspaceId: string;
        id: string;
        score: number;
        severity: "low" | "high" | "critical" | "med";
        sampleSize: number;
        baselineId: string;
        baselineScore: number;
        delta: number;
        detectedAt: string;
        dimension: "data" | "model" | "tool" | "risk" | "prompt";
        entityKey: string;
        metricKey: "risk_score_avg";
        baselineSampleSize: number;
        deltaRatio: number;
        details?: Record<string, unknown> | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    generatedAt: string;
    lookbackHours: number;
    generatedCount: number;
    signals: {
        workspaceId: string;
        id: string;
        details: Record<string, unknown>;
        score: number;
        severity: "low" | "high" | "critical" | "med";
        sampleSize: number;
        baselineId: string;
        baselineScore: number;
        delta: number;
        detectedAt: string;
        dimension: "data" | "model" | "tool" | "risk" | "prompt";
        entityKey: string;
        metricKey: "risk_score_avg";
        baselineSampleSize: number;
        deltaRatio: number;
    }[];
}, {
    workspaceId: string;
    generatedAt: string;
    lookbackHours: number;
    generatedCount: number;
    signals?: {
        workspaceId: string;
        id: string;
        score: number;
        severity: "low" | "high" | "critical" | "med";
        sampleSize: number;
        baselineId: string;
        baselineScore: number;
        delta: number;
        detectedAt: string;
        dimension: "data" | "model" | "tool" | "risk" | "prompt";
        entityKey: string;
        metricKey: "risk_score_avg";
        baselineSampleSize: number;
        deltaRatio: number;
        details?: Record<string, unknown> | undefined;
    }[] | undefined;
}>;
declare const DriftSignalListResponseSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    lookbackHours: z.ZodNumber;
    limit: z.ZodOptional<z.ZodNumber>;
    nextCursor: z.ZodOptional<z.ZodString>;
    signals: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        workspaceId: z.ZodString;
        dimension: z.ZodEnum<["prompt", "tool", "model", "data", "risk"]>;
        entityKey: z.ZodString;
        metricKey: z.ZodEnum<["risk_score_avg"]>;
        baselineId: z.ZodString;
        sampleSize: z.ZodNumber;
        baselineSampleSize: z.ZodNumber;
        score: z.ZodNumber;
        baselineScore: z.ZodNumber;
        delta: z.ZodNumber;
        deltaRatio: z.ZodNumber;
        severity: z.ZodEnum<["low", "med", "high", "critical"]>;
        details: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        detectedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        workspaceId: string;
        id: string;
        details: Record<string, unknown>;
        score: number;
        severity: "low" | "high" | "critical" | "med";
        sampleSize: number;
        baselineId: string;
        baselineScore: number;
        delta: number;
        detectedAt: string;
        dimension: "data" | "model" | "tool" | "risk" | "prompt";
        entityKey: string;
        metricKey: "risk_score_avg";
        baselineSampleSize: number;
        deltaRatio: number;
    }, {
        workspaceId: string;
        id: string;
        score: number;
        severity: "low" | "high" | "critical" | "med";
        sampleSize: number;
        baselineId: string;
        baselineScore: number;
        delta: number;
        detectedAt: string;
        dimension: "data" | "model" | "tool" | "risk" | "prompt";
        entityKey: string;
        metricKey: "risk_score_avg";
        baselineSampleSize: number;
        deltaRatio: number;
        details?: Record<string, unknown> | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    lookbackHours: number;
    signals: {
        workspaceId: string;
        id: string;
        details: Record<string, unknown>;
        score: number;
        severity: "low" | "high" | "critical" | "med";
        sampleSize: number;
        baselineId: string;
        baselineScore: number;
        delta: number;
        detectedAt: string;
        dimension: "data" | "model" | "tool" | "risk" | "prompt";
        entityKey: string;
        metricKey: "risk_score_avg";
        baselineSampleSize: number;
        deltaRatio: number;
    }[];
    limit?: number | undefined;
    nextCursor?: string | undefined;
}, {
    workspaceId: string;
    lookbackHours: number;
    signals?: {
        workspaceId: string;
        id: string;
        score: number;
        severity: "low" | "high" | "critical" | "med";
        sampleSize: number;
        baselineId: string;
        baselineScore: number;
        delta: number;
        detectedAt: string;
        dimension: "data" | "model" | "tool" | "risk" | "prompt";
        entityKey: string;
        metricKey: "risk_score_avg";
        baselineSampleSize: number;
        deltaRatio: number;
        details?: Record<string, unknown> | undefined;
    }[] | undefined;
    limit?: number | undefined;
    nextCursor?: string | undefined;
}>;
declare const SandboxSimulationStatusSchema: z.ZodEnum<["queued", "running", "succeeded", "failed", "canceled"]>;
declare const SandboxSimulationRequestSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    scenarioKey: z.ZodString;
    input: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    initiatedBy: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    input: Record<string, unknown>;
    scenarioKey: string;
    initiatedBy?: string | undefined;
}, {
    workspaceId: string;
    scenarioKey: string;
    input?: Record<string, unknown> | undefined;
    initiatedBy?: string | undefined;
}>;
declare const SandboxSimulationArtifactSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    path: z.ZodString;
    sha256: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    path: string;
    type: string;
    id: string;
    sha256?: string | undefined;
}, {
    path: string;
    type: string;
    id: string;
    sha256?: string | undefined;
}>;
declare const SandboxPolicyPreviewSchema: z.ZodObject<{
    blocked: z.ZodBoolean;
    decisionCount: z.ZodNumber;
    denyCount: z.ZodNumber;
    decisions: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
        decision: "allow" | "deny";
        mode: "monitor" | "enforce";
        policyId: string;
        ruleId: string;
        reasonCode: string;
        reasonText: string;
        trace: Record<string, unknown>;
    }, {
        correlationId: string;
        decision: "allow" | "deny";
        mode: "monitor" | "enforce";
        policyId: string;
        ruleId: string;
        reasonCode: string;
        reasonText: string;
        trace: Record<string, unknown>;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    blocked: boolean;
    decisionCount: number;
    denyCount: number;
    decisions: {
        correlationId: string;
        decision: "allow" | "deny";
        mode: "monitor" | "enforce";
        policyId: string;
        ruleId: string;
        reasonCode: string;
        reasonText: string;
        trace: Record<string, unknown>;
    }[];
}, {
    blocked: boolean;
    decisionCount: number;
    denyCount: number;
    decisions?: {
        correlationId: string;
        decision: "allow" | "deny";
        mode: "monitor" | "enforce";
        policyId: string;
        ruleId: string;
        reasonCode: string;
        reasonText: string;
        trace: Record<string, unknown>;
    }[] | undefined;
}>;
declare const SandboxRiskPreviewSchema: z.ZodObject<{
    subjectType: z.ZodEnum<["run", "changeRequest", "route", "policy", "workspace"]>;
    subjectId: z.ZodString;
    result: z.ZodObject<{
        score: z.ZodNumber;
        tier: z.ZodEnum<["low", "med", "high", "critical"]>;
        evaluatedAt: z.ZodString;
        factors: z.ZodDefault<z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            weight: z.ZodNumber;
            value: z.ZodNumber;
            reason: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            value: number;
            key: string;
            weight: number;
            reason?: string | undefined;
        }, {
            value: number;
            key: string;
            weight: number;
            reason?: string | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        score: number;
        evaluatedAt: string;
        tier: "low" | "high" | "critical" | "med";
        factors: {
            value: number;
            key: string;
            weight: number;
            reason?: string | undefined;
        }[];
    }, {
        score: number;
        evaluatedAt: string;
        tier: "low" | "high" | "critical" | "med";
        factors?: {
            value: number;
            key: string;
            weight: number;
            reason?: string | undefined;
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
    subjectId: string;
    result: {
        score: number;
        evaluatedAt: string;
        tier: "low" | "high" | "critical" | "med";
        factors: {
            value: number;
            key: string;
            weight: number;
            reason?: string | undefined;
        }[];
    };
}, {
    subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
    subjectId: string;
    result: {
        score: number;
        evaluatedAt: string;
        tier: "low" | "high" | "critical" | "med";
        factors?: {
            value: number;
            key: string;
            weight: number;
            reason?: string | undefined;
        }[] | undefined;
    };
}>;
declare const SandboxSimulationResultSchema: z.ZodObject<{
    decision: z.ZodOptional<z.ZodEnum<["allow", "deny", "partial"]>>;
    summary: z.ZodOptional<z.ZodString>;
    metrics: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    artifacts: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodString;
        path: z.ZodString;
        sha256: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        path: string;
        type: string;
        id: string;
        sha256?: string | undefined;
    }, {
        path: string;
        type: string;
        id: string;
        sha256?: string | undefined;
    }>, "many">>;
    policyPreview: z.ZodOptional<z.ZodObject<{
        blocked: z.ZodBoolean;
        decisionCount: z.ZodNumber;
        denyCount: z.ZodNumber;
        decisions: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            decision: "allow" | "deny";
            mode: "monitor" | "enforce";
            policyId: string;
            ruleId: string;
            reasonCode: string;
            reasonText: string;
            trace: Record<string, unknown>;
        }, {
            correlationId: string;
            decision: "allow" | "deny";
            mode: "monitor" | "enforce";
            policyId: string;
            ruleId: string;
            reasonCode: string;
            reasonText: string;
            trace: Record<string, unknown>;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        blocked: boolean;
        decisionCount: number;
        denyCount: number;
        decisions: {
            correlationId: string;
            decision: "allow" | "deny";
            mode: "monitor" | "enforce";
            policyId: string;
            ruleId: string;
            reasonCode: string;
            reasonText: string;
            trace: Record<string, unknown>;
        }[];
    }, {
        blocked: boolean;
        decisionCount: number;
        denyCount: number;
        decisions?: {
            correlationId: string;
            decision: "allow" | "deny";
            mode: "monitor" | "enforce";
            policyId: string;
            ruleId: string;
            reasonCode: string;
            reasonText: string;
            trace: Record<string, unknown>;
        }[] | undefined;
    }>>;
    riskPreview: z.ZodOptional<z.ZodObject<{
        subjectType: z.ZodEnum<["run", "changeRequest", "route", "policy", "workspace"]>;
        subjectId: z.ZodString;
        result: z.ZodObject<{
            score: z.ZodNumber;
            tier: z.ZodEnum<["low", "med", "high", "critical"]>;
            evaluatedAt: z.ZodString;
            factors: z.ZodDefault<z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                weight: z.ZodNumber;
                value: z.ZodNumber;
                reason: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                value: number;
                key: string;
                weight: number;
                reason?: string | undefined;
            }, {
                value: number;
                key: string;
                weight: number;
                reason?: string | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            score: number;
            evaluatedAt: string;
            tier: "low" | "high" | "critical" | "med";
            factors: {
                value: number;
                key: string;
                weight: number;
                reason?: string | undefined;
            }[];
        }, {
            score: number;
            evaluatedAt: string;
            tier: "low" | "high" | "critical" | "med";
            factors?: {
                value: number;
                key: string;
                weight: number;
                reason?: string | undefined;
            }[] | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
        subjectId: string;
        result: {
            score: number;
            evaluatedAt: string;
            tier: "low" | "high" | "critical" | "med";
            factors: {
                value: number;
                key: string;
                weight: number;
                reason?: string | undefined;
            }[];
        };
    }, {
        subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
        subjectId: string;
        result: {
            score: number;
            evaluatedAt: string;
            tier: "low" | "high" | "critical" | "med";
            factors?: {
                value: number;
                key: string;
                weight: number;
                reason?: string | undefined;
            }[] | undefined;
        };
    }>>;
}, "strip", z.ZodTypeAny, {
    artifacts: {
        path: string;
        type: string;
        id: string;
        sha256?: string | undefined;
    }[];
    decision?: "allow" | "deny" | "partial" | undefined;
    summary?: string | undefined;
    metrics?: Record<string, number> | undefined;
    policyPreview?: {
        blocked: boolean;
        decisionCount: number;
        denyCount: number;
        decisions: {
            correlationId: string;
            decision: "allow" | "deny";
            mode: "monitor" | "enforce";
            policyId: string;
            ruleId: string;
            reasonCode: string;
            reasonText: string;
            trace: Record<string, unknown>;
        }[];
    } | undefined;
    riskPreview?: {
        subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
        subjectId: string;
        result: {
            score: number;
            evaluatedAt: string;
            tier: "low" | "high" | "critical" | "med";
            factors: {
                value: number;
                key: string;
                weight: number;
                reason?: string | undefined;
            }[];
        };
    } | undefined;
}, {
    decision?: "allow" | "deny" | "partial" | undefined;
    summary?: string | undefined;
    metrics?: Record<string, number> | undefined;
    artifacts?: {
        path: string;
        type: string;
        id: string;
        sha256?: string | undefined;
    }[] | undefined;
    policyPreview?: {
        blocked: boolean;
        decisionCount: number;
        denyCount: number;
        decisions?: {
            correlationId: string;
            decision: "allow" | "deny";
            mode: "monitor" | "enforce";
            policyId: string;
            ruleId: string;
            reasonCode: string;
            reasonText: string;
            trace: Record<string, unknown>;
        }[] | undefined;
    } | undefined;
    riskPreview?: {
        subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
        subjectId: string;
        result: {
            score: number;
            evaluatedAt: string;
            tier: "low" | "high" | "critical" | "med";
            factors?: {
                value: number;
                key: string;
                weight: number;
                reason?: string | undefined;
            }[] | undefined;
        };
    } | undefined;
}>;
declare const SandboxSimulationRunSchema: z.ZodObject<{
    simulationId: z.ZodString;
    workspaceId: z.ZodString;
    scenarioKey: z.ZodString;
    status: z.ZodEnum<["queued", "running", "succeeded", "failed", "canceled"]>;
    createdAt: z.ZodString;
    startedAt: z.ZodOptional<z.ZodString>;
    finishedAt: z.ZodOptional<z.ZodString>;
    result: z.ZodOptional<z.ZodObject<{
        decision: z.ZodOptional<z.ZodEnum<["allow", "deny", "partial"]>>;
        summary: z.ZodOptional<z.ZodString>;
        metrics: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        artifacts: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodString;
            path: z.ZodString;
            sha256: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            path: string;
            type: string;
            id: string;
            sha256?: string | undefined;
        }, {
            path: string;
            type: string;
            id: string;
            sha256?: string | undefined;
        }>, "many">>;
        policyPreview: z.ZodOptional<z.ZodObject<{
            blocked: z.ZodBoolean;
            decisionCount: z.ZodNumber;
            denyCount: z.ZodNumber;
            decisions: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
                decision: "allow" | "deny";
                mode: "monitor" | "enforce";
                policyId: string;
                ruleId: string;
                reasonCode: string;
                reasonText: string;
                trace: Record<string, unknown>;
            }, {
                correlationId: string;
                decision: "allow" | "deny";
                mode: "monitor" | "enforce";
                policyId: string;
                ruleId: string;
                reasonCode: string;
                reasonText: string;
                trace: Record<string, unknown>;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            blocked: boolean;
            decisionCount: number;
            denyCount: number;
            decisions: {
                correlationId: string;
                decision: "allow" | "deny";
                mode: "monitor" | "enforce";
                policyId: string;
                ruleId: string;
                reasonCode: string;
                reasonText: string;
                trace: Record<string, unknown>;
            }[];
        }, {
            blocked: boolean;
            decisionCount: number;
            denyCount: number;
            decisions?: {
                correlationId: string;
                decision: "allow" | "deny";
                mode: "monitor" | "enforce";
                policyId: string;
                ruleId: string;
                reasonCode: string;
                reasonText: string;
                trace: Record<string, unknown>;
            }[] | undefined;
        }>>;
        riskPreview: z.ZodOptional<z.ZodObject<{
            subjectType: z.ZodEnum<["run", "changeRequest", "route", "policy", "workspace"]>;
            subjectId: z.ZodString;
            result: z.ZodObject<{
                score: z.ZodNumber;
                tier: z.ZodEnum<["low", "med", "high", "critical"]>;
                evaluatedAt: z.ZodString;
                factors: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    key: z.ZodString;
                    weight: z.ZodNumber;
                    value: z.ZodNumber;
                    reason: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    value: number;
                    key: string;
                    weight: number;
                    reason?: string | undefined;
                }, {
                    value: number;
                    key: string;
                    weight: number;
                    reason?: string | undefined;
                }>, "many">>;
            }, "strip", z.ZodTypeAny, {
                score: number;
                evaluatedAt: string;
                tier: "low" | "high" | "critical" | "med";
                factors: {
                    value: number;
                    key: string;
                    weight: number;
                    reason?: string | undefined;
                }[];
            }, {
                score: number;
                evaluatedAt: string;
                tier: "low" | "high" | "critical" | "med";
                factors?: {
                    value: number;
                    key: string;
                    weight: number;
                    reason?: string | undefined;
                }[] | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
            subjectId: string;
            result: {
                score: number;
                evaluatedAt: string;
                tier: "low" | "high" | "critical" | "med";
                factors: {
                    value: number;
                    key: string;
                    weight: number;
                    reason?: string | undefined;
                }[];
            };
        }, {
            subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
            subjectId: string;
            result: {
                score: number;
                evaluatedAt: string;
                tier: "low" | "high" | "critical" | "med";
                factors?: {
                    value: number;
                    key: string;
                    weight: number;
                    reason?: string | undefined;
                }[] | undefined;
            };
        }>>;
    }, "strip", z.ZodTypeAny, {
        artifacts: {
            path: string;
            type: string;
            id: string;
            sha256?: string | undefined;
        }[];
        decision?: "allow" | "deny" | "partial" | undefined;
        summary?: string | undefined;
        metrics?: Record<string, number> | undefined;
        policyPreview?: {
            blocked: boolean;
            decisionCount: number;
            denyCount: number;
            decisions: {
                correlationId: string;
                decision: "allow" | "deny";
                mode: "monitor" | "enforce";
                policyId: string;
                ruleId: string;
                reasonCode: string;
                reasonText: string;
                trace: Record<string, unknown>;
            }[];
        } | undefined;
        riskPreview?: {
            subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
            subjectId: string;
            result: {
                score: number;
                evaluatedAt: string;
                tier: "low" | "high" | "critical" | "med";
                factors: {
                    value: number;
                    key: string;
                    weight: number;
                    reason?: string | undefined;
                }[];
            };
        } | undefined;
    }, {
        decision?: "allow" | "deny" | "partial" | undefined;
        summary?: string | undefined;
        metrics?: Record<string, number> | undefined;
        artifacts?: {
            path: string;
            type: string;
            id: string;
            sha256?: string | undefined;
        }[] | undefined;
        policyPreview?: {
            blocked: boolean;
            decisionCount: number;
            denyCount: number;
            decisions?: {
                correlationId: string;
                decision: "allow" | "deny";
                mode: "monitor" | "enforce";
                policyId: string;
                ruleId: string;
                reasonCode: string;
                reasonText: string;
                trace: Record<string, unknown>;
            }[] | undefined;
        } | undefined;
        riskPreview?: {
            subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
            subjectId: string;
            result: {
                score: number;
                evaluatedAt: string;
                tier: "low" | "high" | "critical" | "med";
                factors?: {
                    value: number;
                    key: string;
                    weight: number;
                    reason?: string | undefined;
                }[] | undefined;
            };
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: "queued" | "running" | "succeeded" | "failed" | "canceled";
    workspaceId: string;
    createdAt: string;
    scenarioKey: string;
    simulationId: string;
    startedAt?: string | undefined;
    finishedAt?: string | undefined;
    result?: {
        artifacts: {
            path: string;
            type: string;
            id: string;
            sha256?: string | undefined;
        }[];
        decision?: "allow" | "deny" | "partial" | undefined;
        summary?: string | undefined;
        metrics?: Record<string, number> | undefined;
        policyPreview?: {
            blocked: boolean;
            decisionCount: number;
            denyCount: number;
            decisions: {
                correlationId: string;
                decision: "allow" | "deny";
                mode: "monitor" | "enforce";
                policyId: string;
                ruleId: string;
                reasonCode: string;
                reasonText: string;
                trace: Record<string, unknown>;
            }[];
        } | undefined;
        riskPreview?: {
            subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
            subjectId: string;
            result: {
                score: number;
                evaluatedAt: string;
                tier: "low" | "high" | "critical" | "med";
                factors: {
                    value: number;
                    key: string;
                    weight: number;
                    reason?: string | undefined;
                }[];
            };
        } | undefined;
    } | undefined;
}, {
    status: "queued" | "running" | "succeeded" | "failed" | "canceled";
    workspaceId: string;
    createdAt: string;
    scenarioKey: string;
    simulationId: string;
    startedAt?: string | undefined;
    finishedAt?: string | undefined;
    result?: {
        decision?: "allow" | "deny" | "partial" | undefined;
        summary?: string | undefined;
        metrics?: Record<string, number> | undefined;
        artifacts?: {
            path: string;
            type: string;
            id: string;
            sha256?: string | undefined;
        }[] | undefined;
        policyPreview?: {
            blocked: boolean;
            decisionCount: number;
            denyCount: number;
            decisions?: {
                correlationId: string;
                decision: "allow" | "deny";
                mode: "monitor" | "enforce";
                policyId: string;
                ruleId: string;
                reasonCode: string;
                reasonText: string;
                trace: Record<string, unknown>;
            }[] | undefined;
        } | undefined;
        riskPreview?: {
            subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
            subjectId: string;
            result: {
                score: number;
                evaluatedAt: string;
                tier: "low" | "high" | "critical" | "med";
                factors?: {
                    value: number;
                    key: string;
                    weight: number;
                    reason?: string | undefined;
                }[] | undefined;
            };
        } | undefined;
    } | undefined;
}>;
declare const SandboxSimulationListResponseSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    limit: z.ZodNumber;
    nextCursor: z.ZodOptional<z.ZodString>;
    simulations: z.ZodDefault<z.ZodArray<z.ZodObject<{
        simulationId: z.ZodString;
        workspaceId: z.ZodString;
        scenarioKey: z.ZodString;
        status: z.ZodEnum<["queued", "running", "succeeded", "failed", "canceled"]>;
        createdAt: z.ZodString;
        startedAt: z.ZodOptional<z.ZodString>;
        finishedAt: z.ZodOptional<z.ZodString>;
        result: z.ZodOptional<z.ZodObject<{
            decision: z.ZodOptional<z.ZodEnum<["allow", "deny", "partial"]>>;
            summary: z.ZodOptional<z.ZodString>;
            metrics: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            artifacts: z.ZodDefault<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                type: z.ZodString;
                path: z.ZodString;
                sha256: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                path: string;
                type: string;
                id: string;
                sha256?: string | undefined;
            }, {
                path: string;
                type: string;
                id: string;
                sha256?: string | undefined;
            }>, "many">>;
            policyPreview: z.ZodOptional<z.ZodObject<{
                blocked: z.ZodBoolean;
                decisionCount: z.ZodNumber;
                denyCount: z.ZodNumber;
                decisions: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
                    decision: "allow" | "deny";
                    mode: "monitor" | "enforce";
                    policyId: string;
                    ruleId: string;
                    reasonCode: string;
                    reasonText: string;
                    trace: Record<string, unknown>;
                }, {
                    correlationId: string;
                    decision: "allow" | "deny";
                    mode: "monitor" | "enforce";
                    policyId: string;
                    ruleId: string;
                    reasonCode: string;
                    reasonText: string;
                    trace: Record<string, unknown>;
                }>, "many">>;
            }, "strip", z.ZodTypeAny, {
                blocked: boolean;
                decisionCount: number;
                denyCount: number;
                decisions: {
                    correlationId: string;
                    decision: "allow" | "deny";
                    mode: "monitor" | "enforce";
                    policyId: string;
                    ruleId: string;
                    reasonCode: string;
                    reasonText: string;
                    trace: Record<string, unknown>;
                }[];
            }, {
                blocked: boolean;
                decisionCount: number;
                denyCount: number;
                decisions?: {
                    correlationId: string;
                    decision: "allow" | "deny";
                    mode: "monitor" | "enforce";
                    policyId: string;
                    ruleId: string;
                    reasonCode: string;
                    reasonText: string;
                    trace: Record<string, unknown>;
                }[] | undefined;
            }>>;
            riskPreview: z.ZodOptional<z.ZodObject<{
                subjectType: z.ZodEnum<["run", "changeRequest", "route", "policy", "workspace"]>;
                subjectId: z.ZodString;
                result: z.ZodObject<{
                    score: z.ZodNumber;
                    tier: z.ZodEnum<["low", "med", "high", "critical"]>;
                    evaluatedAt: z.ZodString;
                    factors: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        key: z.ZodString;
                        weight: z.ZodNumber;
                        value: z.ZodNumber;
                        reason: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }, {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }>, "many">>;
                }, "strip", z.ZodTypeAny, {
                    score: number;
                    evaluatedAt: string;
                    tier: "low" | "high" | "critical" | "med";
                    factors: {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }[];
                }, {
                    score: number;
                    evaluatedAt: string;
                    tier: "low" | "high" | "critical" | "med";
                    factors?: {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }[] | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
                subjectId: string;
                result: {
                    score: number;
                    evaluatedAt: string;
                    tier: "low" | "high" | "critical" | "med";
                    factors: {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }[];
                };
            }, {
                subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
                subjectId: string;
                result: {
                    score: number;
                    evaluatedAt: string;
                    tier: "low" | "high" | "critical" | "med";
                    factors?: {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }[] | undefined;
                };
            }>>;
        }, "strip", z.ZodTypeAny, {
            artifacts: {
                path: string;
                type: string;
                id: string;
                sha256?: string | undefined;
            }[];
            decision?: "allow" | "deny" | "partial" | undefined;
            summary?: string | undefined;
            metrics?: Record<string, number> | undefined;
            policyPreview?: {
                blocked: boolean;
                decisionCount: number;
                denyCount: number;
                decisions: {
                    correlationId: string;
                    decision: "allow" | "deny";
                    mode: "monitor" | "enforce";
                    policyId: string;
                    ruleId: string;
                    reasonCode: string;
                    reasonText: string;
                    trace: Record<string, unknown>;
                }[];
            } | undefined;
            riskPreview?: {
                subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
                subjectId: string;
                result: {
                    score: number;
                    evaluatedAt: string;
                    tier: "low" | "high" | "critical" | "med";
                    factors: {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }[];
                };
            } | undefined;
        }, {
            decision?: "allow" | "deny" | "partial" | undefined;
            summary?: string | undefined;
            metrics?: Record<string, number> | undefined;
            artifacts?: {
                path: string;
                type: string;
                id: string;
                sha256?: string | undefined;
            }[] | undefined;
            policyPreview?: {
                blocked: boolean;
                decisionCount: number;
                denyCount: number;
                decisions?: {
                    correlationId: string;
                    decision: "allow" | "deny";
                    mode: "monitor" | "enforce";
                    policyId: string;
                    ruleId: string;
                    reasonCode: string;
                    reasonText: string;
                    trace: Record<string, unknown>;
                }[] | undefined;
            } | undefined;
            riskPreview?: {
                subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
                subjectId: string;
                result: {
                    score: number;
                    evaluatedAt: string;
                    tier: "low" | "high" | "critical" | "med";
                    factors?: {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }[] | undefined;
                };
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        status: "queued" | "running" | "succeeded" | "failed" | "canceled";
        workspaceId: string;
        createdAt: string;
        scenarioKey: string;
        simulationId: string;
        startedAt?: string | undefined;
        finishedAt?: string | undefined;
        result?: {
            artifacts: {
                path: string;
                type: string;
                id: string;
                sha256?: string | undefined;
            }[];
            decision?: "allow" | "deny" | "partial" | undefined;
            summary?: string | undefined;
            metrics?: Record<string, number> | undefined;
            policyPreview?: {
                blocked: boolean;
                decisionCount: number;
                denyCount: number;
                decisions: {
                    correlationId: string;
                    decision: "allow" | "deny";
                    mode: "monitor" | "enforce";
                    policyId: string;
                    ruleId: string;
                    reasonCode: string;
                    reasonText: string;
                    trace: Record<string, unknown>;
                }[];
            } | undefined;
            riskPreview?: {
                subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
                subjectId: string;
                result: {
                    score: number;
                    evaluatedAt: string;
                    tier: "low" | "high" | "critical" | "med";
                    factors: {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }[];
                };
            } | undefined;
        } | undefined;
    }, {
        status: "queued" | "running" | "succeeded" | "failed" | "canceled";
        workspaceId: string;
        createdAt: string;
        scenarioKey: string;
        simulationId: string;
        startedAt?: string | undefined;
        finishedAt?: string | undefined;
        result?: {
            decision?: "allow" | "deny" | "partial" | undefined;
            summary?: string | undefined;
            metrics?: Record<string, number> | undefined;
            artifacts?: {
                path: string;
                type: string;
                id: string;
                sha256?: string | undefined;
            }[] | undefined;
            policyPreview?: {
                blocked: boolean;
                decisionCount: number;
                denyCount: number;
                decisions?: {
                    correlationId: string;
                    decision: "allow" | "deny";
                    mode: "monitor" | "enforce";
                    policyId: string;
                    ruleId: string;
                    reasonCode: string;
                    reasonText: string;
                    trace: Record<string, unknown>;
                }[] | undefined;
            } | undefined;
            riskPreview?: {
                subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
                subjectId: string;
                result: {
                    score: number;
                    evaluatedAt: string;
                    tier: "low" | "high" | "critical" | "med";
                    factors?: {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }[] | undefined;
                };
            } | undefined;
        } | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    limit: number;
    simulations: {
        status: "queued" | "running" | "succeeded" | "failed" | "canceled";
        workspaceId: string;
        createdAt: string;
        scenarioKey: string;
        simulationId: string;
        startedAt?: string | undefined;
        finishedAt?: string | undefined;
        result?: {
            artifacts: {
                path: string;
                type: string;
                id: string;
                sha256?: string | undefined;
            }[];
            decision?: "allow" | "deny" | "partial" | undefined;
            summary?: string | undefined;
            metrics?: Record<string, number> | undefined;
            policyPreview?: {
                blocked: boolean;
                decisionCount: number;
                denyCount: number;
                decisions: {
                    correlationId: string;
                    decision: "allow" | "deny";
                    mode: "monitor" | "enforce";
                    policyId: string;
                    ruleId: string;
                    reasonCode: string;
                    reasonText: string;
                    trace: Record<string, unknown>;
                }[];
            } | undefined;
            riskPreview?: {
                subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
                subjectId: string;
                result: {
                    score: number;
                    evaluatedAt: string;
                    tier: "low" | "high" | "critical" | "med";
                    factors: {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }[];
                };
            } | undefined;
        } | undefined;
    }[];
    nextCursor?: string | undefined;
}, {
    workspaceId: string;
    limit: number;
    nextCursor?: string | undefined;
    simulations?: {
        status: "queued" | "running" | "succeeded" | "failed" | "canceled";
        workspaceId: string;
        createdAt: string;
        scenarioKey: string;
        simulationId: string;
        startedAt?: string | undefined;
        finishedAt?: string | undefined;
        result?: {
            decision?: "allow" | "deny" | "partial" | undefined;
            summary?: string | undefined;
            metrics?: Record<string, number> | undefined;
            artifacts?: {
                path: string;
                type: string;
                id: string;
                sha256?: string | undefined;
            }[] | undefined;
            policyPreview?: {
                blocked: boolean;
                decisionCount: number;
                denyCount: number;
                decisions?: {
                    correlationId: string;
                    decision: "allow" | "deny";
                    mode: "monitor" | "enforce";
                    policyId: string;
                    ruleId: string;
                    reasonCode: string;
                    reasonText: string;
                    trace: Record<string, unknown>;
                }[] | undefined;
            } | undefined;
            riskPreview?: {
                subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
                subjectId: string;
                result: {
                    score: number;
                    evaluatedAt: string;
                    tier: "low" | "high" | "critical" | "med";
                    factors?: {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }[] | undefined;
                };
            } | undefined;
        } | undefined;
    }[] | undefined;
}>;
declare const SandboxSimulationReplayResponseSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    sourceSimulationId: z.ZodString;
    simulation: z.ZodObject<{
        simulationId: z.ZodString;
        workspaceId: z.ZodString;
        scenarioKey: z.ZodString;
        status: z.ZodEnum<["queued", "running", "succeeded", "failed", "canceled"]>;
        createdAt: z.ZodString;
        startedAt: z.ZodOptional<z.ZodString>;
        finishedAt: z.ZodOptional<z.ZodString>;
        result: z.ZodOptional<z.ZodObject<{
            decision: z.ZodOptional<z.ZodEnum<["allow", "deny", "partial"]>>;
            summary: z.ZodOptional<z.ZodString>;
            metrics: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            artifacts: z.ZodDefault<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                type: z.ZodString;
                path: z.ZodString;
                sha256: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                path: string;
                type: string;
                id: string;
                sha256?: string | undefined;
            }, {
                path: string;
                type: string;
                id: string;
                sha256?: string | undefined;
            }>, "many">>;
            policyPreview: z.ZodOptional<z.ZodObject<{
                blocked: z.ZodBoolean;
                decisionCount: z.ZodNumber;
                denyCount: z.ZodNumber;
                decisions: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
                    decision: "allow" | "deny";
                    mode: "monitor" | "enforce";
                    policyId: string;
                    ruleId: string;
                    reasonCode: string;
                    reasonText: string;
                    trace: Record<string, unknown>;
                }, {
                    correlationId: string;
                    decision: "allow" | "deny";
                    mode: "monitor" | "enforce";
                    policyId: string;
                    ruleId: string;
                    reasonCode: string;
                    reasonText: string;
                    trace: Record<string, unknown>;
                }>, "many">>;
            }, "strip", z.ZodTypeAny, {
                blocked: boolean;
                decisionCount: number;
                denyCount: number;
                decisions: {
                    correlationId: string;
                    decision: "allow" | "deny";
                    mode: "monitor" | "enforce";
                    policyId: string;
                    ruleId: string;
                    reasonCode: string;
                    reasonText: string;
                    trace: Record<string, unknown>;
                }[];
            }, {
                blocked: boolean;
                decisionCount: number;
                denyCount: number;
                decisions?: {
                    correlationId: string;
                    decision: "allow" | "deny";
                    mode: "monitor" | "enforce";
                    policyId: string;
                    ruleId: string;
                    reasonCode: string;
                    reasonText: string;
                    trace: Record<string, unknown>;
                }[] | undefined;
            }>>;
            riskPreview: z.ZodOptional<z.ZodObject<{
                subjectType: z.ZodEnum<["run", "changeRequest", "route", "policy", "workspace"]>;
                subjectId: z.ZodString;
                result: z.ZodObject<{
                    score: z.ZodNumber;
                    tier: z.ZodEnum<["low", "med", "high", "critical"]>;
                    evaluatedAt: z.ZodString;
                    factors: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        key: z.ZodString;
                        weight: z.ZodNumber;
                        value: z.ZodNumber;
                        reason: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }, {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }>, "many">>;
                }, "strip", z.ZodTypeAny, {
                    score: number;
                    evaluatedAt: string;
                    tier: "low" | "high" | "critical" | "med";
                    factors: {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }[];
                }, {
                    score: number;
                    evaluatedAt: string;
                    tier: "low" | "high" | "critical" | "med";
                    factors?: {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }[] | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
                subjectId: string;
                result: {
                    score: number;
                    evaluatedAt: string;
                    tier: "low" | "high" | "critical" | "med";
                    factors: {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }[];
                };
            }, {
                subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
                subjectId: string;
                result: {
                    score: number;
                    evaluatedAt: string;
                    tier: "low" | "high" | "critical" | "med";
                    factors?: {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }[] | undefined;
                };
            }>>;
        }, "strip", z.ZodTypeAny, {
            artifacts: {
                path: string;
                type: string;
                id: string;
                sha256?: string | undefined;
            }[];
            decision?: "allow" | "deny" | "partial" | undefined;
            summary?: string | undefined;
            metrics?: Record<string, number> | undefined;
            policyPreview?: {
                blocked: boolean;
                decisionCount: number;
                denyCount: number;
                decisions: {
                    correlationId: string;
                    decision: "allow" | "deny";
                    mode: "monitor" | "enforce";
                    policyId: string;
                    ruleId: string;
                    reasonCode: string;
                    reasonText: string;
                    trace: Record<string, unknown>;
                }[];
            } | undefined;
            riskPreview?: {
                subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
                subjectId: string;
                result: {
                    score: number;
                    evaluatedAt: string;
                    tier: "low" | "high" | "critical" | "med";
                    factors: {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }[];
                };
            } | undefined;
        }, {
            decision?: "allow" | "deny" | "partial" | undefined;
            summary?: string | undefined;
            metrics?: Record<string, number> | undefined;
            artifacts?: {
                path: string;
                type: string;
                id: string;
                sha256?: string | undefined;
            }[] | undefined;
            policyPreview?: {
                blocked: boolean;
                decisionCount: number;
                denyCount: number;
                decisions?: {
                    correlationId: string;
                    decision: "allow" | "deny";
                    mode: "monitor" | "enforce";
                    policyId: string;
                    ruleId: string;
                    reasonCode: string;
                    reasonText: string;
                    trace: Record<string, unknown>;
                }[] | undefined;
            } | undefined;
            riskPreview?: {
                subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
                subjectId: string;
                result: {
                    score: number;
                    evaluatedAt: string;
                    tier: "low" | "high" | "critical" | "med";
                    factors?: {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }[] | undefined;
                };
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        status: "queued" | "running" | "succeeded" | "failed" | "canceled";
        workspaceId: string;
        createdAt: string;
        scenarioKey: string;
        simulationId: string;
        startedAt?: string | undefined;
        finishedAt?: string | undefined;
        result?: {
            artifacts: {
                path: string;
                type: string;
                id: string;
                sha256?: string | undefined;
            }[];
            decision?: "allow" | "deny" | "partial" | undefined;
            summary?: string | undefined;
            metrics?: Record<string, number> | undefined;
            policyPreview?: {
                blocked: boolean;
                decisionCount: number;
                denyCount: number;
                decisions: {
                    correlationId: string;
                    decision: "allow" | "deny";
                    mode: "monitor" | "enforce";
                    policyId: string;
                    ruleId: string;
                    reasonCode: string;
                    reasonText: string;
                    trace: Record<string, unknown>;
                }[];
            } | undefined;
            riskPreview?: {
                subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
                subjectId: string;
                result: {
                    score: number;
                    evaluatedAt: string;
                    tier: "low" | "high" | "critical" | "med";
                    factors: {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }[];
                };
            } | undefined;
        } | undefined;
    }, {
        status: "queued" | "running" | "succeeded" | "failed" | "canceled";
        workspaceId: string;
        createdAt: string;
        scenarioKey: string;
        simulationId: string;
        startedAt?: string | undefined;
        finishedAt?: string | undefined;
        result?: {
            decision?: "allow" | "deny" | "partial" | undefined;
            summary?: string | undefined;
            metrics?: Record<string, number> | undefined;
            artifacts?: {
                path: string;
                type: string;
                id: string;
                sha256?: string | undefined;
            }[] | undefined;
            policyPreview?: {
                blocked: boolean;
                decisionCount: number;
                denyCount: number;
                decisions?: {
                    correlationId: string;
                    decision: "allow" | "deny";
                    mode: "monitor" | "enforce";
                    policyId: string;
                    ruleId: string;
                    reasonCode: string;
                    reasonText: string;
                    trace: Record<string, unknown>;
                }[] | undefined;
            } | undefined;
            riskPreview?: {
                subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
                subjectId: string;
                result: {
                    score: number;
                    evaluatedAt: string;
                    tier: "low" | "high" | "critical" | "med";
                    factors?: {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }[] | undefined;
                };
            } | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    sourceSimulationId: string;
    simulation: {
        status: "queued" | "running" | "succeeded" | "failed" | "canceled";
        workspaceId: string;
        createdAt: string;
        scenarioKey: string;
        simulationId: string;
        startedAt?: string | undefined;
        finishedAt?: string | undefined;
        result?: {
            artifacts: {
                path: string;
                type: string;
                id: string;
                sha256?: string | undefined;
            }[];
            decision?: "allow" | "deny" | "partial" | undefined;
            summary?: string | undefined;
            metrics?: Record<string, number> | undefined;
            policyPreview?: {
                blocked: boolean;
                decisionCount: number;
                denyCount: number;
                decisions: {
                    correlationId: string;
                    decision: "allow" | "deny";
                    mode: "monitor" | "enforce";
                    policyId: string;
                    ruleId: string;
                    reasonCode: string;
                    reasonText: string;
                    trace: Record<string, unknown>;
                }[];
            } | undefined;
            riskPreview?: {
                subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
                subjectId: string;
                result: {
                    score: number;
                    evaluatedAt: string;
                    tier: "low" | "high" | "critical" | "med";
                    factors: {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }[];
                };
            } | undefined;
        } | undefined;
    };
}, {
    workspaceId: string;
    sourceSimulationId: string;
    simulation: {
        status: "queued" | "running" | "succeeded" | "failed" | "canceled";
        workspaceId: string;
        createdAt: string;
        scenarioKey: string;
        simulationId: string;
        startedAt?: string | undefined;
        finishedAt?: string | undefined;
        result?: {
            decision?: "allow" | "deny" | "partial" | undefined;
            summary?: string | undefined;
            metrics?: Record<string, number> | undefined;
            artifacts?: {
                path: string;
                type: string;
                id: string;
                sha256?: string | undefined;
            }[] | undefined;
            policyPreview?: {
                blocked: boolean;
                decisionCount: number;
                denyCount: number;
                decisions?: {
                    correlationId: string;
                    decision: "allow" | "deny";
                    mode: "monitor" | "enforce";
                    policyId: string;
                    ruleId: string;
                    reasonCode: string;
                    reasonText: string;
                    trace: Record<string, unknown>;
                }[] | undefined;
            } | undefined;
            riskPreview?: {
                subjectType: "policy" | "route" | "run" | "workspace" | "changeRequest";
                subjectId: string;
                result: {
                    score: number;
                    evaluatedAt: string;
                    tier: "low" | "high" | "critical" | "med";
                    factors?: {
                        value: number;
                        key: string;
                        weight: number;
                        reason?: string | undefined;
                    }[] | undefined;
                };
            } | undefined;
        } | undefined;
    };
}>;
declare const DataBoundaryPolicyModeSchema: z.ZodEnum<["monitor", "enforce"]>;
declare const DataBoundaryPolicyStatusSchema: z.ZodEnum<["draft", "active", "disabled"]>;
declare const DataBoundaryDecisionActionSchema: z.ZodEnum<["allow", "block", "redact", "mask", "escalate"]>;
declare const DataBoundaryMaskingStrategySchema: z.ZodEnum<["full", "partial", "hash", "tokenize"]>;
declare const DataBoundaryRuleTargetSchema: z.ZodEnum<["input", "output", "tool_call", "payload", "metadata"]>;
declare const DataBoundaryRuleSchema: z.ZodObject<{
    id: z.ZodString;
    ruleKey: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    classification: z.ZodString;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    target: z.ZodEnum<["input", "output", "tool_call", "payload", "metadata"]>;
    matchPattern: z.ZodString;
    action: z.ZodEnum<["allow", "block", "redact", "mask", "escalate"]>;
    maskingStrategy: z.ZodOptional<z.ZodEnum<["full", "partial", "hash", "tokenize"]>>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    target: "input" | "metadata" | "payload" | "output" | "tool_call";
    enabled: boolean;
    action: "allow" | "block" | "redact" | "mask" | "escalate";
    ruleKey: string;
    classification: string;
    tags: string[];
    matchPattern: string;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    description?: string | undefined;
    maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
}, {
    id: string;
    target: "input" | "metadata" | "payload" | "output" | "tool_call";
    action: "allow" | "block" | "redact" | "mask" | "escalate";
    ruleKey: string;
    classification: string;
    matchPattern: string;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    tags?: string[] | undefined;
    maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
}>;
declare const DataBoundaryPolicySchema: z.ZodObject<{
    id: z.ZodString;
    workspaceId: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    mode: z.ZodEnum<["monitor", "enforce"]>;
    status: z.ZodEnum<["draft", "active", "disabled"]>;
    defaultAction: z.ZodEnum<["allow", "block", "redact", "mask", "escalate"]>;
    regionAllowlist: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    modelAllowlist: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    rules: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        ruleKey: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        classification: z.ZodString;
        tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        target: z.ZodEnum<["input", "output", "tool_call", "payload", "metadata"]>;
        matchPattern: z.ZodString;
        action: z.ZodEnum<["allow", "block", "redact", "mask", "escalate"]>;
        maskingStrategy: z.ZodOptional<z.ZodEnum<["full", "partial", "hash", "tokenize"]>>;
        enabled: z.ZodDefault<z.ZodBoolean>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        target: "input" | "metadata" | "payload" | "output" | "tool_call";
        enabled: boolean;
        action: "allow" | "block" | "redact" | "mask" | "escalate";
        ruleKey: string;
        classification: string;
        tags: string[];
        matchPattern: string;
        createdAt?: string | undefined;
        updatedAt?: string | undefined;
        description?: string | undefined;
        maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
    }, {
        id: string;
        target: "input" | "metadata" | "payload" | "output" | "tool_call";
        action: "allow" | "block" | "redact" | "mask" | "escalate";
        ruleKey: string;
        classification: string;
        matchPattern: string;
        createdAt?: string | undefined;
        updatedAt?: string | undefined;
        enabled?: boolean | undefined;
        description?: string | undefined;
        tags?: string[] | undefined;
        maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
    }>, "many">>;
    createdBy: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "active" | "disabled";
    workspaceId: string;
    createdAt: string;
    id: string;
    updatedAt: string;
    mode: "monitor" | "enforce";
    createdBy: string;
    name: string;
    defaultAction: "allow" | "block" | "redact" | "mask" | "escalate";
    regionAllowlist: string[];
    modelAllowlist: string[];
    rules: {
        id: string;
        target: "input" | "metadata" | "payload" | "output" | "tool_call";
        enabled: boolean;
        action: "allow" | "block" | "redact" | "mask" | "escalate";
        ruleKey: string;
        classification: string;
        tags: string[];
        matchPattern: string;
        createdAt?: string | undefined;
        updatedAt?: string | undefined;
        description?: string | undefined;
        maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
    }[];
    description?: string | undefined;
}, {
    status: "draft" | "active" | "disabled";
    workspaceId: string;
    createdAt: string;
    id: string;
    updatedAt: string;
    mode: "monitor" | "enforce";
    createdBy: string;
    name: string;
    defaultAction: "allow" | "block" | "redact" | "mask" | "escalate";
    description?: string | undefined;
    regionAllowlist?: string[] | undefined;
    modelAllowlist?: string[] | undefined;
    rules?: {
        id: string;
        target: "input" | "metadata" | "payload" | "output" | "tool_call";
        action: "allow" | "block" | "redact" | "mask" | "escalate";
        ruleKey: string;
        classification: string;
        matchPattern: string;
        createdAt?: string | undefined;
        updatedAt?: string | undefined;
        enabled?: boolean | undefined;
        description?: string | undefined;
        tags?: string[] | undefined;
        maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
    }[] | undefined;
}>;
declare const DataBoundaryRuleUpsertInputSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    ruleKey: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    classification: z.ZodString;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    target: z.ZodEnum<["input", "output", "tool_call", "payload", "metadata"]>;
    matchPattern: z.ZodString;
    action: z.ZodEnum<["allow", "block", "redact", "mask", "escalate"]>;
    maskingStrategy: z.ZodOptional<z.ZodEnum<["full", "partial", "hash", "tokenize"]>>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "createdAt" | "id" | "updatedAt">, "strip", z.ZodTypeAny, {
    target: "input" | "metadata" | "payload" | "output" | "tool_call";
    enabled: boolean;
    action: "allow" | "block" | "redact" | "mask" | "escalate";
    ruleKey: string;
    classification: string;
    tags: string[];
    matchPattern: string;
    description?: string | undefined;
    maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
}, {
    target: "input" | "metadata" | "payload" | "output" | "tool_call";
    action: "allow" | "block" | "redact" | "mask" | "escalate";
    ruleKey: string;
    classification: string;
    matchPattern: string;
    enabled?: boolean | undefined;
    description?: string | undefined;
    tags?: string[] | undefined;
    maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
}>;
declare const DataBoundaryPolicyCreateRequestSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    mode: z.ZodDefault<z.ZodEnum<["monitor", "enforce"]>>;
    status: z.ZodDefault<z.ZodEnum<["draft", "active", "disabled"]>>;
    defaultAction: z.ZodDefault<z.ZodEnum<["allow", "block", "redact", "mask", "escalate"]>>;
    regionAllowlist: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    modelAllowlist: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    rules: z.ZodArray<z.ZodObject<Omit<{
        id: z.ZodString;
        ruleKey: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        classification: z.ZodString;
        tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        target: z.ZodEnum<["input", "output", "tool_call", "payload", "metadata"]>;
        matchPattern: z.ZodString;
        action: z.ZodEnum<["allow", "block", "redact", "mask", "escalate"]>;
        maskingStrategy: z.ZodOptional<z.ZodEnum<["full", "partial", "hash", "tokenize"]>>;
        enabled: z.ZodDefault<z.ZodBoolean>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "createdAt" | "id" | "updatedAt">, "strip", z.ZodTypeAny, {
        target: "input" | "metadata" | "payload" | "output" | "tool_call";
        enabled: boolean;
        action: "allow" | "block" | "redact" | "mask" | "escalate";
        ruleKey: string;
        classification: string;
        tags: string[];
        matchPattern: string;
        description?: string | undefined;
        maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
    }, {
        target: "input" | "metadata" | "payload" | "output" | "tool_call";
        action: "allow" | "block" | "redact" | "mask" | "escalate";
        ruleKey: string;
        classification: string;
        matchPattern: string;
        enabled?: boolean | undefined;
        description?: string | undefined;
        tags?: string[] | undefined;
        maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "active" | "disabled";
    workspaceId: string;
    mode: "monitor" | "enforce";
    name: string;
    defaultAction: "allow" | "block" | "redact" | "mask" | "escalate";
    regionAllowlist: string[];
    modelAllowlist: string[];
    rules: {
        target: "input" | "metadata" | "payload" | "output" | "tool_call";
        enabled: boolean;
        action: "allow" | "block" | "redact" | "mask" | "escalate";
        ruleKey: string;
        classification: string;
        tags: string[];
        matchPattern: string;
        description?: string | undefined;
        maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
    }[];
    description?: string | undefined;
}, {
    workspaceId: string;
    name: string;
    rules: {
        target: "input" | "metadata" | "payload" | "output" | "tool_call";
        action: "allow" | "block" | "redact" | "mask" | "escalate";
        ruleKey: string;
        classification: string;
        matchPattern: string;
        enabled?: boolean | undefined;
        description?: string | undefined;
        tags?: string[] | undefined;
        maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
    }[];
    status?: "draft" | "active" | "disabled" | undefined;
    mode?: "monitor" | "enforce" | undefined;
    description?: string | undefined;
    defaultAction?: "allow" | "block" | "redact" | "mask" | "escalate" | undefined;
    regionAllowlist?: string[] | undefined;
    modelAllowlist?: string[] | undefined;
}>;
declare const DataBoundaryPolicyUpdateRequestSchema: z.ZodEffects<z.ZodObject<{
    workspaceId: z.ZodString;
    policyId: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    mode: z.ZodOptional<z.ZodEnum<["monitor", "enforce"]>>;
    status: z.ZodOptional<z.ZodEnum<["draft", "active", "disabled"]>>;
    defaultAction: z.ZodOptional<z.ZodEnum<["allow", "block", "redact", "mask", "escalate"]>>;
    regionAllowlist: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    modelAllowlist: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    rules: z.ZodOptional<z.ZodArray<z.ZodObject<Omit<{
        id: z.ZodString;
        ruleKey: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        classification: z.ZodString;
        tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        target: z.ZodEnum<["input", "output", "tool_call", "payload", "metadata"]>;
        matchPattern: z.ZodString;
        action: z.ZodEnum<["allow", "block", "redact", "mask", "escalate"]>;
        maskingStrategy: z.ZodOptional<z.ZodEnum<["full", "partial", "hash", "tokenize"]>>;
        enabled: z.ZodDefault<z.ZodBoolean>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "createdAt" | "id" | "updatedAt">, "strip", z.ZodTypeAny, {
        target: "input" | "metadata" | "payload" | "output" | "tool_call";
        enabled: boolean;
        action: "allow" | "block" | "redact" | "mask" | "escalate";
        ruleKey: string;
        classification: string;
        tags: string[];
        matchPattern: string;
        description?: string | undefined;
        maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
    }, {
        target: "input" | "metadata" | "payload" | "output" | "tool_call";
        action: "allow" | "block" | "redact" | "mask" | "escalate";
        ruleKey: string;
        classification: string;
        matchPattern: string;
        enabled?: boolean | undefined;
        description?: string | undefined;
        tags?: string[] | undefined;
        maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    policyId: string;
    status?: "draft" | "active" | "disabled" | undefined;
    mode?: "monitor" | "enforce" | undefined;
    description?: string | undefined;
    name?: string | undefined;
    defaultAction?: "allow" | "block" | "redact" | "mask" | "escalate" | undefined;
    regionAllowlist?: string[] | undefined;
    modelAllowlist?: string[] | undefined;
    rules?: {
        target: "input" | "metadata" | "payload" | "output" | "tool_call";
        enabled: boolean;
        action: "allow" | "block" | "redact" | "mask" | "escalate";
        ruleKey: string;
        classification: string;
        tags: string[];
        matchPattern: string;
        description?: string | undefined;
        maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
    }[] | undefined;
}, {
    workspaceId: string;
    policyId: string;
    status?: "draft" | "active" | "disabled" | undefined;
    mode?: "monitor" | "enforce" | undefined;
    description?: string | undefined;
    name?: string | undefined;
    defaultAction?: "allow" | "block" | "redact" | "mask" | "escalate" | undefined;
    regionAllowlist?: string[] | undefined;
    modelAllowlist?: string[] | undefined;
    rules?: {
        target: "input" | "metadata" | "payload" | "output" | "tool_call";
        action: "allow" | "block" | "redact" | "mask" | "escalate";
        ruleKey: string;
        classification: string;
        matchPattern: string;
        enabled?: boolean | undefined;
        description?: string | undefined;
        tags?: string[] | undefined;
        maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
    }[] | undefined;
}>, {
    workspaceId: string;
    policyId: string;
    status?: "draft" | "active" | "disabled" | undefined;
    mode?: "monitor" | "enforce" | undefined;
    description?: string | undefined;
    name?: string | undefined;
    defaultAction?: "allow" | "block" | "redact" | "mask" | "escalate" | undefined;
    regionAllowlist?: string[] | undefined;
    modelAllowlist?: string[] | undefined;
    rules?: {
        target: "input" | "metadata" | "payload" | "output" | "tool_call";
        enabled: boolean;
        action: "allow" | "block" | "redact" | "mask" | "escalate";
        ruleKey: string;
        classification: string;
        tags: string[];
        matchPattern: string;
        description?: string | undefined;
        maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
    }[] | undefined;
}, {
    workspaceId: string;
    policyId: string;
    status?: "draft" | "active" | "disabled" | undefined;
    mode?: "monitor" | "enforce" | undefined;
    description?: string | undefined;
    name?: string | undefined;
    defaultAction?: "allow" | "block" | "redact" | "mask" | "escalate" | undefined;
    regionAllowlist?: string[] | undefined;
    modelAllowlist?: string[] | undefined;
    rules?: {
        target: "input" | "metadata" | "payload" | "output" | "tool_call";
        action: "allow" | "block" | "redact" | "mask" | "escalate";
        ruleKey: string;
        classification: string;
        matchPattern: string;
        enabled?: boolean | undefined;
        description?: string | undefined;
        tags?: string[] | undefined;
        maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
    }[] | undefined;
}>;
declare const DataBoundaryPolicyListResponseSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    policies: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        workspaceId: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        mode: z.ZodEnum<["monitor", "enforce"]>;
        status: z.ZodEnum<["draft", "active", "disabled"]>;
        defaultAction: z.ZodEnum<["allow", "block", "redact", "mask", "escalate"]>;
        regionAllowlist: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        modelAllowlist: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        rules: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            ruleKey: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            classification: z.ZodString;
            tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            target: z.ZodEnum<["input", "output", "tool_call", "payload", "metadata"]>;
            matchPattern: z.ZodString;
            action: z.ZodEnum<["allow", "block", "redact", "mask", "escalate"]>;
            maskingStrategy: z.ZodOptional<z.ZodEnum<["full", "partial", "hash", "tokenize"]>>;
            enabled: z.ZodDefault<z.ZodBoolean>;
            createdAt: z.ZodOptional<z.ZodString>;
            updatedAt: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            target: "input" | "metadata" | "payload" | "output" | "tool_call";
            enabled: boolean;
            action: "allow" | "block" | "redact" | "mask" | "escalate";
            ruleKey: string;
            classification: string;
            tags: string[];
            matchPattern: string;
            createdAt?: string | undefined;
            updatedAt?: string | undefined;
            description?: string | undefined;
            maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
        }, {
            id: string;
            target: "input" | "metadata" | "payload" | "output" | "tool_call";
            action: "allow" | "block" | "redact" | "mask" | "escalate";
            ruleKey: string;
            classification: string;
            matchPattern: string;
            createdAt?: string | undefined;
            updatedAt?: string | undefined;
            enabled?: boolean | undefined;
            description?: string | undefined;
            tags?: string[] | undefined;
            maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
        }>, "many">>;
        createdBy: z.ZodString;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "draft" | "active" | "disabled";
        workspaceId: string;
        createdAt: string;
        id: string;
        updatedAt: string;
        mode: "monitor" | "enforce";
        createdBy: string;
        name: string;
        defaultAction: "allow" | "block" | "redact" | "mask" | "escalate";
        regionAllowlist: string[];
        modelAllowlist: string[];
        rules: {
            id: string;
            target: "input" | "metadata" | "payload" | "output" | "tool_call";
            enabled: boolean;
            action: "allow" | "block" | "redact" | "mask" | "escalate";
            ruleKey: string;
            classification: string;
            tags: string[];
            matchPattern: string;
            createdAt?: string | undefined;
            updatedAt?: string | undefined;
            description?: string | undefined;
            maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
        }[];
        description?: string | undefined;
    }, {
        status: "draft" | "active" | "disabled";
        workspaceId: string;
        createdAt: string;
        id: string;
        updatedAt: string;
        mode: "monitor" | "enforce";
        createdBy: string;
        name: string;
        defaultAction: "allow" | "block" | "redact" | "mask" | "escalate";
        description?: string | undefined;
        regionAllowlist?: string[] | undefined;
        modelAllowlist?: string[] | undefined;
        rules?: {
            id: string;
            target: "input" | "metadata" | "payload" | "output" | "tool_call";
            action: "allow" | "block" | "redact" | "mask" | "escalate";
            ruleKey: string;
            classification: string;
            matchPattern: string;
            createdAt?: string | undefined;
            updatedAt?: string | undefined;
            enabled?: boolean | undefined;
            description?: string | undefined;
            tags?: string[] | undefined;
            maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
        }[] | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    policies: {
        status: "draft" | "active" | "disabled";
        workspaceId: string;
        createdAt: string;
        id: string;
        updatedAt: string;
        mode: "monitor" | "enforce";
        createdBy: string;
        name: string;
        defaultAction: "allow" | "block" | "redact" | "mask" | "escalate";
        regionAllowlist: string[];
        modelAllowlist: string[];
        rules: {
            id: string;
            target: "input" | "metadata" | "payload" | "output" | "tool_call";
            enabled: boolean;
            action: "allow" | "block" | "redact" | "mask" | "escalate";
            ruleKey: string;
            classification: string;
            tags: string[];
            matchPattern: string;
            createdAt?: string | undefined;
            updatedAt?: string | undefined;
            description?: string | undefined;
            maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
        }[];
        description?: string | undefined;
    }[];
}, {
    workspaceId: string;
    policies?: {
        status: "draft" | "active" | "disabled";
        workspaceId: string;
        createdAt: string;
        id: string;
        updatedAt: string;
        mode: "monitor" | "enforce";
        createdBy: string;
        name: string;
        defaultAction: "allow" | "block" | "redact" | "mask" | "escalate";
        description?: string | undefined;
        regionAllowlist?: string[] | undefined;
        modelAllowlist?: string[] | undefined;
        rules?: {
            id: string;
            target: "input" | "metadata" | "payload" | "output" | "tool_call";
            action: "allow" | "block" | "redact" | "mask" | "escalate";
            ruleKey: string;
            classification: string;
            matchPattern: string;
            createdAt?: string | undefined;
            updatedAt?: string | undefined;
            enabled?: boolean | undefined;
            description?: string | undefined;
            tags?: string[] | undefined;
            maskingStrategy?: "partial" | "full" | "hash" | "tokenize" | undefined;
        }[] | undefined;
    }[] | undefined;
}>;
declare const DataBoundaryDecisionSchema: z.ZodObject<{
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
}>;
declare const DataBoundaryEvaluateRequestSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    payload: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    payload: Record<string, unknown>;
    context?: Record<string, unknown> | undefined;
}, {
    workspaceId: string;
    payload: Record<string, unknown>;
    context?: Record<string, unknown> | undefined;
}>;
declare const DataBoundaryEvaluateResponseSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    decision: z.ZodObject<{
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
    }>;
    evaluatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    decision: {
        reasonCode: string;
        reasonText: string;
        action: "allow" | "block" | "redact" | "mask" | "escalate";
        tags: string[];
        maskedFields: string[];
        policyId?: string | undefined;
        ruleId?: string | undefined;
        classification?: string | undefined;
    };
    evaluatedAt: string;
}, {
    workspaceId: string;
    decision: {
        reasonCode: string;
        reasonText: string;
        action: "allow" | "block" | "redact" | "mask" | "escalate";
        policyId?: string | undefined;
        ruleId?: string | undefined;
        classification?: string | undefined;
        tags?: string[] | undefined;
        maskedFields?: string[] | undefined;
    };
    evaluatedAt: string;
}>;
declare const FirewallInspectionModeSchema: z.ZodEnum<["monitor", "enforce"]>;
declare const FirewallInspectionTargetSchema: z.ZodEnum<["input", "output", "tool_call", "payload"]>;
declare const FirewallDecisionActionSchema: z.ZodEnum<["allow", "sanitize", "deny"]>;
declare const FirewallFindingSeveritySchema: z.ZodEnum<["low", "med", "high", "critical"]>;
declare const FirewallFindingCategorySchema: z.ZodEnum<["prompt_injection", "secret", "pii", "malicious_payload"]>;
declare const FirewallInspectFindingSchema: z.ZodObject<{
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
}>;
declare const FirewallInspectRequestSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    payload: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    target: z.ZodDefault<z.ZodEnum<["input", "output", "tool_call", "payload"]>>;
    context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    mode: z.ZodDefault<z.ZodEnum<["monitor", "enforce"]>>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    target: "input" | "payload" | "output" | "tool_call";
    mode: "monitor" | "enforce";
    payload: Record<string, unknown>;
    context?: Record<string, unknown> | undefined;
}, {
    workspaceId: string;
    payload: Record<string, unknown>;
    target?: "input" | "payload" | "output" | "tool_call" | undefined;
    mode?: "monitor" | "enforce" | undefined;
    context?: Record<string, unknown> | undefined;
}>;
declare const FirewallInspectResultSchema: z.ZodObject<{
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
}>;
declare const FirewallInspectResponseSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    inspectedAt: z.ZodString;
    result: z.ZodObject<{
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
    }>;
    eventId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    result: {
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
    };
    inspectedAt: string;
    eventId?: string | undefined;
}, {
    workspaceId: string;
    result: {
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
    };
    inspectedAt: string;
    eventId?: string | undefined;
}>;
declare const FirewallEventSchema: z.ZodObject<{
    eventId: z.ZodString;
    workspaceId: z.ZodString;
    actorId: z.ZodString;
    action: z.ZodString;
    resourceId: z.ZodString;
    resultAction: z.ZodEnum<["allow", "sanitize", "deny"]>;
    findingsCount: z.ZodNumber;
    highestSeverity: z.ZodOptional<z.ZodEnum<["low", "med", "high", "critical"]>>;
    reasonCode: z.ZodOptional<z.ZodString>;
    occurredAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    occurredAt: string;
    eventId: string;
    action: string;
    actorId: string;
    resourceId: string;
    resultAction: "allow" | "deny" | "sanitize";
    findingsCount: number;
    reasonCode?: string | undefined;
    highestSeverity?: "low" | "high" | "critical" | "med" | undefined;
}, {
    workspaceId: string;
    occurredAt: string;
    eventId: string;
    action: string;
    actorId: string;
    resourceId: string;
    resultAction: "allow" | "deny" | "sanitize";
    findingsCount: number;
    reasonCode?: string | undefined;
    highestSeverity?: "low" | "high" | "critical" | "med" | undefined;
}>;
declare const FirewallEventsResponseSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    events: z.ZodDefault<z.ZodArray<z.ZodObject<{
        eventId: z.ZodString;
        workspaceId: z.ZodString;
        actorId: z.ZodString;
        action: z.ZodString;
        resourceId: z.ZodString;
        resultAction: z.ZodEnum<["allow", "sanitize", "deny"]>;
        findingsCount: z.ZodNumber;
        highestSeverity: z.ZodOptional<z.ZodEnum<["low", "med", "high", "critical"]>>;
        reasonCode: z.ZodOptional<z.ZodString>;
        occurredAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        workspaceId: string;
        occurredAt: string;
        eventId: string;
        action: string;
        actorId: string;
        resourceId: string;
        resultAction: "allow" | "deny" | "sanitize";
        findingsCount: number;
        reasonCode?: string | undefined;
        highestSeverity?: "low" | "high" | "critical" | "med" | undefined;
    }, {
        workspaceId: string;
        occurredAt: string;
        eventId: string;
        action: string;
        actorId: string;
        resourceId: string;
        resultAction: "allow" | "deny" | "sanitize";
        findingsCount: number;
        reasonCode?: string | undefined;
        highestSeverity?: "low" | "high" | "critical" | "med" | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    events: {
        workspaceId: string;
        occurredAt: string;
        eventId: string;
        action: string;
        actorId: string;
        resourceId: string;
        resultAction: "allow" | "deny" | "sanitize";
        findingsCount: number;
        reasonCode?: string | undefined;
        highestSeverity?: "low" | "high" | "critical" | "med" | undefined;
    }[];
}, {
    workspaceId: string;
    events?: {
        workspaceId: string;
        occurredAt: string;
        eventId: string;
        action: string;
        actorId: string;
        resourceId: string;
        resultAction: "allow" | "deny" | "sanitize";
        findingsCount: number;
        reasonCode?: string | undefined;
        highestSeverity?: "low" | "high" | "critical" | "med" | undefined;
    }[] | undefined;
}>;
declare const EdgeInterceptorModeSchema: z.ZodEnum<["sdk", "sidecar", "proxy"]>;
declare const EdgeInterceptorStatusSchema: z.ZodEnum<["active", "disabled"]>;
declare const EdgeInterceptorRegisterRequestSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    mode: z.ZodEnum<["sdk", "sidecar", "proxy"]>;
    deploymentId: z.ZodOptional<z.ZodString>;
    sdkVersion: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    capabilities: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    mode: "sdk" | "sidecar" | "proxy";
    capabilities: string[];
    region?: string | undefined;
    deploymentId?: string | undefined;
    sdkVersion?: string | undefined;
}, {
    workspaceId: string;
    mode: "sdk" | "sidecar" | "proxy";
    region?: string | undefined;
    capabilities?: string[] | undefined;
    deploymentId?: string | undefined;
    sdkVersion?: string | undefined;
}>;
declare const EdgeInterceptorRegistrationSchema: z.ZodObject<{
    registrationId: z.ZodString;
    workspaceId: z.ZodString;
    mode: z.ZodEnum<["sdk", "sidecar", "proxy"]>;
    deploymentId: z.ZodOptional<z.ZodString>;
    sdkVersion: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    capabilities: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    status: z.ZodEnum<["active", "disabled"]>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "active" | "disabled";
    workspaceId: string;
    createdAt: string;
    updatedAt: string;
    mode: "sdk" | "sidecar" | "proxy";
    capabilities: string[];
    registrationId: string;
    region?: string | undefined;
    deploymentId?: string | undefined;
    sdkVersion?: string | undefined;
}, {
    status: "active" | "disabled";
    workspaceId: string;
    createdAt: string;
    updatedAt: string;
    mode: "sdk" | "sidecar" | "proxy";
    registrationId: string;
    region?: string | undefined;
    capabilities?: string[] | undefined;
    deploymentId?: string | undefined;
    sdkVersion?: string | undefined;
}>;
type AuthSession = z.infer<typeof AuthSessionSchema>;
type WorkspaceRoleBinding = z.infer<typeof WorkspaceRoleBindingSchema>;
type WorkflowVersion = z.infer<typeof WorkflowVersionSchema>;
type WorkflowBuilderNode = z.infer<typeof WorkflowBuilderNodeSchema>;
type WorkflowBuilderEdge = z.infer<typeof WorkflowBuilderEdgeSchema>;
type WorkflowBuilderViewport = z.infer<typeof WorkflowBuilderViewportSchema>;
type WorkflowBuilderDocument = z.infer<typeof WorkflowBuilderDocumentSchema>;
type PolicyDecision = z.infer<typeof PolicyDecisionSchema>;
type PolicyExitGateEvidence = z.infer<typeof PolicyExitGateEvidenceSchema>;
type RunState = z.infer<typeof RunStateSchema>;
type HeadlessRunRequest = z.infer<typeof HeadlessRunRequestSchema>;
type StructuredErrorEnvelope = z.infer<typeof StructuredErrorEnvelopeSchema>;
type CanonicalPolicyRef = z.infer<typeof CanonicalPolicyRefSchema>;
type CanonicalRouteRef = z.infer<typeof CanonicalRouteRefSchema>;
type CanonicalRiskMeta = z.infer<typeof CanonicalRiskMetaSchema>;
type CanonicalTimingMs = z.infer<typeof CanonicalTimingMsSchema>;
type CanonicalResponseMeta = z.infer<typeof CanonicalResponseMetaSchema>;
type CanonicalErrorCode = z.infer<typeof CanonicalErrorCodeSchema>;
type CanonicalError = z.infer<typeof CanonicalErrorSchema>;
type V4SessionStartRequest = z.infer<typeof V4SessionStartRequestSchema>;
type V4SessionResource = z.infer<typeof V4SessionResourceSchema>;
type V4ExecutionRequest = z.infer<typeof V4ExecutionRequestSchema>;
type V4ExecutionResult = z.infer<typeof V4ExecutionResultSchema>;
type V4EphemeralExecuteRequest = z.infer<typeof V4EphemeralExecuteRequestSchema>;
type RunStateTransition = z.infer<typeof RunStateTransitionSchema>;
type EntitlementDecision = z.infer<typeof EntitlementDecisionSchema>;
type ArtifactManifestItem = z.infer<typeof ArtifactManifestItemSchema>;
type ControlFailure = z.infer<typeof ControlFailureSchema>;
type ControlJobState = z.infer<typeof ControlJobStateSchema>;
type ControlJob = z.infer<typeof ControlJobSchema>;
type ControlJobAttempt = z.infer<typeof ControlJobAttemptSchema>;
type ControlJobEvent = z.infer<typeof ControlJobEventSchema>;
type ControlBackoffState = z.infer<typeof ControlBackoffStateSchema>;
type ControlSuppressionState = z.infer<typeof ControlSuppressionStateSchema>;
type ControlJobScheduleRequest = z.infer<typeof ControlJobScheduleRequestSchema>;
type ControlJobBlockRequest = z.infer<typeof ControlJobBlockRequestSchema>;
type ControlJobRunNextResponse = z.infer<typeof ControlJobRunNextResponseSchema>;
type GitHubDispatchControlPayload = z.infer<typeof GitHubDispatchControlPayloadSchema>;
type SamlConnection = z.infer<typeof SamlConnectionSchema>;
type ScimProvisioningToken = z.infer<typeof ScimProvisioningTokenSchema>;
type ComplianceFramework = z.infer<typeof ComplianceFrameworkSchema>;
type ComplianceFrameworkControlMapping = z.infer<typeof ComplianceFrameworkControlMappingSchema>;
type ComplianceExportFormat = z.infer<typeof ComplianceExportFormatSchema>;
type CreateComplianceExportRequest = z.infer<typeof CreateComplianceExportRequestSchema>;
type ComplianceExportManifestItem = z.infer<typeof ComplianceExportManifestItemSchema>;
type ComplianceExportExitGate = z.infer<typeof ComplianceExportExitGateSchema>;
type CapabilityStatus = z.infer<typeof CapabilityStatusSchema>;
type CapabilityDescriptor = z.infer<typeof CapabilityDescriptorSchema>;
type ApiSurfaceVersion = z.infer<typeof ApiSurfaceVersionSchema>;
type CapabilityNegotiation = z.infer<typeof CapabilityNegotiationSchema>;
type CapabilitiesResponse = z.infer<typeof CapabilitiesResponseSchema>;
type AccessPermissionKey = z.infer<typeof AccessPermissionKeySchema>;
type AccessRoleScope = z.infer<typeof AccessRoleScopeSchema>;
type AccessRole = z.infer<typeof AccessRoleSchema>;
type AccessSubjectType = z.infer<typeof AccessSubjectTypeSchema>;
type AccessRoleBinding = z.infer<typeof AccessRoleBindingSchema>;
type ServiceAccountStatus = z.infer<typeof ServiceAccountStatusSchema>;
type ServiceAccount = z.infer<typeof ServiceAccountSchema>;
type AgentIdentityStatus = z.infer<typeof AgentIdentityStatusSchema>;
type AgentProfile = z.infer<typeof AgentProfileSchema>;
type AgentKeyStatus = z.infer<typeof AgentKeyStatusSchema>;
type AgentKeyMetadata = z.infer<typeof AgentKeyMetadataSchema>;
type AgentTokenClaims = z.infer<typeof AgentTokenClaimsSchema>;
type AgentExecutionTokenIssueRequest = z.infer<typeof AgentExecutionTokenIssueRequestSchema>;
type AgentExecutionTokenIssueResponse = z.infer<typeof AgentExecutionTokenIssueResponseSchema>;
type AgentCapabilitySource = z.infer<typeof AgentCapabilitySourceSchema>;
type AgentCapabilityStatus = z.infer<typeof AgentCapabilityStatusSchema>;
type AgentCapability = z.infer<typeof AgentCapabilitySchema>;
type AgentDelegationTargetType = z.infer<typeof AgentDelegationTargetTypeSchema>;
type AgentDelegationEffect = z.infer<typeof AgentDelegationEffectSchema>;
type AgentDelegationStatus = z.infer<typeof AgentDelegationStatusSchema>;
type AgentDelegationRule = z.infer<typeof AgentDelegationRuleSchema>;
type AgentRevocationEscalationLevel = z.infer<typeof AgentRevocationEscalationLevelSchema>;
type AgentRevocationEvent = z.infer<typeof AgentRevocationEventSchema>;
type AgentEscalationSource = z.infer<typeof AgentEscalationSourceSchema>;
type AgentEscalationSeverity = z.infer<typeof AgentEscalationSeveritySchema>;
type AgentEscalationStatus = z.infer<typeof AgentEscalationStatusSchema>;
type AgentEscalationEvent = z.infer<typeof AgentEscalationEventSchema>;
type UsageTimeframe = z.infer<typeof UsageTimeframeSchema>;
type UsageBreakdown = z.infer<typeof UsageBreakdownSchema>;
type UsageTimeseriesPoint = z.infer<typeof UsageTimeseriesPointSchema>;
type UsageTimeseriesResponse = z.infer<typeof UsageTimeseriesResponseSchema>;
type TimelineEntityType = z.infer<typeof TimelineEntityTypeSchema>;
type TimelineEvent = z.infer<typeof TimelineEventSchema>;
type RouteTimelineResponse = z.infer<typeof RouteTimelineResponseSchema>;
type PolicyTimelineResponse = z.infer<typeof PolicyTimelineResponseSchema>;
type ChangeRequestTimelineResponse = z.infer<typeof ChangeRequestTimelineResponseSchema>;
type LineageNodeType = z.infer<typeof LineageNodeTypeSchema>;
type LineageNode = z.infer<typeof LineageNodeSchema>;
type LineageEdge = z.infer<typeof LineageEdgeSchema>;
type LineageQueryRequest = z.infer<typeof LineageQueryRequestSchema>;
type LineageQueryResponse = z.infer<typeof LineageQueryResponseSchema>;
type RiskTier = z.infer<typeof RiskTierSchema>;
type RiskSubjectType = z.infer<typeof RiskSubjectTypeSchema>;
type RiskFactor = z.infer<typeof RiskFactorSchema>;
type RiskScoreCheckRequest = z.infer<typeof RiskScoreCheckRequestSchema>;
type RiskScoreResult = z.infer<typeof RiskScoreResultSchema>;
type RiskScoreCheckResponse = z.infer<typeof RiskScoreCheckResponseSchema>;
type RiskTrendWindow = z.infer<typeof RiskTrendWindowSchema>;
type RiskTrendPoint = z.infer<typeof RiskTrendPointSchema>;
type RiskTrendResponse = z.infer<typeof RiskTrendResponseSchema>;
type RiskBaselineWindow = z.infer<typeof RiskBaselineWindowSchema>;
type RiskBaseline = z.infer<typeof RiskBaselineSchema>;
type RiskBaselineCaptureRequest = z.infer<typeof RiskBaselineCaptureRequestSchema>;
type RiskBaselineCaptureResponse = z.infer<typeof RiskBaselineCaptureResponseSchema>;
type RiskSignalType = z.infer<typeof RiskSignalTypeSchema>;
type RiskSignalSeverity = z.infer<typeof RiskSignalSeveritySchema>;
type RiskAnomalySignal = z.infer<typeof RiskAnomalySignalSchema>;
type RiskSignalGenerateRequest = z.infer<typeof RiskSignalGenerateRequestSchema>;
type RiskSignalGenerateResponse = z.infer<typeof RiskSignalGenerateResponseSchema>;
type RiskSignalListResponse = z.infer<typeof RiskSignalListResponseSchema>;
type DriftDimension = z.infer<typeof DriftDimensionSchema>;
type DriftSignalSeverity = z.infer<typeof DriftSignalSeveritySchema>;
type DriftMetricKey = z.infer<typeof DriftMetricKeySchema>;
type DriftMetricBaseline = z.infer<typeof DriftMetricBaselineSchema>;
type DriftSignal = z.infer<typeof DriftSignalSchema>;
type DriftSignalGenerateRequest = z.infer<typeof DriftSignalGenerateRequestSchema>;
type DriftSignalGenerateResponse = z.infer<typeof DriftSignalGenerateResponseSchema>;
type DriftSignalListResponse = z.infer<typeof DriftSignalListResponseSchema>;
type SandboxSimulationStatus = z.infer<typeof SandboxSimulationStatusSchema>;
type SandboxSimulationRequest = z.infer<typeof SandboxSimulationRequestSchema>;
type SandboxSimulationArtifact = z.infer<typeof SandboxSimulationArtifactSchema>;
type SandboxPolicyPreview = z.infer<typeof SandboxPolicyPreviewSchema>;
type SandboxRiskPreview = z.infer<typeof SandboxRiskPreviewSchema>;
type SandboxSimulationResult = z.infer<typeof SandboxSimulationResultSchema>;
type SandboxSimulationRun = z.infer<typeof SandboxSimulationRunSchema>;
type SandboxSimulationListResponse = z.infer<typeof SandboxSimulationListResponseSchema>;
type SandboxSimulationReplayResponse = z.infer<typeof SandboxSimulationReplayResponseSchema>;
type DataBoundaryPolicyMode = z.infer<typeof DataBoundaryPolicyModeSchema>;
type DataBoundaryPolicyStatus = z.infer<typeof DataBoundaryPolicyStatusSchema>;
type DataBoundaryDecisionAction = z.infer<typeof DataBoundaryDecisionActionSchema>;
type DataBoundaryMaskingStrategy = z.infer<typeof DataBoundaryMaskingStrategySchema>;
type DataBoundaryRuleTarget = z.infer<typeof DataBoundaryRuleTargetSchema>;
type DataBoundaryRule = z.infer<typeof DataBoundaryRuleSchema>;
type DataBoundaryPolicy = z.infer<typeof DataBoundaryPolicySchema>;
type DataBoundaryRuleUpsertInput = z.infer<typeof DataBoundaryRuleUpsertInputSchema>;
type DataBoundaryPolicyCreateRequest = z.infer<typeof DataBoundaryPolicyCreateRequestSchema>;
type DataBoundaryPolicyUpdateRequest = z.infer<typeof DataBoundaryPolicyUpdateRequestSchema>;
type DataBoundaryPolicyListResponse = z.infer<typeof DataBoundaryPolicyListResponseSchema>;
type DataBoundaryDecision = z.infer<typeof DataBoundaryDecisionSchema>;
type DataBoundaryEvaluateRequest = z.infer<typeof DataBoundaryEvaluateRequestSchema>;
type DataBoundaryEvaluateResponse = z.infer<typeof DataBoundaryEvaluateResponseSchema>;
type FirewallInspectionMode = z.infer<typeof FirewallInspectionModeSchema>;
type FirewallInspectionTarget = z.infer<typeof FirewallInspectionTargetSchema>;
type FirewallDecisionAction = z.infer<typeof FirewallDecisionActionSchema>;
type FirewallFindingSeverity = z.infer<typeof FirewallFindingSeveritySchema>;
type FirewallFindingCategory = z.infer<typeof FirewallFindingCategorySchema>;
type FirewallInspectFinding = z.infer<typeof FirewallInspectFindingSchema>;
type FirewallInspectRequest = z.infer<typeof FirewallInspectRequestSchema>;
type FirewallInspectResult = z.infer<typeof FirewallInspectResultSchema>;
type FirewallInspectResponse = z.infer<typeof FirewallInspectResponseSchema>;
type FirewallEvent = z.infer<typeof FirewallEventSchema>;
type FirewallEventsResponse = z.infer<typeof FirewallEventsResponseSchema>;
type EdgeInterceptorMode = z.infer<typeof EdgeInterceptorModeSchema>;
type EdgeInterceptorStatus = z.infer<typeof EdgeInterceptorStatusSchema>;
type EdgeInterceptorRegisterRequest = z.infer<typeof EdgeInterceptorRegisterRequestSchema>;
type EdgeInterceptorRegistration = z.infer<typeof EdgeInterceptorRegistrationSchema>;

export { type AccessPermissionKey, AccessPermissionKeySchema, type AccessRole, type AccessRoleBinding, AccessRoleBindingSchema, AccessRoleSchema, type AccessRoleScope, AccessRoleScopeSchema, type AccessSubjectType, AccessSubjectTypeSchema, type AgentCapability, AgentCapabilitySchema, type AgentCapabilitySource, AgentCapabilitySourceSchema, type AgentCapabilityStatus, AgentCapabilityStatusSchema, type AgentDelegationEffect, AgentDelegationEffectSchema, type AgentDelegationRule, AgentDelegationRuleSchema, type AgentDelegationStatus, AgentDelegationStatusSchema, type AgentDelegationTargetType, AgentDelegationTargetTypeSchema, type AgentEscalationEvent, AgentEscalationEventSchema, type AgentEscalationSeverity, AgentEscalationSeveritySchema, type AgentEscalationSource, AgentEscalationSourceSchema, type AgentEscalationStatus, AgentEscalationStatusSchema, type AgentExecutionTokenIssueRequest, AgentExecutionTokenIssueRequestSchema, type AgentExecutionTokenIssueResponse, AgentExecutionTokenIssueResponseSchema, type AgentIdentityStatus, AgentIdentityStatusSchema, type AgentKeyMetadata, AgentKeyMetadataSchema, type AgentKeyStatus, AgentKeyStatusSchema, type AgentProfile, AgentProfileSchema, type AgentRevocationEscalationLevel, AgentRevocationEscalationLevelSchema, type AgentRevocationEvent, AgentRevocationEventSchema, type AgentTokenClaims, AgentTokenClaimsSchema, type ApiSurfaceVersion, ApiSurfaceVersionSchema, type ArtifactManifestItem, ArtifactManifestItemSchema, type AuthSession, AuthSessionSchema, CONTRACT_VERSION, type CanonicalError, type CanonicalErrorCode, CanonicalErrorCodeSchema, CanonicalErrorSchema, type CanonicalPolicyRef, CanonicalPolicyRefSchema, CanonicalResponseEnvelopeSchema, type CanonicalResponseMeta, CanonicalResponseMetaSchema, type CanonicalRiskMeta, CanonicalRiskMetaSchema, type CanonicalRouteRef, CanonicalRouteRefSchema, type CanonicalTimingMs, CanonicalTimingMsSchema, type CapabilitiesResponse, CapabilitiesResponseSchema, type CapabilityDescriptor, CapabilityDescriptorSchema, type CapabilityNegotiation, CapabilityNegotiationSchema, type CapabilityStatus, CapabilityStatusSchema, type ChangeRequestTimelineResponse, ChangeRequestTimelineResponseSchema, type ComplianceExportExitGate, ComplianceExportExitGateSchema, type ComplianceExportFormat, ComplianceExportFormatSchema, type ComplianceExportManifestItem, ComplianceExportManifestItemSchema, type ComplianceFramework, type ComplianceFrameworkControlMapping, ComplianceFrameworkControlMappingSchema, ComplianceFrameworkSchema, type ControlBackoffState, ControlBackoffStateSchema, type ControlFailure, ControlFailureSchema, type ControlJob, type ControlJobAttempt, ControlJobAttemptSchema, type ControlJobBlockRequest, ControlJobBlockRequestSchema, type ControlJobEvent, ControlJobEventSchema, type ControlJobRunNextResponse, ControlJobRunNextResponseSchema, type ControlJobScheduleRequest, ControlJobScheduleRequestSchema, ControlJobSchema, type ControlJobState, ControlJobStateSchema, type ControlSuppressionState, ControlSuppressionStateSchema, type CreateComplianceExportRequest, CreateComplianceExportRequestSchema, type DataBoundaryDecision, type DataBoundaryDecisionAction, DataBoundaryDecisionActionSchema, DataBoundaryDecisionSchema, type DataBoundaryEvaluateRequest, DataBoundaryEvaluateRequestSchema, type DataBoundaryEvaluateResponse, DataBoundaryEvaluateResponseSchema, type DataBoundaryMaskingStrategy, DataBoundaryMaskingStrategySchema, type DataBoundaryPolicy, type DataBoundaryPolicyCreateRequest, DataBoundaryPolicyCreateRequestSchema, type DataBoundaryPolicyListResponse, DataBoundaryPolicyListResponseSchema, type DataBoundaryPolicyMode, DataBoundaryPolicyModeSchema, DataBoundaryPolicySchema, type DataBoundaryPolicyStatus, DataBoundaryPolicyStatusSchema, type DataBoundaryPolicyUpdateRequest, DataBoundaryPolicyUpdateRequestSchema, type DataBoundaryRule, DataBoundaryRuleSchema, type DataBoundaryRuleTarget, DataBoundaryRuleTargetSchema, type DataBoundaryRuleUpsertInput, DataBoundaryRuleUpsertInputSchema, type DriftDimension, DriftDimensionSchema, type DriftMetricBaseline, DriftMetricBaselineSchema, type DriftMetricKey, DriftMetricKeySchema, type DriftSignal, type DriftSignalGenerateRequest, DriftSignalGenerateRequestSchema, type DriftSignalGenerateResponse, DriftSignalGenerateResponseSchema, type DriftSignalListResponse, DriftSignalListResponseSchema, DriftSignalSchema, type DriftSignalSeverity, DriftSignalSeveritySchema, type EdgeInterceptorMode, EdgeInterceptorModeSchema, type EdgeInterceptorRegisterRequest, EdgeInterceptorRegisterRequestSchema, type EdgeInterceptorRegistration, EdgeInterceptorRegistrationSchema, type EdgeInterceptorStatus, EdgeInterceptorStatusSchema, type EntitlementDecision, EntitlementDecisionSchema, type FirewallDecisionAction, FirewallDecisionActionSchema, type FirewallEvent, FirewallEventSchema, type FirewallEventsResponse, FirewallEventsResponseSchema, type FirewallFindingCategory, FirewallFindingCategorySchema, type FirewallFindingSeverity, FirewallFindingSeveritySchema, type FirewallInspectFinding, FirewallInspectFindingSchema, type FirewallInspectRequest, FirewallInspectRequestSchema, type FirewallInspectResponse, FirewallInspectResponseSchema, type FirewallInspectResult, FirewallInspectResultSchema, type FirewallInspectionMode, FirewallInspectionModeSchema, type FirewallInspectionTarget, FirewallInspectionTargetSchema, type GitHubDispatchControlPayload, GitHubDispatchControlPayloadSchema, GovernedRunRequestSchema, type HeadlessRunRequest, HeadlessRunRequestSchema, type LineageEdge, LineageEdgeSchema, type LineageNode, LineageNodeSchema, type LineageNodeType, LineageNodeTypeSchema, type LineageQueryRequest, LineageQueryRequestSchema, type LineageQueryResponse, LineageQueryResponseSchema, type PolicyDecision, PolicyDecisionSchema, type PolicyExitGateEvidence, PolicyExitGateEvidenceSchema, type PolicyTimelineResponse, PolicyTimelineResponseSchema, type RiskAnomalySignal, RiskAnomalySignalSchema, type RiskBaseline, type RiskBaselineCaptureRequest, RiskBaselineCaptureRequestSchema, type RiskBaselineCaptureResponse, RiskBaselineCaptureResponseSchema, RiskBaselineSchema, type RiskBaselineWindow, RiskBaselineWindowSchema, type RiskFactor, RiskFactorSchema, type RiskScoreCheckRequest, RiskScoreCheckRequestSchema, type RiskScoreCheckResponse, RiskScoreCheckResponseSchema, type RiskScoreResult, RiskScoreResultSchema, type RiskSignalGenerateRequest, RiskSignalGenerateRequestSchema, type RiskSignalGenerateResponse, RiskSignalGenerateResponseSchema, type RiskSignalListResponse, RiskSignalListResponseSchema, type RiskSignalSeverity, RiskSignalSeveritySchema, type RiskSignalType, RiskSignalTypeSchema, type RiskSubjectType, RiskSubjectTypeSchema, type RiskTier, RiskTierSchema, type RiskTrendPoint, RiskTrendPointSchema, type RiskTrendResponse, RiskTrendResponseSchema, type RiskTrendWindow, RiskTrendWindowSchema, type RouteTimelineResponse, RouteTimelineResponseSchema, type RunState, RunStateSchema, type RunStateTransition, RunStateTransitionSchema, RunTriggerSourceSchema, type SamlConnection, SamlConnectionSchema, type SandboxPolicyPreview, SandboxPolicyPreviewSchema, type SandboxRiskPreview, SandboxRiskPreviewSchema, type SandboxSimulationArtifact, SandboxSimulationArtifactSchema, type SandboxSimulationListResponse, SandboxSimulationListResponseSchema, type SandboxSimulationReplayResponse, SandboxSimulationReplayResponseSchema, type SandboxSimulationRequest, SandboxSimulationRequestSchema, type SandboxSimulationResult, SandboxSimulationResultSchema, type SandboxSimulationRun, SandboxSimulationRunSchema, type SandboxSimulationStatus, SandboxSimulationStatusSchema, type ScimProvisioningToken, ScimProvisioningTokenSchema, type ServiceAccount, ServiceAccountSchema, type ServiceAccountStatus, ServiceAccountStatusSchema, type StructuredErrorEnvelope, StructuredErrorEnvelopeSchema, type TimelineEntityType, TimelineEntityTypeSchema, type TimelineEvent, TimelineEventSchema, type UsageBreakdown, UsageBreakdownSchema, type UsageTimeframe, UsageTimeframeSchema, type UsageTimeseriesPoint, UsageTimeseriesPointSchema, type UsageTimeseriesResponse, UsageTimeseriesResponseSchema, type V4EphemeralExecuteRequest, V4EphemeralExecuteRequestSchema, type V4ExecutionRequest, V4ExecutionRequestSchema, type V4ExecutionResult, V4ExecutionResultSchema, type V4SessionResource, V4SessionResourceSchema, type V4SessionStartRequest, V4SessionStartRequestSchema, type WorkflowBuilderDocument, WorkflowBuilderDocumentSchema, type WorkflowBuilderEdge, WorkflowBuilderEdgeSchema, type WorkflowBuilderNode, WorkflowBuilderNodeSchema, type WorkflowBuilderViewport, WorkflowBuilderViewportSchema, type WorkflowVersion, WorkflowVersionSchema, type WorkspaceRoleBinding, WorkspaceRoleBindingSchema };
