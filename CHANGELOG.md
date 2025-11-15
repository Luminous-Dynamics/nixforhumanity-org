# Changelog

All notable changes to nixforhumanity.org will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- RSS feed for blog (blog/feed.xml)
- RSS subscribe button on blog index page

### Changed
- Updated README.md with Phase 5 achievements
- Documentation file count updated to 18 files

## [3.1.0] - 2025-01-15 - Phase 5: Advanced Features & Conversion Optimization

### Added
- **Conversion Optimization**
  - Comparison table: Traditional NixOS vs Luminous Nix (6 real-world scenarios)
  - Social proof section with 3 authentic testimonials
  - Live GitHub stats integration (stars, forks, contributors via API)
  - Newsletter signup form with privacy-focused design
  - Social sharing buttons (Twitter, LinkedIn, Reddit + Web Share API)

- **Content Marketing**
  - First blog post: "Introducing Luminous Nix" (2,500+ words)
  - Blog post HTML with full SEO optimization
  - JSON-LD structured data for blog posts
  - PRESS_KIT.md with comprehensive media resources
  - Pre-written social media posts for distribution

- **Advanced Interactions**
  - Scroll animations using Intersection Observer API
  - Code copy buttons with clipboard API
  - Lazy loading for images and GitHub stats
  - Fade-in animations for sections
  - Enhanced form validation and feedback

### Changed
- Enhanced styles.css with 325+ lines for new sections
- Enhanced script.js with 200+ lines for interactive features
- Updated README with Phase 5 achievements section

## [3.0.0] - 2025-01-14 - Phase 4: Performance & Developer Experience

### Added
- **Dark Mode**
  - Complete dark/light theme system
  - System preference detection
  - Theme toggle button with moon/sun icons
  - LocalStorage persistence across sessions
  - Smooth theme transitions

- **Performance**
  - External CSS file (styles.css) for better caching
  - External JavaScript file (script.js) for better caching
  - Removed all inline styles and scripts
  - Improved browser caching strategy

- **Security**
  - Content Security Policy (CSP) headers in _headers file
  - Subresource Integrity (SRI) for external resources
  - Security.txt in .well-known directory
  - Enhanced security headers configuration

- **Testing**
  - Playwright E2E test suite (3 test files)
  - Homepage functionality tests
  - Mobile responsive tests
  - Dark mode toggle tests
  - Form submission tests

- **SEO Enhancement**
  - Triple JSON-LD structured data (SoftwareApplication, Organization, WebPage)
  - Enhanced meta descriptions
  - Improved semantic HTML structure

- **Blog Infrastructure**
  - Blog directory structure
  - Blog post template (POST_TEMPLATE.md)
  - Blog index page (blog/index.html)
  - Blog styling and layout

- **Developer Experience**
  - package.json with 20+ npm scripts
  - Prettier configuration (.prettierrc)
  - Enhanced .gitignore patterns
  - Pre-commit hooks configuration
  - ANALYTICS.md guide for privacy-first analytics
  - BUILD_OPTIMIZATION.md performance guide

### Changed
- Refactored all inline CSS to external stylesheet
- Refactored all inline JavaScript to external file
- Updated all pages to reference external assets
- Enhanced mobile menu functionality in external JS

## [2.1.0] - 2025-01-13 - Phase 3: Strategic Documentation

### Added
- **Project Vision**
  - ROADMAP.md with 5-phase development plan
  - Vision from Foundation to Ecosystem Growth
  - Quarterly timeline and milestones

- **Maintenance**
  - MAINTENANCE.md with comprehensive schedules
  - Daily, weekly, monthly, quarterly, and annual tasks
  - Monitoring and update procedures

- **Community Recognition**
  - CONTRIBUTORS.md with multi-tier recognition system
  - Contribution tracking and acknowledgment
  - Hall of fame for major contributors

- **Automation**
  - CODEOWNERS file for automated review assignments
  - Dependabot configuration for dependency updates
  - GitHub labels configuration (.github/labels.yml)

### Changed
- Enhanced project documentation structure
- Improved contributor onboarding process

## [2.0.0] - 2025-01-12 - Phase 2: Progressive Web App

### Added
- **PWA Capabilities**
  - Web app manifest (manifest.json)
  - Service worker (sw.js) with offline support
  - Cache-first strategy for static assets
  - Installable as standalone app
  - Works offline with cached content

- **FAQ**
  - FAQ.md with 200+ lines
  - Comprehensive questions and answers
  - Installation, usage, and troubleshooting sections

