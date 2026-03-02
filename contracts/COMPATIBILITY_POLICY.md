# Contracts Compatibility Policy

`@driftgate/contracts` is the authoritative cross-service contract package for V1.

## Versioning

- `CONTRACT_VERSION` follows semantic versioning.
- Breaking schema changes require a major version bump.
- Additive schema changes require a minor version bump.
- Patch bumps are allowed only for non-shape fixes (comments/docs/metadata).

## Breaking Changes

The following are breaking and must not land without major version bump:

- Removing an exported schema or type.
- Renaming exported schema/type identifiers.
- Tightening required fields in existing schemas.
- Changing enum values by removal or rename.

## Compatibility Gate

`tools/ci/contracts.sh` enforces a minimum export surface for V1:

- `AuthSessionSchema`
- `WorkspaceRoleBindingSchema`
- `WorkflowVersionSchema`
- `RunStateSchema`
- `PolicyDecisionSchema`
- `PolicyExitGateEvidenceSchema`
- `EntitlementDecisionSchema`
- `ArtifactManifestItemSchema`
- `ControlFailureSchema`
- `CONTRACT_VERSION`

The gate is intentionally conservative for bootstrap and can be tightened as schema snapshots are introduced.
