# Workflows

There are two kinds of workflows:

- [Release](./release-workflow/release-workflow.md): concerned with publishing semantically versioned artifacts
- [Deployment](./deployment-workflow/deployment-workflow.md): concerned with consuming semantically versioned artifacts with the aim of achieving a goal

## Project Settings

For _any_ workflow, the following project settings should be applied.

- [Repository settings](../tools/gitlab/guides/configure-baseline-repository-settings.md)
- [Merge request settings](../tools/gitlab/guides/configure-baseline-merge-request-settings.md)

## Best Practices

### Introduce code quality checks

Introduce the following automation:

- [Formatting files](../tools/prettier/guides/format-files.md)
- [Checking that files are formatted](../tools/prettier/guides/check-files-are-formatted.md)
- [Checking that markdown links are valid](../tools/remark/guides/validate-markdown-links.md)

### Embrace Infrastructure-as-Code

Developers should embrace Infrastructure as Code (IaC) because it allows them to automate the provisioning and management of infrastructure, reducing manual errors and increasing consistency. Additionally, IaC enables version control, making it easier to track changes and collaborate effectively across teams.

We have decided to embrace infrastructure as code using [terraform](../tools/terraform/terraform.md).

### Perform code reviews before merging into long-lived branches

Don't test everything at the end of a week or project. Code reviews should take place as soon as possible, because developers are more likely to identify issues that could cause problems later in the lifecycle. Since they'll find problems earlier, they'll have an easier time creating solutions.

Can be implemented by [applying baseline project settings](#project-settings).

### Protect the approval of merge requests

Merge requests should be reviewed and approved by an independent party with appropriate knowledge and authority.

`Developers`, `Maintainers`, and `Owners` of a project should be able to create, review, and approve merge requests. See [GitLab permissions and roles](https://docs.gitlab.com/user/permissions/) for a more detailed breakdown.

Authors of or contributors to a merge request shouldn't be able to approve the merge request.

Approval rules shouldn't be editable in a merge request.

Any existing approvals are removed if additional commits are added to a merge request.

Can be implemented by [applying baseline project settings](#project-settings).

### Use feature branches rather than direct commits to long-lived branches

Using feature branches is a simple way to develop and keep the source code clean. When using Git, developers should create a branch for anything they're working on so that contributors can easily start the code review process before merging.

Can be implemented by [applying baseline project settings](#project-settings).

### Run every test on all commits

When working on a `feature` branch and adding new commits, run tests right away. If the tests are taking a long time, try running them in parallel. Do this server-side in merge requests, running the complete test suite. If there is a test suite for development and another only for new versions, it's worthwhile to set up parallel tests and run them all.

### Test all commits, not only ones on protected branches

Some developers set up their CI to only test what has been merged into a long-lived branch, but this is too late in the software development lifecyle, and everyone - from developers to product managers - should feel feel confident that long-lived branches always has green tests. It's inefficient for developers to have to test long-lived branches before they start developing new features.

### Commit messages reflect intent

Developers should not only say what they did, but also why they did it. An even more useful tactic is to explain why this option was selected over others to help future contributors understand the development process. Writing descriptive commit messages is useful for code reviews and future development.

### Favor merge commits over fast forwarding

Given the choice between using the fast forward or merge commit merge method, bias towards using the merge commit merge method. When you create a merge commit, you avoid losing information about the historical existence of a feature branch and group together all commits that together added the feature.

With fast forwarding, it's impossible to see from the Git history which of the commit objects together have implemented a feature — you would have to manually read all the log messages. Reverting a whole feature (i.e. a group of commits), is a true headache in the latter situation, whereas it is easily done if a merge commit was created.

Yes, it will create a few more (empty) commit objects, but the gain is much bigger than the cost.

Can be implemented by [applying baseline project settings](#project-settings).

### Don't squash commits when merging

Merge requests should maintain the fidelity of individual commits.

GitLab also doesn't have a feature that requires mergers to edit the squash commit message, so [squashing commits doesn't really play well with semantic release](https://semantic-release.gitbook.io/semantic-release/support/troubleshooting#squashed-commits-are-ignored-by-semantic-release).

Can be implemented by [applying baseline project settings](#project-settings).

### Delete short-lived source branches when merging to long-lived branches

Merge requests should help to maintain a clean repository, this means deleting short-lived branch like `hotfix` or `feature` branches when they are merged into a long-lived branch like `main`, `1.0.x`, `rc`, `beta`, or `alpha`.

### Format and lint code and documentation

Improperly formatted code or documentation can be difficult to read.

## CI/CD

Use GitLab CI/CD components published to the [CI/CD catalog](https://gitlab.example.com/explore/catalog) to composed your CI/CD pipelines.
