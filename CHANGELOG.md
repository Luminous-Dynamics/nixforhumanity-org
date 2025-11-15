# Changelog

All notable changes to nixforhumanity.org will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- README updates with Phase 6-7 achievements
- Documentation file count updated to 21 files

### Changed
- Updated recent improvements section with latest 2 phases

## [4.0.0] - 2025-01-16 - Phase 7: FAQ, Tutorial Content & Enhanced User Onboarding

### Added
- **Interactive FAQ Section on Homepage**
  - 10 comprehensive questions covering core topics
  - Smooth accordion UI with expand/collapse animations
  - Keyboard navigation support (Enter, Space, Escape)
  - URL hash linking for direct question access
  - Analytics tracking for popular questions
  - Auto-scroll on expand for better UX
  - Mobile-optimized responsive design
  - Full ARIA accessibility support

- **Tutorial Blog Post** (3,600+ words)
  - Complete "Getting Started" guide (12-minute read)
  - 8 major sections with table of contents
  - Installation, basic operations, advanced features
  - Troubleshooting section with 4 common issues
  - Multi-language code examples (5 languages)
  - Best practices and next steps
  - Callout boxes (success, warning, info)
  - Full SEO optimization with OpenGraph & Twitter Cards
  - Schema.org TechArticle structured data

- **Blog Infrastructure Updates**
  - Updated blog index with categorization badges
  - Enhanced RSS feed with tutorial entry
  - Tutorial categorized as Tutorial/Getting Started/Beginners
  - Updated sitemap with tutorial URL (priority 0.8)
  - Better visual hierarchy on blog pages

### Changed
- Enhanced FAQ section CSS (+115 lines)
- Enhanced FAQ accordion JavaScript (+70 lines)
- Updated blog feed lastBuildDate to 2025-01-16
- Improved blog post metadata and descriptions

## [3.2.0] - 2025-01-15 - Phase 6: Content Excellence, Advanced UX & Performance Optimization

### Added
- **RSS Feed Infrastructure**
  - Complete RSS 2.0 feed at blog/feed.xml
  - Channel metadata and image
  - RSS subscribe button on blog index
  - Proper CDATA formatting for content

- **Loading States & Skeleton Screens**
  - Skeleton screens with shimmer animations
  - Loading spinners for buttons
  - ARIA live regions for screen readers
  - Fade transitions for content loading
  - Visually-hidden helper class for accessibility

- **Advanced Micro-Interactions**
  - Ripple effects on button clicks (Material Design style)
  - Card hover animations with 3D lift
  - Link underline animations
  - Input focus effects with scale and glow
  - Share button ripple effects
  - Comparison cell hover animations
  - Stat badge interactive effects

- **Scroll Features**
  - Scroll progress indicator at top of page
  - Gradient bar showing reading position
  - Back-to-top floating button (appears at 500px)
  - Smooth scroll with header offset
  - Parallax effects on hero sections

- **Keyboard Enhancements**
  - Ctrl+/ to toggle theme
  - Ctrl+K for search (when implemented)
  - Escape to close mobile menu
  - Full keyboard shortcut system

- **Service Worker v3.2.0** (Complete Rewrite)
  - 3 separate cache types (static, dynamic, images)
  - Cache-first strategy for static assets
  - Network-first for dynamic content & GitHub API
  - Stale-while-revalidate for blog content
  - Cache size limits (50 dynamic, 30 images)
  - 7-day cache freshness checking
  - Automatic cleanup on activation
  - Message handlers (SKIP_WAITING, CACHE_URLS, CLEAR_CACHE, GET_CACHE_SIZE)

- **Additional Features**
  - Tooltips on hover for badges/icons
  - Smooth scroll for anchor links
  - Enhanced focus states for keyboard navigation
  - Prefers-reduced-motion support

### Changed
- Enhanced styles.css (+150 lines for UX improvements)
- Enhanced script.js (+300 lines for interactivity)
- Updated CHANGELOG with comprehensive version history
- Updated sitemap with blog URLs
- Improved button states and transitions

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

[Unreleased]: https://github.com/Luminous-Dynamics/nixforhumanity-org/compare/v4.0.0...HEAD
[4.0.0]: https://github.com/Luminous-Dynamics/nixforhumanity-org/compare/v3.2.0...v4.0.0
[3.2.0]: https://github.com/Luminous-Dynamics/nixforhumanity-org/compare/v3.1.0...v3.2.0
[3.1.0]: https://github.com/Luminous-Dynamics/nixforhumanity-org/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/Luminous-Dynamics/nixforhumanity-org/compare/v2.1.0...v3.0.0
[2.1.0]: https://github.com/Luminous-Dynamics/nixforhumanity-org/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/Luminous-Dynamics/nixforhumanity-org/compare/v1.1.0...v2.0.0
[1.1.0]: https://github.com/Luminous-Dynamics/nixforhumanity-org/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/Luminous-Dynamics/nixforhumanity-org/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/Luminous-Dynamics/nixforhumanity-org/releases/tag/v0.1.0
