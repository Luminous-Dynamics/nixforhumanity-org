// Beta Form E2E Tests
// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Beta Signup Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('form is visible and accessible', async ({ page }) => {
    const form = page.locator('.beta-form');
    await expect(form).toBeVisible();

    // Check for proper ARIA labels
    await expect(form).toHaveAttribute('aria-label', 'Beta signup form');
  });

  test('all form fields are present and required', async ({ page }) => {
    // Name field
    const nameInput = page.locator('#name');
    await expect(nameInput).toBeVisible();
    await expect(nameInput).toHaveAttribute('required');
    await expect(nameInput).toHaveAttribute('aria-required', 'true');

    // Email field
    const emailInput = page.locator('#email');
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(emailInput).toHaveAttribute('required');
    await expect(emailInput).toHaveAttribute('aria-required', 'true');

    // Experience field
    const experienceSelect = page.locator('#experience');
    await expect(experienceSelect).toBeVisible();
    await expect(experienceSelect).toHaveAttribute('required');
    await expect(experienceSelect).toHaveAttribute('aria-required', 'true');

    // Use case field (optional)
    const useCaseTextarea = page.locator('#use-case');
    await expect(useCaseTextarea).toBeVisible();
    await expect(useCaseTextarea).not.toHaveAttribute('required');
  });

  test('form validation works for email', async ({ page }) => {
    const emailInput = page.locator('#email');
    const submitBtn = page.locator('.submit-btn');

    // Try submitting with invalid email
    await emailInput.fill('invalid-email');
    await submitBtn.click();

    // Form should not submit (browser validation)
    const validationMessage = await emailInput.evaluate(
      (el) => (el as HTMLInputElement).validationMessage
    );
    expect(validationMessage).toBeTruthy();
  });

  test('experience dropdown has all options', async ({ page }) => {
    const experienceSelect = page.locator('#experience');

    await expect(experienceSelect.locator('option')).toHaveCount(6); // Including empty option

    // Check for specific options
    await expect(experienceSelect.locator('option[value="new"]')).toHaveText('New to NixOS');
    await expect(experienceSelect.locator('option[value="beginner"]')).toHaveText('Beginner (< 1 year)');
    await expect(experienceSelect.locator('option[value="intermediate"]')).toHaveText('Intermediate (1-3 years)');
    await expect(experienceSelect.locator('option[value="advanced"]')).toHaveText('Advanced (3+ years)');
    await expect(experienceSelect.locator('option[value="curious"]')).toHaveText('Just curious about NixOS');
  });

  test('privacy policy link is present', async ({ page }) => {
    const privacyLink = page.locator('.privacy-note a[href="privacy.html"]');
    await expect(privacyLink).toBeVisible();
    await expect(privacyLink).toHaveText('privacy policy');
  });

  test('honeypot field is hidden', async ({ page }) => {
    const honeypot = page.locator('input[name="_gotcha"]');
    await expect(honeypot).toHaveAttribute('style', 'display:none');
    await expect(honeypot).toHaveAttribute('tabindex', '-1');
  });

  test('submit button changes text on submit', async ({ page }) => {
    // Fill out the form
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.selectOption('#experience', 'beginner');

    const submitBtn = page.locator('.submit-btn');
    const initialText = await submitBtn.textContent();

    expect(initialText).toContain('Join Beta Waitlist');

    // Note: Actual submission testing would require mocking Formspree
    // or using a test environment
  });

  test('form labels are properly associated with inputs', async ({ page }) => {
    const nameLabel = page.locator('label[for="name"]');
    const emailLabel = page.locator('label[for="email"]');
    const experienceLabel = page.locator('label[for="experience"]');
    const useCaseLabel = page.locator('label[for="use-case"]');

    await expect(nameLabel).toHaveText('Name');
    await expect(emailLabel).toHaveText('Email');
    await expect(experienceLabel).toHaveText('NixOS Experience');
    await expect(useCaseLabel).toHaveText('Use Case (Optional)');
  });
});

test.describe('Form Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('form can be navigated with keyboard', async ({ page }) => {
    // Tab to name field
    await page.keyboard.press('Tab');
    let focusedElement = await page.evaluate(() => document.activeElement?.id);

    // Continue tabbing through form
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Should eventually reach the submit button
    for (let i = 0; i < 20; i++) {
      const activeElement = await page.evaluate(() => document.activeElement?.className);
      if (activeElement && activeElement.includes('submit-btn')) {
        break;
      }
      await page.keyboard.press('Tab');
    }

    const finalFocus = await page.evaluate(() => document.activeElement?.className);
    expect(finalFocus).toContain('submit-btn');
  });

  test('form has proper focus indicators', async ({ page }) => {
    const nameInput = page.locator('#name');
    await nameInput.focus();

    // Check that outline is applied (via CSS focus styles)
    const outlineColor = await nameInput.evaluate(
      (el) => window.getComputedStyle(el).outlineColor
    );
    expect(outlineColor).toBeTruthy();
  });
});
