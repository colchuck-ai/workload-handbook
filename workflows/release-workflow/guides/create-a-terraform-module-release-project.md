# Create a Terraform Module Release Project

1. Create a terraform module release project according to the [GitLab workload organization structure](../../../workloads/workload-organization/gitlab.md).
2. Apply [release workflow project settings](../release-workflow.md#project-settings) and follow all [release workflow best practices](../release-workflow.md#best-practices).
3. Add additional terraform specific development tools:
   - [Check terraform files are formatted](../../../tools/terraform/guides/check-terraform-files-are-formatted.md)
   - [Format terraform files](../../../tools/terraform/guides/format-terraform-files.md)
   - [Ignore terraform files from git](../../../tools/terraform/guides/ignore-terraform-files-from-git.md)
   - [Lint terraform configuration for errors](../../../tools/tflint/guides/lint-terraform-configuration-for-errors.md)
   - [Automate generation of terraform module documentation](../../../tools/terraform-docs/guides/automate-generation-of-terraform-module-documentation.md)
4. Scaffold the code using the [standard module structure](../../../tools/terraform/terraform.md#standard-module-structure).
5. Use the following CI/CD components to compose your release workflow CI/CD pipeline:
   - [gitlab-cicd-terraform](https://gitlab.example.com/explore/catalog/engineering/dev-tools/gitlab-cicd-components/gitlab-cicd-terraform) - for checking that terraform configuration is valid
   - [gitlab-cicd-workflow](https://gitlab.example.com/engineering/dev-tools/internal/gitlab-cicd-workflow) - provides `workflow` and `run-if-protected` components
   - [gitlab-cicd-vault](https://gitlab.example.com/engineering/vault/internal/gitlab-cicd-vault)
