# `tflint`

We use tflint to lint terraform configuration for errors.

## Installation

See [installation instructions for tflint](https://github.com/terraform-linters/tflint?tab=readme-ov-file#installation).

## Usage Within CI/CD Pipelines

As of 2024-04-09, the usage of `tflint` within CI/CD pipelines is not supported.

GitLab runners aren't authenticated with GitHub, which means that they get rate limited very quickly when the `tflint --init` command attempts to fetch plugins from Github releases.

For [example](https://gitlab.example.com/engineering/dev-tools/tf-modules/tf-vault-gitlab-aws-temp-creds-iam/-/jobs/1234567):

```txt
$ tflint --init
Installing "aws" plugin...
Failed to install a plugin; Failed to fetch GitHub releases: GET https://api.github.com/repos/terraform-linters/tflint-ruleset-aws/releases/tags/v0.28.0: 403 API rate limit exceeded for 52.32.32.110. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) [rate reset in 57m54s]
```

It's recommended to run `tflint` as part of a pre-commit hook (see [guide](./guides/lint-terraform-configuration-for-errors.md)) instead.
