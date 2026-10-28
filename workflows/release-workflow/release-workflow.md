# Release Workflow

A release workflow is a process that manages the release of a particular version of software, often implemented using a GitLab Project.

In this workflow, various types of software releases like docker images, terraform modules, ansible modules, dotnet packages, python packages, and npm modules are produced and versioned following [semantic versioning](https://semver.org/).

We use [semantic release](https://semantic-release.gitbook.io/semantic-release/) to automate the tagging of code and creation of a gitlab release based on commit messages following the [conventional commit format](https://www.conventionalcommits.org/en/v1.0.0/).

## Branch Types

Within the semantic release workflow, a branch can be defined as one of three types: [release](#release), [maintenance](#maintenance), or [pre-release](#pre-release).

### [Release](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration#release-branches)

The goal is to make releases on top of the last version released.

Typically there is only one release branch, either `main` or `master`.

We're less focused on publishing to non-default distribution branches like `next`, which are mostly there for publishing to different npm distribution channels like `@next`.

It's best to focus on the following guides:

- [Guide for releasing a bug fix](https://semantic-release.gitbook.io/semantic-release/recipes/release-workflow/distribution-channels#releasing-a-bug-fix)
- [Guide for releasing a feature](https://semantic-release.gitbook.io/semantic-release/recipes/release-workflow/distribution-channels#releasing-a-feature-on-latest)

### [Maintenance](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration#maintenance-branches)

The goal of maintenance branches are to publish versions on top of old releases.

A maintenance branch will typically follow the format `major.minor.x`. See [reasons for branching as late as possible](#when-creating-a-maintenance-branch-branch-as-late-as-possible).

- [Guide for publishing maintenance releases](https://semantic-release.gitbook.io/semantic-release/recipes/release-workflow/maintenance-releases)

### [Pre-release](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration#pre-release-branches)

The goal of pre-release branches is to facilitate the publishing of pre-release versions.

A pre-release branch will typically be one of `alpha`, `beta`, or `rc`.

- [Guide for publishing pre-releases](https://semantic-release.gitbook.io/semantic-release/recipes/release-workflow/pre-releases)

## Project Settings

### Implement Workflow Project Settings

See [workflow project settings](../workflows.md#project-settings)

### Protect Release, Maintenance, and Pre-Release Branches

In release workflows, all release, maintenance, and pre-release branches should be protected from force push actions; the only way to get code into a these branches should be through a reviewed and approved merge request.

Typically, this would mean protecting:

- Release branch: `main` or `master` - whichever your project has as it's default branch
- Maintenance branches: `*.*.x` - which will protect branches like `1.0.x` and `1.x.x`
- Pre-release branches: `alpha`, `beta`, `rc`, etc. - if you have pre-release branches, protect them by name.

See [protecting a branch](../../tools/gitlab/guides/protect-a-branch.md).

### Protect All Tags

In release workflows, tags are the thing that trigger a release. Only the owners and maintainers should be able to push tags. As such, protect tags with the wildcard `*`.

See [protecting a tag](../../tools/gitlab/guides/protect-a-tag.md).

## Best Practices

### Follow All Workflow Best Practices

See [workflow best practices](../workflows.md#best-practices).

### Automate GitLab Releases with Semantic Release

See [automate gitlab releases](../../tools/semantic-release/guides/automate-gitlab-releases.md).

### When Creating A Maintenance Branch, Branch as Late as Possible

By creating branches from minor releases, you minimize the length of time during which you have to apply bug fixes to multiple branches.

Basically, bias towards create maintenance branches like `1.1.x` instead of `1.x.x`.

### Fix Bugs in the Release Branch First, and Maintenance Branches Second.

After identifying a bug, a problematic action someone could take is fix it in the just-released version and not fix it in the release branch. To avoid it, developers should always fix forward by pushing the change in the release branch, then cherry-pick it into maintenance branches.

## CI/CD

Use the following CI/CD components to compose your release workflow CI/CD pipeline:

- [gitlab-cicd-workflow](https://gitlab.example.com/engineering/dev-tools/internal/gitlab-cicd-workflow) - provides `workflow` and `run-if-protected` components
- [gitlab-cicd-vault](https://gitlab.example.com/engineering/vault/internal/gitlab-cicd-vault)
