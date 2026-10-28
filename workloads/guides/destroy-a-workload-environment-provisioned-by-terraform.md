# Destroy a Workload Environment Provisioned by Terraform

Destroying a workload environment provisioned by Terraform involves two main steps:

<!-- no toc -->

1. [Destroy Resources in Root Modules that Don't Contain the Remote Backend Resources](#destroy-resources-in-root-modules-that-dont-contain-the-remote-backend-resources)
2. [Destroy Resources in the Root Module that Contains the Remote Backend Resources](#destroy-resources-in-the-root-module-that-contains-the-remote-backend-resources)

## Destroy Resources in Root Modules that Don't Contain the Remote Backend Resources

Before destroying the root module that contains the remote backend resources, you need to destroy resources in the root modules that don't contain these resources.

For each root module that doesn't contain the remote backend resources (e.g., an S3 bucket and DynamoDB table):

1. **Gather Credentials**: Ensure you have the necessary credentials to manage your state and destroy the required resources. For example, if your state is in Amazon S3 and you need to destroy resources in a Vault namespace, you will need AWS credentials for S3 access and a Vault token with the necessary permissions. Make sure credentials are securely stored and managed, and follow the principle of least privilege by granting only the necessary permissions.
2. **Destroy the Resources**:
   1. Run `terraform init` to download the required modules and providers.
   2. Run `terraform plan -destroy` to validate your configuration and create a destruction plan.
   3. Run `terraform destroy -auto-approve` to destroy the defined resources.

## Destroy Resources in the Root Module that Contains the Remote Backend Resources

Once the resources in root modules that don't contain the remote backend resources have been destroyed, you can proceed to destroy the resources in the root module that contains the remote backend resources.

For the root module that contains the remote backend resources (e.g., an S3 bucket and DynamoDB table):

1. **Gather Credentials**: Ensure you have the necessary credentials to manage your state and destroy the required resources. For example, if your state (and other resources) are in AWS, you will need AWS credentials authorized to delete those resources. Make sure credentials are securely stored and managed, and follow the principle of least privilege by granting only the necessary permissions.
2. **Destroy the Resources**:
   1. Run `terraform init` to download the required modules and providers.
   2. Comment out the remote state configuration. This will prompt the next call of `terraform init` to copy the remote state locally.
   3. If necessary, prepare your remote backend resources for deletion. For example, in the [terraform-aws-tfstate-backend module guide for destroying](https://github.com/cloudposse/terraform-aws-tfstate-backend?tab=readme-ov-file#destroy), it suggests setting `force_destroy = true` and then applying the changes.
   4. Run `terraform init -force-copy` to copy the remote state file locally.
   5. Run `terraform plan -destroy` to validate your configuration and create a destruction plan.
   6. Run `terraform destroy -auto-approve` to destroy the defined resources.

## Resources

For more information on Terraform, see [our tools page on it](../../tools/terraform/terraform.md).
