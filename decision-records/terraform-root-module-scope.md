# Terraform Root Module Scope

## Status

Proposed 2023-12-21

## Context

We need to determine the set of attributes that collectively define the scope of resources configured within in a single root module.

We'd like to:

- Minimize cross root module references. It's really easy to reference resources within the same root modules. It's harder to reference resources provisioned from other root modules. This goal aims to improve the overall developer experience.
- Maximize isolation of environments. Provisioning incidents in a non-production environment shouldn't impact the provisioning of production environments.
- Maximize isolation of workload instances. Failure to provision a workload instance shouldn't impact the provisioning of a different workload instance.

### Options

| Description                                                                                       | Minimizes cross root module references | Maximizes isoloation of environments | Maximizes isolation of workload instances |
| ------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------ | ----------------------------------------- |
| A root module contains all workload resources                                                     | `good`                                 | `bad`                                | `bad`                                     |
| A root module contains all workload resources for a given environment                             | `good`                                 | `good`                               | `bad`                                     |
| A root module contains all workload resources for a given environment and provider pair           | `okay`                                 | `good`                               | `bad`                                     |
| A root module contains all workload resources for a given environment, provider, and region tuple | `okay`                                 | `good`                               | `good`                                    |

## Decision

A root module contains all workload resources for a given environment, provider, and region tuple.

| Environment | Provider | Region    | Description of resources                                                                                       |
| ----------- | -------- | --------- | -------------------------------------------------------------------------------------------------------------- |
| prod        | aws      | global    | Contains production aws resources that are either not specific to a region, or need to be globally referenced. |
| prod        | aws      | us-east-1 | Contains production aws resources that are specific to the us-east-1 region                                    |
| prod        | vault    | global    | Contains production vault resources                                                                            |

## Consequences

### Benefits

- The isolation of environments and environments is maximized, meaning that:
  - provisioning incidents in non-production environments don't impact the provisioning of production environments
  - workload instances running in different regions operate largely independently
- Less resources per state file, meaning that the state refresh phase is shorter, resulting in a better developer experience.

### Costs

- Root modules may need to include more references to resources provisioned from other root modules
