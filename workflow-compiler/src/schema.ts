import { z } from "zod";

const MetadataSchema = z.object({
  name: z.string().min(1),
  workspace: z.string().min(1)
});

const PolicyBindingSchema = z.object({
  policyId: z.string().min(1),
  mode: z.enum(["monitor", "enforce"]).default("enforce")
});

const SlaBindingSchema = z.object({
  slaId: z.string().min(1)
});

const NodeSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  mutation: z.boolean().optional().default(false),
  config: z.record(z.unknown()).optional().default({})
});

const EdgeSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1)
});

export const WorkflowYamlSchema = z.object({
  apiVersion: z.literal("driftgate.ai/v1"),
  kind: z.literal("Workflow"),
  metadata: MetadataSchema,
  spec: z.object({
    governance: z
      .object({
        policyBindings: z.array(PolicyBindingSchema).default([]),
        slaBindings: z.array(SlaBindingSchema).default([])
      })
      .default({ policyBindings: [], slaBindings: [] }),
    nodes: z.array(NodeSchema).min(1),
    edges: z.array(EdgeSchema).optional().default([])
  })
});

export type WorkflowYaml = z.infer<typeof WorkflowYamlSchema>;
