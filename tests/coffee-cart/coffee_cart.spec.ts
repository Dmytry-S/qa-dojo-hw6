import { test, expect } from '@playwright/test';

test('TC-001, Add product to cart', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await expect(page.locator('#app')).toContainText('Espresso Macchiato');
});

test('TC-002, Cart is empty', async ({ page }) => {
  await page.goto('/');
  await page.locator(`[aria-label="Cart page"]`).click();
  await expect(page.locator('.list')).toContainText('No coffee, go add some.');
});

test('TC-003, Sum is correct', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#app')).toContainText('Espresso Macchiato $12.00');
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await expect(page.locator('#app')).toContainText('Cappuccino $19.00');
  await page.locator('[data-test="Cappuccino"]').click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $31.00');
});

test('TC-004, Success message is present', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator(`[aria-label="Cart page"]`).click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator(`#name`).fill('SD');
  await page.locator(`#email`).fill('ref@data.co');
  await page.locator(`#promotion`).check();
  await page.locator(`#submit-payment`).click();
  await expect(page.locator('#app')).toContainText('Thanks for your purchase. Please check your email for payment.');
});

test('TC-005, Extra cup proposition is present', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-test="Mocha"]').click();
  await page.locator('[data-test="Flat_White"]').click();
  await page.locator('[data-test="Americano"]').click();
  await expect(page.locator('#app')).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
});