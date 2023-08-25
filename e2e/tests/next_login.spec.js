// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("Login page", () => {
    test.beforeEach(async ({page}) => {
        // Go to the start page before each test.
        await page.goto("/login");
});

test("simple login", async ({ page }) => {
    
    await expect (page).toHaveURL("https://demo.learnwebdriverio.com/login");

    // Fill email. 
    const email = await page.locator('//input[@type="email" and @placeholder="Email"]')
    const emailValue = '-'
        
    email
        .fill(emailValue);

    // Check that email value was inserted    
    await expect(email).toHaveValue(emailValue)
    
    // Fill password.
    await page
        .locator('//input[@type="password" and @placeholder="Password"]')
        .fill('-')

    // Check that password value was inserted    
    await expect(page
        .locator('//input[@type="password" and @placeholder="Password"]')).toHaveValue('-')        
    
    // Click on 'Sign in' button
    await page.locator('//button[(contains(@class,"btn-lg"))and(contains(text(),"Sign in"))]').click();

    // Inside check
    await expect (page.locator('//a[@href="/settings"][contains(text(),"Settings")]')).toBeVisible();
});

test("missing email", async ({ page }) => {
    
    await expect (page).toHaveURL("https://demo.learnwebdriverio.com/login");
    
    // Fill password.
    await page
        .locator('//input[@type="password" and @placeholder="Password"]')
        .fill('-')

    // Check that passord value was inserted    
    await expect(page
        .locator('//input[@type="password" and @placeholder="Password"]')).toHaveValue('-')        
    
    // Click on 'Sign in' button
    await page.locator('//button[(contains(@class,"btn-lg"))and(contains(text(),"Sign in"))]').click();

    // Erros password check
    await expect (page.locator(`//ul[@class="error-messages"]/li[contains(text(),"email can't be blank")]`)).toBeVisible();
});

test("missing password", async ({ page }) => {
    
    // Fill email. 
    const email = await page.locator('//input[@type="email" and @placeholder="Email"]')
    const emailValue = '-'
        
    email
        .fill(emailValue);
    
    // Click on 'Sign in' button
    await page.locator('//button[(contains(@class,"btn-lg"))and(contains(text(),"Sign in"))]').click();

    // Error password check
    await expect (page.locator(`//ul[@class="error-messages"]`)).toContainText("password can't be blank");
});
});











