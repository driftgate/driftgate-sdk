from __future__ import annotations

import json
import time
from dataclasses import dataclass
from typing import Any, Dict, Optional

import requests

from .auth import AuthConfig
from .errors import DriftGateSDKError, build_error
from .models import (
    ApprovalQueueEntry,
    CanonicalResponse,
    EphemeralExecuteData,
    RunEvent,
    RunResponse,
    SessionResource,
    TriggerSource,
    parse_approvals,
    parse_run_events,
    parse_run_response,
    parse_v4_ephemeral_execute_envelope,
    parse_v4_execution_envelope,
    parse_v4_session_start_envelope,
)
from .retries import RetryPolicy


TERMINAL_STATES = {"succeeded", "failed", "denied", "timed_out", "canceled", "aborted"}


@dataclass
class DriftGateSessionHandle:
    _client: "DriftGateClient"
    session: SessionResource
    start_envelope: CanonicalResponse[Any]

    @property
    def session_id(self) -> str:
        return self.session.session_id

    @property
    def raw_envelope(self) -> Dict[str, Any]:
        return self.start_envelope.raw

    def execute(
        self,
        *,
        input: Dict[str, Any],
        policy: Optional[Dict[str, Any]] = None,
        route: Optional[Dict[str, Any]] = None,
        risk: Optional[Dict[str, Any]] = None,
        workflow_version_id: Optional[str] = None,
    ) -> CanonicalResponse[RunResponse]:
        payload: Dict[str, Any] = {"input": input}
        if policy is not None:
            payload["policy"] = policy
        if route is not None:
            payload["route"] = route
        if risk is not None:
            payload["risk"] = risk
        if workflow_version_id is not None:
            payload["workflowVersionId"] = workflow_version_id
        return self._client.execute_session(self.session_id, payload)


class _SessionNamespace:
    def __init__(self, client: "DriftGateClient") -> None:
        self._client = client

    def start(
        self,
        *,
        agent: str,
        workspace_id: Optional[str] = None,
        subject: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None,
        policy: Optional[Dict[str, Any]] = None,
        route: Optional[Dict[str, Any]] = None,
        risk: Optional[Dict[str, Any]] = None,
        workflow_version_id: Optional[str] = None,
        expires_at: Optional[str] = None,
    ) -> DriftGateSessionHandle:
        payload: Dict[str, Any] = {"agent": agent}
        if workspace_id is not None:
            payload["workspaceId"] = workspace_id
        if subject is not None:
            payload["subject"] = subject
        if metadata is not None:
            payload["metadata"] = metadata
        if policy is not None:
            payload["policy"] = policy
        if route is not None:
            payload["route"] = route
        if risk is not None:
            payload["risk"] = risk
        if workflow_version_id is not None:
            payload["workflowVersionId"] = workflow_version_id
        if expires_at is not None:
            payload["expiresAt"] = expires_at

        envelope = self._client.start_session(payload)
        if not envelope.ok or envelope.data is None:
            raise DriftGateSDKError(
                code=envelope.error.code if envelope.error else "INTERNAL",
                message=envelope.error.message if envelope.error else "session start failed",
                status_code=envelope.error.status if envelope.error else 500,
                correlation_id=envelope.meta.request_id,
                details=envelope.error.details if envelope.error else None,
            )

        return DriftGateSessionHandle(
            _client=self._client,
            session=envelope.data.session,
            start_envelope=envelope,
        )


