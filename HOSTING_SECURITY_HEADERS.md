# Deployment Security Headers

The public site enforces a restrictive resource policy and referrer policy from its document. **HSTS and anti-framing controls must be delivered as HTTP response headers by the hosting platform or an edge proxy**; a static frontend project cannot reliably set them itself.

Configure the following response headers for every public HTML route before production deployment. The CSP below complements the existing policy and supplies `frame-ancestors`, which browsers do not honor when it is declared in a document meta element.

| Header | Production value | Deployment note |
| --- | --- | --- |
| `Strict-Transport-Security` | `max-age=31536000` | Enable only after confirming the production domain is permanently HTTPS. Add `includeSubDomains` only after every subdomain is HTTPS-capable. |
| `Content-Security-Policy` | `frame-ancestors 'none'` | Prevents the public site from being embedded in other sites. Keep the site’s existing document CSP for resource restrictions. |
| `X-Frame-Options` | `DENY` | Legacy-browser complement to `frame-ancestors`. |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-type sniffing. |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Aligns the HTTP response with the existing document policy. |
| `Permissions-Policy` | `accelerometer=(), autoplay=(), camera=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()` | Disables browser capabilities the public marketing site does not use. |

> Apply these values at the hosting provider, CDN, or reverse proxy. Do not substitute a static `_headers` file unless the selected host explicitly documents support for that file format.

These controls implement defense-in-depth for transport security, clickjacking prevention, MIME handling, referrer minimization, and unused browser features. Review the policy whenever the site adds authentication, analytics, embedded content, payments, maps, APIs, or a customer application.

## References

[1]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security "MDN: Strict-Transport-Security"
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors "MDN: CSP frame-ancestors"
[3]: https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html "OWASP: HTTP Headers Cheat Sheet"
