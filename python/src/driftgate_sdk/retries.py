from __future__ import annotations

from dataclasses import dataclass
import random
import time


@dataclass(frozen=True)
class RetryPolicy:
    max_attempts: int = 3
    base_backoff_seconds: float = 0.25
    max_backoff_seconds: float = 2.0
    jitter_seconds: float = 0.1

    def should_retry(self, attempt: int, status_code: int) -> bool:
        if attempt >= self.max_attempts:
            return False
        return status_code == 429 or status_code >= 500

    def sleep(self, attempt: int) -> None:
        exponential = self.base_backoff_seconds * (2 ** max(attempt - 1, 0))
        bounded = min(exponential, self.max_backoff_seconds)
        jitter = random.uniform(0.0, self.jitter_seconds)
        time.sleep(bounded + jitter)
