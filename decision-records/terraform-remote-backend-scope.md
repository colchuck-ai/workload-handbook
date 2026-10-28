# Terraform Remote Backend Scope

## Status

Proposed 2023-12-21

## Context

In general, a Terraform remote state backend requires resources that enable:

- state file storage
- management of concurrent access to state files

We typically use the s3 backend, which consists of an s3 bucket to store state files, and a dynamodb table to manage concurrent access.

We need to decide the scope of state files contained within an individual remote backend.

We'd like to:

- Maximize isolation of environments
- Maximize team agency for creating remote backend resources
- Minimize the operational overhead for teams managing remote backend resources

Keep in mind that the scope of a root module for a workload is defined by a unique set of the following attributes:

- Environment
- Provider
- Region

We have to encode those attributes in some way, either in a file path or in the bucket name itself.

Note: We can't encode the region data by hosting the state file in a representative region because each cloud provider uses their own independent region scheme which may not have a 1-1 mapping to another provider's region scheme. For example, you can't guarantee a 1-1 mapping of SAAS tool's region (say the example-corp provider's glendovia-west-2) to a cloud provider region (AWS doesn't have a region called glendovia-west-2).

### Options

- Example Bucket:
- Bucket(s) Location:
- Maximize isolation of environments:
- Maximize team agency for creating remote backend resources:
- Minimize the operational overhead for teams managing remote backend resources:

### Remote backend per workload root module

- Example Bucket: `acme-gbl-<environment>-<workload-name>-<provider>-<region>-tfstate`
- Bucket(s) Location:
  - Workload environment AWS account.
  - For example, buckets in the prod account for prod root modules and buckets in the test account for test root modules.
- Maximize isolation of environments: `excellent`
  - As small as it gets. Everything is isolated. Like ... chained to the wall isolated.
- Maximize team agency for creating remote backend resources: `good`
  - Teams are able to self service without help from other teams
- Minimize the operational overhead for teams managing remote backend resources: `terrible`
  - Requires either systematic vending or manual bootstrapping of remote state resources and IAM for every environment, provider, and region. Would make it extremely cumbersome to simply deploy to a new region.
  - Remote backend resources would have to be cleaned up regularly to respond to regions and providers coming in an out of scope for the workload.
  - **This would be absolutely insane to manage. We should not do this.**

### Remote backend per workload environment and provider pair

- Example Bucket: `acme-gbl-<environment>-<workload-name>-<provider>-tfstate`
- Bucket(s) Location:
  - Workload environment AWS account.
  - For example, buckets in the prod account for prod root modules and buckets in the test account for test root modules.
- Maximize isolation of environments: `good`
  - Prod is separated from non prod.
  - Providers are isolated from each other.
- Maximize team agency for creating remote backend resources: `good`
  - Teams are able to self service without help from other teams
- Minimize the operational overhead for teams managing remote backend resources: `bad`
  - You only have to bootstrap once per environment and provider pair. That's not as bad as the Remote backend per root module option
  - Requires either systematic vending or manual bootstrapping of remote state resources and IAM for every new environment and provider. Would make it extremely cumbersome to simply deploy to a new provider.
  - Bootstrapping would have to occur within each provider root module. For example, It would be a little awkward to manage an aws provider to bootstrap a remote backend within a vault root module.
  - Remote backend resources would have to be cleaned up regularly to respond to providers coming in an out of scope for the workload.

### Remote backend per workload environment

- Example Bucket: `acme-gbl-<environment>-<workload-name>-tfstate`
- Bucket(s) Location:
  - Workload environment AWS account.
  - For example, a bucket in the prod account for prod root modules and a bucket in the test account for test root modules.
- Maximize isolation of environments: `good`
  - Production and Non-Production environments are isolated.
- Maximize team agency for creating remote backend resources: `good`
  - Teams are able to self service without help from other teams
- Minimize the operational overhead for teams managing remote backend resources: `good`
  - You only have to bootstrap once per environment.
  - One provider can leverage the bootstrapped remote backend of another provider. e.g. a prod vault module could piggyback on the bootstrapped remote backend created in the prod aws global root module
  - Bootstrapping events would happen early on in the workload's lifecycle, and would rarely see any change.
  - Bootstrapping would occur when a new environment is added. For example, if we wanted to add a staging environment, we'd have to set up a remote backend for that.

### Remote backend per workload

- Example Bucket: `acme-gbl-<workload-name>-tfstate`
- Bucket(s) Location:
  - A centralized dedicated AWS account for storing and managing access to workload state.
- Maximize isolation of environments: `bad`
  - High blast radius, because all state for prod and non-prod is stored together.
  - If state for all workloads is in one account, it creates some pretty valuable crown jewels.
- Maximize team agency for creating remote backend resources: `okay`
  - Teams seed agency and responsibility of their workload.
    Centralized processes for vending and managing state will slow down the time it takes to stand up and tear down workloads.
  - State resources are logically far from the workload.
- Minimize the operational overhead for teams managing remote backend resources: `excellent`
  - No bootstrapping necessary.

## Decision

We will create a remote backend per workload environment.

For example, if there is a multi-region workload named `my-workload` that requires resources in Vault and AWS providers and production and testing environments, we would create two buckets:

| Bucket Name                         | Purpose                                      | Bucket Location                 |
| ----------------------------------- | -------------------------------------------- | ------------------------------- |
| `acme-gbl-prod-my-workload-tfstate` | Store state files for production environment | AWS Account: `prod-my-workload` |
| `acme-gbl-test-my-workload-tfstate` | Store state files for test environment       | AWS Account: `test-my-workload` |

## Consequences

### Benefits

- Teams limit bootstrapping activities to when new environments are introduced, which is primarily in early phases of workload development.
- Teams maximize agency of their responsibilities. They don't have to depend on external vending of remote backend resources to own and operate workloads.
- Blast radius of incidents to state buckets is isolated to environments. i.e. prod is isolated from test.

### Costs

- Requires owners of workloads to be knowlegable on boostrapping workload environments

## Notes

Authentication to remote backends now uses SPIFFE JWT tokens instead of Vault-mediated access. See [Workload CI/CD Access to CSP Roles Uses SPIFFE JWT](workload-cicd-access-to-csp-roles-uses-spiffe-jwt.md) for details on the current authentication approach.
