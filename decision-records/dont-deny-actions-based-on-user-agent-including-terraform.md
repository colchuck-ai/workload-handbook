# Don't Deny Actions Based on UserAgent including Terraform

## Status

Accepted 2023-12-19

## Context

In an effort to employ defense in depth, we consider applying a policy to all roles assumed by Terraform that explicitly denies any actions on any resource when the user agent header doesn't include `*Terraform*`.

Employing this layer of defense in depth is helpful in most cases, but has some drawbacks:

- An actor who knows that this deny policy is in place can easily manipulate the user agent header within their request to bypass the policy's deny intent.
- Actions performed on behalf of the user by a cloud service provider service will be denied if the user agent isn't maintained.

## Decision

We won't apply a policy to all roles assumed by Terraform that explicitly denies any actions on any resource when the user agent header doesn't include `*Terraform*`.

## Consequences

### Benefits

- Less Terraform errors in GitLab pipelines that happen as a result of actions on behalf of the user.
- Less complex policies

### Costs

- Reduction of defense in depth for roles with high levels of permission. An actor no longer has to contend with a policy that denies actions on any resource when the user agent header doesn't include `*Terraform*`.
