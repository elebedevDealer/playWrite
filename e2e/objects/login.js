const { expect } = require("@playwright/test");
const { Generic } = require("./generic");


exports.ObjectSignIn = class ObjectSignIn {

    constructor(page) {
        this.page = page;
        this.email = page.locator('//input[@type="email" and @placeholder="Email"]');
        this.password = page.locator('//input[@type="password" and @placeholder="Password"]');
        this.signin = page.locator('//button[(contains(@class,"btn-lg"))and(contains(text(),"Sign in"))]');
        this.errorMesssage = page.locator(`//ul[@class="error-messages"]`);
        this.settings = page.locator('//a[@href="/settings"]');
        
         
        
    }

    async goto() {
        await this.page.goto("/login")
    }

    async login(email, password) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.signin.click();
        await expect (this.settings).toContainText('Settings');
    }

    async emailError() {
        await this.errorMesssage.toContainText("email can't be blank");
    }

    async passwordError() {
        await this.errorMesssage.toContainText("password can't be blank");
    }
    
};
