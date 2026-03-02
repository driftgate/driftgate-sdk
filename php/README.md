# DriftGate PHP SDK

Canonical V4 envelope SDK for PHP.

See canonical envelope docs: [`docs/sdk/response-envelope.md`](/Users/jordandavis/Documents/Code/DriftGateAI/driftgate-v4-sdk-wt/docs/sdk/response-envelope.md).

## Install

```bash
composer require driftgate/sdk-php:^0.1.0
```

## Hello World (2 lines)

```php
$session = (new DriftGateClient('https://api.driftgate.ai'))->sessionStart(agent: 'refund-agent');
$session->execute(input: ['orderId' => '123']);
```

## Full Example

```php
$client = new DriftGateClient('https://api.driftgate.ai', bearerToken: getenv('DRIFTGATE_TOKEN'));
$session = $client->sessionStart(
  agent: 'refund-agent',
  policy: ['ref' => 'refund', 'version' => '2026-02'],
  route: ['provider' => 'openai', 'model' => 'gpt-4.1-mini', 'region' => 'us-east-1'],
  risk: ['decision' => 'review']
);
$response = $session->execute(input: ['orderId' => '123']);
echo $response['meta']['requestId'] . PHP_EOL;
```