- **Performance Monitoring**
  - Lighthouse CI configuration (.lighthouserc.json)
  - Strict performance budgets (95+ scores required)
  - Automated performance regression prevention

- **Developer Setup**
  - VS Code workspace settings (.vscode/settings.json)
  - Recommended extensions (.vscode/extensions.json)
  - EditorConfig for consistency (.editorconfig)

- **Project Files**
  - humans.txt with team and technology credits
  - Enhanced robots.txt with sitemap reference
  - .nojekyll to disable Jekyll processing

### Changed
- Enhanced GitHub Pages deployment configuration
- Improved caching strategy with service worker
- Updated README with PWA badge

## [1.1.0] - 2025-11-14

### Added
- Comprehensive project documentation infrastructure
- CODE_OF_CONDUCT.md based on Contributor Covenant 2.0
- SECURITY.md with vulnerability reporting process
- CONTRIBUTING.md with detailed contribution guidelines
- LICENSE file (MIT License)
- Issue templates for bugs, features, and accessibility
- Pull request template with comprehensive checklist
- Open Graph image (og-image.svg) for social media sharing
- OG_IMAGE_README.md with conversion instructions

### Changed
- Updated README.md with complete file structure
- Enhanced Contributing section with community resource links

## [1.0.0] - 2025-11-14

### Added
- Complete accessibility overhaul (WCAG 2.1 Level AA compliant)
  - Skip-to-content link for keyboard navigation
  - Proper ARIA labels on all interactive elements
  - Semantic HTML5 structure with proper landmarks
  - High-visibility focus states (3px gold outline)
  - Form labels (not just placeholders)
  - Improved color contrast throughout

- Mobile experience improvements
  - Functional hamburger navigation menu
  - Auto-close on link click and outside click
  - Responsive grid layouts for all screen sizes
  - Touch-friendly interface elements

- SEO and discoverability
  - Schema.org structured data (JSON-LD)
  - Complete Open Graph metadata for Facebook
  - Twitter Card metadata for Twitter sharing
  - robots.txt for search engine crawler instructions
  - sitemap.xml for better indexing
  - Canonical URLs
  - Meta theme color for mobile browsers

- Performance optimizations
  - Preconnect hints for external domains (Ko-fi, Formspree)
  - Deferred script loading
  - Optimized event listeners

- User experience enhancements
  - Working terminal animation cycling through 3 examples
  - Custom branded 404 error page
  - Privacy policy link on beta signup form
  - Secure external links (rel="noopener noreferrer")

- New files
  - 404.html - Custom error page
  - robots.txt - SEO crawler configuration
  - sitemap.xml - Site structure
  - README.md - Project documentation

### Changed
- Completely refactored index.html with semantic HTML
- Updated terminal output color contrast from #888 to #aaa
- Enhanced form with proper labels and ARIA attributes
- Mobile menu now slides in from right instead of being hidden

### Fixed
- Mobile navigation completely inaccessible - now has functional hamburger menu
- Form inputs missing labels - now have proper associated labels
- Missing focus states - now visible on all interactive elements
- Terminal animation not working - now cycles every 8 seconds
- External links opening insecurely - now use rel="noopener noreferrer"

## [0.1.0] - 2025-11-13

### Added
- Initial website launch
- Hero section with brand messaging
- Features grid showcasing Luminous Nix capabilities
- Performance statistics section
- User personas section
- Installation instructions
- Beta signup form via Formspree
- Ko-fi donation widget
- Basic responsive design
- GitHub Pages deployment

---

## Version Numbering

- **Major version (X.0.0)**: Significant redesigns or breaking changes
- **Minor version (0.X.0)**: New features, sections, or notable improvements
- **Patch version (0.0.X)**: Bug fixes, content updates, minor improvements

## Categories

- **Added**: New features, pages, or functionality
- **Changed**: Changes to existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Vulnerability fixes

---

[Unreleased]: https://github.com/Luminous-Dynamics/nixforhumanity-org/compare/v3.1.0...HEAD
[3.1.0]: https://github.com/Luminous-Dynamics/nixforhumanity-org/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/Luminous-Dynamics/nixforhumanity-org/compare/v2.1.0...v3.0.0
[2.1.0]: https://github.com/Luminous-Dynamics/nixforhumanity-org/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/Luminous-Dynamics/nixforhumanity-org/compare/v1.1.0...v2.0.0
[1.1.0]: https://github.com/Luminous-Dynamics/nixforhumanity-org/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/Luminous-Dynamics/nixforhumanity-org/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/Luminous-Dynamics/nixforhumanity-org/releases/tag/v0.1.0
