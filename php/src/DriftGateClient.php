<?php

declare(strict_types=1);

namespace DriftGate\Sdk;

final class CanonicalErrorCodes
{
    public const AUTH_INVALID = 'AUTH_INVALID';
    public const POLICY_DENIED = 'POLICY_DENIED';
    public const RISK_EXCEEDED = 'RISK_EXCEEDED';
    public const ROUTE_UNAVAILABLE = 'ROUTE_UNAVAILABLE';
    public const TOOL_BLOCKED = 'TOOL_BLOCKED';
    public const RATE_LIMITED = 'RATE_LIMITED';
    public const TIMEOUT = 'TIMEOUT';
    public const INTERNAL = 'INTERNAL';
}

final class DriftGateException extends \RuntimeException
{
    public function __construct(
        public readonly string $codeId,
        public readonly int $status,
        public readonly bool $retryable,
        public readonly ?string $requestId,
        string $message,
        public readonly ?array $details = null,
    ) {
        parent::__construct($message, $status);
    }
}

final class SessionHandle
{
    public function __construct(
        private readonly DriftGateClient $client,
        public readonly array $session,
        public readonly array $startEnvelope,
    ) {
    }

    public function sessionId(): string
    {
        return (string) ($this->session['sessionId'] ?? '');
    }

    public function execute(array $input, ?array $policy = null, ?array $route = null, ?array $risk = null): array
    {
        $payload = ['input' => $input];
        if ($policy !== null) {
            $payload['policy'] = $policy;
        }
        if ($route !== null) {
            $payload['route'] = $route;
        }
        if ($risk !== null) {
            $payload['risk'] = $risk;
        }

        return $this->client->executeSession($this->sessionId(), $payload);
    }
}

final class DriftGateClient
{
    public function __construct(
        private readonly string $baseUrl,
        private readonly ?string $apiKey = null,
        private readonly ?string $bearerToken = null,
        private readonly $transport = null,
    ) {
    }

    public function sessionStart(
        string $agent,
        ?string $workspaceId = null,
        ?string $subject = null,
        ?array $metadata = null,
        ?array $policy = null,
        ?array $route = null,
        ?array $risk = null,
        ?string $workflowVersionId = null,
        ?string $expiresAt = null,
    ): SessionHandle {
        $payload = ['agent' => $agent];
        if ($workspaceId !== null) {
            $payload['workspaceId'] = $workspaceId;
        }
        if ($subject !== null) {
            $payload['subject'] = $subject;
        }
        if ($metadata !== null) {
            $payload['metadata'] = $metadata;
        }
        if ($policy !== null) {
            $payload['policy'] = $policy;
        }
        if ($route !== null) {
            $payload['route'] = $route;
        }
        if ($risk !== null) {
            $payload['risk'] = $risk;
        }
        if ($workflowVersionId !== null) {
            $payload['workflowVersionId'] = $workflowVersionId;
        }
        if ($expiresAt !== null) {
            $payload['expiresAt'] = $expiresAt;
        }

        $envelope = $this->request('POST', '/v4/sessions.start', $payload);
        if (($envelope['ok'] ?? false) !== true) {
            $this->throwEnvelopeError($envelope);
        }

        return new SessionHandle(
            client: $this,
            session: $envelope['data']['session'] ?? [],
            startEnvelope: $envelope,
        );
    }

    public function executeSession(string $sessionId, array $payload): array
    {
        $envelope = $this->request('POST', '/v4/sessions/' . rawurlencode($sessionId) . '/executions.execute', $payload);
        if (($envelope['ok'] ?? false) !== true) {
            $this->throwEnvelopeError($envelope);
        }
        return $envelope;
    }

    public function execute(
        string $agent,
        array $input,
        ?string $workspaceId = null,
        ?array $policy = null,
        ?array $route = null,
        ?array $risk = null,
    ): array {
        $payload = [
            'agent' => $agent,
            'input' => $input,
        ];
        if ($workspaceId !== null) {
            $payload['workspaceId'] = $workspaceId;
        }
        if ($policy !== null) {
            $payload['policy'] = $policy;
        }
        if ($route !== null) {
            $payload['route'] = $route;
        }
        if ($risk !== null) {
            $payload['risk'] = $risk;
        }

        $envelope = $this->request('POST', '/v4/execute', $payload);
        if (($envelope['ok'] ?? false) !== true) {
            $this->throwEnvelopeError($envelope);
        }

        return $envelope;
    }

    private function request(string $method, string $path, array $payload): array
    {
        if ($this->transport !== null) {
            return ($this->transport)($method, $path, $payload);
        }

        $url = rtrim($this->baseUrl, '/') . $path;
        $headers = ['Content-Type: application/json'];
        if ($this->apiKey !== null) {
            $headers[] = 'x-driftgate-api-key: ' . $this->apiKey;
        }
        if ($this->bearerToken !== null) {
            $headers[] = 'Authorization: Bearer ' . $this->bearerToken;
        }

        $ch = curl_init($url);
        if ($ch === false) {
            throw new \RuntimeException('Unable to initialize curl');
        }

        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload, JSON_THROW_ON_ERROR));
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $body = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        curl_close($ch);

        $decoded = is_string($body) && $body !== '' ? json_decode($body, true) : [];
        if (!is_array($decoded)) {
            throw new \RuntimeException('Invalid JSON response');
        }

        if ($status >= 400) {
            $this->throwEnvelopeError($decoded);
        }

        $decoded['_raw'] = $body;
        return $decoded;
    }

    private function throwEnvelopeError(array $payload): never
    {
        $error = is_array($payload['error'] ?? null) ? $payload['error'] : [];
        $meta = is_array($payload['meta'] ?? null) ? $payload['meta'] : [];
        throw new DriftGateException(
            codeId: (string) ($error['code'] ?? 'INTERNAL'),
            status: (int) ($error['status'] ?? 500),
            retryable: (bool) ($error['retryable'] ?? false),
            requestId: isset($meta['requestId']) ? (string) $meta['requestId'] : null,
            message: (string) ($error['message'] ?? 'request failed'),
            details: isset($error['details']) && is_array($error['details']) ? $error['details'] : null,
        );
    }
}
