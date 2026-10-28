# Use Semantic Release to Automate Tagging and Release of Code

## Status

| Status   | Date       | Notes                            |
| -------- | ---------- | -------------------------------- |
| Accepted | 2024-03-12 | Deciding to use semantic release |

## Context

### Options

#### Manually Create GitLab Releases

See [Create a Release in the Releases Page](https://docs.gitlab.com/user/project/releases/).

| Benefits                                     | Costs                                                       |
| -------------------------------------------- | ----------------------------------------------------------- |
| CI doesn't mutate the repository             | High likelihood for human error when manually creating tags |
| Releases can happen asynchronous from merges | Requires manual action                                      |

#### Use Semantic Release to Automate Releases from CI

See [Semantic Release](https://semantic-release.gitbook.io/semantic-release/) and [GitLab CI Configuration Recipes](https://semantic-release.gitbook.io/semantic-release/recipes/ci-configurations/gitlab-ci).

| Benefits                                             | Costs                                                                       |
| ---------------------------------------------------- | --------------------------------------------------------------------------- |
| Reduced risk of incorrect tagging of code            | CI mutates the repository                                                   |
| Creation of a release is automated and non-emotional | Requires a set of long lived credentials                                    |
| Release happens automatically when code is merged    | Requires additional tooling for enforcement of conventional commit messages |

## Decision

We'll use semantic release to automate the tagging and release of code.

### Consequences

| Benefits                                                                   | Costs                                                                                                         |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Tagging and the creation of GitLab releases is automated and non-emotional | we'll have to use conventional commit messages, and introduce guardrails to enforce the commit message format |
|                                                                            | we'll have to create long-lived credentials for semantic release to modify the codebase                       |
