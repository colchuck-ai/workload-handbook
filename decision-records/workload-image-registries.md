# Workload Image Registries

## Status

Accepted 2023-12-11

## Context

We need to figure out where we store our images.

### Options

#### Nexus

| Benefits                               | Costs              |
| -------------------------------------- | ------------------ |
| Nothing to set up, ease of integration | Added dependency   |
|                                        | Lower availability |

#### CSP Container Registry Solutions

| Benefits                           | Costs                                                                                                                                                                 |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ease of integration with workloads | Some initial set up                                                                                                                                                   |
| Better access controls             | Difficulty sharing image with other workloads, generally not a good solution for things like GitLab CI/CD images, which might be better served being hosted on Nexus. |
| Higher availability                |                                                                                                                                                                       |

## Decision

We'll publish workload application images to CSP container registry repositories (i.e. AWS ECR).

## Consequences

| Benefits                           | Costs                                         |
| ---------------------------------- | --------------------------------------------- |
| Ease of integration with workloads | Some initial set up                           |
| Better access controls             | Difficulty sharing image with other workloads |
| Higher availability                |                                               |
