# Workload CI/CD Access to CSP Roles is Mediated by Vault

## Status

Superseded 2024-12-19 by [Workload CI/CD Access to CSP Roles Uses SPIFFE JWT](../workload-cicd-access-to-csp-roles-uses-spiffe-jwt.md)

## Context

CI/CD pipelines generally need high levels of permission to either provision infrastructure, publish images, or apply manifests.

We can mitigate the risk of highly permissioned credentials being used improperly by applying defense in depth:

- Employ the principle of least privilege
- Minimize the use of long lived credentials
- Restrict the use of credentials to authorized parties

### Options

| Description                                                         | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Quality    |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| GitLab AWS OIDC Identity provider                                   | Can't do with the current implementation of GitLab. Our self hosted instance of GitLab isn't publicly accessible, so AWS isn't able to verify the authenticity of the id token sent with the request to sts:AssumeWithWebIdentity.                                                                                                                                                                                                                                                         | `terrible` |
| Credentials to Single User in Each AWS Accounts Stored in GitLab    | A single set of long lived credentials authorized to perform read-write actions in AWS environments would be stored as GitLab CI/CD variables, which have limited access controls. This violates principle of least permission, and creates unnecessary long lived credentials.                                                                                                                                                                                                            | `bad`      |
| Credentials to Multiple Users in Each AWS Accounts Stored in GitLab | Two sets of long lived credentials, one authorized to perform read-write actions and only usable by protected branch pipelines, and a second authorized to perform read-only actions on any branch pipeline, would be stored as GitLab CI/CD variables. This satisfies least permission, but at the cost of multiple sets of long lived credentials, and additional risk of those credentials being exposed to unauthorized parties in the CI/CD variables settings of the GitLab Project. | `bad`      |
| Sealed Credentials to Single User in Each AWS Account               | A single set of long lived credentials authorized to assume roles that perform read-write actions in AWS environments would be stored and sealed in a Vault AWS Secret Engine Backend. An authorized GitLab pipeline will log into a JWT Auth Backend role, then use that role to generate a set of temporary credentials using to roles in appropriate AWS accounts using the Vault AWS Secret Engine.                                                                                    | `good`     |

## Decision

Sealed Credentials to Single User in Each AWS Account.

We'll satisfy these requirements by using Vault to generate temporary credentials to AWS roles from GitLab CI/CD pipelines. An authorized GitLab pipeline will log into a JWT Auth Backend role, then use that role to generate a set of temporary credentials using to roles in appropriate AWS accounts using the Vault AWS Secret Engine. See [Workload Concepts](../../workloads/workload-concepts.md) for more.

## Consequences

### Benefits

- It becomes easier to meet the requirements of least privilege, minimize long lived credentials, and restrict the use of credentials.

### Costs

- The scheme for generating temporary credentials becomes more complex.
- Highly permissioned vault tokens might be able to request temporary credentials to workload CI/CD csp roles, which have the permissions to manage infrastructure. Furthermore, we don't have a lot of control over the policies granted to tokens (the team that administers Vault access does).
