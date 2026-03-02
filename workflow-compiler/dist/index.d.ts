import { z } from 'zod';

declare const WorkflowYamlSchema: z.ZodObject<{
    apiVersion: z.ZodLiteral<"driftgate.ai/v1">;
    kind: z.ZodLiteral<"Workflow">;
    metadata: z.ZodObject<{
        name: z.ZodString;
        workspace: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        workspace: string;
    }, {
        name: string;
        workspace: string;
    }>;
    spec: z.ZodObject<{
        governance: z.ZodDefault<z.ZodObject<{
            policyBindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                policyId: z.ZodString;
                mode: z.ZodDefault<z.ZodEnum<["monitor", "enforce"]>>;
            }, "strip", z.ZodTypeAny, {
                policyId: string;
                mode: "monitor" | "enforce";
            }, {
                policyId: string;
                mode?: "monitor" | "enforce" | undefined;
            }>, "many">>;
            slaBindings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                slaId: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                slaId: string;
            }, {
                slaId: string;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            policyBindings: {
                policyId: string;
                mode: "monitor" | "enforce";
            }[];
            slaBindings: {
                slaId: string;
            }[];
        }, {
            policyBindings?: {
                policyId: string;
                mode?: "monitor" | "enforce" | undefined;
            }[] | undefined;
            slaBindings?: {
                slaId: string;
            }[] | undefined;
        }>>;
        nodes: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodString;
            mutation: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            config: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        }, "strip", z.ZodTypeAny, {
            type: string;
            id: string;
            mutation: boolean;
            config: Record<string, unknown>;
        }, {
            type: string;
            id: string;
            mutation?: boolean | undefined;
            config?: Record<string, unknown> | undefined;
        }>, "many">;
        edges: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            from: z.ZodString;
            to: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            from: string;
            to: string;
        }, {
            from: string;
            to: string;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
        governance: {
            policyBindings: {
                policyId: string;
                mode: "monitor" | "enforce";
            }[];
            slaBindings: {
                slaId: string;
            }[];
        };
        nodes: {
            type: string;
            id: string;
            mutation: boolean;
            config: Record<string, unknown>;
        }[];
        edges: {
            from: string;
            to: string;
        }[];
    }, {
        nodes: {
            type: string;
            id: string;
            mutation?: boolean | undefined;
            config?: Record<string, unknown> | undefined;
        }[];
        governance?: {
            policyBindings?: {
                policyId: string;
                mode?: "monitor" | "enforce" | undefined;
            }[] | undefined;
            slaBindings?: {
                slaId: string;
            }[] | undefined;
        } | undefined;
        edges?: {
            from: string;
            to: string;
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    apiVersion: "driftgate.ai/v1";
    kind: "Workflow";
    metadata: {
        name: string;
        workspace: string;
    };
    spec: {
        governance: {
            policyBindings: {
                policyId: string;
                mode: "monitor" | "enforce";
            }[];
            slaBindings: {
                slaId: string;
            }[];
        };
        nodes: {
            type: string;
            id: string;
            mutation: boolean;
            config: Record<string, unknown>;
        }[];
        edges: {
            from: string;
            to: string;
        }[];
    };
}, {
    apiVersion: "driftgate.ai/v1";
    kind: "Workflow";
    metadata: {
        name: string;
        workspace: string;
    };
    spec: {
        nodes: {
            type: string;
            id: string;
            mutation?: boolean | undefined;
            config?: Record<string, unknown> | undefined;
        }[];
        governance?: {
            policyBindings?: {
                policyId: string;
                mode?: "monitor" | "enforce" | undefined;
            }[] | undefined;
            slaBindings?: {
                slaId: string;
            }[] | undefined;
        } | undefined;
        edges?: {
            from: string;
            to: string;
        }[] | undefined;
    };
}>;
type WorkflowYaml = z.infer<typeof WorkflowYamlSchema>;

type CompiledWorkflow = {
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
        edges: Array<{
            from: string;
            to: string;
        }>;
    };
    mutationNodeIds: string[];
    checksum: string;
};
declare function compileWorkflowYaml(yamlText: string): CompiledWorkflow;

export { type CompiledWorkflow, type WorkflowYaml, WorkflowYamlSchema, compileWorkflowYaml };
