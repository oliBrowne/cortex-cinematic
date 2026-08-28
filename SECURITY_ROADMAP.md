# CORTEX Security Roadmap

> **Scope.** This roadmap assesses the current public marketing site and identifies controls to establish before any authenticated CORTEX or Co-Suite product deployment. It is a practical security roadmap, not a certification or legal-compliance assessment.

## Current baseline

The public site currently has a narrow attack surface: no accounts, server-side form collection, public analytics, or third-party advertising scripts. It uses a documented restrictive content policy and referrer control, a public `security.txt` contact, a necessary first-party consent cookie, and a scheduled production dependency audit. This is a sensible baseline for a static site. The next material risks sit at the hosting edge, in the software delivery process, and in the design of the future AI product.

## Prioritized controls

| Priority | Control | Why it matters | Owner and timing |
| --- | --- | --- | --- |
| **P0** | Apply the documented HSTS, `frame-ancestors 'none'`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` at the production host or CDN. | The current document policy cannot set HSTS or reliably prevent framing; these must be HTTP response headers. | Hosting/domain owner; before public production launch. |
| **P0** | Protect the domain registrar, DNS provider, source-control organization, and hosting account with phishing-resistant MFA; limit administrative roles and remove unused access promptly. | Compromise of these control planes can bypass application-level safeguards. | Operations owner; immediately. |
| **P1** | Make the existing audit workflow a required pull-request check. Add secret scanning, automated dependency update pull requests, and an SBOM attached to releases. Pin CI actions to reviewed immutable revisions. | The scheduled audit finds known package issues, while required checks and inventory improve prevention and response. | Engineering owner; before the first product release. |
| **P1** | Establish a vulnerability-intake and incident-response process: monitored security mailbox, acknowledgement target, severity triage, incident owner, and rehearsed communications path. | A published contact is only effective if reports are handled consistently and quickly. | Security/operations owner; before public launch. |
| **P1** | Add staging-only dynamic security testing and an independent penetration test before authentication, customer data, file uploads, integrations, or payments go live. | The current static-site checks do not exercise future backend or authorization paths. | Engineering plus independent assessor; before feature launch. |
| **P0 for product** | Use standards-based identity with MFA for privileged users, server-enforced authorization, tenant isolation, short-lived sessions, session revocation, and audited administrative actions. | Authentication and authorization will become the primary protection boundary once customer information is available. | Product and platform engineering; architecture stage. |
| **P0 for product** | Define data classification, per-tenant encryption and key management, retention/deletion workflows, export controls, backups, and access logging before ingesting customer records. | Product claims about locality and governance need enforceable data-handling controls, not only interface language. | Security, product, and legal; architecture stage. |
| **P0 for product** | Treat retrieval, tools, integrations, and agent actions as untrusted-input boundaries. Enforce document-level authorization at retrieval time, allowlist tool actions, require human approval for consequential actions, and test prompt-injection and data-exfiltration scenarios. | AI systems can be manipulated through content and integrations even when core infrastructure is secure. | AI and platform engineering; before each connector or agent release. |
| **P1 for product** | Maintain release gates for threat modeling, code review, security tests, dependency results, privacy review, and rollback readiness. Capture model/version, prompt, tool, and policy decisions in privacy-aware audit logs. | Reusable release gates support the risk-based secure-development lifecycle described by NIST SSDF. [1] | Engineering leadership; adopt now and enforce before beta. |

## Practical first 30 days

First, apply the hosting response headers and secure all administrative accounts. Next, make the dependency audit mandatory in the source-control service, enable secret scanning and automated update proposals, and write a short incident-response runbook. Finally, before any customer-facing product feature is introduced, hold a threat-model review that maps data flows, identities, tenants, integrations, model providers, and privileged actions.

For the AI product, use the NIST AI Risk Management Framework as a governance scaffold and OWASP ASVS as a verification checklist for web and API controls. The goal is not checklist compliance; it is an owned, measurable process that prevents, detects, and responds to the risks the actual product creates. [1] [2] [3]

## References

[1]: https://csrc.nist.gov/projects/ssdf "NIST Secure Software Development Framework"
[2]: https://www.nist.gov/itl/ai-risk-management-framework "NIST AI Risk Management Framework"
[3]: https://owasp.org/www-project-application-security-verification-standard/ "OWASP Application Security Verification Standard"
[4]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security "MDN: Strict-Transport-Security"
