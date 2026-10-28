# Use the Merge Commit Merge Method

## Status

Accepted 2024-02-16

## Context

When merging a feature/bugfix branch into the main branch, using a merge commit helps maintain a clear history of short-lived branches.

When promoting changes through different environments, a fast-forward merge is more appropriate. This avoids unnecessary merge commits.

However, the reality of GitLab is somewhat different. As of January 2024, GitLab mandates a uniform merge method for all merge requests within a project. This means you can't selectively opt for fast-forward merging for some requests and merge commits for others.

As we know from Workflow Best Practices, we want to favor merge commits over fast-forwarding, because it maintains the history of short lived branches, which makes it easier to untangle commits when something inevitably goes horribly wrong.

### Options

- Fast-forward everything
- Merge commit everything

## Decision

All merge requests should use the merge commit method.

## Consequences

| Benefits                                                                                                                               | Costs                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| maintains the history of short lived branches, which makes it easier to untangle commits when something inevitably goes horribly wrong | more empty merge commits, which need to be synced occasionally in the [deployment workflow](../workflows/deployment-workflow/deployment-workflow.md) |
