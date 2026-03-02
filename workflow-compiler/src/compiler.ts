import { createHash } from "node:crypto";
import { parse } from "yaml";
import { WorkflowYamlSchema, type WorkflowYaml } from "./schema.ts";

export type CompiledWorkflow = {
  workflow: WorkflowYaml;
  compiledPlan: {
    metadata: WorkflowYaml["metadata"];
    governance: WorkflowYaml["spec"]["governance"];
    nodes: Array<{
      id: string;
      type: string;
      mutation: boolean;
      config: Record<string, unknown>;
    }>;
    edges: Array<{ from: string; to: string }>;
  };
  mutationNodeIds: string[];
  checksum: string;
};

function stableStringify(value: unknown): string {
  return JSON.stringify(sortValue(value));
}

function sortValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => sortValue(item));
  }
  if (!value || typeof value !== "object") {
    return value;
  }
  const objectValue = value as Record<string, unknown>;
  const sortedKeys = Object.keys(objectValue).sort((left, right) => left.localeCompare(right));
  const next: Record<string, unknown> = {};
  for (const key of sortedKeys) {
    next[key] = sortValue(objectValue[key]);
  }
  return next;
}

function assertValidReferences(workflow: WorkflowYaml): void {
  const nodeIds = new Set(workflow.spec.nodes.map((node) => node.id));
  for (const edge of workflow.spec.edges) {
    if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) {
      throw new Error(`invalid edge reference: ${edge.from} -> ${edge.to}`);
    }
  }
}

export function compileWorkflowYaml(yamlText: string): CompiledWorkflow {
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

  const mutationNodeIds = compiledPlan.nodes
    .filter((node) => node.mutation)
    .map((node) => node.id)
    .sort((left, right) => left.localeCompare(right));

  const checksum = createHash("sha256").update(stableStringify(compiledPlan)).digest("hex");

  return {
    workflow,
    compiledPlan,
    mutationNodeIds,
    checksum
  };
}
