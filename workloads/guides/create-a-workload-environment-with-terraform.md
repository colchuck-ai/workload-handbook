# Create a Workload Environment with Terraform

## Decide on an Environment Name

1. First, pick one of the names from [options for workload environments](../../decision-records/options-for-workload-environments.md).

## Create an Email Distribution List for the Workload Environment

1. Make an IT Request to create an email distribution list (e.g. `dl-acme-<environment>-my-workload@example.com`) to support your workload environment, and add your team's email distribution list (e.g. `dl-my-team@example.com`) as a member (see decision record: [create workload environment email distribution lists](../../decision-records/create-workload-environment-email-distribution-lists.md)).

## Remote State

1. **Decide where you'll store state**: Determine the best location to store your Terraform state based on your workload requirements. Common platforms include Amazon S3, Azure Blob Storage, Google Cloud Storage, and Alibaba Cloud OSS.
2. **Gather credentials**: Obtain credentials with permissions to create the necessary remote state resources. For Amazon S3, this includes permissions to create an S3 bucket and a DynamoDB table. **Ensure that credentials are securely stored and managed. Follow the principle of least privilege by granting only the necessary permissions.**
3. **Create remote backend resources**: If using Amazon S3, you can utilize the [terraform-aws-tfstate-backend](https://github.com/cloudposse/terraform-aws-tfstate-backend) module.
   1. Add the required configuration for your resources.
   2. Run `terraform init` to download the necessary Terraform modules and providers.
   3. Run `terraform plan` to validate your configuration and generate an execution plan.
   4. Run `terraform apply -auto-approve` to create the remote state resources and any other defined resources. Initially, the Terraform state is still stored locally.
4. **Update configuration to use the remote backend**: Follow the documentation for your chosen backend. For S3, see the [official Terraform S3 backend guide](https://developer.hashicorp.com/terraform/language/settings/backends/s3).
5. **Migrate local state to remote backend**: Run `terraform init -force-copy` to move your Terraform state to the remote backend. The `-auto-approve` flag allows this process to proceed without manual approval. Your state is now stored remotely.

## CI/CD "Pipes"

Setting up a workload environment often requires provisioning IAM resources in each platform to enable CI/CD jobs to manage state, deploy infrastructure, and publish release artifacts. Think of these resources as "pipes" that facilitate the necessary operations for your CI/CD processes.

This procedure guides you in provisioning these pipes in a single platform, independent of where the state is stored (we strongly recommend remote state storage, as detailed above). You'll have to perform this procedure for each platform your workload resides on.

1. **Gather Credentials**: Ensure you have credentials to manage your state and create the required resources. For example, if your state is in Amazon S3 and you need to create resources in a Vault namespace, you will need AWS credentials for S3 access and a Vault token with the necessary permissions. **Ensure that credentials are securely stored and managed. Follow the principle of least privilege by granting only the necessary permissions.**
2. **Create the pipes**:
   1. Define the necessary resources in your Terraform configuration to enable state management, infrastructure provisioning, and release publishing. See workload access patterns such as [gitlab to aws](../patterns/access/gitlab-to-aws.md).
   2. Run `terraform init` to download the required modules and providers.
   3. Run `terraform plan` to validate your configuration and create an execution plan.
   4. Run `terraform apply -auto-approve` to provision the defined resources.

## Automating the Bootstrapping Process

In the [Partitioned Deployment pattern](../../workflows/deployment-workflow/patterns/partitioned-deployment.md), a management project uses its own CI/CD jobs to provision both remote state resources and CI/CD "pipes" for other projects within the workload environment. Using CI/CD pipelines from the management project ensures consistency, reduces manual effort, and mitigates security vulnerabilities associated with bootstrapping resources using highly provisioned credentials locally.

It's important to note that there are three workload deployment patterns, and the Partitioned Deployment pattern is the only one that automates the bootstrapping process for other projects within the workload. This means that automating the bootstrapping of state management resources and CI/CD "pipes" is particularly beneficial when partitioning the deployment of concerns within the workload itself, but might not be worth the lift in other patterns.

For assistance in determining the best deployment pattern for your needs, refer to the [deployment patterns](../../workflows/deployment-workflow/deployment-workflow.md#patterns) section.

## Resources

For more information on terraform, see [our tools page on it](../../tools/terraform/terraform.md).
