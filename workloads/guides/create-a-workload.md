# Create a Workload

1. **Create Workload and Scope Groups for Your Workload**

   - Follow the [GitLab workload organization structure](../workload-organization/gitlab.md).

2. **Deploy Infrastructure (If Needed)**

   - Create [deployment projects](../../workflows/deployment-workflow/deployment-workflow.md) according to the most appropriate [deployment pattern](../../workflows/deployment-workflow/deployment-workflow.md#patterns).

3. **Publish Releases (If Needed)**

   - Create [release projects](../../workflows/release-workflow/release-workflow.md).

4. **Set Up Platforms**

   - Create accounts, namespaces, etc., on the platforms where your workload will be deployed. See examples for [AWS](../workload-organization/aws.md) and [Vault](../workload-organization/vault.md).

5. **Create Workload Environments**
   - Bootstrap resources in the accounts, namespaces, etc., on each platform where you wish to deploy resources. Refer to [bootstrap a workload environment with Terraform](./create-a-workload-environment-with-terraform.md) for guidance on setting up the necessary infrastructure.
