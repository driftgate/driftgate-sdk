from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, Optional


@dataclass(frozen=True)
class AuthConfig:
    api_key: Optional[str] = None
    bearer_token: Optional[str] = None

    def build_headers(self) -> Dict[str, str]:
        if self.api_key:
            return {"x-driftgate-api-key": self.api_key}
        if self.bearer_token:
            return {"Authorization": f"Bearer {self.bearer_token}"}
        raise ValueError("either api_key or bearer_token is required")
