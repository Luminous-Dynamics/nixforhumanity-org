# Security Policy

## Supported Versions

The nixforhumanity.org website is continuously deployed from the main branch. Security updates are applied immediately upon discovery.

| Version | Supported          |
| ------- | ------------------ |
| Latest (main) | :white_check_mark: |
| Older commits | :x: |

## Reporting a Vulnerability

We take the security of nixforhumanity.org seriously. If you discover a security vulnerability, please help us by reporting it responsibly.

### What to Report

Security issues include, but are not limited to:
- Cross-Site Scripting (XSS) vulnerabilities
- Form injection vulnerabilities
- Privacy leaks
- Insecure external dependencies
- Authentication or session management issues
- Any other security concerns

### How to Report

**Please DO NOT open a public issue for security vulnerabilities.**

Instead, please report security vulnerabilities by:

1. **Email**: Contact Luminous Dynamics security team (check [luminousdynamics.org](https://luminousdynamics.org) for current contact)
2. **GitHub Security Advisory**: Use the [Security Advisory](https://github.com/Luminous-Dynamics/nixforhumanity-org/security/advisories) feature (private disclosure)

### What to Include

When reporting a vulnerability, please include:
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Suggested fix (if you have one)
- Your contact information (optional, for credit)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: Within 24-48 hours
  - High: Within 1 week
  - Medium: Within 2 weeks
  - Low: Within 30 days

### Disclosure Policy

- We request that you do not publicly disclose the vulnerability until we've had a chance to address it
- We will work with you to understand and fix the issue
- We will credit you in our security acknowledgments (unless you prefer to remain anonymous)
- Once fixed, we may publish a security advisory describing the issue and the fix

## Security Best Practices

This website follows security best practices:
- ✅ HTTPS only (enforced by GitHub Pages)
- ✅ Content Security Policy considerations
- ✅ No sensitive data stored client-side
- ✅ Secure external links (`rel="noopener noreferrer"`)
- ✅ Form honeypot for spam prevention
- ✅ Regular dependency updates
- ✅ Input validation on forms

## Acknowledgments

We appreciate the security research community and will acknowledge researchers who report valid vulnerabilities (with their permission).

---

Thank you for helping keep nixforhumanity.org and its users safe! 🔒
