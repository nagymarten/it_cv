import { expect, test } from '@playwright/test'

async function waitForAppToSettle(page: import('@playwright/test').Page) {
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(1200)
}

test.describe('portfolio QA', () => {
  test('desktop captures hero and contact screenshots without layout issues', async ({ page, browserName, isMobile }) => {
    test.skip(browserName !== 'chromium' || isMobile, 'Desktop chromium baseline only')
    await page.goto('/')
    await waitForAppToSettle(page)

    await expect(page.locator('h1')).toContainText('Building refined web experiences')

    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    expect(pageWidth).toBeLessThanOrEqual(1440)

    await expect(page.locator('a.fixed[href="#top"]')).toHaveCount(1)

    await expect(page.locator('#hero')).toHaveScreenshot('desktop-hero.png', {
      animations: 'disabled',
      maxDiffPixelRatio: 0.03,
    })

    await page.locator('#projects').scrollIntoViewIfNeeded()
    await page.waitForTimeout(1400)

    await page.locator('#contact').scrollIntoViewIfNeeded()
    await page.waitForTimeout(900)

    const contactBox = await page.locator('#contact').boundingBox()
    expect(contactBox).not.toBeNull()
    expect((contactBox?.height ?? 0) > 280).toBeTruthy()

    await expect(page.locator('#contact')).toHaveScreenshot('desktop-contact.png', {
      animations: 'disabled',
      maxDiffPixelRatio: 0.03,
    })
  })

  test('mobile menu is hidden by default and works when toggled', async ({ page, browserName, isMobile }) => {
    test.skip(browserName !== 'chromium' || !isMobile, 'Mobile chromium only')
    test.skip(!isMobile, 'Mobile only test')

    await page.goto('/')
    await waitForAppToSettle(page)

    const mobilePanel = page.locator('header div.mt-4.grid.gap-3.rounded-3xl')
    await expect(mobilePanel).toHaveCount(0)

    await page.getByRole('button', { name: 'Toggle menu' }).click()
    await expect(mobilePanel).toBeVisible()
    await expect(mobilePanel.getByRole('link', { name: 'Projects' })).toBeVisible()

    await expect(page.locator('header')).toHaveScreenshot('mobile-menu-open.png', {
      animations: 'disabled',
      maxDiffPixelRatio: 0.03,
    })

    await mobilePanel.getByRole('link', { name: 'Contact' }).click()
    await page.waitForTimeout(900)
    await expect(mobilePanel).toHaveCount(0)
  })

  test('mobile page has no horizontal overflow and contact remains reachable', async ({ page, browserName, isMobile }) => {
    test.skip(browserName !== 'chromium' || !isMobile, 'Mobile chromium only')
    test.skip(!isMobile, 'Mobile only test')

    await page.goto('/')
    await waitForAppToSettle(page)

    const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
    expect(hasOverflow).toBeFalsy()

    await page.locator('#contact').scrollIntoViewIfNeeded()
    await page.waitForTimeout(900)

    await expect(page.locator('#contact')).toContainText('Start a conversation')
    await expect(page.locator('#contact')).toHaveScreenshot('mobile-contact.png', {
      animations: 'disabled',
      maxDiffPixelRatio: 0.03,
    })
  })
})
