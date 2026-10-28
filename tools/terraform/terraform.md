# Terraform

We use terraform extensively when creating [terraform deployment projects](../../workflows/deployment-workflow/guides/create-a-terraform-deployment-project.md) and [terraform module release projects](../../workflows/release-workflow/guides/create-a-terraform-module-release-project.md).

It's an incredibly helpful tool, and it's how we implement the best practice of embracing infrastructure as code.

## Introduction

Hashicorp has done an amazing job of documenting Terraform. Below is a curated list of essential readings.

- [Introduction](https://developer.hashicorp.com/terraform/intro)
- [Configuration Language](https://developer.hashicorp.com/terraform/language)
  - [Files and Directories](https://developer.hashicorp.com/terraform/language/files)
  - [Syntax](https://developer.hashicorp.com/terraform/language/syntax)
  - [Resources](https://developer.hashicorp.com/terraform/language/resources)
  - [Data Sources](https://developer.hashicorp.com/terraform/language/data-sources)
  - [Providers](https://developer.hashicorp.com/terraform/language/providers)
  - [Variables and Outputs](https://developer.hashicorp.com/terraform/language/values)
  - [Modules](https://developer.hashicorp.com/terraform/language/modules)
  - [State](https://developer.hashicorp.com/terraform/language/state)
    - [Remote State](https://developer.hashicorp.com/terraform/language/state/remote)
    - [Locking](https://developer.hashicorp.com/terraform/language/state/locking)
- [Terraform CLI](https://developer.hashicorp.com/terraform/cli)
- [Tutorials](https://developer.hashicorp.com/terraform/tutorials)
  - Fundamentals
    - [CLI](https://developer.hashicorp.com/terraform/tutorials/cli)
    - [Configuration Language](https://developer.hashicorp.com/terraform/tutorials/configuration-language)
    - [Modules](https://developer.hashicorp.com/terraform/tutorials/modules)
      - [Modules Overview](https://developer.hashicorp.com/terraform/tutorials/modules/module)
      - [Use registry modules in configuration](https://developer.hashicorp.com/terraform/tutorials/modules/module-use)
      - [Build and use a local module](https://developer.hashicorp.com/terraform/tutorials/modules/module-create)
      - [Customize modules with object attributes](https://developer.hashicorp.com/terraform/tutorials/modules/module-object-attributes)
      - [Refactor monolithic Terraform configuration](https://developer.hashicorp.com/terraform/tutorials/modules/organize-configuration)
      - [Module creation - recommended pattern](https://developer.hashicorp.com/terraform/tutorials/modules/pattern-module-creation)
      - [Use configuration to move resources](https://developer.hashicorp.com/terraform/tutorials/modules/move-config)
    - [State](https://developer.hashicorp.com/terraform/tutorials/state)
      - [Import terraform configuration](https://developer.hashicorp.com/terraform/tutorials/state/state-import)
      - [Manage resources in Terraform state](https://developer.hashicorp.com/terraform/tutorials/state/state-cli)
      - [Troubleshoot Terraform](https://developer.hashicorp.com/terraform/tutorials/state/troubleshooting-workflow)
      - [Manage resource drift](https://developer.hashicorp.com/terraform/tutorials/state/resource-drift)
      - [Manage resource lifecycle](https://developer.hashicorp.com/terraform/tutorials/state/resource-lifecycle)
      - [Use configuration to move resources](https://developer.hashicorp.com/terraform/tutorials/state/move-config)

## Installation

See [terraform installation](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli).

## Best Practices

### General Style and Structure

We've adopted the following best practices for general style and structure:

- [Follow a standard module structure](https://docs.cloud.google.com/docs/terraform/best-practices/general-style-structure#module-structure). See [standard module structure](#standard-module-structure) for an example.
- [Adopting a configuration object naming convention](https://docs.cloud.google.com/docs/terraform/best-practices/general-style-structure#naming-convention)
- [Use the terraform-null-label module to consistently name resources](https://github.com/cloudposse/terraform-null-label/tree/main). See decision records for [adopting the naming convention](../../decision-records/resource-naming-convention.md), and [including the terraform null label context in module](../../decision-records/use-terraform-null-label-context-in-modules.md)
- [Use variables carefully](https://docs.cloud.google.com/docs/terraform/best-practices/general-style-structure#variables)
- [Expose outputs](https://docs.cloud.google.com/docs/terraform/best-practices/general-style-structure#outputs)
- [Use data sources](https://docs.cloud.google.com/docs/terraform/best-practices/general-style-structure#data-sources)
- [Limit the use of custom scripts](https://docs.cloud.google.com/docs/terraform/best-practices/general-style-structure#custom-scripts)
- [Include helper scripts in a separate directory](https://docs.cloud.google.com/docs/terraform/best-practices/general-style-structure#helper-scripts)
- [Put static files in a separate directory](https://docs.cloud.google.com/docs/terraform/best-practices/general-style-structure#static-files)
- [Protect stateful resources](https://docs.cloud.google.com/docs/terraform/best-practices/general-style-structure#stateful-resources)
- [Use built-in formatting](https://docs.cloud.google.com/docs/terraform/best-practices/general-style-structure#built-in-formatting)
- [Use count for conditional values](https://docs.cloud.google.com/docs/terraform/best-practices/general-style-structure#count)
- [Use for_each for iterated resources](https://docs.cloud.google.com/docs/terraform/best-practices/general-style-structure#for_each)
- [Publish modules to a registry](https://docs.cloud.google.com/docs/terraform/best-practices/general-style-structure#publish)

### Reusable Modules

We've adopted the following best practices for reusable modules:

- [Release tagged versions](https://docs.cloud.google.com/docs/terraform/best-practices/reusable-modules#tagged-versions)
- [Don't configure providers or backends](https://docs.cloud.google.com/docs/terraform/best-practices/reusable-modules#providers-backends)
- [Expose outputs for all resources](https://docs.cloud.google.com/docs/terraform/best-practices/reusable-modules#expose-outputs)
- [Use inline submodules for complex logic](https://docs.cloud.google.com/docs/terraform/best-practices/reusable-modules#submodules)
- Use a consistent module naming convention. We use `tf-<provider-name>-<module-name>`.

### Root Modules

We've adopted the following best practices for root modules:

- [Minimize the number of resources in each root module](https://docs.cloud.google.com/docs/terraform/best-practices/root-modules#minimize-resources)
- Use separate repositories for each workload or workload provisioning concern, whichever is more granular.
- [Split applications into environment-specific subdirectories](https://docs.cloud.google.com/docs/terraform/best-practices/root-modules#subdirectories)
  - Additionally, split environment-specific subdirectories into provider-specific sub-directories, and then either global or provider specific regional subdirectories. See [decision record](../../decision-records/terraform-root-module-scope.md) for an explaination of why.
  - See [standard deployment structure](#standard-deployment-structure) for an example.
- [Use environment directories](https://docs.cloud.google.com/docs/terraform/best-practices/root-modules#environment-directories)
- [Expose outputs through remote state](https://docs.cloud.google.com/docs/terraform/best-practices/root-modules#outputs-remote-state)
- [Pin to minor provider versions](https://docs.cloud.google.com/docs/terraform/best-practices/root-modules#minor-provider-versions)
- [Store variables in a tfvars file](https://docs.cloud.google.com/docs/terraform/best-practices/root-modules#tfvars)
- The structure for organizing workload environment state files should reflect the standard deployment structure. For an example, see [remote state structure](#remote-state-structure).
- When using [optional stack partitioning](#optional-stack-partitioning), consider leveraging future CI/CD optimizations that will allow stack jobs to run only when relevant directories change, improving pipeline efficiency for large centralized projects.

### Dependency Management

We've adopted the following best practices for dependency management:

- [Favor implicit dependencies over explicit dependencies](https://docs.cloud.google.com/docs/terraform/best-practices/dependency-management#favor-implicit-dependencies)
- [Reference output attributes from dependent resources](https://docs.cloud.google.com/docs/terraform/best-practices/dependency-management#reference-output-attributes)

### Cross-configuration communication

We've adopted the following best practice for cross-configuration communication:

- [Share information between terraform configurations using remote state to reference other root modules](https://docs.cloud.google.com/docs/terraform/best-practices/cross-config-communication)

### Operations

We've adopted the following best practices for terraform operations:

- [Always plan first](https://docs.cloud.google.com/docs/terraform/best-practices/operations#plan)
- [Implement an automated pipeline](https://docs.cloud.google.com/docs/terraform/best-practices/operations#pipeline)
- [Use service account credentials for continuous integration](https://docs.cloud.google.com/docs/terraform/best-practices/operations#credentials)
- [Avoid importing existing resources](https://docs.cloud.google.com/docs/terraform/best-practices/operations#importing)
- [Don't modify Terraform state manually](https://docs.cloud.google.com/docs/terraform/best-practices/operations#manual-state-modification)

### Security

We've adopted the following best practices for security:

- [Use remote state](https://docs.cloud.google.com/docs/terraform/best-practices/security#use-remote-state)
- The scope of a remote state resource is a workload environment. See [decision record](../../decision-records/terraform-remote-backend-scope.md) for an explaination of why.
- Store remote state in the relevant [workload environment](../../workloads/workload-concepts.md#workload-environment).
- [Encrypt state](https://docs.cloud.google.com/docs/terraform/best-practices/security#encrypt-state)
- [Don't store secrets in state](https://docs.cloud.google.com/docs/terraform/best-practices/security#storing-secrets)
- [Mark sensitive outputs](https://docs.cloud.google.com/docs/terraform/best-practices/security#sensitive-outputs)
- [Ensure separation of duties](https://docs.cloud.google.com/docs/terraform/best-practices/security#separation-of-duties)
  - Create principles that facilitate both read-only and read-write access to state. See the reusable module [tf-aws-tfstate-manager-iam](https://gitlab.example.com/engineering/dev-tools/packages/internal/tf-aws-tfstate-manager-iam) for an example.

## Standard Structures

### Standard Module Structure

At a high level, when you create a module, you ought to follow the following structure.

This structure explicitly doesn't include things like pipeline or development configuration files.

```txt
- modules/
    - <provider-x>-<module-x>/
        - modules
          - <provider-x>-<inline-submodule-x>/
            - ...
        - context.tf    # terraform-null-label module context
        - main.tf       # defines resources
        - outputs.tf
        - README.md
        - variables.tf
        - versions.tf   # defines required versions of terraform and providers
- README.md
```

For a more detailed guide on how to implement, see [create a terraform module release project](../../workflows/release-workflow/guides/create-a-terraform-module-release-project.md)

### Standard Deployment Structure

At a high level, when you want to deploy a workload, or a workload concern, you ought to follow the following structure:

```txt
- environments/
    - <environment>/
        - <provider>/
            - global/
                - backend.tf                    # configuration for remote backend
                - context.tf                    # terraform-null-label module context
                - main.tf                       # includes at least <provider>-global module
                - outputs.tf
                - providers.tf                  # configuration for providers
                - README.md
                - terraform.tfvars              # contains <environment> <provider> global root module specific variables
                - variables.tf
                - versions.tf                   # defines required versions of terraform and providers
            - <provider-region>/
                - main.tf                       # includes at least <provider>-<provider-region> and <provider>-regional modules
                - ...
                - terraform.tfvars              # contains <environment> <provider> <provider-region> root module specific variables
                - ...
        - multi/
            - global/
                - main.tf                       # includes at least multi-global module
                - ...
                - terraform.tfvars              # contains <environment> multi global root module specific variables
                - ...
- modules/
    - <provider>-global/                        # defines non-regional resources
        - modules
            - <provider>-<inline-submodule>/
                - ...
        - context.tf
        - main.tf
        - outputs.tf
        - README.md
        - variables.tf
        - versions.tf
    - <provider>-regional/                      # defines regional resources that occur in every region
        - ...
    - <provider>-<provider-region>/             # defines regional resources in a particular provider region
        - ...
    - multi-global/                             # defines resources across multiple providers
        - ...
- README.md
```

This structure explicitly doesn't include things like pipeline or development configuration files.

In this structure, terraform modules in the `modules` directory are referenced by terraform root modules found underneath the `environments` directory.

For example, both the `environments/{prod,test}/<provider>/global` root module directories will include references to the same `modules/<provider>-global` module, but each will provide different arguments (defined by each root modules respective `terraform.tfvars` file) to the module's variables (defined by the module's `variables.tf` file). While alternative setups might call for the duplication and manual copying of configuration from environment to environment, this structure of environment root modules referencing the same module reduces duplication of code and makes promotion of changes through different environments more consistent.

For a more detailed guide on how to implement, see [create a terraform deployment project](../../workflows/deployment-workflow/guides/create-a-terraform-deployment-project.md).

#### Optional Stack Partitioning

For additional organizational separation of independent concerns within the same environment/provider/region, you can optionally add a stack layer. See [decision record](../../decision-records/use-terraform-stacks-for-independent-concern-partitioning.md) for rationale.

```txt
- environments/
    - <environment>/
        - <provider>/
            - <region>/
                - <stack>/                      # Optional: partition for independent concerns (departments, workloads)
                    - backend.tf                # configuration for remote backend
                    - context.tf                # terraform-null-label module context
                    - main.tf                   # includes stack-specific modules
                    - outputs.tf
                    - providers.tf              # configuration for providers
                    - README.md
                    - terraform.tfvars          # contains stack-specific variables
                    - variables.tf
                    - versions.tf               # defines required versions of terraform and providers
```

**When to Use Stacks:**

- Separate independent concerns with no dependencies between them
- Enable domain experts to own and review their specific infrastructure via CODEOWNERS
- Improve performance by reducing terraform plan/apply times
- Reduce operational overhead in centralized provisioning projects

**When NOT to Use Stacks:**

- Resources have dependencies between them
- Concerns are tightly coupled
- Single domain owns all infrastructure in that scope

**Benefits:**

- Smaller terraform state files reduce locking contention
- Faster terraform operations due to fewer resources per root module
- Domain experts can review changes to their own stacks
- Reduced blast radius - changes to one stack cannot affect others
- Independent lifecycle management for each stack

#### Tradeoffs of Using Provider-Specific Root Modules

Using provider-specific root modules is a more traditional approach that helps enforce separation between different providers. While it offers benefits in terms of isolation and control, it also introduces tradeoffs.

##### Advantages

- **Lower Blast Radius of Changes** – Changes made to one provider's infrastructure do not directly impact resources in another provider, reducing the risk of widespread issues.
- **Easier Refactoring and Migration** – Since provider-specific resources are already separated, migrating workloads or refactoring infrastructure to a single provider is more manageable.
- **Simplified State Management** – Each provider maintains its own Terraform state, making it easier to manage, troubleshoot, and reduce conflicts.

##### Disadvantages

- **More Complex Cross-Provider Dependencies** – Passing data between providers requires explicitly defining outputs and feeding them into other provider modules, increasing configuration complexity.
- **Potential for Duplication** – Some configurations may need to be duplicated across providers, leading to additional maintenance overhead.
- **Increased Operational Overhead** – Managing multiple root modules means handling separate deployment pipelines, state files, and module structures, which can increase complexity in large-scale environments.

#### Tradeoffs of Using the `multi` Root Module

The `multi` provider structure is useful when infrastructure spans multiple providers or requires cross-provider dependencies. By centralizing these definitions, it simplifies resource management, but it also comes with tradeoffs.

##### Advantages

- **Easier Cross-Provider Dependencies** – When resources depend on each other across providers, referencing them is more straightforward within a `multi` root module. This avoids the need to pass values through outputs and inputs between separate provider-specific root modules.

##### Disadvantages

- **Higher Blast Radius of Changes** – Since all resources are defined within the same root module, any errors or unintended changes have a broader impact compared to provider-specific modules.
- **Difficult to Separate Later** – Since multiple providers and resources are defined in a single root module, splitting them later (e.g., to move a workload to a single provider or a different architecture) can be complex and time-consuming.
- **State Management Complexity** – A `multi` root module results in a larger Terraform state file that includes resources from multiple providers. Splitting this state later or migrating resources to provider-specific modules can be error-prone.

#### Stack-Based Deployment Patterns

For large centralized deployment projects that manage infrastructure across multiple independent domains or workloads, you can extend the standard deployment structure with stack-based patterns. This approach partitions independent concerns within the same environment/provider/region to improve scalability and operational efficiency.

##### When to Use Stack-Based Deployments

Stack-based deployments are beneficial when you have:

- **Multiple independent workloads** managed by different teams within the same deployment project
- **Large terraform state files** that cause performance issues and locking contention
- **Cross-domain infrastructure** where different teams need ownership of their specific resources
- **Centralized provisioning requirements** with distributed domain expertise

##### Stack Organization Principles

**Good Stack Boundaries:**

- Independent workloads or organizational domains (e.g., `monitoring`, `identity`, `data-engineering`)
- Resources with no dependencies between stacks
- Long-lived organizational boundaries rather than team-based divisions

**Avoid These Stack Patterns:**

- Infrastructure type decomposition (e.g., `database`, `networking`, `compute`)
- Team-based naming that may change over time
- Tightly coupled resources that share dependencies

##### Implementation Approach

Stack-based deployments use template-driven CI/CD pipelines that generate complete workflows for each stack:

```txt
environments/
  test/
    multi/
      global/
        monitoring/              # Observability workload stack
          main.tf
          backend.tf             # Unique state key: multi/global/monitoring
          terraform.tfvars
        identity/                # Identity management workload stack
          main.tf
          backend.tf             # Unique state key: multi/global/identity
          terraform.tfvars
        data-engineering/        # Data processing workload stack
          main.tf
          backend.tf             # Unique state key: multi/global/data-engineering
          terraform.tfvars
modules/
  multi-global-monitoring/       # Stack-specific modules
  multi-global-identity/
  multi-global-data-engineering/
```

**Key Implementation Requirements:**

- Each stack must have a unique backend state key to ensure isolation
- Stack-specific modules should contain the logic for that workload domain
- CI/CD pipelines should generate independent workflows per stack
- CODEOWNERS should assign domain experts to review their specific stacks

##### Benefits of Stack-Based Deployments

- **Reduced State Contention** – Each stack maintains its own independent state file
- **Improved Performance** – Smaller terraform operations due to fewer resources per stack
- **Domain Ownership** – Teams can own and review their specific infrastructure
- **Reduced Blast Radius** – Changes to one stack cannot affect other stacks
- **Parallel Execution** – Independent stacks can be deployed simultaneously
- **Selective Deployment** – Future tooling can deploy only changed stacks

##### Migration Strategy

When migrating from monolithic to stack-based deployments:

1. **Identify Natural Boundaries** – Analyze existing resources for workload or domain separation points
2. **Start with New Stacks** – Implement new functionality using the stack pattern
3. **Gradual Migration** – Move existing resources to appropriate stacks over time
4. **Legacy Container** – Use a temporary "core" or "legacy" stack for complex migrations

For detailed implementation guidance, see the [gitlab-cicd-terraform stack-based pipeline documentation](https://gitlab.example.com/engineering/dev-tools/internal/gitlab-cicd-terraform/-/blob/master/docs/terraform-stack-based-deployment-pipeline-example.md).

### Remote State Structure

We've decided that the scope of a remote state backend is a workload environment. This means that all state files related to a workload environment live in a single remote state backend. See the [decision record](../../decision-records/terraform-remote-backend-scope.md) for an explaination of why.

Within the remote state backend itself, the workload environment files themselves should be organized in a consistent manner that mimics the [standard deployment structure](#standard-deployment-structure).

For example, let's say we have a workload, `workload-x`, with two environments, `prod` and `test`, across three providers with various regionality components. In this case, state would be stored in two remote backends, one for the root module state files of each workload environment. For the sake of the example, let's say that we store state in Amazon S3.

The `prod` environment state files would be stored in an S3 bucket named `acme-gbl-prod-workload-x-tfstate` with the following hierarchy:

```txt
- acme-gbl-prod-workload-x-tfstate
  - provider-1
    - global
    - regional
    - region-1
    - region-2
  - provider-2
    - global
  - provider-3
    - global
```

The `test` environment state files would be stored in an S3 bucket named `acme-gbl-test-workload-x-tfstate` with the following hierarchy:

```txt
- acme-gbl-test-workload-x-tfstate
  - provider-1
    - global
    - regional
    - region-1
    - region-2
  - provider-2
    - global
  - provider-3
    - global
```

#### Remote State Structure with Stacks

When using [optional stack partitioning](#optional-stack-partitioning), each stack creates additional hierarchy within the remote state backend:

```txt
- acme-gbl-prod-workload-x-tfstate
  - provider-1
    - global
      - security          # stack
      - data-engineering  # stack
    - region-1
      - security          # stack
      - data-engineering  # stack
  - multi
    - global
      - security          # stack
      - shared-services   # stack
```

Each stack maintains its own independent state file within the shared remote backend, enabling isolated terraform operations while maintaining the workload environment scope for backend organization.

### A Decision Framework for Where to Define Variables

1. Does the variable need to change per environment? If so, put it in `variables.tf`.
2. Is the variable an input for multiple modules? If so, put it in `variables.tf`.
3. Is the variable only used inside a single module? If so, define it inside that module.
4. Can the value be computed instead of provided? If so, use `locals.tf` instead.
