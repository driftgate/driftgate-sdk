from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Optional


@dataclass
class DriftGateSDKError(Exception):
    code: str
    message: str
    status_code: int
    correlation_id: Optional[str] = None
    details: Optional[Any] = None

    def __str__(self) -> str:
        return f"{self.code} ({self.status_code}): {self.message}"


class InvalidRequestError(DriftGateSDKError):
    pass


class UnauthorizedError(DriftGateSDKError):
    pass


class ForbiddenError(DriftGateSDKError):
    pass


class NotFoundError(DriftGateSDKError):
    pass


class ConflictError(DriftGateSDKError):
    pass


class RateLimitedError(DriftGateSDKError):
    pass


ERROR_CODE_MAP = {
    "invalid_request": InvalidRequestError,
    "unauthorized": UnauthorizedError,
    "forbidden": ForbiddenError,
    "not_found": NotFoundError,
    "conflict": ConflictError,
    "rate_limit_exceeded": RateLimitedError,
    "AUTH_INVALID": UnauthorizedError,
    "POLICY_DENIED": ForbiddenError,
    "RISK_EXCEEDED": ForbiddenError,
    "ROUTE_UNAVAILABLE": NotFoundError,
    "TOOL_BLOCKED": ForbiddenError,
    "RATE_LIMITED": RateLimitedError,
    "TIMEOUT": DriftGateSDKError,
    "INTERNAL": DriftGateSDKError,
}


def build_error(
    *,
    status_code: int,
    code: str,
    message: str,
    correlation_id: Optional[str] = None,
    details: Optional[Any] = None,
) -> DriftGateSDKError:
    error_type = ERROR_CODE_MAP.get(code, DriftGateSDKError)
    return error_type(
        code=code,
        message=message,
        status_code=status_code,
        correlation_id=correlation_id,
        details=details,
    )
