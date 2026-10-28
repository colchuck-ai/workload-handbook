# Create a Terraform Deployment Project

1. Create a workload deployment project according to the [GitLab workload organization structure](../../../workloads/workload-organization/gitlab.md), following one of the [deployment patterns](../patterns/basic-deployment.md).
2. Apply [deployment workflow project settings](../deployment-workflow.md#project-settings) and follow all [deployment workflow best practices](../deployment-workflow.md#best-practices).
3. Add additional terraform specific development tools:
   - [Check terraform files are formatted](../../../tools/terraform/guides/check-terraform-files-are-formatted.md)
   - [Format terraform files](../../../tools/terraform/guides/format-terraform-files.md)
   - [Ignore terraform files from git](../../../tools/terraform/guides/ignore-terraform-files-from-git.md)
   - [Lint terraform configuration for errors](../../../tools/tflint/guides/lint-terraform-configuration-for-errors.md)
4. Scaffold the code using the [standard deployment structure](../../../tools/terraform/terraform.md#standard-deployment-structure).
5. [Create workload environments with terraform](../../../workloads/guides/create-a-workload-environment-with-terraform.md) as needed.
6. Use the following CI/CD components to compose your deployment workflow CI/CD pipeline:
   - [gitlab-cicd-terraform](https://gitlab.example.com/explore/catalog/engineering/dev-tools/gitlab-cicd-components/gitlab-cicd-terraform) - supports optional `stack` parameter for [independent concern partitioning](../../../tools/terraform/terraform.md#optional-stack-partitioning)
   - [gitlab-cicd-workflow](https://gitlab.example.com/engineering/dev-tools/internal/gitlab-cicd-workflow) - provides `workflow`, `deploy-if-protected`, `run-if-unprotected`, and `stack-trigger-rules` components
   - [gitlab-cicd-vault](https://gitlab.example.com/engineering/vault/internal/gitlab-cicd-vault)
