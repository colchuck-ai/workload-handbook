# Use terraform-null-label Context in Modules

## Status

Accepted 2023-12-28

## Context

We've decided to use the terraform-null-label module to implement a resource naming convention. One natural extension of this is to add a [context.tf](https://github.com/cloudposse/terraform-null-label/blob/main/exports/context.tf) file to each module that we create, allowing us to easily pass contexts to modules.

### Options

- add a [context.tf](https://github.com/cloudposse/terraform-null-label/blob/main/exports/context.tf) file to each module that we create

## Decision

We'll add a [context.tf](https://github.com/cloudposse/terraform-null-label/blob/main/exports/context.tf) file to each module that we create.

## Consequences

### Benefits

- It's so much easier to manage a naming and tagging standard

### Costs

- Adding a context.tf file to each new module isn't very dry
