const { expect } = require("@playwright/test");

exports.ObjectSignUp = class ObjectSignUp{

    constructor(page) {
        this.page = page;
        this.username = page.locator('//input[@type="text" and @placeholder="Username"]');
        this.email = page.locator('//input[@type="text" and @placeholder="Email"]');
        this.password = page.locator('//input[@type="password" and @placeholder="Password"]');
        this.signUp = page.locator('//button[(contains(@class,"btn-lg"))and(contains(text(),"Sign up"))]');
        this.errorMesssage = page.locator(`//ul[@class="error-messages"]/li`);
        this.errorMesssages = page.locator(`//ul[@class="error-messages"]`);
        this.settings = page.locator('//a[@href="/settings"][contains(text(),"Settings")]');
        
    }

    async goto() {
        await this.page.goto("/register")
    }

    async fillFields(username, email, password) {
        await this.username.fill(username);
        await this.email.fill(email);
        await this.password.fill(password);
    }
    
    async emailError() {
        await this.errorMesssage.count();
    }

    async passwordError() {
        await this.errorMesssage.toContainText("password can't be blank");
    }
    
};