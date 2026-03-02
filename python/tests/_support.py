from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Any, Dict, List, Optional


@dataclass
class FakeResponse:
    status_code: int
    payload: Optional[Any] = None
    raw_text: Optional[str] = None

    @property
    def ok(self) -> bool:
        return 200 <= self.status_code < 300

    @property
    def text(self) -> str:
        if self.raw_text is not None:
            return self.raw_text
        if self.payload is None:
            return ""
        return json.dumps(self.payload)

    def json(self) -> Any:
        if self.payload is None:
            raise ValueError("no json payload")
        return self.payload


class FakeSession:
    def __init__(self, responses: List[FakeResponse]):
        self._responses = list(responses)
        self.calls: List[Dict[str, Any]] = []

    def request(
        self,
        *,
        method: str,
        url: str,
        headers: Dict[str, str],
        data: Optional[str] = None,
        timeout: float = 30.0,
    ) -> FakeResponse:
        self.calls.append(
            {
                "method": method,
                "url": url,
                "headers": headers,
                "data": data,
                "timeout": timeout,
            }
        )
        if not self._responses:
            raise AssertionError(f"no fake response queued for {method} {url}")
        return self._responses.pop(0)
