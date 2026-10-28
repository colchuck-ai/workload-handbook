# Options for Workload Environments

## Status

Proposed 2024-01-04

## Context

We'd like to establish a minimal set of workload environments that allow for gating promotion to a production environment after testing.

### Options

| Name | Description                                                                                                                                                                                                                                                                         |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| prod | A production environment is the live and operational computing system where software applications and services are executed to serve end-users, following stringent performance, security, and reliability standards.                                                               |
| test | A testing environment is a controlled and isolated computing setup where software applications undergo systematic evaluation and validation, allowing for the identification of bugs, performance issues, and compatibility concerns before deployment to a production environment. |

## Decision

We'll support the use of the following within documentation:

- Prod
- Test

## Consequences

### Benefits

- A common language for talking about workload environment options

### Costs

- We will need to update documentation in the future if we add more environments

## Examples

These environment names are used consistently across workload resources:

- **Email distribution lists**: `dl-acme-prod-my-workload@example.com`, `dl-acme-test-my-workload@example.com`
- **Terraform state buckets**: `acme-gbl-prod-my-workload-tfstate`, `acme-gbl-test-my-workload-tfstate`
- **AWS account names**: `prod-my-workload`, `test-my-workload`
