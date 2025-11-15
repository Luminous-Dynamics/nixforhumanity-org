# Analytics & Performance Monitoring Guide

> **Privacy-First Approach**: We prioritize user privacy while gathering insights to improve nixforhumanity.org

## Table of Contents

- [Philosophy](#philosophy)
- [Recommended Tools](#recommended-tools)
- [Performance Monitoring](#performance-monitoring)
- [Error Tracking](#error-tracking)
- [User Analytics](#user-analytics)
- [Implementation Guide](#implementation-guide)
- [Privacy Compliance](#privacy-compliance)

## Philosophy

Our analytics approach:

✅ **Privacy-respecting**: No personal data collection
✅ **Lightweight**: Minimal performance impact
✅ **Transparent**: Users know what's tracked
✅ **GDPR/CCPA compliant**: No cookies, no consent banners
✅ **Open source**: Prefer auditable tools

## Recommended Tools

### 1. Plausible Analytics (Recommended)

**Why**: Privacy-first, no cookies, GDPR compliant, lightweight

```html
<!-- Add to index.html <head> -->
<script defer data-domain="nixforhumanity.org" src="https://plausible.io/js/script.js"></script>
```

**Features**:
- Page views
- Traffic sources
- Popular pages
- Devices/browsers
- Geography (country-level only)
- Custom events

**Cost**: $9/month for up to 10k monthly pageviews
**Self-hosted**: Free (requires server)

### 2. Fathom Analytics

Similar to Plausible, also privacy-focused

```html
<script src="https://cdn.usefathom.com/script.js" data-site="YOUR_SITE_ID" defer></script>
```

### 3. GoatCounter

**Why**: Free, open source, privacy-friendly

```html
<script data-goatcounter="https://nixforhumanity.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

**Cost**: Free
**Features**: Basic analytics, no fancy dashboards

### ❌ Avoid

- Google Analytics (privacy concerns, heavy, requires consent)
- Facebook Pixel (privacy nightmare)
- Hotjar/session recording (invasive)

## Performance Monitoring

### Built-in Performance Observer

Already implemented in `script.js`:

```javascript
// Core Web Vitals tracking
if ('PerformanceObserver' in window) {
    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);

        // Optional: Send to analytics
        // sendToAnalytics('LCP', lastEntry.renderTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            console.log('FID:', entry.processingStart - entry.startTime);
        });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsScore = 0;
    const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
                clsScore += entry.value;
            }
        }
        console.log('CLS:', clsScore);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
}
```

### Lighthouse CI

Already configured in `.lighthouserc.json`. Run with:

```bash
npm run lighthouse:ci
```

Monitors:
- Performance score ≥90
- Accessibility score = 100
- First Contentful Paint < 2000ms
- Largest Contentful Paint < 2500ms
- Cumulative Layout Shift < 0.1

### SpeedCurve / Calibre

For continuous performance monitoring:

- Track performance over time
- Alert on regressions
- Compare to competitors
- Real user monitoring

**Cost**: Paid ($20-200/month)

## Error Tracking

### Sentry (Recommended)

**Why**: Excellent error tracking, free tier available

```html
<script
  src="https://js.sentry-cdn.com/YOUR_DSN.min.js"
  crossorigin="anonymous"
></script>
```

```javascript
Sentry.init({
  dsn: 'YOUR_DSN',
  environment: 'production',
  beforeSend(event) {
    // Filter out PII
    return event;
  },
  sampleRate: 1.0, // 100% of errors
  tracesSampleRate: 0.1, // 10% of transactions
});
```

**Features**:
- JavaScript errors
- Network failures
- Performance issues
- Sourcemap support
- User feedback

**Cost**: Free for 5k events/month

### LogRocket

Session replay for debugging (use sparingly for privacy):

```javascript
LogRocket.init('your-app/id', {
  dom: {
    inputSanitizer: true, // Don't capture form inputs
  },
  network: {
    requestSanitizer: (request) => {
      // Remove sensitive headers
      delete request.headers['authorization'];
      return request;
    },
  },
});
```

## User Analytics

### Custom Event Tracking

Already implemented in `script.js`:

```javascript
function trackEvent(category, action, label = '') {
    // Placeholder - integrate with your analytics tool
    console.log('Event:', category, action, label);

    // Example: Plausible
    if (window.plausible) {
        plausible(action, { props: { category, label } });
    }

    // Example: Fathom
    if (window.fathom) {
        fathom.trackGoal('EVENT_ID', 0);
    }
}

// Usage examples:
trackEvent('Button', 'Click', 'Get Started');
trackEvent('Form', 'Submit', 'Beta Signup');
trackEvent('Navigation', 'Click', 'GitHub Link');
```

### Beta Form Conversion Tracking

Add to form submission:

```javascript
form.addEventListener('submit', function() {
    trackEvent('Conversion', 'Beta Signup', 'Submitted');
});
```

### Download Tracking

```javascript
document.querySelectorAll('a[href*="install"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('Download', 'Click', 'Install Script');
    });
});
```

## Implementation Guide

### Step 1: Choose Analytics Provider

We recommend **Plausible** for its privacy-first approach.

### Step 2: Add Tracking Script

```html
<!-- Add before closing </head> tag -->
<script defer data-domain="nixforhumanity.org" src="https://plausible.io/js/script.js"></script>
```

### Step 3: Configure Custom Events

Update `script.js`:

```javascript
function trackEvent(category, action, label = '') {
    if (window.plausible) {
        plausible(action, {
            props: {
                category: category,
                label: label
            }
        });
    }
}
```

### Step 4: Track Key Actions

```javascript
// Beta signup form
document.querySelector('.beta-form')?.addEventListener('submit', () => {
    trackEvent('Conversion', 'Beta Signup', 'Form Submit');
});

