# Workload Secrets Management

## Status

Accepted 2024-02-16

## Context

Determining where secrets ought to be stored can be challenging, and requires careful consideration of many variables, including, but not limited to:

- The ease by which workloads can consume secrets
- Sharing secrets across a workload running in multiple cloud provider ecosystems

### Options

#### Centralized

All workload secrets are stored in a single repository, and the workload pulls from that repository at runtime. This centralized secret management service could be implemented as a non-cloud provider secrets management service (e.g. Vault) or a cloud provider secrets management service (e.g. AWS Secrets Manager).

| Benefits                            | Costs                                                                                                      |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Easier to implement access controls | Secrets are located logically far from their consuming workload                                            |
| Single place to modify credentials  | Consuming secrets at runtime can be more difficult to set up than using native secrets management services |

#### Distributed

Workload secrets are stored in repositories logically close to where they are used by the workload. One implementation of this solution is to use each environment's natively supported secrets management service (e.g. Secrets Manager for AWS).

| Benefits                                               | Costs                                                                                     |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| It's easy for secrets to be consumed by workloads      | Multiple places to modify secrets                                                         |
| Secrets are located logically close to their consumers | Possible duplication of secrets that are the same across different workload environments. |
|                                                        | Larger attack surface for secrets                                                         |

#### Hybrid

Shared credentials are stored in a centralized secrets management repository, and cloud provider specific secrets are stored in distributed secrets management repositories. One implementation of this is to have Secrets Manager for AWS act as a centralized repository for shared secrets, and have AWS specific secrets stored in Secrets Manager, Azure specific secrets stored in Key Vault, etc.

| Benefits                                                             | Costs                                         |
| -------------------------------------------------------------------- | --------------------------------------------- |
| It's easier for secrets to consume the majority of secrets           | Multiple places to modify secrets             |
| Secrets are located as logically close to their consumer as possible | More challenging to implement access controls |
| Leverage secrets management services with high SLAs                  |                                               |
| Shared secrets aren't duplicated                                     |                                               |

## Decision

We'll be using a hybrid solution, leveraging cloud provider secrets management services.

We'll use AWS Secrets Manager to store workload's shared secrets, and AWS Secrets Manager to store AWS specific workload secrets. If we ever operate workloads in Azure, GCP, or another cloud provider, we'll use those respective cloud providers' secret management services to store cloud provider specific secrets.

## Consequences

| Benefits                                                             | Costs                                                                                                                                                                                                     |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| It's easier for secrets to consume the majority of secrets           | Secrets will be distributed, resulting in a large attack surface. It will be important that the access controls to each secrets management solution be solid.                                             |
| Secrets are located as logically close to their consumer as possible | There might be some confusion around where secrets are stored. It's likely that someone who has to modify a secret might first check the distributed secrets, then have to go to the centralized secrets. |
| Leverage secrets management services with high SLAs                  |                                                                                                                                                                                                           |
| Shared secrets aren't duplicated                                     |                                                                                                                                                                                                           |
