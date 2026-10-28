# Use OUs to Implement Common Guardrails Across Non-Production Workload Environments

## Status

Proposed 2023-12-20

## Context

### Options

- [Common guardrails across non-production environments](https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/ou-structure-for-non-production-environments.html)
- [Different guardrails across non-production environments](https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/ou-structure-for-non-production-environments.html)

## Decision

Use OUs to implement common guardrails across non-production environments.

We don't have the immediate need to support fundamentally different access policies or ways in which you manage and apply foundational resources for different types of non-production workload environments.

## Consequences

### Benefits

- Simpler to manage.

### Costs

- Unable to support fundamentally different access policies or ways in which you manage and apply foundational resources for different types of non-production workload environments.
