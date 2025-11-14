# Changelog

All notable changes to nixforhumanity.org will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Privacy Policy page with comprehensive data handling information
- GitHub Actions workflow for automated HTML validation
- Accessibility testing automation
- OG image PNG converter tool
- Enhanced deployment documentation
- README badges for license and project status

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

[Unreleased]: https://github.com/Luminous-Dynamics/nixforhumanity-org/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/Luminous-Dynamics/nixforhumanity-org/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/Luminous-Dynamics/nixforhumanity-org/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/Luminous-Dynamics/nixforhumanity-org/releases/tag/v0.1.0
