# Build & Optimization Guide

> Comprehensive guide to building, optimizing, and deploying nixforhumanity.org for maximum performance

## Table of Contents

- [Quick Start](#quick-start)
- [Development Workflow](#development-workflow)
- [Optimization Techniques](#optimization-techniques)
- [Build Process](#build-process)
- [Performance Budgets](#performance-budgets)
- [Deployment](#deployment)
- [Monitoring](#monitoring)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Luminous-Dynamics/nixforhumanity-org.git
cd nixforhumanity-org

# Install dependencies (optional, for testing tools)
npm install

# Start local development server
npm run dev
# Or simply:
python3 -m http.server 8000

# Open http://localhost:8000
```

## Development Workflow

### Local Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run E2E tests
npm run test:e2e

# Run Lighthouse
npm run lighthouse

# Format code
npm run format
```

### Pre-commit Checks

We use pre-commit hooks (`.pre-commit-config.yaml`):

```bash
# Install pre-commit
pip install pre-commit

# Install hooks
pre-commit install

# Run manually
pre-commit run --all-files
```

Checks:
- ✅ Trailing whitespace
- ✅ YAML/JSON validation
- ✅ Large files
- ✅ Markdown linting

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes...

# Stage changes
git add .

# Commit (pre-commit hooks run automatically)
git commit -m "feat: your feature description"

# Push to GitHub
git push -u origin feature/your-feature

# Create Pull Request on GitHub
```

## Optimization Techniques

### 1. Asset Optimization

#### CSS Optimization

**Current State**: External stylesheet (`styles.css`)

**Further Optimizations**:

```bash
# Minify CSS (remove whitespace, comments)
npx csso styles.css --output styles.min.css

# Remove unused CSS (use PurgeCSS)
npx purgecss --css styles.css --content index.html --output styles.purged.css

# Compress with Brotli
brotli styles.min.css
```

**Automated Build Script** (`scripts/build-css.sh`):

```bash
#!/bin/bash
# Minify CSS
npx csso styles.css --output dist/styles.min.css

# Generate Brotli version
brotli -f dist/styles.min.css

# Generate Gzip version
gzip -9 -k -f dist/styles.min.css

echo "✅ CSS optimized: styles.min.css ($(wc -c < dist/styles.min.css) bytes)"
echo "✅ Brotli: styles.min.css.br ($(wc -c < dist/styles.min.css.br) bytes)"
echo "✅ Gzip: styles.min.css.gz ($(wc -c < dist/styles.min.css.gz) bytes)"
```

#### JavaScript Optimization

**Current State**: External script (`script.js`)

**Optimizations**:

```bash
# Minify JavaScript
npx terser script.js -o script.min.js -c -m

# Compress
brotli -f script.min.js
gzip -9 -k -f script.min.js
```

**Bundle Size Limits**:
- `script.js`: < 10KB (uncompressed)
- `script.min.js.br`: < 3KB (brotli)

#### Image Optimization

**For og-image.png** (if you create one):

```bash
# Convert SVG to optimized PNG
inkscape og-image.svg -o og-image.png -w 1200 -h 630

# Optimize PNG
pngquant og-image.png --output og-image-optimized.png --quality 80-90

# Convert to WebP
cwebp -q 85 og-image.png -o og-image.webp

# Convert to AVIF (best compression)
avifenc og-image.png og-image.avif --min 20 --max 85
```

**Serve Modern Formats**:

```html
<picture>
  <source srcset="og-image.avif" type="image/avif">
  <source srcset="og-image.webp" type="image/webp">
  <img src="og-image.png" alt="Luminous Nix">
</picture>
```

### 2. Service Worker Optimization

**Current**: `sw.js` caches static assets

**Enhancements**:

```javascript
// In sw.js - Add runtime caching for external resources
const RUNTIME_CACHE = 'runtime-v1';

// Cache Ko-fi widget
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('ko-fi.com')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((fetchResponse) => {
          return caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  }
});
```

### 3. Resource Hints

**Already Implemented**:
```html
<link rel="preconnect" href="https://storage.ko-fi.com">
<link rel="preconnect" href="https://formspree.io">
```

**Additional Optimizations**:

```html
<!-- Preload critical resources -->
<link rel="preload" href="styles.css" as="style">
<link rel="preload" href="script.js" as="script">

<!-- DNS Prefetch for external resources -->
<link rel="dns-prefetch" href="https://storage.ko-fi.com">

<!-- Prefetch next pages (for navigation) -->
<link rel="prefetch" href="privacy.html">
<link rel="prefetch" href="404.html">
```

### 4. Critical CSS

Extract above-the-fold CSS and inline it:

```html
<style>
  /* Critical CSS - above the fold only */
  body{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#1a1a2e,#2d3561);color:#fff;min-height:100vh}
  nav{padding:1rem 2rem;background:rgba(26,26,46,.95);backdrop-filter:blur(10px);display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:1000}
  /* ... more critical styles ... */
</style>

<!-- Load full stylesheet asynchronously -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>
```

**Generate Critical CSS**:

```bash
npx critical index.html --base ./ --inline --minify > index-critical.html
```

### 5. Lazy Loading

For images (when added):

```html
<img src="image.jpg" loading="lazy" alt="Description">
```

For iframes:

```html
<iframe src="video.html" loading="lazy"></iframe>
```

### 6. Font Optimization

If using custom fonts:

```css
/* Preload fonts */
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>

/* Font face with font-display */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap; /* Prevent FOIT */
}
```

**Currently**: Using system fonts (best for performance!)

## Build Process

### Automated Build Script

Create `scripts/build.sh`:

```bash
#!/bin/bash
set -e

echo "🏗️  Building nixforhumanity.org..."

# Create dist directory
mkdir -p dist

# Copy HTML files
echo "📄 Copying HTML files..."
cp index.html privacy.html 404.html dist/

# Minify and compress CSS
echo "🎨 Optimizing CSS..."
npx csso styles.css --output dist/styles.min.css
brotli -f dist/styles.min.css
gzip -9 -k -f dist/styles.min.css

# Minify and compress JavaScript
echo "⚡ Optimizing JavaScript..."
npx terser script.js -o dist/script.min.js -c -m
brotli -f dist/script.min.js
gzip -9 -k -f dist/script.min.js

# Copy service worker (don't minify - needs to be readable for debugging)
echo "⚙️  Copying service worker..."
cp sw.js dist/

# Copy manifest and other static files
echo "📦 Copying static files..."
cp manifest.json dist/
cp robots.txt dist/
cp sitemap.xml dist/
cp humans.txt dist/
cp -r .well-known dist/

# Update HTML to use minified assets
echo "🔄 Updating asset references..."
sed -i 's/styles.css/styles.min.css/g' dist/*.html
sed -i 's/script.js/script.min.js/g' dist/*.html

# Generate integrity hashes
echo "🔐 Generating SRI hashes..."
STYLES_HASH=$(openssl dgst -sha384 -binary dist/styles.min.css | openssl base64 -A)
SCRIPT_HASH=$(openssl dgst -sha384 -binary dist/script.min.js | openssl base64 -A)

echo "
📊 Build Summary:
- HTML files: 3
- CSS size: $(wc -c < dist/styles.min.css) bytes
- JS size: $(wc -c < dist/script.min.js) bytes
- CSS (brotli): $(wc -c < dist/styles.min.css.br) bytes
- JS (brotli): $(wc -c < dist/script.min.js.br) bytes

🔐 Subresource Integrity:
- styles.min.css: sha384-$STYLES_HASH
- script.min.js: sha384-$SCRIPT_HASH

✅ Build complete! Output in dist/
"
```

Make executable:

```bash
chmod +x scripts/build.sh
```

Run:

```bash
./scripts/build.sh
```

### NPM Build Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "build": "./scripts/build.sh",
    "build:css": "csso styles.css --output dist/styles.min.css",
    "build:js": "terser script.js -o dist/script.min.js -c -m",
    "build:compress": "brotli -f dist/*.{css,js} && gzip -9 -k -f dist/*.{css,js}",
    "clean": "rm -rf dist",
    "prebuild": "npm run clean && mkdir -p dist"
  }
}
```

## Performance Budgets

### Current Budgets (`.lighthouserc.json`)

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 1.0}],
        "first-contentful-paint": ["error", {"maxNumericValue": 2000}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}]
      }
    }
  }
}
```

### Size Budgets

| Resource | Max Size (Uncompressed) | Max Size (Brotli) |
|----------|------------------------|-------------------|
| index.html | 30 KB | 8 KB |
| styles.css | 20 KB | 5 KB |
| script.js | 10 KB | 3 KB |
| sw.js | 5 KB | 2 KB |
| manifest.json | 2 KB | 1 KB |
| **Total** | **67 KB** | **19 KB** |

### Core Web Vitals Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **FCP** (First Contentful Paint): < 1.8s
- **TTI** (Time to Interactive): < 3.8s

## Deployment

### GitHub Pages (Current)

1. Push to `main` branch
2. GitHub automatically deploys

**Headers**: Add `_headers` file (already created)

### Netlify

```toml
# netlify.toml
[build]
  publish = "."
  command = "./scripts/build.sh"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Cloudflare Pages

Similar to Netlify. Add `_headers` file (already done).

### Vercel

```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}
```

## Monitoring

### Continuous Integration

GitHub Actions runs on every push:
- HTML validation
- Link checking
- Accessibility tests
- Lighthouse CI

### Post-Deployment

```bash
# Test production site
npm run lighthouse -- https://nixforhumanity.org

# Check performance
curl -w "@curl-format.txt" -o /dev/null -s https://nixforhumanity.org

# Test gzip/brotli
curl -H "Accept-Encoding: br" -I https://nixforhumanity.org/styles.css
```

### Monitoring Tools

- **Lighthouse CI**: Continuous performance monitoring
- **WebPageTest**: Real device testing
- **PageSpeed Insights**: Google's performance analysis
- **GTmetrix**: Comprehensive performance report

## Optimization Checklist

Before deployment:

- [ ] Run `npm run build`
- [ ] Test locally: `python3 -m http.server 8000`
- [ ] Run Lighthouse: `npm run lighthouse`
- [ ] Test mobile responsiveness
- [ ] Test dark mode
- [ ] Validate HTML: `npm run test:html`
- [ ] Check links: `npm run test:links`
- [ ] Run accessibility tests: `npm run test:accessibility`
- [ ] Run E2E tests: `npm run test:e2e`
- [ ] Verify service worker
- [ ] Test PWA installation
- [ ] Check Core Web Vitals
- [ ] Review performance budgets
- [ ] Update CHANGELOG.md

## Advanced Optimizations

### HTTP/2 Server Push

Configure server to push critical resources:

```
Link: </styles.css>; rel=preload; as=style
Link: </script.js>; rel=preload; as=script
```

### CDN Configuration

Use Cloudflare or similar:

- Enable Brotli compression
- Enable HTTP/3
- Configure cache TTLs
- Set up WAF rules

### Database-Free Architecture

✅ **Advantages of Static Site**:
- No database = no SQL injection
- No server-side code = no RCE
- Fast global CDN delivery
- 99.99% uptime
- Zero scaling issues
- Free/cheap hosting

## Troubleshooting

### Build Fails

```bash
# Check Node version
node --version  # Should be >= 18

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check file permissions
chmod +x scripts/build.sh
```

### Performance Regression

```bash
# Compare before/after
npm run lighthouse -- https://nixforhumanity.org --output json > before.json
# Make changes...
npm run lighthouse -- http://localhost:8000 --output json > after.json

# Compare scores
diff before.json after.json
```

## Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [Can I Use](https://caniuse.com/)
- [Bundle Phobia](https://bundlephobia.com/)

## Questions?

See [CONTRIBUTING.md](CONTRIBUTING.md) or open an issue on GitHub.
