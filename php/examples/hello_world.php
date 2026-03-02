<?php

declare(strict_types=1);

require_once __DIR__ . '/../src/DriftGateClient.php';

use DriftGate\Sdk\DriftGateClient;

$client = new DriftGateClient('https://api.driftgate.ai', bearerToken: 'token');
$session = $client->sessionStart(agent: 'refund-agent');
$session->execute(input: ['orderId' => '123']);
