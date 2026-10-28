# Use tf-backend to Secure Terraform State for Workloads Without Native Remote Storage

## Context

We assessed GitLab's built-in Terraform state backend and found that while pipelines use the `CI_JOB_TOKEN` with permissions derived from the user who triggers the pipeline, several risks remain when relying on it as a default mechanism for managing Terraform state:

- While developers cannot directly mutate state unless they have write access to the project and trigger pipelines, **maintainers can submit unreviewed merge requests (MRs) and trigger pipelines that perform destructive state operations**—such as `terraform state rm` or `terraform state push`—without any manual review or gating.
  ⟶ See [GitLab Issue #254668](https://gitlab.com/gitlab-org/gitlab/-/issues/254668)
- Even when write access is gated, **read access to Terraform state files** may expose sensitive metadata (e.g., resource names, ARNs, IDs) to developers.
  ⟶ See [GitLab Epic #15118](https://gitlab.com/groups/gitlab-org/-/epics/15118)
- GitLab’s access model does not support fine-grained, environment-specific access control to Terraform state.
- The GitLab team has acknowledged these issues, but no robust resolution is currently in place.

For engineering workloads that **do not have dedicated infrastructure (such as their own AWS accounts)** and therefore lack secure remote state storage (like S3 + DynamoDB), we will use **tf-backend** as a centralized provisioning and state management service.

tf-backend provisions and governs the following:

- **AWS S3 buckets** for versioned Terraform state storage
- **AWS DynamoDB tables** to prevent concurrent access
- **AWS IAM roles and policies** to control access
- **AWS OIDC providers** to validate SPIFFE JWTs from GitLab pipelines
- **IAM role trust policies** to control access based on JWT claims

Each workload contributes provisioning code to the `tf-backend-deployment` project, which creates state backends and access controls scoped to that concern.

Note: tf-backend **does not manage external platform credentials** (e.g., API keys). These remain the responsibility of the workload.

**SPIFFE/SPIRE** has been adopted to replace Vault namespaces with native AWS OIDC integration.

## Decision

All Terraform workloads that cannot store their state securely using native cloud capabilities (e.g., S3/DynamoDB in a dedicated AWS account) will use **tf-backend** as the remote backend for Terraform state.

- GitLab pipelines will authenticate to AWS through **SPIFFE JWTs** and OIDC providers provisioned by tf-backend.
- State access is mediated by tightly scoped IAM policies and OIDC trust conditions.
- Workload teams will define their required state access via merge requests to the `tf-backend-deployment` project.
- tf-backend now uses **SPIFFE/SPIRE** and AWS OIDC instead of Vault namespaces.

## Consequences

**Pros**

- Removes reliance on GitLab’s insecure state storage backend for sensitive workloads.
- Provides **fine-grained access control** to environment-specific Terraform state via IAM and OIDC trust policies.
  ⟶ Mitigates issues raised in [GitLab #254668](https://gitlab.com/gitlab-org/gitlab/-/issues/254668) and [Epic #15118](https://gitlab.com/groups/gitlab-org/-/epics/15118)
- Enables **centralized provisioning** through `tf-backend-deployment`, reducing duplication.
- Supports **auditability** through AWS CloudTrail.
- State is durable and recoverable via S3 versioning and DynamoDB locking.
- Provides cleaner integration via SPIFFE/SPIRE and OIDC.

**Cons**

- Adds operational overhead for onboarding workloads via `tf-backend-deployment`.
- Pipelines must be configured to use SPIFFE JWTs for AWS authentication.
- Requires teams to understand and manage IAM trust policies and OIDC conditions.
- Onboarding process involves coordination and MR review by the tf-backend maintainers.
