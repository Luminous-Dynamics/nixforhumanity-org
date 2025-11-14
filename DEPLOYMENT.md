# Deployment Guide

Complete guide for deploying and managing nixforhumanity.org.

## 🌐 Current Deployment

**Platform:** GitHub Pages
**Domain:** nixforhumanity.org
**Branch:** `main`
**Auto-deploy:** Yes (on push to main)
**SSL:** Automatic (GitHub Pages)

## 📋 Deployment Workflow

### 1. Development

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes
# ...

# Test locally
python -m http.server 8000

# Commit changes
git add .
git commit -m "✨ Your feature description"

# Push to GitHub
git push -u origin feature/your-feature
```

### 2. Create Pull Request

1. Go to GitHub repository
2. Click "New Pull Request"
3. Select your branch
4. Fill out PR template
5. Wait for automated tests to pass
6. Request review (if applicable)

### 3. Merge to Main

Once PR is approved and tests pass:

```bash
# Via GitHub UI
Click "Merge Pull Request"

# Or via command line
git checkout main
git pull origin main
git merge feature/your-feature
git push origin main
```

### 4. Automatic Deployment

**GitHub Pages automatically deploys when:**
- Code is pushed to `main` branch
- Typically takes 1-3 minutes
- No build step required (static HTML)

**Monitor deployment:**
- Go to: Settings → Pages
- View deployment status
- Check Actions tab for any errors

## 🔧 Manual Deployment Steps

### First-Time Setup

1. **Enable GitHub Pages**
   ```
   Repository → Settings → Pages
   Source: Deploy from a branch
   Branch: main
   Folder: / (root)
   Save
   ```

2. **Configure Custom Domain**
   ```
   # Add CNAME file with:
   nixforhumanity.org

   # Configure DNS (at domain registrar):
   Type: CNAME
   Name: @
   Value: luminous-dynamics.github.io
   ```

3. **Enable HTTPS**
   ```
   Settings → Pages → Enforce HTTPS
   ✅ Check the box
   ```

4. **Verify Deployment**
   ```bash
   # Check site loads
   curl -I https://nixforhumanity.org

   # Verify SSL
   openssl s_client -connect nixforhumanity.org:443
   ```

## 🚀 Deploying Updates

### Quick Updates (Hotfix)

For urgent fixes:

```bash
# On main branch
git checkout main
git pull origin main

# Make quick fix
# Edit files...

# Commit and push
git add .
git commit -m "🐛 Fix critical issue"
git push origin main

# Deployed automatically in ~2 minutes
```

### Feature Deployments

Standard workflow via PR:

```bash
# Create branch
git checkout -b feature/new-feature

# Develop and test
# ...

# Push and create PR
git push -u origin feature/new-feature

# After approval, merge via GitHub
# Deployment happens automatically
```

## 📊 Monitoring Deployment

### Check Deployment Status

```bash
# Via GitHub Actions
https://github.com/Luminous-Dynamics/nixforhumanity-org/actions

# Via GitHub Pages settings
Repository → Settings → Pages → Status

# Via curl
curl -I https://nixforhumanity.org
```

### Verify Deployment

**Checklist after deployment:**
- [ ] Site loads: https://nixforhumanity.org
- [ ] SSL certificate valid
- [ ] No console errors
- [ ] All pages accessible
- [ ] Forms work
- [ ] Ko-fi widget loads
- [ ] Mobile menu functions

## 🔄 Rollback Procedure

If a deployment introduces issues:

### Method 1: Revert Commit

```bash
# Find problematic commit
git log --oneline

# Revert it
git revert <commit-hash>
git push origin main

# Redeploys in ~2 minutes
```

### Method 2: Force Push Previous Version

```bash
# WARNING: Use only in emergencies

# Find good commit
git log --oneline

# Reset to good commit
git reset --hard <good-commit-hash>

# Force push
git push -f origin main

# Note: Inform team before force pushing
```

### Method 3: Deploy from Tag

```bash
# If you have tagged releases
git checkout v1.0.0
git push -f origin main
```

## 📦 Release Process

### Creating a Release

```bash
# 1. Update CHANGELOG.md
#    Add new version section with changes

# 2. Update version references if needed

# 3. Commit changes
git add CHANGELOG.md
git commit -m "📝 Prepare release v1.2.0"
git push origin main

# 4. Create and push tag
git tag -a v1.2.0 -m "Release version 1.2.0"
git push origin v1.2.0

