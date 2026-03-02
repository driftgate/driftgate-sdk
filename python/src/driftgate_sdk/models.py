from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, Generic, List, Literal, Optional, TypeVar


TriggerSource = Literal["ui", "api", "sdk", "cli", "hosted", "webhook"]
RunState = Literal[
    "queued",
    "running",
    "waiting_approval",
    "approved",
    "denied",
    "succeeded",
    "failed",
    "aborted",
    "timed_out",
    "canceled",
]

CanonicalErrorCode = Literal[
    "AUTH_INVALID",
    "POLICY_DENIED",
    "RISK_EXCEEDED",
    "ROUTE_UNAVAILABLE",
    "TOOL_BLOCKED",
    "RATE_LIMITED",
    "TIMEOUT",
    "INTERNAL",
]


@dataclass(frozen=True)
class CanonicalPolicyRef:
    ref: str
    version: str


@dataclass(frozen=True)
class CanonicalRouteRef:
    provider: Optional[str] = None
    model: Optional[str] = None
    region: Optional[str] = None


@dataclass(frozen=True)
class CanonicalRiskMeta:
    score: Optional[float] = None
    decision: Optional[Literal["allow", "deny", "review"]] = None


@dataclass(frozen=True)
class CanonicalTimingMs:
    total: float
    policy: Optional[float] = None
    route: Optional[float] = None
    tool: Optional[float] = None


@dataclass(frozen=True)
class CanonicalMeta:
    request_id: str
    timing_ms: CanonicalTimingMs
    session_id: Optional[str] = None
    execution_id: Optional[str] = None
    lineage_id: Optional[str] = None
    policy: Optional[CanonicalPolicyRef] = None
    route: Optional[CanonicalRouteRef] = None
    risk: Optional[CanonicalRiskMeta] = None

    @property
    def requestId(self) -> str:
        return self.request_id

    @property
    def timingMs(self) -> CanonicalTimingMs:
        return self.timing_ms

    @property
    def sessionId(self) -> Optional[str]:
        return self.session_id

    @property
    def executionId(self) -> Optional[str]:
        return self.execution_id

    @property
    def lineageId(self) -> Optional[str]:
        return self.lineage_id


@dataclass(frozen=True)
class CanonicalError:
    code: str
    message: str
    status: int
    retryable: bool
    details: Optional[Dict[str, Any]] = None


T = TypeVar("T")


@dataclass(frozen=True)
class CanonicalResponse(Generic[T]):
    ok: bool
    data: Optional[T]
    meta: CanonicalMeta
    error: Optional[CanonicalError]
    raw: Dict[str, Any]


@dataclass(frozen=True)
class SessionResource:
    session_id: str
    workspace_id: str
    agent: str
    created_at: str
    subject: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None
    policy: Optional[CanonicalPolicyRef] = None
    route: Optional[CanonicalRouteRef] = None
    risk: Optional[CanonicalRiskMeta] = None
    workflow_version_id: Optional[str] = None
    expires_at: Optional[str] = None

    @property
    def sessionId(self) -> str:
        return self.session_id


@dataclass(frozen=True)
class SessionStartData:
    session: SessionResource


@dataclass(frozen=True)
class EphemeralExecuteData:
    session: SessionResource
    execution: "RunResponse"


@dataclass(frozen=True)
class RunSummary:
    id: str
    workspace_id: str
    workflow_version_id: str
    state: RunState
    requested_by: str
    requested_at: str
    correlation_id: str
    trigger_source: TriggerSource
    idempotency_key: Optional[str] = None
    updated_at: Optional[str] = None
    started_at: Optional[str] = None
    completed_at: Optional[str] = None
    sla_policy_id: Optional[str] = None
    sla_due_at: Optional[str] = None
    sla_violated_at: Optional[str] = None


@dataclass(frozen=True)
class ApprovalSummary:
    id: str
    run_id: str
    status: Literal["pending", "approved", "denied"]
    requested_at: Optional[str] = None
    required_role: Optional[str] = None
    decided_at: Optional[str] = None
    decided_by: Optional[str] = None


@dataclass(frozen=True)
class EntitlementDecision:
    id: str
    reason_code: str
    reason_text: str
    entitled: bool


@dataclass(frozen=True)
class UsageEntry:
    id: str
    quantity: int


@dataclass(frozen=True)
class RunEvent:
    id: str
    run_id: str
    event_type: str
    payload: Dict[str, Any]
    created_at: str


@dataclass(frozen=True)
class ApprovalQueueEntry:
    approval: ApprovalSummary
    run: Optional[RunSummary] = None


@dataclass(frozen=True)
class RunResponse:
    run: RunSummary
    approval: Optional[ApprovalSummary] = None
    blocked: Optional[bool] = None
    policy_decisions: Optional[List[Dict[str, Any]]] = None
    entitlement_decision: Optional[EntitlementDecision] = None
    usage_entry: Optional[UsageEntry] = None


