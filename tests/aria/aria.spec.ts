import { test, expect } from '@playwright/test';

const email = () => `name-${Date.now()}-${Math.random()}@tesco.com`;
test('TA-001, Registration form', async ({ page }) => {
    await page.goto('/laboratory/aria');
    await page.locator(`#aria-email`).fill(email());
    await page.locator(`#aria-password`).fill(`123Aws%`);
    await page.locator(`#aria-country`).selectOption('Україна');
    await page.locator(`#aria-level-middle`).check();
    await page.locator(`#aria-terms`).check();
    await page.locator(`.flex.items-center.gap-3 .btn-primary`).click();
    await expect(page.locator(`[class="text-sm font-semibold text-emerald-600 dark:text-emerald-400"]`)).toBeVisible();
});

