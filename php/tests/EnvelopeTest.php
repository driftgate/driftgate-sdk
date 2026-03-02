<?php

declare(strict_types=1);

use DriftGate\Sdk\DriftGateClient;
use DriftGate\Sdk\DriftGateException;

require_once __DIR__ . '/../src/DriftGateClient.php';

$requests = [];
$transport = function (string $method, string $path, array $payload) use (&$requests): array {
    $requests[] = ['method' => $method, 'path' => $path, 'payload' => $payload];

    if ($path === '/v4/sessions.start') {
        return [
            'ok' => true,
            'data' => ['session' => ['sessionId' => 'sess_123', 'workspaceId' => 'ws_123', 'agent' => 'refund-agent']],
            'meta' => ['requestId' => 'req_1', 'timingMs' => ['total' => 1.1]],
            'error' => null,
        ];
    }

    if ($path === '/v4/sessions/sess_123/executions.execute') {
        return [
            'ok' => true,
            'data' => ['run' => ['id' => 'run_123']],
            'meta' => ['requestId' => 'req_2', 'executionId' => 'run_123', 'timingMs' => ['total' => 2.3]],
            'error' => null,
        ];
    }

    return [
        'ok' => false,
        'data' => null,
        'meta' => ['requestId' => 'req_denied', 'timingMs' => ['total' => 1.0]],
        'error' => ['code' => 'POLICY_DENIED', 'message' => 'denied', 'status' => 403, 'retryable' => false],
    ];
};

$client = new DriftGateClient('https://api.driftgate.ai', bearerToken: 'token', transport: $transport);
$session = $client->sessionStart(agent: 'refund-agent', workspaceId: 'ws_123');
$execution = $session->execute(input: ['orderId' => '123']);

if ($session->sessionId() !== 'sess_123') {
    throw new RuntimeException('session id mismatch');
}
if (($execution['meta']['executionId'] ?? '') !== 'run_123') {
    throw new RuntimeException('execution id mismatch');
}
if (!array_key_exists('workspaceId', $requests[0]['payload'])) {
    throw new RuntimeException('workspaceId missing from wire payload');
}
if (!array_key_exists('input', $requests[1]['payload'])) {
    throw new RuntimeException('input missing from wire payload');
}

$failed = false;
try {
    $client->executeSession('sess_missing', ['input' => ['orderId' => '404']]);
} catch (DriftGateException $error) {
    $failed = $error->codeId === 'POLICY_DENIED';
}

if (!$failed) {
    throw new RuntimeException('expected canonical error mapping failure');
}