// GitHub clicks
document.querySelectorAll('a[href*="github.com"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('External', 'GitHub Click', link.href);
    });
});

// Install button
document.querySelectorAll('.install-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('CTA', 'Install Button', 'Click');
    });
});
```

### Step 5: Monitor Performance

GitHub Actions workflow already runs Lighthouse CI on every push.

For continuous monitoring, set up SpeedCurve or similar.

### Step 6: Set Up Error Tracking

```bash
npm install @sentry/browser
```

```javascript
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "YOUR_DSN",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 0.1,
});
```

## Privacy Compliance

### GDPR Compliance

✅ **No cookies**: Plausible/Fathom don't use cookies
✅ **No personal data**: IP addresses anonymized
✅ **No cross-site tracking**: Data stays on your domain
✅ **Transparent**: Privacy policy explains tracking
✅ **User control**: Respect Do Not Track (DNT)

### Respecting DNT (Do Not Track)

```javascript
// Check for DNT before tracking
function shouldTrack() {
    const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
    return dnt !== '1' && dnt !== 'yes';
}

function trackEvent(category, action, label = '') {
    if (!shouldTrack()) return;

    if (window.plausible) {
        plausible(action, { props: { category, label } });
    }
}
```

### Privacy Policy Updates

Update `privacy.html` to include:

```markdown
## Analytics

We use privacy-respecting analytics to understand how visitors use our site.

**What we collect:**
- Page views
- Referral sources
- Browser/device type (general)
- Country (not city)

**What we DON'T collect:**
- Personal information
- IP addresses (anonymized)
- Cross-site tracking data
- Cookies

**Tools we use:**
- Plausible Analytics (GDPR compliant)

**Opt-out:** We respect Do Not Track (DNT) headers.
```

## Monitoring Checklist

Weekly:
- [ ] Review traffic sources
- [ ] Check top pages
- [ ] Monitor conversion rates
- [ ] Review error logs

Monthly:
- [ ] Performance trends (LCP, FID, CLS)
- [ ] Lighthouse scores
- [ ] Mobile vs desktop usage
- [ ] Browser/device breakdown

Quarterly:
- [ ] User surveys
- [ ] A/B test results
- [ ] Feature usage analysis
- [ ] Goal completion rates

## Resources

- [Plausible Analytics](https://plausible.io/)
- [Fathom Analytics](https://usefathom.com/)
- [GoatCounter](https://www.goatcounter.com/)
- [Sentry](https://sentry.io/)
- [Web Vitals](https://web.dev/vitals/)
- [Privacy-Friendly Analytics Comparison](https://markosaric.com/google-analytics-alternatives/)

## Questions?

See our [Privacy Policy](privacy.html) or [Security Policy](SECURITY.md) for more information.
