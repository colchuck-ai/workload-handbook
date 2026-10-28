# Gitlab-Jira Integration is Managed at Domain Group Level Through Click-Ops

## Context

Our GitLab organization is structured hierarchically as follows:

- **Domain Group** (where the Jira integration needs to be configured)
  - Workload Group
    - Scope Group
      - Projects

We need to integrate GitLab with Jira to enable issue tracking and cross-linking between commits/MRs and Jira issues. However, the **GitLab Terraform provider only supports configuring Jira integrations at the project level**, not at the group level. Attempting to manage the integration across multiple projects results in high Terraform overhead, especially when dealing with environment-specific configurations like different Jira API credentials (e.g., test vs. prod passwords), which would require ignoring changes or handling sensitive diffs carefully.

## Decision

We will **manually configure a single Jira integration at the Domain Group level** using GitLab’s UI ("click ops") rather than managing per-project configurations through Terraform.

## Consequences

Pros:

- **Simplified Setup**: A single group-level integration reduces the need for duplicative project-level configurations.
- **Lower Terraform Overhead**: Avoids complex Terraform workarounds (e.g. `lifecycle.ignore_changes`, secrets diffs) and reduces drift risk.
- **Consistent Behavior**: Projects under the Domain Group will automatically inherit the integration, leading to a consistent developer experience.

Cons:

- **Manual Step**: The group-level integration is not managed by Terraform, so it requires manual setup and documentation for reproducibility.
- **Limited Flexibility**: All projects under the Domain Group will share the same integration configuration, which may not be suitable for projects that need to connect to different Jira instances or use different credentials.

## Change Log

| Date       | Author     | Description                      |
| ---------- | ---------- | -------------------------------- |
| 2025-04-17 | maintainer | Initial decision record created. |
