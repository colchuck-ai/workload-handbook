# Use Terraform Stacks for Independent Concern Partitioning

## Status

Accepted

## Context

Large centralized terraform deployment projects that provision infrastructure across multiple domains or workloads within the same environment/provider/region face several challenges:

1. **Performance Issues**: Single root modules with hundreds of resources result in slow terraform plans and applies
2. **State Contention**: Large shared state files create locking bottlenecks and increase risk of corruption
3. **Review Overhead**: Platform teams must review all changes, even for domains they lack expertise in
4. **Blast Radius**: Changes to one domain can inadvertently affect unrelated infrastructure
5. **Operational Complexity**: Single points of failure for diverse infrastructure concerns

These issues become particularly acute in centralized provisioning scenarios where a single deployment project manages infrastructure for multiple independent domains or workloads.

## Decision

We will use terraform **stacks** as an optional extension to the [standard deployment structure](../tools/terraform/terraform.md#standard-deployment-structure) to partition independent concerns within the same environment/provider/region.

A stack adds an additional organizational layer:

- Standard: `environments/<environment>/<provider>/<region>/`
- With stacks: `environments/<environment>/<provider>/<region>/<stack>/`

### When to Use Stacks

Use stacks to separate **independent concerns** that:

- Have no dependencies between them
- Can be managed by different domain experts
- Represent distinct organizational boundaries (departments, workloads)
- Would benefit from isolated terraform state

### When NOT to Use Stacks

Do not use stacks when:

- Resources have dependencies between them
- Concerns are tightly coupled
- The overhead of multiple stacks exceeds the benefits

## Consequences

### Positive

- **Improved Performance**: Smaller terraform root modules result in faster plans and applies
- **Reduced State Contention**: Each stack maintains its own state file, eliminating locking conflicts
- **Expert Review**: Domain experts can own and review their specific stacks via CODEOWNERS
- **Reduced Blast Radius**: Changes to one stack cannot affect other stacks
- **Operational Efficiency**: Platform teams avoid reviewing changes outside their expertise
- **Independent Lifecycle**: Stacks can be added, modified, or removed independently

### Negative

- **Additional Complexity**: More directories and state files to manage
- **Cross-Stack Dependencies**: Discouraged pattern that requires careful coordination if needed
- **CI/CD Overhead**: More jobs in deployment pipelines (mitigated by future watch-paths feature)

### Neutral

- **State Organization**: Each stack creates additional hierarchy in remote state backends
- **Naming Conventions**: Stack names should reflect long-lived organizational boundaries (departments, workloads) rather than team names

## Implementation

Stacks are implemented using a combination of [gitlab-cicd-terraform](https://gitlab.example.com/engineering/dev-tools/internal/gitlab-cicd-terraform) and [gitlab-cicd-workflow](https://gitlab.example.com/engineering/dev-tools/internal/gitlab-cicd-workflow) components (specifically the `stack-trigger-rules` component), allowing fine-grained control over which stacks are deployed in CI/CD pipelines.

For a concrete example, visit [asset-inventory-resource-deployment](https://gitlab.example.com/engineering/asset-inventory/internal/asset-inventory-resource-deployment).
