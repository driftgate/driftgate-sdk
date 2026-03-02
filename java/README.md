# DriftGate Java SDK

Canonical V4 envelope SDK for Java.

See canonical envelope docs: [`docs/sdk/response-envelope.md`](/Users/jordandavis/Documents/Code/DriftGateAI/driftgate-v4-sdk-wt/docs/sdk/response-envelope.md).

## Install (Maven)

```xml
<dependency>
  <groupId>ai.driftgate</groupId>
  <artifactId>driftgate-sdk</artifactId>
  <version>0.1.0</version>
</dependency>
```

## Hello World (2 lines)

```java
var session = client.session.start(startRequest("refund-agent"));
session.execute(executionRequest(Map.of("orderId", "123")));
```

## Full Example

```java
Models.SessionStartRequest start = new Models.SessionStartRequest();
start.agent = "refund-agent";
start.policy = Map.of("ref", "refund", "version", "2026-02");
start.route = Map.of("provider", "openai", "model", "gpt-4.1-mini", "region", "us-east-1");
var session = client.session.start(start);
Models.ExecutionRequest execute = new Models.ExecutionRequest();
execute.input = Map.of("orderId", "123");
execute.risk = Map.of("decision", "review");
var response = session.execute(execute);
System.out.println(response.meta.requestId);
```
