# Resource Naming Convention

## Status

Accepted 2023-12-11

## Context

We have an inconsistent resource naming convention, and need to adopt a standard convention.

### Options

The [terraform-null-label](https://github.com/cloudposse/terraform-null-label) module is a widely-used naming convention, originally designed for Terraform infrastructure provisioning. However, its conventions and opinions can extend beyond Terraform to be applied in other contexts. It is the proposed convention.

## Decision

We'll adopt the [terraform-null-label](https://github.com/cloudposse/terraform-null-label) module convention for naming resources.

```txt
{namespace}-{environment}-{stage}-{name}-{attributes}
```

| Name          | Description                                                                                                                                                                                                                                                        | Type           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `namespace`   | ID element. Usually an abbreviation of your organization name, e.g. `eg` or `cp`, to help ensure generated IDs are globally unique                                                                                                                                 | `string`       |
| `environment` | ID element. Usually used for region e.g. `gbl`, `uw2`, `us-west-2`                                                                                                                                                                                                 | `string`       |
| `stage`       | ID element. Usually used to indicate role, e.g. `prod`, `test`                                                                                                                                                                                                     | `string`       |
| `name`        | ID element. Usually the component or solution name, e.g. 'app' or 'jenkins'. This is the only ID element not also included as a tag. The "name" tag is set to the full id string. There is no tag with the value of the name input.                                | `string`       |
| `attributes`  | ID element. Additional attributes (e.g. `workers` or `cluster`) to add to id, in the order they appear in the list. New attributes are appended to the end of the list. The elements of the list are joined by the `delimiter` and treated as a single ID element. | `list(string)` |

## Consequences

### Benefits

- **Organizational Clarity**: A standardized naming convention provides clarity and structure, making it easier for team members to understand and identify resources. It promotes a shared understanding of the purpose and function of each resource, reducing confusion and facilitating collaboration.
- **Ease of Management**: With a consistent naming convention, administrators can quickly locate and manage resources. This is particularly important in large and complex cloud environments where numerous resources may exist. It streamlines tasks such as monitoring, troubleshooting, and resource allocation.
- **Automation and Scripting**: A standardized naming convention supports automation and scripting by providing a predictable pattern for resource names. This consistency is essential when developing scripts or using automation tools to provision, configure, or scale resources in the cloud.
- **Cost Tracking**: Clear naming conventions aid in tracking costs associated with different resources. It becomes simpler to associate expenses with specific projects, departments, or applications, enhancing financial transparency and accountability.
- **Security and Compliance**: A standardized naming convention can contribute to security by allowing for easier identification of resources and potential security risks. It can also help enforce compliance requirements by ensuring that resources are named in accordance with organizational policies and regulatory standards.
- **Scalability**: As organizations scale their cloud infrastructure, a consistent naming convention becomes increasingly important. It helps maintain order and organization, preventing chaos and confusion as the number of resources grows.
- **Documentation and Communication**: A well-defined naming convention serves as a form of documentation in itself. It aids in communicating information about resources within the organization and promotes better documentation practices.

### Costs

- Some existing resources don't comply with the convention. We'll simply adopt this convention moving forward.
