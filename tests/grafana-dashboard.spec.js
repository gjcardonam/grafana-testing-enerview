const { test, expect } = require("@playwright/test");
const { loadTargetCompany } = require("../utils/configLoader");

const { name, url, user, pass } = loadTargetCompany();

test(`Login test for ${name}`, async ({ page }) => {
  test.info().annotations.push({ type: "target", description: name });

  await page.goto(url);

  await page.fill('input[name="user"]', user);
  await page.fill('input[name="password"]', pass);
  await page.click('button[type="submit"]');

  // Verifica que se redirige correctamente
  await expect(page).not.toHaveURL(url);

  // Verifica que no haya mensaje de error
  const error = await page.locator("text=Invalid username or password").count();
  expect(error).toBe(0);
});
