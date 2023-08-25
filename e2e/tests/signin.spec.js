const { test, expect } = require("@playwright/test");
const { ObjectSignIn } = require("../objects/login");

let objectSignIn;

test.describe("login", () => {
test.beforeEach(async ({page}) => {
    objectSignIn = new ObjectSignIn(page);
    await objectSignIn.goto();
})

test ("object login", async ({page}) => {
    
    await objectSignIn.login('-','-')
    await expect (objectSignIn.settings).toContainText('Settings');
});

test ("object error email", async ({page}) => {
    await objectSignIn.login('','-');
    await expect (objectSignIn.errorMesssage).toContainText(`email can't be blank`);
});

test ("object error password", async ({page}) => {
    await objectSignIn.login('-','');
    await expect (objectSignIn.errorMesssage).toContainText(`password can't be blank`);
});

});

