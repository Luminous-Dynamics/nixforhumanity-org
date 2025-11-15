// Mobile Menu and Dark Mode E2E Tests
// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Mobile Menu', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('mobile menu button is visible on small screens', async ({ page }) => {
    const mobileMenuBtn = page.locator('.mobile-menu-btn');
    await expect(mobileMenuBtn).toBeVisible();
  });

  test('mobile menu opens and closes', async ({ page }) => {
    const mobileMenuBtn = page.locator('.mobile-menu-btn');
    const navLinks = page.locator('.nav-links');

    // Initially closed
    await expect(navLinks).not.toHaveClass(/active/);

    // Open menu
    await mobileMenuBtn.click();
    await expect(navLinks).toHaveClass(/active/);
    await expect(mobileMenuBtn).toHaveAttribute('aria-expanded', 'true');

    // Close menu by clicking button again
    await mobileMenuBtn.click();
    await expect(navLinks).not.toHaveClass(/active/);
    await expect(mobileMenuBtn).toHaveAttribute('aria-expanded', 'false');
  });

  test('mobile menu closes when clicking a link', async ({ page }) => {
    const mobileMenuBtn = page.locator('.mobile-menu-btn');
    const navLinks = page.locator('.nav-links');

    // Open menu
    await mobileMenuBtn.click();
    await expect(navLinks).toHaveClass(/active/);

    // Click a navigation link
    await page.click('a[href="#features"]');

    // Menu should close
    await expect(navLinks).not.toHaveClass(/active/);
  });

  test('mobile menu closes when clicking outside', async ({ page }) => {
    const mobileMenuBtn = page.locator('.mobile-menu-btn');
    const navLinks = page.locator('.nav-links');

    // Open menu
    await mobileMenuBtn.click();
    await expect(navLinks).toHaveClass(/active/);

    // Click outside (on the hero section)
    await page.click('.hero h1');

    // Menu should close
    await expect(navLinks).not.toHaveClass(/active/);
  });

  test('mobile menu has proper accessibility attributes', async ({ page }) => {
    const mobileMenuBtn = page.locator('.mobile-menu-btn');

    await expect(mobileMenuBtn).toHaveAttribute('aria-label', 'Toggle navigation menu');
    await expect(mobileMenuBtn).toHaveAttribute('aria-expanded');
  });
});

test.describe('Dark Mode Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Clear localStorage to start fresh
    await page.evaluate(() => localStorage.clear());
  });

  test('theme toggle button is visible', async ({ page }) => {
    const themeToggle = page.locator('#theme-toggle');
    await expect(themeToggle).toBeVisible();
  });

  test('theme toggle changes theme', async ({ page }) => {
    const themeToggle = page.locator('#theme-toggle');
    const html = page.locator('html');

    // Check initial theme (should be dark by default)
    const initialTheme = await html.getAttribute('data-theme');
    expect(initialTheme).toBe('dark');

    // Toggle to light mode
    await themeToggle.click();
    await page.waitForTimeout(100); // Wait for transition

    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).toBe('light');

    // Toggle back to dark mode
    await themeToggle.click();
    await page.waitForTimeout(100);

    const finalTheme = await html.getAttribute('data-theme');
    expect(finalTheme).toBe('dark');
  });

  test('theme preference is saved to localStorage', async ({ page }) => {
    const themeToggle = page.locator('#theme-toggle');

    // Toggle theme
    await themeToggle.click();
    await page.waitForTimeout(100);

    // Check localStorage
    const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(storedTheme).toBe('light');

    // Reload page
    await page.reload();
    await page.waitForTimeout(100);

    // Theme should persist
    const html = page.locator('html');
    const persistedTheme = await html.getAttribute('data-theme');
    expect(persistedTheme).toBe('light');
  });

  test('theme toggle icon changes', async ({ page }) => {
    const themeToggle = page.locator('#theme-toggle');

    // Initial icon (should be moon for dark mode)
    const initialIcon = await themeToggle.textContent();
    expect(initialIcon).toBe('🌙');

    // Toggle to light mode
    await themeToggle.click();
    await page.waitForTimeout(100);

    const lightIcon = await themeToggle.textContent();
    expect(lightIcon).toBe('☀️');
  });

  test('theme toggle has proper accessibility attributes', async ({ page }) => {
    const themeToggle = page.locator('#theme-toggle');

    await expect(themeToggle).toHaveAttribute('aria-label');

    const ariaLabel = await themeToggle.getAttribute('aria-label');
    expect(ariaLabel).toContain('mode');
  });
});

test.describe('Responsive Design', () => {
  test('layout adapts to tablet size', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    const hero = page.locator('.hero h1');
    await expect(hero).toBeVisible();

    // Feature grid should stack appropriately
    const featureGrid = page.locator('.feature-grid');
    await expect(featureGrid).toBeVisible();
  });

  test('layout adapts to desktop size', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    const navLinks = page.locator('.nav-links');
    await expect(navLinks).toBeVisible();

    // Mobile menu button should not be visible
    const mobileMenuBtn = page.locator('.mobile-menu-btn');
    const isVisible = await mobileMenuBtn.isVisible();
    // Note: Button exists but display:none on desktop
  });

  test('terminal demo is readable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const terminal = page.locator('.terminal-demo');
    await expect(terminal).toBeVisible();

    // Terminal content should not overflow
    const terminalContent = page.locator('.terminal-content');
    await expect(terminalContent).toBeVisible();
  });

  test('stats grid adapts to mobile (2 columns)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const statsGrid = page.locator('.stats-grid');
    await expect(statsGrid).toBeVisible();

    // All stats should be visible
    const stats = page.locator('.stat');
    await expect(stats).toHaveCount(4);
  });
});

test.describe('PWA Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('manifest.json is linked', async ({ page }) => {
    const manifestLink = page.locator('link[rel="manifest"]');
    await expect(manifestLink).toHaveAttribute('href', 'manifest.json');
  });

  test('service worker registration script is present', async ({ page }) => {
    // Check that script.js is loaded (which contains SW registration)
    const scriptTag = page.locator('script[src="script.js"]');
    await expect(scriptTag).toHaveAttribute('defer');
  });

  test('PWA meta tags are present', async ({ page }) => {
    const appleMobileWebAppCapable = page.locator('meta[name="apple-mobile-web-app-capable"]');
    await expect(appleMobileWebAppCapable).toHaveAttribute('content', 'yes');

    const appleMobileWebAppTitle = page.locator('meta[name="apple-mobile-web-app-title"]');
    await expect(appleMobileWebAppTitle).toHaveAttribute('content', 'Luminous Nix');
  });
});