def parse_run_summary(payload: Dict[str, Any]) -> RunSummary:
    return RunSummary(
        id=str(payload["id"]),
        workspace_id=str(payload["workspaceId"]),
        workflow_version_id=str(payload["workflowVersionId"]),
        state=payload["state"],
        requested_by=str(payload["requestedBy"]),
        requested_at=str(payload["requestedAt"]),
        correlation_id=str(payload["correlationId"]),
        trigger_source=payload["triggerSource"],
        idempotency_key=payload.get("idempotencyKey"),
        updated_at=payload.get("updatedAt"),
        started_at=payload.get("startedAt"),
        completed_at=payload.get("completedAt"),
        sla_policy_id=payload.get("slaPolicyId"),
        sla_due_at=payload.get("slaDueAt"),
        sla_violated_at=payload.get("slaViolatedAt"),
    )


def parse_approval_summary(payload: Dict[str, Any]) -> ApprovalSummary:
    return ApprovalSummary(
        id=str(payload["id"]),
        run_id=str(payload["runId"]),
        status=payload["status"],
        requested_at=payload.get("requestedAt") or payload.get("createdAt"),
        required_role=payload.get("requiredRole"),
        decided_at=payload.get("decidedAt"),
        decided_by=payload.get("decidedBy"),
    )


def parse_run_response(payload: Dict[str, Any]) -> RunResponse:
    entitlement = payload.get("entitlementDecision")
    usage = payload.get("usageEntry")
    approval = payload.get("approval")
    return RunResponse(
        run=parse_run_summary(payload["run"]),
        approval=parse_approval_summary(approval) if isinstance(approval, dict) and approval else None,
        blocked=payload.get("blocked"),
        policy_decisions=payload.get("policyDecisions"),
        entitlement_decision=EntitlementDecision(
            id=str(entitlement["id"]),
            reason_code=str(entitlement["reasonCode"]),
            reason_text=str(entitlement["reasonText"]),
            entitled=bool(entitlement["entitled"]),
        )
        if isinstance(entitlement, dict)
        else None,
        usage_entry=UsageEntry(id=str(usage["id"]), quantity=int(usage["quantity"]))
        if isinstance(usage, dict)
        else None,
    )


def parse_run_events(payload: Dict[str, Any]) -> List[RunEvent]:
    events: List[RunEvent] = []
    for raw in payload.get("events", []):
        if not isinstance(raw, dict):
            continue
        events.append(
            RunEvent(
                id=str(raw.get("id", "")),
                run_id=str(raw.get("runId", "")),
                event_type=str(raw.get("type", "")),
                payload=raw.get("payload", {}) if isinstance(raw.get("payload"), dict) else {},
                created_at=str(raw.get("createdAt", "")),
            )
        )
    return events


def parse_approvals(payload: Dict[str, Any]) -> List[ApprovalQueueEntry]:
    rows = payload.get("approvals", [])
    parsed: List[ApprovalQueueEntry] = []
    for row in rows:
        if not isinstance(row, dict):
            continue
        if isinstance(row.get("approval"), dict):
            approval = parse_approval_summary(row["approval"])
            run = parse_run_summary(row["run"]) if isinstance(row.get("run"), dict) else None
            parsed.append(ApprovalQueueEntry(approval=approval, run=run))
            continue
        parsed.append(ApprovalQueueEntry(approval=parse_approval_summary(row), run=None))
    return parsed


def parse_canonical_meta(payload: Dict[str, Any]) -> CanonicalMeta:
    timing = payload.get("timingMs") if isinstance(payload.get("timingMs"), dict) else {}
    policy_payload = payload.get("policy") if isinstance(payload.get("policy"), dict) else None
    route_payload = payload.get("route") if isinstance(payload.get("route"), dict) else None
    risk_payload = payload.get("risk") if isinstance(payload.get("risk"), dict) else None

    policy = (
        CanonicalPolicyRef(
            ref=str(policy_payload.get("ref", "")),
            version=str(policy_payload.get("version", "")),
        )
        if policy_payload
        else None
    )
    route = (
        CanonicalRouteRef(
            provider=str(route_payload["provider"]) if route_payload.get("provider") is not None else None,
            model=str(route_payload["model"]) if route_payload.get("model") is not None else None,
            region=str(route_payload["region"]) if route_payload.get("region") is not None else None,
        )
        if route_payload
        else None
    )
    risk = (
        CanonicalRiskMeta(
            score=float(risk_payload["score"]) if risk_payload.get("score") is not None else None,
            decision=str(risk_payload["decision"]) if risk_payload.get("decision") is not None else None,
        )
        if risk_payload
        else None
    )

    return CanonicalMeta(
        request_id=str(payload.get("requestId", "")),
        session_id=str(payload["sessionId"]) if payload.get("sessionId") is not None else None,
        execution_id=str(payload["executionId"]) if payload.get("executionId") is not None else None,
        lineage_id=str(payload["lineageId"]) if payload.get("lineageId") is not None else None,
        policy=policy,
        route=route,
        risk=risk,
        timing_ms=CanonicalTimingMs(
            total=float(timing.get("total", 0)),
            policy=float(timing["policy"]) if timing.get("policy") is not None else None,
            route=float(timing["route"]) if timing.get("route") is not None else None,
            tool=float(timing["tool"]) if timing.get("tool") is not None else None,
        ),
    )


