# Baseline Merge Request Settings

- Merge Method: `Merge Commit`
- Merge Options:
  - Automatically resolve merge request diff threads when they become outdated: `No`
  - Enable "Delete source branch" option by default: `Yes`
  - Squash commits when merging: `Do not allow`
- Merge Checks:
  - Pipelines must succeed: `Yes`
  - Skipped pipelines are considered successful: `No`
  - All threads must be resolved: `Yes`
  - (Future Work) Require an associated issue from Jira: `Yes` (Requires [a specific Jira Integration feature](https://docs.gitlab.com/integration/jira/issues/), which requires GitLab Ultimate)
- Merge Request Approvals:
  - Approval Rules: Manage required approvals as you like. However, it's recommended to utilize the built in (see [eligible approvers](https://gitlab.example.com/engineering/workload-handbook/workload-handbook/-/blob/master/tools/gitlab/guides/configure-baseline-merge-request-settings.md)) capabilities, which leverages built in GitLab roles.
  - Approval Settings:
    - Prevent approval by author: `Yes`
    - Prevent approval by users who add commits: `Yes`
    - Prevent editing approval rules in merge requests: `Yes`
    - When commit is added: `Remove all approvals`
