# Terraform CI/CD Components and Images

## Status

Proposed 2023-12-11

## Context

We need to make setting up a Terraform CI/CD pipeline easy.

A user should be able to include a couple files or components, provide inputs to those components, layer on credentials, and be off to the races.

### Terraform CI/CD Image Capability Options

There are a couple ways we could go about the Terraform CI/CD image capability:

#### Roll our own image

| Benefits                                          | Costs               |
| ------------------------------------------------- | ------------------- |
| It will be easy to modify the image going forward | Additional overhead |

#### Use an existing image

| Benefits                                         | Costs            |
| ------------------------------------------------ | ---------------- |
| Difficult to modify with additional requirements | Reduced overhead |

### Terraform CI/CD Components Capability Options

There are a couple of ways we could go about the reusable Terraform CI/CD components capability:

#### GitLab project with semantic version tagging

| Benefits                                                          | Costs                                                                          |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Don't have to deal with complexity of the CI/CD component catalog | Increased complexity when consuming the CI/CD components at a specific version |

#### A GitLab CI/CD component project

Benefits:
Costs:

| Benefits                             | Costs                                                         |
| ------------------------------------ | ------------------------------------------------------------- |
| Clear versioning of CI/CD components | Gotta publish the component to GitLab CI/CD component catalog |

## Decision

We'll have developers use the images they need, and require them to install the cli tools they require.

We'll create a CI/CD component project for publishing reusable Terraform CI/CD components. [CI/CD components](https://docs.gitlab.com/ee/ci/components) for running tflint and terraform validate, plan, apply, and destroy will be published from it's own GitLab ci/cd component project. Component configuration will take some inspiration from the existing GitLab templates for Terraform CI/CD ([Terraform.gitlab-ci.yml](https://gitlab.com/gitlab-org/gitlab/-/blob/master/lib/gitlab/ci/templates/Terraform.gitlab-ci.yml) and [Terraform/Base.latest.gitlab-ci.yml](https://gitlab.com/gitlab-org/gitlab/-/blob/master/lib/gitlab/ci/templates/Terraform/Base.latest.gitlab-ci.yml)). Releases will be used to tag code and version the published components. Published components can be used by CI/CD pipelines in infrastructure projects across GitLab.

## Consequences

| Benefits                                                                     | Costs                                                        |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------ |
| We can use the same components to build consistent Terraform CI/CD pipelines | We have to manage some projects to publish shared components |