class DriftGateClient:
    def __init__(
        self,
        *,
        base_url: str,
        api_key: Optional[str] = None,
        bearer_token: Optional[str] = None,
        timeout_seconds: float = 30.0,
        retry_policy: Optional[RetryPolicy] = None,
        session: Optional[requests.Session] = None,
    ) -> None:
        self._base_url = base_url.rstrip("/")
        self._auth = AuthConfig(api_key=api_key, bearer_token=bearer_token)
        self._timeout_seconds = timeout_seconds
        self._retry_policy = retry_policy or RetryPolicy()
        self._session = session or requests.Session()
        self.session = _SessionNamespace(self)

    def start_session(self, payload: Dict[str, Any]) -> CanonicalResponse[Any]:
        response = self._request("POST", "/v4/sessions.start", payload=payload, allow_retry=False)
        return parse_v4_session_start_envelope(response)

    def execute_session(self, session_id: str, payload: Dict[str, Any]) -> CanonicalResponse[RunResponse]:
        response = self._request(
            "POST",
            f"/v4/sessions/{session_id}/executions.execute",
            payload=payload,
            allow_retry=False,
        )
        return parse_v4_execution_envelope(response)

    def execute(
        self,
        *,
        agent: str,
        input: Dict[str, Any],
        workspace_id: Optional[str] = None,
        subject: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None,
        policy: Optional[Dict[str, Any]] = None,
        route: Optional[Dict[str, Any]] = None,
        risk: Optional[Dict[str, Any]] = None,
        workflow_version_id: Optional[str] = None,
    ) -> CanonicalResponse[EphemeralExecuteData]:
        payload: Dict[str, Any] = {
            "agent": agent,
            "input": input,
        }
        if workspace_id is not None:
            payload["workspaceId"] = workspace_id
        if subject is not None:
            payload["subject"] = subject
        if metadata is not None:
            payload["metadata"] = metadata
        if policy is not None:
            payload["policy"] = policy
        if route is not None:
            payload["route"] = route
        if risk is not None:
            payload["risk"] = risk
        if workflow_version_id is not None:
            payload["workflowVersionId"] = workflow_version_id

        response = self._request("POST", "/v4/execute", payload=payload, allow_retry=False)
        return parse_v4_ephemeral_execute_envelope(response)

    def run(
        self,
        *,
        workspace_id: str,
        workflow_version_id: str,
        input_payload: Optional[Dict[str, Any]] = None,
        requires_approval: Optional[bool] = None,
        required_role: Optional[str] = None,
        sla_policy_id: Optional[str] = None,
        idempotency_key: Optional[str] = None,
        correlation_id: Optional[str] = None,
        trigger_source: TriggerSource = "sdk",
    ) -> RunResponse:
        payload: Dict[str, Any] = {
            "workspaceId": workspace_id,
            "workflowVersionId": workflow_version_id,
            "triggerSource": trigger_source,
        }
        if input_payload is not None:
            payload["input"] = input_payload
        if requires_approval is not None:
            payload["requiresApproval"] = requires_approval
        if required_role is not None:
            payload["requiredRole"] = required_role
        if sla_policy_id is not None:
            payload["slaPolicyId"] = sla_policy_id
        if idempotency_key is not None:
            payload["idempotencyKey"] = idempotency_key
        if correlation_id is not None:
            payload["correlationId"] = correlation_id

        response = self._request("POST", "/v1/headless/runs", payload=payload, allow_retry=False)
        return parse_run_response(response)

    def status(self, run_id: str) -> RunResponse:
        response = self._request("GET", f"/v1/headless/runs/{run_id}")
        return parse_run_response(response)

    def events(self, run_id: str) -> list[RunEvent]:
        response = self._request("GET", f"/v1/headless/runs/{run_id}/events")
        return parse_run_events(response)

    def wait_for_terminal(
        self,
        run_id: str,
        *,
        timeout_seconds: float = 120.0,
        poll_interval_seconds: float = 1.5,
    ) -> RunResponse:
        started = time.monotonic()
        while True:
            current = self.status(run_id)
            if current.run.state in TERMINAL_STATES:
                return current
            if (time.monotonic() - started) >= timeout_seconds:
                raise DriftGateSDKError(
                    code="timeout",
                    message=f"run {run_id} did not reach terminal state before timeout",
                    status_code=408,
                )
            time.sleep(poll_interval_seconds)

    def approvals_list(
        self,
        workspace_id: str,
        *,
        status: Optional[str] = None,
    ) -> list[ApprovalQueueEntry]:
        query = f"?status={status}" if status else ""
        response = self._request(
            "GET",
            f"/v1/headless/workspaces/{workspace_id}/approvals{query}",
        )
        return parse_approvals(response)

    def approve(self, approval_id: str) -> RunResponse:
        response = self._request(
            "POST",
            f"/v1/headless/approvals/{approval_id}/approve",
            allow_retry=False,
        )
        return parse_run_response(response)

    def deny(self, approval_id: str) -> RunResponse:
        response = self._request(
            "POST",
            f"/v1/headless/approvals/{approval_id}/deny",
            allow_retry=False,
        )
        return parse_run_response(response)

    def _request(
        self,
        method: str,
        path: str,
        *,
        payload: Optional[Dict[str, Any]] = None,
        allow_retry: bool = True,
    ) -> Dict[str, Any]:
        url = f"{self._base_url}{path}"
        headers = {"content-type": "application/json", **self._auth.build_headers()}

        attempt = 1
        while True:
            try:
                response = self._session.request(
                    method=method,
                    url=url,
                    headers=headers,
                    data=json.dumps(payload) if payload is not None else None,
                    timeout=self._timeout_seconds,
                )
            except requests.RequestException as error:
                if not allow_retry or attempt >= self._retry_policy.max_attempts:
                    raise DriftGateSDKError(
                        code="network_error",
                        message=str(error),
                        status_code=0,
                    ) from error
                self._retry_policy.sleep(attempt)
                attempt += 1
                continue

            if response.ok:
                if response.text.strip():
                    parsed = response.json()
                    if isinstance(parsed, dict):
                        return parsed
                    return {"value": parsed}
                return {}

            envelope = _parse_error_envelope(response)
            if (
                allow_retry
                and self._retry_policy.should_retry(attempt, response.status_code)
                and method.upper() in {"GET", "HEAD"}
            ):
                self._retry_policy.sleep(attempt)
                attempt += 1
                continue
            raise envelope


def _parse_error_envelope(response: requests.Response) -> DriftGateSDKError:
    try:
        payload = response.json()
    except ValueError:
        payload = None

    if (
        isinstance(payload, dict)
        and payload.get("ok") is False
        and isinstance(payload.get("error"), dict)
        and isinstance(payload.get("meta"), dict)
    ):
        error_payload = payload["error"]
        meta_payload = payload["meta"]
        return build_error(
            status_code=int(error_payload.get("status", response.status_code)),
            code=str(error_payload.get("code", "INTERNAL")),
            message=str(error_payload.get("message", "request failed")),
            correlation_id=str(meta_payload.get("requestId"))
            if isinstance(meta_payload.get("requestId"), str)
            else None,
            details=error_payload.get("details"),
        )

    if isinstance(payload, dict) and "code" in payload and "message" in payload:
        return build_error(
            status_code=response.status_code,
            code=str(payload.get("code")),
            message=str(payload.get("message")),
            correlation_id=str(payload["correlation_id"])
            if isinstance(payload.get("correlation_id"), str)
            else None,
            details=payload.get("details"),
        )

    if isinstance(payload, dict) and "error" in payload and "message" in payload:
        return build_error(
            status_code=response.status_code,
            code=str(payload.get("error")),
            message=str(payload.get("message")),
            details=payload.get("issues"),
        )

    return DriftGateSDKError(
        code="http_error",
        message=f"request failed ({response.status_code}): {response.text}",
        status_code=response.status_code,
    )
