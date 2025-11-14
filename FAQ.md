# Frequently Asked Questions (FAQ)

Common questions about Luminous Nix, nixforhumanity.org, and contributing.

## 📋 Table of Contents

- [About Luminous Nix](#about-luminous-nix)
- [About This Website](#about-this-website)
- [Contributing](#contributing)
- [Technical Questions](#technical-questions)
- [Accessibility](#accessibility)

---

## About Luminous Nix

### What is Luminous Nix?

Luminous Nix is a natural language interface for NixOS that makes package management accessible to everyone. Instead of learning complex Nix syntax, you can just say what you want in plain English: "install firefox" or "set up python development" and it works.

### Is Luminous Nix open source?

Yes! Luminous Nix is fully open source. The project is developed by Luminous Dynamics and welcomes contributions from the community.

### How does it work?

Luminous Nix uses:
1. **Local LLM** for understanding natural language
2. **Native Python-Nix API** for fast package operations (10,000x faster than subprocess calls)
3. **Smart suggestions** based on your context and preferences
4. **Safe previews** before making any changes

### When will it be available?

Luminous Nix is currently in beta development. You can join the beta waitlist on [nixforhumanity.org](https://nixforhumanity.org) to be among the first to try it.

### What platforms does it support?

Luminous Nix runs on:
- NixOS 25.11 and later
- Any Linux distribution with Nix installed
- Support for other platforms may be added based on community feedback

### How is it different from Home Manager or nix-env?

**Luminous Nix** adds a natural language layer on top of Nix:
- **Home Manager**: Excellent for declarative configuration, but requires learning Nix syntax
- **nix-env**: Command-line tool with specific commands to memorize
- **Luminous Nix**: Natural language interface that translates your intentions into Nix operations

They complement each other! Luminous Nix can work alongside Home Manager and nix-env.

### Is it really 10,000x faster?

Yes, for package searches! Traditional tools use subprocess calls which can take 3+ seconds. Luminous Nix uses the native Python-Nix API (available in NixOS 25.11) for direct access, completing searches in ~0.29 milliseconds.

For actual package installations, the speed improvement varies but can be 10-1500x faster depending on the operation.

### What does it cost?

**Luminous Nix is completely free and open source.** There are no subscriptions, no paywalls, no feature limitations.

If you'd like to support development, you can:
- ☕ [Support on Ko-fi](https://ko-fi.com/luminousdynamics)
- 💝 [GitHub Sponsors](https://github.com/sponsors/Luminous-Dynamics)
- 🤝 Contribute code, documentation, or ideas

---

## About This Website

### What is nixforhumanity.org?

This is the official website for Luminous Nix. It provides information about the project, allows you to join the beta program, and showcases our commitment to accessibility and inclusive design.

### Can I install the website as an app?

Yes! This website is a Progressive Web App (PWA). You can install it on your device:

**Desktop:**
1. Look for the install icon in your browser's address bar
2. Click "Install" when prompted
3. The site will open in its own window

**Mobile:**
1. Open the site in your mobile browser
2. Tap the share/menu button
3. Select "Add to Home Screen"
4. The icon will appear on your home screen

### Does the website work offline?

Yes! After your first visit, essential pages are cached and available offline. This includes the home page, privacy policy, and 404 page.

### Is the website accessible?

Absolutely! We're committed to accessibility:
- ✅ **WCAG 2.1 Level AA** compliant
- ✅ **Screen reader** compatible
- ✅ **Keyboard navigation** fully supported
- ✅ **High contrast** throughout
- ✅ **Proper focus states** on all interactive elements
- ✅ **Semantic HTML** for assistive technologies

We continuously test with real screen readers (NVDA, JAWS, VoiceOver) and welcome accessibility feedback.

### Who designed the website?

The website was designed and built with assistance from Claude (Anthropic's AI assistant) in collaboration with Luminous Dynamics, following accessibility-first principles and modern web standards.

### What technologies power the website?

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Forms**: Formspree
- **Donations**: Ko-fi
- **No tracking**: We don't use Google Analytics or similar tools

### How is my privacy protected?

See our comprehensive [Privacy Policy](privacy.html). In short:
- We collect only what you provide (beta signup)
- We never sell your data
- No tracking cookies or analytics
- Form processing via Formspree
- Minimal data retention

---

## Contributing

### How can I contribute?

We welcome all types of contributions:

**Code:**
- Bug fixes
- New features
- Performance improvements
- Accessibility enhancements

**Documentation:**
- Fix typos
- Improve clarity
- Add examples
- Translate content

**Testing:**
- Test on different browsers
- Test with assistive technologies
- Report bugs
- Suggest improvements

**Design:**
- UI/UX improvements
- Visual enhancements
- Mobile optimization

See our [Contributing Guide](CONTRIBUTING.md) for details!

### Do I need to know NixOS to contribute?

Not necessarily! We need help with:
- Website improvements (HTML/CSS/JS)
- Documentation
- Accessibility testing
- Design and UX
- Bug reports

Even if you're new to NixOS, your perspective as a beginner is valuable!

### How do I report a bug?

1. Check if it's already reported in [GitHub Issues](https://github.com/Luminous-Dynamics/nixforhumanity-org/issues)
2. If not, create a new issue using our [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md)
3. Include:
   - What you expected
   - What actually happened
   - Steps to reproduce
   - Your browser/device info

### How do I suggest a feature?

Use our [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md) and describe:
- The feature you'd like
- Why it would be useful
- How you envision it working
- Any alternatives you've considered

### What's the Code of Conduct?

We follow the [Contributor Covenant](CODE_OF_CONDUCT.md). Key points:
- Be respectful and inclusive
- Welcome newcomers of all skill levels
- Prioritize accessibility
- Assume good intent
- Focus on what's best for the community

Harassment and discrimination are not tolerated.

### Are there "good first issues"?

Yes! Look for issues labeled `good first issue` in our [issue tracker](https://github.com/Luminous-Dynamics/nixforhumanity-org/issues). These are specifically chosen to be beginner-friendly.

---

## Technical Questions

### What browsers are supported?

We test on the latest 2 versions of:
- **Desktop**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Chrome Android, Samsung Internet

The site uses standard web technologies and should work on any modern browser.

### Why doesn't the mobile menu work in my browser?

If the hamburger menu doesn't work:
1. Ensure JavaScript is enabled
2. Try a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Check browser console for errors
4. Update your browser to the latest version

Still having issues? [Report a bug](https://github.com/Luminous-Dynamics/nixforhumanity-org/issues/new/choose).

### How do I clear the service worker cache?

If you're seeing outdated content:

**Chrome/Edge:**
1. Open DevTools (F12)
2. Go to Application tab
3. Click "Service Workers"
4. Click "Unregister"
5. Refresh the page

**Firefox:**
1. Open Developer Tools (F12)
2. Go to Application → Service Workers
3. Click "Unregister"
4. Refresh

### Can I use this website as a template?

Yes! This website is open source (MIT License). Feel free to:
- Study the code
- Use it as reference
- Fork and modify for your project

Please:
- Give attribution
- Follow the MIT License terms
- Consider contributing improvements back

### How do I convert the OG image to PNG?

We provide a browser-based tool:
1. Open `convert-og-image.html` in your browser
2. Click "Convert SVG to PNG"
3. The PNG will download automatically
4. Upload to your repository

No command-line tools needed!

### How often is the website updated?

- **Content**: As needed
- **Security patches**: Immediately
- **Feature updates**: Following semantic versioning
- **Dependencies**: Minimal (we use vanilla JS)

Check the [CHANGELOG.md](CHANGELOG.md) for version history.

---

## Accessibility

### Is keyboard navigation supported?

Yes! Every feature works with keyboard alone:
- **Tab**: Move to next element
- **Shift+Tab**: Move to previous element
- **Enter/Space**: Activate buttons/links
- **Escape**: Close mobile menu

A "Skip to main content" link appears on first Tab press.

### How do I use this site with a screen reader?

The site is fully compatible with:
- **NVDA** (Windows)
- **JAWS** (Windows)
- **VoiceOver** (macOS/iOS)
- **TalkBack** (Android)

All images have alt text, forms have labels, and headings are properly structured.

### The color contrast seems low. Can I change it?

The site meets WCAG 2.1 AA contrast requirements (4.5:1 minimum). However, you can:

**Increase contrast in your browser:**
- Most browsers have high-contrast modes
- Use browser zoom (Ctrl/Cmd + +)
- Enable OS-level high contrast

**Provide feedback:**
If specific text is hard to read, [report an accessibility issue](.github/ISSUE_TEMPLATE/accessibility_issue.md). We take this seriously!

### Are there any flashing or moving elements?

- The terminal cursor blinks slowly (1s interval)
- Terminal content changes every 8 seconds
- Both can be paused using browser settings

No rapid flashing that could trigger seizures (we follow WCAG 2.3.1).

### I found an accessibility barrier. How do I report it?

Thank you for helping us improve! Use our [Accessibility Issue template](.github/ISSUE_TEMPLATE/accessibility_issue.md) to report:
- What assistive technology you're using
- What you expected to happen
- What actually happened
- How it affects accessibility

We prioritize accessibility issues.

---

## Still Have Questions?

**Didn't find your answer?**

- 💬 [Start a Discussion](https://github.com/Luminous-Dynamics/luminous-nix/discussions)
- 🐛 [Open an Issue](https://github.com/Luminous-Dynamics/nixforhumanity-org/issues/new/choose)
- 🌐 [Visit Luminous Dynamics](https://luminousdynamics.org)
- ☕ [Support on Ko-fi](https://ko-fi.com/luminousdynamics) (we respond to supporters!)

---

**Last Updated:** November 14, 2025

**Found a mistake or have a suggestion?** This FAQ is maintained in our [GitHub repository](https://github.com/Luminous-Dynamics/nixforhumanity-org). Contributions welcome!
