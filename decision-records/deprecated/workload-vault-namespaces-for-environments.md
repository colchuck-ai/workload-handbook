# Workload Vault Namespaces for Environments

## Status

Superseded 2024-12-19 by [Workload CI/CD Access to CSP Roles Uses SPIFFE JWT](../workload-cicd-access-to-csp-roles-uses-spiffe-jwt.md)

Vault namespaces are no longer required for workload authentication as GitLab now uses SPIFFE JWTs for direct AWS authentication.

## Context

We need to decide how we implement workload environments within the Vault Platform at Acme.

For additional context, Vault has a [limitation on the number of mounts](https://developer.hashicorp.com/vault/docs/internals/limits).

Additional discussion with the Vault platform owners:

_Screenshot removed: a chat discussion with the Vault platform owners about a proposal to create two Vault namespaces for a workload's two environments. Summary of the positions and trade-offs:_

- _The platform owners asked whether a single namespace with separate prod and test folders would suffice, and suggested using the staging Vault instance for the test namespace, since the number of Vault namespaces is limited and they want to keep it low._
- _The workload owner argued that separate namespaces limit the blast radius of adverse events and naturally restrict access to production secrets, and that non-production workload environments should not depend on a non-production-quality secrets management service, because that introduces instability into the dependency chain ("production" denotes the most stable form of a capability, not that it only serves production consumers)._
- _The platform owners stated that the staging instance is held to high reliability standards and there are no plans to shut it down, but that it will never carry the same SLOs as production by design: it is used to test new features, upgrades, and integrations before they reach production._
- _Both sides agreed a non-production instance is acceptable only if changes to it go through the same process and checks as production, which is not yet fully the case._
- _The platform owners offered two options: one namespace in production Vault plus one in staging Vault, or a single production namespace partitioned into secrets directories secured by Vault policies (HashiCorp's typical recommendation, given Vault's [limits](https://developer.hashicorp.com/vault/docs/internals/limits) on namespaces). Raising the default limits is possible but has unknown performance impact._

### Options

#### Creating a namespace for the production workload in the production Vault environment, and any namespaces for non-production workloads in the staging Vault environment

This solution would have the highest assurance of confidentiality and integrity, but would have the lowest assurances of availability, especially for the namespace in the staging Vault environment.

#### Create a single namespace for the all workload environments in the production Vault environment, and partition the namespace using access policies

This solution provides high assurance of availability, but introduces threats to confidentiality and integrity of production secrets. It's pretty easy to shoot yourself in the foot.

#### Create two vault namespaces in the production vault environment

This solution would ideally be the best, because it provides the highest assurance of confidentiality, integrity, and availability in all environments. However, due to limitations on the default number of mount points per cluster, and the unknown effects of increasing that default (by Hashicorp's own admission), this solution isn't scalable.

## Decision

We'll create two Vault namespaces, one in the Production Vault environment, and one in the Staging Vault environment.

This solution would have the highest assurance of confidentiality and integrity, but would have the lowest assurances of availability, especially for the namespace in the staging Vault environment.

In the end, We would rather our test fail because of Vault than Vault fail in prod because of us.

## Consequences

| Benefits                                                                                                          | Costs                                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Provides higher assurances of confidentiality and integrity of the production quality secrets management service. | Introduces risks to the availability of the secrets management service to the test workload; the Staging Vault environment is liable to outages related to testing from the Vault service owners. |
