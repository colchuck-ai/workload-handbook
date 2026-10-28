# semantic-release

By enforcing [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) messages with [linting](../../tools/commitlint/guides/lint-conventional-commit-messages.md) and [repository push rules](../../tools/gitlab/guides/enforce-conventional-commit-messages.md), and leveraging [semantic-release](https://semantic-release.gitbook.io/semantic-release/), we are able to [automate gitlab releases](./guides/automate-gitlab-releases.md), including: determining the next version number, generating the release notes, and publishing the package.
