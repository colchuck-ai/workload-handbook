# Workload Handbook

![magic-book](./attachments/magic-book.png)

This handbook is a comprehensive resource designed to guide the management and deployment of workloads across various environments and platforms. It provides detailed insights into ensuring security, organization, and proper dependency management for efficient operations. It defines essential concepts such as platforms, workloads, workload instances, and environments, with a clear distinction between production and non-production setups.

## Guide:

1. [Workloads](./workloads/workloads.md) - Guidance on creating, managing, and organizing workloads. Defines workloads as collections of components and data in specific environments, highlights the importance of multiple instances for development and testing, and outlines security boundaries across platforms like AWS, Azure, and GCP. Covers best practices for production and non-production environments.
2. [Workflows](./workflows/workflows.md) - Two main workflows: Release and Deployment.
   1. [Release Workflow](./workflows/release-workflow/release-workflow.md) - Manages software releases using semantic versioning, producing artifacts like Docker images and npm packages. Utilizes GitLab and semantic release for automation, with key focus on protecting branches and tags.
   2. [Deployment Workflow](./workflows/deployment-workflow/deployment-workflow.md) - Deploys resources based on released artifacts, distinguishing between protected and unprotected branches. Provides patterns for centralized, partitioned, and distributed deployments, emphasizing branch protection and CI/CD best practices.
3. [Tools](./tools/tools.md) - Reference for setting up and using development tools within the handbook's context, ensuring consistent practices to improve development and deployment efficiency.

## Contributing

- [Workload Handbook Development Setup](./appendicies/development-setup.md)
