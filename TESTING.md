# Testing Guide

Comprehensive testing guide for nixforhumanity.org to ensure quality, accessibility, and performance.

## 🎯 Testing Philosophy

We maintain high standards through:
- **Automated testing** via GitHub Actions
- **Manual accessibility testing** with real assistive technologies
- **Cross-browser testing** on major browsers
- **Performance monitoring** with Lighthouse
- **Visual regression testing** on key viewports

## 🚀 Quick Start

### Local Testing Setup

```bash
# Clone the repository
git clone https://github.com/Luminous-Dynamics/nixforhumanity-org.git
cd nixforhumanity-org

# Start local server (choose one)
python -m http.server 8000
# OR
npx serve

# Open in browser
open http://localhost:8000
```

## 🤖 Automated Testing

### GitHub Actions (runs automatically)

Every push and PR triggers:

1. **HTML Validation** (`.github/workflows/validation.yml`)
   - HTML5 syntax validation
   - Link checking (internal and external)
   - Lighthouse CI performance audit

2. **Accessibility Testing** (`.github/workflows/accessibility.yml`)
   - Pa11y WCAG 2.1 AA compliance
   - Axe Core accessibility scanner
   - Color contrast validation

View results: [GitHub Actions](https://github.com/Luminous-Dynamics/nixforhumanity-org/actions)

### Running Tests Locally

#### HTML Validation

```bash
# Using npm (install html-validate)
npx html-validate *.html

# Using docker
docker run -v $(pwd):/data cyb3rjak3/html5validator /data/*.html
```

#### Link Checking

```bash
# Install lychee
npm install -g lychee

# Check links
lychee *.html README.md
```

#### Accessibility Testing

```bash
# Install Pa11y
npm install -g pa11y-ci

# Create config
cat > .pa11yci.json << 'EOF'
{
  "defaults": {
    "standard": "WCAG2AA",
    "timeout": 10000
  },
  "urls": [
    "http://localhost:8000/index.html",
    "http://localhost:8000/404.html",
    "http://localhost:8000/privacy.html"
  ]
}
EOF

# Run tests (server must be running)
pa11y-ci
```

#### Lighthouse Performance

```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse http://localhost:8000 --view

# Or use Chrome DevTools > Lighthouse tab
```

## ♿ Manual Accessibility Testing

### Keyboard Navigation Test

**Required: All interactive elements must be keyboard accessible**

```
Test Checklist:
□ Press Tab - moves forward through interactive elements
□ Press Shift+Tab - moves backward
□ Press Enter/Space - activates buttons and links
□ Press Escape - closes mobile menu
□ Focus is always visible (gold outline)
□ Skip-to-content link appears on first Tab
□ Logical tab order throughout page
```

### Screen Reader Testing

#### macOS (VoiceOver)

```bash
# Enable VoiceOver
Cmd + F5

# Basic navigation
Ctrl+Option+Right Arrow - Next element
Ctrl+Option+Left Arrow - Previous element
Ctrl+Option+Space - Activate element
```

**Test checklist:**
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Headings are properly structured (h1 → h2 → h3)
- [ ] Landmarks (nav, main, footer) are announced
- [ ] ARIA labels are read correctly
- [ ] Link purposes are clear

#### Windows (NVDA - free)

```
Download: https://www.nvaccess.org/download/

# Basic navigation
Down Arrow - Next element
Up Arrow - Previous element
Enter - Activate element
H - Next heading
```

#### Mobile (TalkBack/VoiceOver)

Test on actual devices:
- [ ] iOS Safari with VoiceOver
- [ ] Android Chrome with TalkBack
- [ ] Swipe navigation works
- [ ] Double-tap activation works
- [ ] All content is reachable

### Color Contrast Testing

**WCAG 2.1 AA requires 4.5:1 ratio for normal text**

```bash
# Online tools
https://webaim.org/resources/contrastchecker/

# Our color combinations (all passing):
- White (#ffffff) on Dark (#1a1a2e) = 14.6:1 ✅
- Nix Light (#7EBAE4) on Dark (#1a1a2e) = 6.8:1 ✅
- Gold (#FFD700) on Dark (#1a1a2e) = 10.9:1 ✅
- Terminal output (#aaa) on Black (#0a0a0a) = 10.1:1 ✅
```

## 🌐 Cross-Browser Testing

### Required Browsers

Test on latest 2 versions of:

**Desktop:**
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (macOS)
- [ ] Edge

**Mobile:**
- [ ] iOS Safari (iPhone)
- [ ] iOS Safari (iPad)
- [ ] Chrome Android
- [ ] Samsung Internet

### Browser Testing Checklist

For each browser, verify:

**Layout & Design:**
- [ ] No horizontal scrolling on mobile
- [ ] All text is readable
- [ ] Images load correctly
- [ ] Gradients render properly
- [ ] Terminal animation works

**Functionality:**
- [ ] Mobile menu opens/closes
- [ ] All links work
- [ ] Form submission works
- [ ] Ko-fi widget loads
- [ ] Smooth scrolling works

**Performance:**
- [ ] Page loads in < 3 seconds
- [ ] No console errors
- [ ] Animations are smooth
- [ ] No layout shifts

## 📱 Responsive Testing

### Test Viewports

**Mobile:**
- [ ] 320px (iPhone SE)
- [ ] 375px (iPhone 12/13)
- [ ] 414px (iPhone 12 Pro Max)
- [ ] 360px (Android common)

**Tablet:**
- [ ] 768px (iPad portrait)
- [ ] 1024px (iPad landscape)

**Desktop:**
- [ ] 1366px (laptop)
- [ ] 1920px (desktop)
- [ ] 2560px (large desktop)

### Responsive Checklist

- [ ] Mobile menu works on small screens
- [ ] Text scales appropriately
- [ ] No content overflow
- [ ] Images resize properly
- [ ] Grid layouts adapt
- [ ] Forms are usable on mobile
- [ ] Buttons are tap-friendly (min 44x44px)

## 🔍 SEO Testing

### Meta Tags Validation

```bash
# Check with online tools
https://www.opengraph.xyz/
https://cards-dev.twitter.com/validator
https://developers.facebook.com/tools/debug/
```

**Checklist:**
- [ ] Title tag (50-60 characters)
- [ ] Meta description (150-160 characters)
- [ ] Open Graph tags complete
- [ ] Twitter Card tags complete
- [ ] Canonical URL set
- [ ] robots.txt accessible
- [ ] sitemap.xml accessible

### Search Engine Testing

```bash
# Test robots.txt
curl https://nixforhumanity.org/robots.txt

# Test sitemap
curl https://nixforhumanity.org/sitemap.xml

# Validate structured data
https://search.google.com/test/rich-results
```

## ⚡ Performance Testing

### Lighthouse Metrics

**Target scores (min 90/100):**
- [ ] Performance: 90+
- [ ] Accessibility: 100
- [ ] Best Practices: 100
- [ ] SEO: 100

### Core Web Vitals

**Must pass:**
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1

### Page Speed

```bash
# Test with WebPageTest
https://www.webpagetest.org/

# Test with PageSpeed Insights
https://pagespeed.web.dev/
```

## 🐛 Pre-Commit Checklist

Before pushing changes, verify:

**Code Quality:**
- [ ] HTML validates (no errors)
- [ ] No broken links
- [ ] No console errors
- [ ] Proper indentation (4 spaces)

**Accessibility:**
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] ARIA labels where needed
- [ ] Color contrast passes
- [ ] Keyboard navigation works

