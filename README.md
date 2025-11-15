# Nix for Humanity

[![HTML Validation](https://github.com/Luminous-Dynamics/nixforhumanity-org/actions/workflows/validation.yml/badge.svg)](https://github.com/Luminous-Dynamics/nixforhumanity-org/actions/workflows/validation.yml)
[![Accessibility Testing](https://github.com/Luminous-Dynamics/nixforhumanity-org/actions/workflows/accessibility.yml/badge.svg)](https://github.com/Luminous-Dynamics/nixforhumanity-org/actions/workflows/accessibility.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-blue.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-success)](https://nixforhumanity.org)
[![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8.svg)](https://web.dev/progressive-web-apps/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> 🌟 **Making NixOS accessible to everyone through natural language** 🌟

Official website for Luminous Nix - A revolutionary natural language interface for NixOS that works for humans of all technical levels and abilities.

## 🌐 Live Site

Visit us at [nixforhumanity.org](https://nixforhumanity.org)

## 🔗 Quick Links

- 📖 **[FAQ](FAQ.md)** - Frequently asked questions
- 🗺️ **[Roadmap](ROADMAP.md)** - Project vision and timeline
- 🤝 **[Contributing](CONTRIBUTING.md)** - How to contribute
- 🧪 **[Testing Guide](TESTING.md)** - Testing procedures
- 🚀 **[Deployment Guide](DEPLOYMENT.md)** - Deploy and release
- 🔧 **[Maintenance](MAINTENANCE.md)** - Ongoing maintenance
- 🌟 **[Contributors](CONTRIBUTORS.md)** - Recognition and thanks
- 📝 **[Changelog](CHANGELOG.md)** - Version history
- 📊 **[Analytics Guide](ANALYTICS.md)** - Privacy-first analytics setup
- ⚡ **[Build & Optimization](BUILD_OPTIMIZATION.md)** - Performance optimization

## 📋 About

Luminous Nix is a natural language interface for NixOS that makes package management accessible to everyone. Just say what you want in plain English, and it works - no technical knowledge required.

## ✨ Features

- 🗣️ **Natural Language Interface** - Describe what you need in plain English
- ⚡ **10,000x Faster** - Native Python-Nix API integration
- 🧠 **AI-Powered** - Local LLM for intelligent suggestions
- 🛡️ **Safe by Default** - Preview changes before applying
- ♿ **Fully Accessible** - Voice control and screen reader support

## 🛠️ Recent Improvements

### Phase 4: Performance & Developer Experience (Latest)
- ✅ **Dark Mode**: Full dark/light mode toggle with system preference detection
- ✅ **External Assets**: CSS and JS moved to separate files for better caching
- ✅ **Security Hardening**: CSP headers, SRI, .well-known/security.txt
- ✅ **E2E Testing**: Comprehensive Playwright test suite (homepage, forms, mobile, dark mode)
- ✅ **Enhanced SEO**: Triple JSON-LD structured data (SoftwareApplication, Organization, WebPage)
- ✅ **Blog Infrastructure**: Blog template and RSS feed setup
- ✅ **Developer Tools**: package.json with 20+ npm scripts for development
- ✅ **Documentation**: Analytics guide, build & optimization guide
- ✅ **Code Quality**: Prettier config, enhanced .gitignore, pre-commit hooks

### Phase 3: Strategic Documentation
- ✅ **Roadmap**: 5-phase project vision from Foundation to Ecosystem Growth
- ✅ **Maintenance Guide**: Daily to annual maintenance schedules
- ✅ **Contributor Recognition**: Multi-tier contributor system
- ✅ **Automation**: CODEOWNERS and Dependabot configuration

### Phase 2: Progressive Web App
- ✅ **PWA Capabilities**: Manifest, service worker, offline support
- ✅ **Installable**: Works as standalone app on all platforms
- ✅ **FAQ**: 200+ lines answering common questions
- ✅ **Performance Budgets**: Lighthouse CI with strict thresholds
- ✅ **Developer Setup**: VS Code settings, recommended extensions

### Phase 1: Accessibility & Foundation
- ✅ **WCAG 2.1 AA Compliance**: Full accessibility support
- ✅ **Mobile Menu**: Functional hamburger navigation
- ✅ **SEO**: Structured data, Open Graph, Twitter Cards
- ✅ **Testing**: Automated HTML, accessibility, and link validation
- ✅ **Community**: Code of Conduct, Security Policy, Issue templates

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

#### Website (22 files)
- `index.html` - Main landing page (WCAG AA, PWA-enabled, dark mode)
- `styles.css` - External stylesheet with dark mode support
- `script.js` - External JavaScript (PWA, dark mode, mobile menu)
- `404.html` - Custom branded error page
- `privacy.html` - Privacy policy page
- `manifest.json` - PWA manifest for installable app
- `sw.js` - Service worker for offline capability
- `og-image.svg` - Social media preview image (SVG source)
- `convert-og-image.html` - Tool to convert SVG to PNG
- `robots.txt` - Search engine crawler instructions
- `sitemap.xml` - Site structure for search engines
- `humans.txt` - Project credits and team info
- `_headers` - Security headers and CSP configuration
- `.well-known/security.txt` - Security disclosure policy
- `CNAME` - Custom domain configuration
- `.nojekyll` - Disables Jekyll processing
- `.lighthouserc.json` - Performance budget configuration
- `.pre-commit-config.yaml` - Pre-commit hooks
- `.editorconfig` - Code style consistency
- `.prettierrc` - Code formatting configuration
- `.gitignore` - Git ignore patterns
- `package.json` - Development scripts and dependencies

#### Documentation (16 files)
- `README.md` - This file (comprehensive project overview)
- `FAQ.md` - Frequently asked questions
- `ROADMAP.md` - Project vision and timeline
- `CONTRIBUTING.md` - Contribution guidelines
- `CONTRIBUTORS.md` - Contributor recognition
- `CHANGELOG.md` - Version history and changes
- `TESTING.md` - Comprehensive testing guide
- `DEPLOYMENT.md` - Deployment and release guide
- `MAINTENANCE.md` - Ongoing maintenance guide
- `ANALYTICS.md` - Privacy-first analytics and monitoring
- `BUILD_OPTIMIZATION.md` - Performance optimization guide
- `blog/POST_TEMPLATE.md` - Blog post template and guidelines
- `LICENSE` - MIT License
- `CODE_OF_CONDUCT.md` - Community guidelines
- `SECURITY.md` - Security policy and vulnerability reporting
- `OG_IMAGE_README.md` - Social image creation guide

#### GitHub Configuration (12+ files)
- `.github/FUNDING.yml` - Sponsor information
- `.github/CODEOWNERS` - Code ownership and review assignments
- `.github/dependabot.yml` - Dependency update automation
- `.github/ISSUE_TEMPLATE/` - Issue templates (bugs, features, accessibility)
- `.github/PULL_REQUEST_TEMPLATE.md` - PR template with checklists
- `.github/workflows/validation.yml` - HTML validation and link checking
- `.github/workflows/accessibility.yml` - Automated accessibility testing
- `.github/workflows/release.yml` - Automated release creation
- `.github/labels.yml` - Issue label configuration
- `.vscode/settings.json` - VS Code workspace configuration
- `.vscode/extensions.json` - Recommended extensions

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
