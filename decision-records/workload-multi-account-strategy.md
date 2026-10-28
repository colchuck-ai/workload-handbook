# Workload Multi-Account Strategy

## Status

Accepted 2023-12-11

## Context

Links to guidance from AWS:

- [Security OU and Accounts](https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/security-ou-and-accounts.html)
- [Workloads and Environments](https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/workloads-and-environments.html)
- [Production and Non-Production Workload Environments](https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/production-and-non-production-workload-environments.html)
- [OU Structure for Non-Production Workload Environments](https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/ou-structure-for-non-production-environments.html)

### Options

- Use a multi-account strategy, having an account for each workload environment
- Put all resources for every workload and environment in a single account
- Put all resources for every environment for a given workload in a single account

## Decision

For each workload, we create multiple new AWS accounts within the following OU hierarchy:

- Root
- Security OU
  - Prod OU
    - `acme-prod-<workload-name>` account
  - Non-Prod OU
    - `acme-test-<workload-name>` account

## Consequences

| Benefits                                                                                        | Costs                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| We're able to place our workload in a group based on business purpose and ownership (Security). | A higher operational cost than other alternatives such as having a single account for the workload, or having multiple unrelated workloads in the same account |
| We're able to apply distinct security controls to our workload by stage.                        |                                                                                                                                                                |
| We're able to constrain access to sensitive data.                                               |                                                                                                                                                                |
| We promote agility and innovation through improved guardrails.                                  |                                                                                                                                                                |
| We limit the scope of impact from adverse events.                                               |                                                                                                                                                                |
| We're able to better track and manage cost.                                                     |                                                                                                                                                                |
| We're able to distribute AWS service quotas and API request rate limits.                        |                                                                                                                                                                |
