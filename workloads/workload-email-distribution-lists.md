## Workload Email Distribution Lists

It's usually a good idea to create at least two email distribution lists to support your workload - one for the production environment, and _at least_ one for the non-production environments

For example, if a workload has two environments - `prod` and `test` - you might work with your email administrators to create two distributions based on those environments:

- `prod-some-workload@example.com`
- `test-some-workload@example.com`

Alternatively, you could create two distributions based on `prod/non-prod`:

- `prod-some-workload@example.com`
- `non-prod-some-workload@example.com`

Either plan allows you to:

- register for service accounts without having to couple your personal or team email address to any workloads
- splits production and non-production communications
