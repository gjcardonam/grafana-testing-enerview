const { test, expect } = require("@playwright/test");
const { loadTargetCompany } = require("../utils/configLoader");

const { name, url, user, pass } = loadTargetCompany();

test(`Login test for ${name}`, async ({ page }) => {
  test.info().annotations.push({ type: "target", description: name });

  await page.goto(url);

  await page.fill('input[name="user"]', user);
  await page.fill('input[name="password"]', pass);
  await page.click('button[type="submit"]');

  // Esperar que no aparezca el mensaje de error (hasta 5s)
  await expect(page.locator('text=Invalid username or password')).toHaveCount(0, { timeout: 5000 });

  // Y luego esperar que la URL cambie (hasta 10s por si es lento)
  await expect(page).not.toHaveURL(url, { timeout: 10000 });

  // Verifica que no haya mensaje de error
  const error = await page.locator("text=Invalid username or password").count();
  expect(error).toBe(0);
});
