// @ts-check
const { test, expect } = require('@playwright/test');

test('main page', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Conduit/);
});

test('sign in form', async ({ page }) => {
    await page.goto('/');
    
    // Click the Sign in link.
    await page.locator('//a[contains(text(),"Sign in")]').click(); 
    
    // Find Sign in element
    await expect(page.locator('//h1[contains(text(),"Sign in")]')).toBeVisible();
});

test('return to main page', async ({ page }) => {
    await page.goto('/');

    // Click the Sign up link.

    await page.locator('//a[contains(text(),"Sign up")]').click();

    // Find Sign up element
    await page.locator('//h1[text()="Sign up"]').click();


    // Click on footer 'conduit' to return to main page
    await page.locator('//footer/div/a[(contains(@class,"logo-font"))and(contains(text(),"conduit"))]').click();

    // Fond elment Global Feed on main page
    await expect (page.locator('//a[contains(text(),"Global Feed")]')).toBeVisible();
  
});



test('authorization', async ({ page }) => {
    await page.goto('/');

    // Click the Sign in link.
    await page.locator('//a[contains(text(),"Sign in")]').click(); 

    
    // Find Sign in element
    await page.locator('//h1[text()="Sign in"]').click();

    // Fill email. 
    const email = await page.locator('//input[@type="email" and @placeholder="Email"]')
    const emailValue = 'demo@learnwebdriverio.com'
        
    email
        .fill(emailValue);

    // Check that email value was inserted    
    await expect(email).toHaveValue(emailValue)
    
    // Fill password.
    await page
        .locator('//input[@type="password" and @placeholder="Password"]')
        .fill('wdiodemo')

    // Check that email value was inserted    
    await expect(page
        .locator('//input[@type="password" and @placeholder="Password"]')).toHaveValue('wdiodemo')        
    
    // Click on 'Sign in' button
    await page.locator('//button[(contains(@class,"btn-lg"))and(contains(text(),"Sign in"))]').click();

    // Inside check
    await expect (page.locator('//a[@href="/settings"][contains(text(),"Settings")]')).toBeVisible();
});