# 5. GitHub Action automatically creates release
#    Check: Releases tab on GitHub
```

### Semantic Versioning

We follow [SemVer](https://semver.org/):

- **Major (X.0.0)**: Breaking changes, major redesigns
- **Minor (0.X.0)**: New features, notable improvements
- **Patch (0.0.X)**: Bug fixes, minor updates

**Examples:**
```
v1.0.0 → Initial professional launch
v1.1.0 → Added documentation infrastructure
v1.1.1 → Fixed mobile menu bug
v2.0.0 → Complete redesign
```

## 🔍 Pre-Deployment Checklist

Before merging to main:

### Code Quality
- [ ] All HTML files validate
- [ ] No broken links
- [ ] No console errors
- [ ] Code follows .editorconfig

### Testing
- [ ] Tested locally
- [ ] Passed automated tests
- [ ] Keyboard navigation works
- [ ] Mobile responsive
- [ ] Cross-browser tested

### Documentation
- [ ] CHANGELOG.md updated
- [ ] README.md updated if needed
- [ ] Comments added for complex code

### Security
- [ ] No API keys exposed
- [ ] External links secure
- [ ] Form honeypot in place

### Performance
- [ ] Images optimized
- [ ] No unnecessary scripts
- [ ] Lighthouse score > 90

## 🚨 Troubleshooting

### Site Not Updating

```bash
# 1. Check GitHub Pages status
https://www.githubstatus.com/

# 2. Verify branch is main
git branch -r

# 3. Check Settings → Pages
# Ensure source is set to main branch

# 4. Force rebuild
# Make trivial commit and push
```

### 404 Errors

```bash
# Ensure .nojekyll file exists
ls -la .nojekyll

# If missing:
touch .nojekyll
git add .nojekyll
git commit -m "Add .nojekyll"
git push
```

### SSL Certificate Issues

```
# Usually resolves automatically in 24 hours
# Check Settings → Pages → HTTPS status

# If persists:
1. Uncheck "Enforce HTTPS"
2. Wait 5 minutes
3. Re-check "Enforce HTTPS"
```

### Custom Domain Not Working

```bash
# 1. Verify CNAME file
cat CNAME
# Should contain: nixforhumanity.org

# 2. Check DNS configuration
dig nixforhumanity.org

# 3. Verify in Settings → Pages
# Custom domain should show green checkmark

# 4. Wait for DNS propagation (up to 48 hours)
```

## 📈 Deployment Analytics

### Monitor Performance

```bash
# PageSpeed Insights
https://pagespeed.web.dev/?url=https://nixforhumanity.org

# Lighthouse
lighthouse https://nixforhumanity.org --view

# WebPageTest
https://www.webpagetest.org/
```

### Check Uptime

GitHub Pages provides 99.9% uptime SLA

**Monitor with:**
- https://stats.uptimerobot.com/ (free tier)
- https://www.pingdom.com/
- https://uptimerobot.com/

## 🔐 Security Considerations

### GitHub Pages Security

**Automatic features:**
- HTTPS/SSL certificates
- DDoS protection
- CDN distribution

**Manual checks:**
- [ ] No sensitive data in repo
- [ ] .env files in .gitignore (if applicable)
- [ ] API keys stored as secrets

### Content Security

```bash
# Check security headers
https://securityheaders.com/?q=https://nixforhumanity.org

# Test SSL
https://www.ssllabs.com/ssltest/analyze.html?d=nixforhumanity.org
```

## 🌍 CDN & Caching

### GitHub Pages CDN

- Automatic global CDN
- No configuration needed
- Edge caching enabled

### Cache Busting

For major changes:

```html
<!-- Add version parameter -->
<link rel="stylesheet" href="styles.css?v=1.2.0">
<script src="script.js?v=1.2.0"></script>
```

### Clear Browser Cache

Users may need to:
- Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- Or wait for browser cache expiration (~24 hours)

## 📞 Support

### Deployment Issues

1. Check [GitHub Status](https://www.githubstatus.com/)
2. Review [GitHub Pages docs](https://docs.github.com/en/pages)
3. Check Actions tab for errors
4. Contact GitHub Support if needed

### Questions

- Open issue: [GitHub Issues](https://github.com/Luminous-Dynamics/nixforhumanity-org/issues)
- Discussion: [GitHub Discussions](https://github.com/Luminous-Dynamics/nixforhumanity-org/discussions)

---

## Quick Reference

```bash
# Deploy update
git push origin main

# Create release
git tag -a v1.2.0 -m "Release 1.2.0"
git push origin v1.2.0

# Rollback
git revert <commit-hash>
git push origin main

# Check status
curl -I https://nixforhumanity.org

# Test locally
python -m http.server 8000
```

---

**Remember:** Every push to `main` deploys to production. Test thoroughly before merging! 🚀