def parse_session_resource(payload: Dict[str, Any]) -> SessionResource:
    policy_payload = payload.get("policy") if isinstance(payload.get("policy"), dict) else None
    route_payload = payload.get("route") if isinstance(payload.get("route"), dict) else None
    risk_payload = payload.get("risk") if isinstance(payload.get("risk"), dict) else None

    return SessionResource(
        session_id=str(payload["sessionId"]),
        workspace_id=str(payload["workspaceId"]),
        agent=str(payload["agent"]),
        created_at=str(payload["createdAt"]),
        subject=str(payload["subject"]) if payload.get("subject") is not None else None,
        metadata=payload.get("metadata") if isinstance(payload.get("metadata"), dict) else None,
        policy=CanonicalPolicyRef(ref=str(policy_payload["ref"]), version=str(policy_payload["version"]))
        if policy_payload
        else None,
        route=CanonicalRouteRef(
            provider=str(route_payload["provider"]) if route_payload.get("provider") is not None else None,
            model=str(route_payload["model"]) if route_payload.get("model") is not None else None,
            region=str(route_payload["region"]) if route_payload.get("region") is not None else None,
        )
        if route_payload
        else None,
        risk=CanonicalRiskMeta(
            score=float(risk_payload["score"]) if risk_payload.get("score") is not None else None,
            decision=str(risk_payload["decision"]) if risk_payload.get("decision") is not None else None,
        )
        if risk_payload
        else None,
        workflow_version_id=str(payload["workflowVersionId"]) if payload.get("workflowVersionId") is not None else None,
        expires_at=str(payload["expiresAt"]) if payload.get("expiresAt") is not None else None,
    )


def parse_canonical_error(payload: Dict[str, Any]) -> CanonicalError:
    details = payload.get("details") if isinstance(payload.get("details"), dict) else None
    return CanonicalError(
        code=str(payload.get("code", "INTERNAL")),
        message=str(payload.get("message", "unknown error")),
        status=int(payload.get("status", 500)),
        retryable=bool(payload.get("retryable", False)),
        details=details,
    )


def parse_v4_session_start_envelope(payload: Dict[str, Any]) -> CanonicalResponse[SessionStartData]:
    data_payload = payload.get("data") if isinstance(payload.get("data"), dict) else None
    session_payload = data_payload.get("session") if isinstance(data_payload, dict) else None
    parsed_data = SessionStartData(session=parse_session_resource(session_payload)) if isinstance(session_payload, dict) else None

    error_payload = payload.get("error") if isinstance(payload.get("error"), dict) else None
    parsed_error = parse_canonical_error(error_payload) if error_payload else None

    return CanonicalResponse(
        ok=bool(payload.get("ok", False)),
        data=parsed_data,
        meta=parse_canonical_meta(payload.get("meta", {}) if isinstance(payload.get("meta"), dict) else {}),
        error=parsed_error,
        raw=payload,
    )


def parse_v4_execution_envelope(payload: Dict[str, Any]) -> CanonicalResponse[RunResponse]:
    data_payload = payload.get("data") if isinstance(payload.get("data"), dict) else None
    parsed_data = parse_run_response(data_payload) if isinstance(data_payload, dict) and isinstance(data_payload.get("run"), dict) else None

    error_payload = payload.get("error") if isinstance(payload.get("error"), dict) else None
    parsed_error = parse_canonical_error(error_payload) if error_payload else None

    return CanonicalResponse(
        ok=bool(payload.get("ok", False)),
        data=parsed_data,
        meta=parse_canonical_meta(payload.get("meta", {}) if isinstance(payload.get("meta"), dict) else {}),
        error=parsed_error,
        raw=payload,
    )


def parse_v4_ephemeral_execute_envelope(payload: Dict[str, Any]) -> CanonicalResponse[EphemeralExecuteData]:
    data_payload = payload.get("data") if isinstance(payload.get("data"), dict) else None
    session_payload = data_payload.get("session") if isinstance(data_payload, dict) else None
    execution_payload = data_payload.get("execution") if isinstance(data_payload, dict) else None

    parsed_data: Optional[EphemeralExecuteData] = None
    if isinstance(session_payload, dict) and isinstance(execution_payload, dict):
        parsed_data = EphemeralExecuteData(
            session=parse_session_resource(session_payload),
            execution=parse_run_response(execution_payload),
        )

    error_payload = payload.get("error") if isinstance(payload.get("error"), dict) else None
    parsed_error = parse_canonical_error(error_payload) if error_payload else None

    return CanonicalResponse(
        ok=bool(payload.get("ok", False)),
        data=parsed_data,
        meta=parse_canonical_meta(payload.get("meta", {}) if isinstance(payload.get("meta"), dict) else {}),
        error=parsed_error,
        raw=payload,
    )