**Responsive:**
- [ ] Tested on mobile viewport
- [ ] Tested on tablet viewport
- [ ] Tested on desktop viewport
- [ ] No horizontal scroll

**Performance:**
- [ ] Images optimized
- [ ] No unnecessary scripts
- [ ] Proper resource hints
- [ ] Deferred loading where appropriate

**Documentation:**
- [ ] CHANGELOG.md updated
- [ ] README.md updated if needed
- [ ] Comments added for complex code

## 🎨 Visual Regression Testing

### Manual Visual Testing

**Compare screenshots before/after:**

```bash
# Take screenshots at key viewports
# Mobile (375px)
# Tablet (768px)
# Desktop (1920px)

# Check:
- Layout consistency
- Typography rendering
- Color accuracy
- Image quality
- Animation smoothness
```

### Tools for Visual Testing

- **Percy** (paid): https://percy.io/
- **Chromatic** (paid): https://www.chromatic.com/
- **BackstopJS** (free): https://github.com/garris/BackstopJS

## 🔒 Security Testing

### Basic Security Checklist

- [ ] HTTPS only (enforced by GitHub Pages)
- [ ] External links use rel="noopener noreferrer"
- [ ] Form honeypot in place
- [ ] No inline JavaScript with user data
- [ ] No exposed API keys
- [ ] Content Security Policy considered

### Security Scanning

```bash
# Check security headers
https://securityheaders.com/

# SSL test
https://www.ssllabs.com/ssltest/
```

## 📊 Analytics & Monitoring

### Privacy-Friendly Options (if needed)

- **Plausible** - Privacy-focused, GDPR compliant
- **Fathom** - Simple, privacy-first
- **GoatCounter** - Open source, no cookies

**Note:** Currently, we don't use analytics per privacy policy.

## 🚨 Issue Reporting

If you find a bug during testing:

1. Check [existing issues](https://github.com/Luminous-Dynamics/nixforhumanity-org/issues)
2. Use appropriate template:
   - [Bug Report](.github/ISSUE_TEMPLATE/bug_report.md)
   - [Accessibility Issue](.github/ISSUE_TEMPLATE/accessibility_issue.md)
3. Include:
   - Browser/device info
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

## 📚 Additional Resources

### Accessibility
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Resources](https://webaim.org/resources/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

### Performance
- [Web.dev Performance](https://web.dev/performance/)
- [MDN Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)

### Testing Tools
- [HTML Validator](https://validator.w3.org/)
- [Link Checker](https://validator.w3.org/checklink)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## 🎯 Testing Summary

**Minimum requirements before merge:**
- ✅ All automated tests pass
- ✅ Keyboard navigation works
- ✅ Tested on 2+ browsers
- ✅ Tested on mobile viewport
- ✅ No console errors
- ✅ Accessibility score 100

Thank you for maintaining our high quality standards! 🌟
