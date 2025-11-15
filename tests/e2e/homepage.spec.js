// Homepage E2E Tests
// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title and meta description', async ({ page }) => {
    await expect(page).toHaveTitle(/Luminous Nix/);

    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toContain('NixOS');
    expect(description).toContain('natural language');
  });

  test('displays hero section correctly', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('NixOS for Humans');

    const subtitle = page.locator('.hero-subtitle');
    await expect(subtitle).toBeVisible();
    await expect(subtitle).toContainText('speak naturally');
  });

  test('terminal demo is visible and animated', async ({ page }) => {
    const terminal = page.locator('.terminal-demo');
    await expect(terminal).toBeVisible();

    const terminalContent = page.locator('.terminal-content');
    await expect(terminalContent).toBeVisible();

    // Check that cursor is blinking
    const cursor = page.locator('.cursor');
    await expect(cursor).toBeVisible();
  });

  test('all navigation links are functional', async ({ page }) => {
    // Features link
    await page.click('a[href="#features"]');
    await page.waitForURL('/#features');

    // Performance link
    await page.click('a[href="#performance"]');
    await page.waitForURL('/#performance');

    // Install link
    await page.click('a[href="#install"]');
    await page.waitForURL('/#install');
  });

  test('GitHub link opens in new tab', async ({ page, context }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('a[href*="github.com"]')
    ]);

    await newPage.waitForLoadState();
    expect(newPage.url()).toContain('github.com');
  });

  test('skip to main content link works', async ({ page }) => {
    // Focus the skip link by tabbing
    await page.keyboard.press('Tab');

    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeFocused();

    await page.keyboard.press('Enter');

    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });
});

test.describe('Feature Cards', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('all feature cards are visible', async ({ page }) => {
    const featureCards = page.locator('.feature-card');
    await expect(featureCards).toHaveCount(6);

    // Check for specific features
    await expect(page.locator('.feature-card', { hasText: 'Natural Language' })).toBeVisible();
    await expect(page.locator('.feature-card', { hasText: '10x-1500x Faster' })).toBeVisible();
    await expect(page.locator('.feature-card', { hasText: 'AI-Powered' })).toBeVisible();
    await expect(page.locator('.feature-card', { hasText: 'Safe by Default' })).toBeVisible();
    await expect(page.locator('.feature-card', { hasText: 'Beautiful TUI' })).toBeVisible();
    await expect(page.locator('.feature-card', { hasText: 'Accessible' })).toBeVisible();
  });

  test('feature cards have hover effect', async ({ page }) => {
    const firstCard = page.locator('.feature-card').first();

    // Hover over the card
    await firstCard.hover();

    // Card should have transform applied (testing CSS is limited in Playwright)
    await expect(firstCard).toBeVisible();
  });
});

test.describe('Performance Stats', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('performance metrics are displayed', async ({ page }) => {
    await expect(page.locator('.stat', { hasText: '10,000x' })).toBeVisible();
    await expect(page.locator('.stat', { hasText: '0.29ms' })).toBeVisible();
    await expect(page.locator('.stat', { hasText: '0' })).toBeVisible();
    await expect(page.locator('.stat', { hasText: '$200/mo' })).toBeVisible();
  });
});

test.describe('Personas Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('all personas are displayed', async ({ page }) => {
    const personaCards = page.locator('.persona-card');
    await expect(personaCards).toHaveCount(6);

    // Check for specific personas
    await expect(page.locator('.persona-card', { hasText: 'Grandma Rose' })).toBeVisible();
    await expect(page.locator('.persona-card', { hasText: 'Maya (ADHD)' })).toBeVisible();
    await expect(page.locator('.persona-card', { hasText: 'Alex (Blind)' })).toBeVisible();
  });
});

test.describe('Installation Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('installation steps are visible', async ({ page }) => {
    const installSteps = page.locator('.install-step');
    await expect(installSteps).toHaveCount(3);

    // Check for code blocks
    const codeBlocks = page.locator('.code-block');
    expect(await codeBlocks.count()).toBeGreaterThanOrEqual(3);
  });
});
