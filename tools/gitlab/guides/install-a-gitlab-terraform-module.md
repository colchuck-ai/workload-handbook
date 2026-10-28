# Install a GitLab Terraform Module

[Terraform module release projects](../../../workflows/release-workflow/guides/create-a-terraform-module-release-project.md) publish modules to [GitLab project terraform module registries](https://docs.gitlab.com/user/packages/terraform_module_registry/).

See [GitLab's instructions on referencing a terraform module published to a gitlab project terraform module registry](https://docs.gitlab.com/user/packages/terraform_module_registry/).

It can be useful for include the following line in either a `before_script` or `script` in your cicd job:

```sh
.install-dependencies:
  script:
    # ...
    # set up gitlab as source registry
    - |
      cat >> ~/.terraformrc << EOF
        credentials "gitlab.example.com" {
          token = "${DEPLOY_TOKEN_PASSWORD}"
        }
      EOF
```
