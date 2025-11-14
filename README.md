# Nix for Humanity

[![HTML Validation](https://github.com/Luminous-Dynamics/nixforhumanity-org/actions/workflows/validation.yml/badge.svg)](https://github.com/Luminous-Dynamics/nixforhumanity-org/actions/workflows/validation.yml)
[![Accessibility Testing](https://github.com/Luminous-Dynamics/nixforhumanity-org/actions/workflows/accessibility.yml/badge.svg)](https://github.com/Luminous-Dynamics/nixforhumanity-org/actions/workflows/accessibility.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-blue.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-success)](https://nixforhumanity.org)

Official website for Luminous Nix - Making NixOS accessible through natural language.

## 🌐 Live Site

Visit us at [nixforhumanity.org](https://nixforhumanity.org)

## 📋 About

Luminous Nix is a natural language interface for NixOS that makes package management accessible to everyone. Just say what you want in plain English, and it works - no technical knowledge required.

## ✨ Features

- 🗣️ **Natural Language Interface** - Describe what you need in plain English
- ⚡ **10,000x Faster** - Native Python-Nix API integration
- 🧠 **AI-Powered** - Local LLM for intelligent suggestions
- 🛡️ **Safe by Default** - Preview changes before applying
- ♿ **Fully Accessible** - Voice control and screen reader support

## 🛠️ Recent Improvements

### Accessibility
- ✅ Added skip-to-content link for keyboard navigation
- ✅ Implemented proper ARIA labels throughout
- ✅ Added visible focus states for all interactive elements
- ✅ Form inputs now have proper labels (not just placeholders)
- ✅ Improved color contrast for better readability
- ✅ Added semantic HTML with proper landmarks

### Mobile Experience
- ✅ Functional hamburger menu for mobile navigation
- ✅ Responsive design improvements
- ✅ Touch-friendly interface elements
- ✅ Mobile menu closes when clicking outside

### SEO & Performance
- ✅ Added structured data (Schema.org JSON-LD)
- ✅ Complete Open Graph and Twitter Card metadata
- ✅ robots.txt and sitemap.xml
- ✅ Preconnect hints for external resources
- ✅ Optimized script loading with defer
- ✅ Canonical URL and theme color

### User Experience
- ✅ Working terminal animation that cycles demos
- ✅ Custom 404 error page
- ✅ Privacy policy link on form
- ✅ External links open in new tabs with security
- ✅ Improved form validation and UX

## 🚀 Deployment

This site is deployed via GitHub Pages. Any push to the main branch automatically updates the live site.

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Luminous-Dynamics/nixforhumanity-org.git
   cd nixforhumanity-org
   ```

2. Open in your browser:
   ```bash
   # Using Python
   python -m http.server 8000

   # Or using Node.js
   npx serve

   # Then visit http://localhost:8000
   ```

3. Make your changes and test locally

4. Push to your branch and create a PR

### Automated Testing

Every push and PR triggers automated tests:
- ✅ **HTML Validation** - Ensures all HTML is valid and well-formed
- ✅ **Link Checking** - Verifies all links work (internal and external)
- ✅ **Accessibility Testing** - Pa11y and Axe Core for WCAG 2.1 AA compliance
- ✅ **Lighthouse CI** - Performance, accessibility, SEO scores

View test results in the [Actions tab](https://github.com/Luminous-Dynamics/nixforhumanity-org/actions).

### Files

#### Website
- `index.html` - Main landing page with all features
- `404.html` - Custom branded error page
- `privacy.html` - Privacy policy page
- `og-image.svg` - Social media preview image (SVG source)
- `convert-og-image.html` - Tool to convert SVG to PNG
- `robots.txt` - Search engine crawler instructions
- `sitemap.xml` - Site structure for search engines
- `CNAME` - Custom domain configuration
- `.nojekyll` - Disables Jekyll processing

#### Documentation
- `README.md` - This file
- `CONTRIBUTING.md` - Contribution guidelines
- `CHANGELOG.md` - Version history and changes
- `LICENSE` - MIT License
- `CODE_OF_CONDUCT.md` - Community guidelines
- `SECURITY.md` - Security policy and vulnerability reporting
- `OG_IMAGE_README.md` - Instructions for OG image conversion

#### GitHub Configuration
- `.github/FUNDING.yml` - Sponsor information
- `.github/ISSUE_TEMPLATE/` - Issue templates for bugs, features, and accessibility
- `.github/PULL_REQUEST_TEMPLATE.md` - PR template with checklists
- `.github/workflows/validation.yml` - HTML validation and link checking
- `.github/workflows/accessibility.yml` - Automated accessibility testing

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for our community standards.

**Quick Start:**
1. Fork the repository
2. Create a feature branch
3. Make your changes following our guidelines
4. Test thoroughly (responsive, accessible, performant)
5. Submit a PR using our template

**Issue Templates:**
- 🐛 [Bug Report](.github/ISSUE_TEMPLATE/bug_report.md)
- 💡 [Feature Request](.github/ISSUE_TEMPLATE/feature_request.md)
- ♿ [Accessibility Issue](.github/ISSUE_TEMPLATE/accessibility_issue.md)

**Community:**
- 📜 [Code of Conduct](CODE_OF_CONDUCT.md)
- 🔒 [Security Policy](SECURITY.md)

## 💖 Support

- ☕ [Support on Ko-fi](https://ko-fi.com/luminousdynamics)
- 💝 [GitHub Sponsors](https://github.com/sponsors/Luminous-Dynamics)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Part of the Luminous Dynamics ecosystem.

---

Made with ❄️ by [Luminous Dynamics](https://luminousdynamics.org)
