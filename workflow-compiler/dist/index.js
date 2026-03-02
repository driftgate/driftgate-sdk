// src/schema.ts
import { z } from "zod";
var MetadataSchema = z.object({
  name: z.string().min(1),
  workspace: z.string().min(1)
});
var PolicyBindingSchema = z.object({
  policyId: z.string().min(1),
  mode: z.enum(["monitor", "enforce"]).default("enforce")
});
var SlaBindingSchema = z.object({
  slaId: z.string().min(1)
});
var NodeSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  mutation: z.boolean().optional().default(false),
  config: z.record(z.unknown()).optional().default({})
});
var EdgeSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1)
});
var WorkflowYamlSchema = z.object({
  apiVersion: z.literal("driftgate.ai/v1"),
  kind: z.literal("Workflow"),
  metadata: MetadataSchema,
  spec: z.object({
    governance: z.object({
      policyBindings: z.array(PolicyBindingSchema).default([]),
      slaBindings: z.array(SlaBindingSchema).default([])
    }).default({ policyBindings: [], slaBindings: [] }),
    nodes: z.array(NodeSchema).min(1),
    edges: z.array(EdgeSchema).optional().default([])
  })
});

// src/compiler.ts
import { createHash } from "crypto";
import { parse } from "yaml";
function stableStringify(value) {
  return JSON.stringify(sortValue(value));
}
function sortValue(value) {
  if (Array.isArray(value)) {
    return value.map((item) => sortValue(item));
  }
  if (!value || typeof value !== "object") {
    return value;
  }
  const objectValue = value;
  const sortedKeys = Object.keys(objectValue).sort((left, right) => left.localeCompare(right));
  const next = {};
  for (const key of sortedKeys) {
    next[key] = sortValue(objectValue[key]);
  }
  return next;
}
function assertValidReferences(workflow) {
  const nodeIds = new Set(workflow.spec.nodes.map((node) => node.id));
  for (const edge of workflow.spec.edges) {
    if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) {
      throw new Error(`invalid edge reference: ${edge.from} -> ${edge.to}`);
    }
  }
}
function compileWorkflowYaml(yamlText) {
  const parsed = parse(yamlText);
  const workflow = WorkflowYamlSchema.parse(parsed);
  assertValidReferences(workflow);
  const nodes = [...workflow.spec.nodes].sort((left, right) => left.id.localeCompare(right.id));
  const edges = [...workflow.spec.edges].sort((left, right) => {
    const fromOrder = left.from.localeCompare(right.from);
    if (fromOrder !== 0) {
      return fromOrder;
    }
    return left.to.localeCompare(right.to);
  });
  const compiledPlan = {
    metadata: workflow.metadata,
    governance: workflow.spec.governance,
    nodes: nodes.map((node) => ({
      id: node.id,
      type: node.type,
      mutation: Boolean(node.mutation),
      config: node.config ?? {}
    })),
    edges
  };
  const mutationNodeIds = compiledPlan.nodes.filter((node) => node.mutation).map((node) => node.id).sort((left, right) => left.localeCompare(right));
  const checksum = createHash("sha256").update(stableStringify(compiledPlan)).digest("hex");
  return {
    workflow,
    compiledPlan,
    mutationNodeIds,
    checksum
  };
}
export {
  WorkflowYamlSchema,
  compileWorkflowYaml
};
//# sourceMappingURL=index.js.map