import assert from "node:assert/strict";
import test from "node:test";
import { compileWorkflowYaml } from "./compiler.ts";

const workflowYaml = `
apiVersion: driftgate.ai/v1
kind: Workflow
metadata:
  name: refund-agent
  workspace: acme-payments
spec:
  governance:
    policyBindings:
      - policyId: pol_refunds
        mode: enforce
    slaBindings:
      - slaId: sla_default
  nodes:
    - id: fetch_order
      type: http
      config:
        path: /orders/:id
    - id: decide_refund
      type: llm
    - id: issue_refund
      type: http
      mutation: true
  edges:
    - from: fetch_order
      to: decide_refund
    - from: decide_refund
      to: issue_refund
`;

test("compiler is deterministic for stable input", () => {
  const first = compileWorkflowYaml(workflowYaml);
  const second = compileWorkflowYaml(workflowYaml);
  assert.equal(first.checksum, second.checksum);
  assert.deepEqual(first.compiledPlan, second.compiledPlan);
});

test("compiler detects mutation nodes", () => {
  const compiled = compileWorkflowYaml(workflowYaml);
  assert.deepEqual(compiled.mutationNodeIds, ["issue_refund"]);
});

test("compiler rejects invalid edge references", () => {
  assert.throws(() =>
    compileWorkflowYaml(`
apiVersion: driftgate.ai/v1
kind: Workflow
metadata:
  name: broken
  workspace: acme
spec:
  nodes:
    - id: a
      type: http
  edges:
    - from: a
      to: missing
`)
  );
});
