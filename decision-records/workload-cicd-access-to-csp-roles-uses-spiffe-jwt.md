# Workload CI/CD Access to CSP Roles Uses SPIFFE JWT

## Status

Accepted 2025-07-08

## Context

CI/CD pipelines need secure, temporary access to cloud service provider (CSP) roles for infrastructure provisioning, image publishing, and manifest deployment. Previously, we used Vault to mediate this access, but this approach introduced operational complexity and additional failure points.

SPIFFE (Secure Production Identity Framework for Everyone) provides a standardized way to securely identify workloads in dynamic environments. GitLab pipeline jobs can now retrieve temporary SPIFFE JWTs from SPIRE instances based on their pipeline token claims, which can be used directly with AWS OIDC providers for authentication.

### Benefits of SPIFFE JWT Authentication

- **Direct authentication**: Eliminates Vault as an intermediary
- **Standardized identity**: Uses industry-standard SPIFFE specifications
- **Reduced complexity**: Fewer moving parts in the authentication chain
- **Better auditability**: Direct AWS CloudTrail logging of authentication events
- **Improved reliability**: Removes dependency on Vault availability

## Decision

GitLab CI/CD pipelines will authenticate directly to AWS using temporary SPIFFE JWTs vended by SPIRE instances, eliminating the need for Vault-mediated access.

- GitLab pipeline jobs request temporary SPIFFE JWTs from SPIRE instances using their pipeline token claims
- SPIRE validates the pipeline tokens and vends appropriate SPIFFE JWTs with SPIFFE IDs containing the project path and protection status
- AWS OIDC providers validate these JWTs and allow assumption of appropriate IAM roles
- Access control is enforced through IAM role trust policies that validate the SPIFFE ID containing project path and protection status
- No intermediate credential storage or retrieval from Vault is required

## Consequences

**Pros**

- Simplified authentication flow with fewer failure points
- Reduced operational overhead (no Vault namespace management)
- Direct AWS integration with native OIDC capabilities
- Improved security through short-lived, cryptographically signed tokens
- Better performance due to elimination of Vault round-trips
- Enhanced auditability with direct AWS CloudTrail integration

**Cons**

- Requires migration of existing Vault-based authentication patterns
- Teams need to understand SPIFFE JWT claims and AWS OIDC trust policies
- Initial setup complexity for configuring AWS OIDC providers and IAM roles
