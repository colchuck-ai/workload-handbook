# Create Workload Environment Email Distribution Lists

## Context

When you're setting up a new workload, it's easy to overlook the need for a dedicated email distribution list, or even multiple lists.

Let's consider the implications of different approaches when creating an AWS account to support a workload environment.

Imagine the simplest approach: registering an AWS account with your personal work email (first.last@example.com). If you were to leave the company without properly transitioning the account ownership, your team would face challenges accessing the AWS account, leading to significant time and effort to rectify the situation.

To mitigate this risk, you might create an email distribution list for your team (dl-some-team@example.com) and register the AWS account with it. However, if ownership of the workload changes hands, you'd have to go through the hassle of updating the account email to reflect the new owners. For instance, if some-team passes ownership of the workload acme-cool-workload to other-team, the account email would need to change to dl-other-team@example.com, and so forth with subsequent changes in ownership.

Enter workload-oriented thinking!

A more efficient approach involves creating an email distribution list (dl-acme-cool-workload@example.com) and adding the owners of acme-cool-workload as members. Then, you can register an AWS account using + aliasing (e.g., dl-acme-cool-workload+<environment>@example.com), ensuring that the appropriate workload owners receive relevant emails. When ownership of acme-cool-workload changes, simply add the new owners to the workload email distribution list.

However, there's a catch with this solution: emails will come in from every workload environment, making it difficult for owners to discern their origin.

To address this, we can refine the workload-oriented approach by creating an email distribution list for each workload environment (e.g., dl-acme-prod-cool-workload@example.com and dl-acme-test-cool-workload@example.com). This way, owners will receive emails tagged with the specific workload environment, providing clarity and organization.

## Decision

Create an email distribution list per workload environment.

### Benefits

- Clear Ownership: Each workload has a designated email distribution list, clearly indicating the owners responsible for that workload.
- Easy Ownership Transition: Adding or removing owners from the distribution list facilitates smooth ownership transitions.
- Environment-Specific Emails: Email distribution lists for each environment ensure that owners can easily identify the source of emails.
- Organized Communication: Workload-specific email lists help keep communication organized and relevant to the recipients.

### Costs

- Complex Setup: Setting up and managing multiple email distribution lists for each workload and environment can be initially complex.
- Potential for Email Overload: With separate lists for each environment, owners may receive a higher volume of emails if they are responsible for multiple environments.
- Potential for Misconfiguration: Errors in configuring the email distribution lists or AWS account aliases could lead to communication issues or misdirected emails.
- Dependency on Email System: The effectiveness of this approach relies on the email system's ability to handle aliases and distribution lists reliably.

Overall, while the workload-oriented approach offers clear benefits in terms of ownership clarity and communication organization, it requires careful setup and maintenance to avoid potential pitfalls.
