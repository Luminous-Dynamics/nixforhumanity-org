# Blog Post Template

Use this template to create new blog posts for nixforhumanity.org.

## File Naming Convention

`YYYY-MM-DD-post-title-slug.html`

Example: `2025-01-15-introducing-luminous-nix.html`

## HTML Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Post Title - Luminous Nix Blog</title>
    <meta name="description" content="Brief description of your post for SEO">
    <meta name="author" content="Author Name">
    <meta property="og:title" content="Your Post Title">
    <meta property="og:description" content="Brief description">
    <meta property="og:image" content="https://nixforhumanity.org/og-image.png">
    <meta property="og:type" content="article">
    <meta property="article:published_time" content="2025-01-15T00:00:00Z">
    <meta property="article:author" content="Author Name">
    <link rel="stylesheet" href="../styles.css">
    <link rel="canonical" href="https://nixforhumanity.org/blog/your-post-slug.html">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>❄️</text></svg>">

    <!-- Structured Data for Blog Post -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Your Post Title",
      "description": "Brief description of your post",
      "image": "https://nixforhumanity.org/og-image.png",
      "author": {
        "@type": "Person",
        "name": "Author Name"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Luminous Dynamics",
        "logo": {
          "@type": "ImageObject",
          "url": "https://nixforhumanity.org/og-image.png"
        }
      },
      "datePublished": "2025-01-15T00:00:00Z",
      "dateModified": "2025-01-15T00:00:00Z",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://nixforhumanity.org/blog/your-post-slug.html"
      }
    }
    </script>
</head>
<body>
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <nav aria-label="Main navigation">
        <div class="logo">🌟 <a href="/" style="color: inherit; text-decoration: none;">Luminous Nix</a></div>
        <button class="mobile-menu-btn" aria-label="Toggle navigation menu" aria-expanded="false">☰</button>
        <div class="nav-links" role="navigation">
            <a href="/">Home</a>
            <a href="/blog">Blog</a>
            <a href="https://github.com/Luminous-Dynamics/luminous-nix" target="_blank" rel="noopener noreferrer">GitHub</a>
            <button id="theme-toggle" class="theme-toggle" aria-label="Switch to light mode">🌙</button>
        </div>
    </nav>

    <main id="main-content">
        <article style="max-width: 800px; margin: 0 auto; padding: 4rem 2rem;">
            <header style="margin-bottom: 3rem;">
                <h1 style="color: var(--nix-light); margin-bottom: 1rem;">Your Post Title</h1>
                <div style="opacity: 0.7;">
                    <time datetime="2025-01-15">January 15, 2025</time> •
                    <span>Author Name</span> •
                    <span>5 min read</span>
                </div>
            </header>

            <!-- Post Content -->
            <section style="line-height: 1.8;">
                <p>Your introduction paragraph here...</p>

                <h2 style="color: var(--nix-light); margin-top: 2rem;">First Section</h2>
                <p>Content goes here...</p>

                <h2 style="color: var(--nix-light); margin-top: 2rem;">Second Section</h2>
                <p>More content...</p>

                <!-- Code example -->
                <div class="code-block">
                    <pre>ask-nix "install firefox"</pre>
                </div>

                <h2 style="color: var(--nix-light); margin-top: 2rem;">Conclusion</h2>
                <p>Wrap up your post...</p>
            </section>

            <!-- Call to Action -->
            <section style="margin-top: 3rem; padding: 2rem; background: var(--card-bg); border-radius: 10px; text-align: center;">
                <h3 style="color: var(--nix-light); margin-bottom: 1rem;">Try Luminous Nix Today</h3>
                <p style="margin-bottom: 1rem;">Make NixOS accessible through natural language</p>
                <a href="/#install" class="cta-btn cta-btn-primary">Get Started</a>
            </section>

            <!-- Navigation -->
            <nav style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(82, 119, 195, 0.3);">
                <a href="/blog" style="color: var(--nix-light);">← Back to Blog</a>
            </nav>
        </article>
    </main>

    <footer style="padding: 3rem 2rem; text-align: center; background: var(--soft-black); margin-top: 4rem;">
        <p style="opacity: 0.7;">© 2025 Luminous Nix - Part of Luminous Dynamics</p>
    </footer>

    <script src="../script.js" defer></script>
</body>
</html>
```

## Content Guidelines

### Writing Style
- Use clear, accessible language
- Explain technical concepts for non-experts
- Include code examples where appropriate
- Add alt text for all images
- Use proper heading hierarchy (h1 → h2 → h3)

### SEO Best Practices
- Unique, descriptive title (50-60 characters)
- Meta description (150-160 characters)
- Use keywords naturally
- Include internal links to other pages
- Add structured data (JSON-LD)

### Accessibility
- Proper heading structure
- Alt text for images
- Descriptive link text
- Code blocks with syntax highlighting
- High contrast colors
- Keyboard navigation support

### Images
- Optimize images (use WebP or compressed PNG/JPG)
- Max width: 800px for content images
- Include descriptive alt text
- Use lazy loading for performance

## Publishing Checklist

- [ ] Title is clear and compelling
- [ ] Meta description is written
- [ ] All links work correctly
- [ ] Images are optimized and have alt text
- [ ] Code examples are tested
- [ ] Structured data is valid (test with Google's Rich Results Test)
- [ ] Post is proofread
- [ ] Dark mode looks good
- [ ] Mobile responsive
- [ ] Added to blog/index.html
- [ ] Updated RSS feed (if applicable)
- [ ] Tested accessibility (Pa11y, screen reader)

## Promotion

After publishing:
1. Share on GitHub Discussions
2. Post in relevant NixOS communities
3. Tweet/post on social media
4. Add to newsletter (if applicable)
5. Update CHANGELOG.md if announcing features

## RSS Feed

Add entry to `blog/feed.xml`:

```xml
<item>
    <title>Your Post Title</title>
    <link>https://nixforhumanity.org/blog/your-post-slug.html</link>
    <guid>https://nixforhumanity.org/blog/your-post-slug.html</guid>
    <pubDate>Wed, 15 Jan 2025 00:00:00 +0000</pubDate>
    <description>Brief description of your post</description>
    <author>author@luminousdynamics.org (Author Name)</author>
</item>
```
