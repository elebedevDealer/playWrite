const { test, expect } = require("@playwright/test");
const { ObjectSignUp } = require("../objects/signup");

let objectSignUp

test.beforeEach(async ({page}) => {
    objectSignUp = new ObjectSignUp(page);
    await objectSignUp.goto();
});


test ("object requaried fields", async ({page}) => {
    await objectSignUp.fillFields('elebedev1','elebedev@mail.ru','123456')
    await expect (objectSignUp.username).toHaveValue('elebedev1');
    await expect (objectSignUp.email).toHaveValue('elebedev@mail.ru');
    await expect (objectSignUp.password).toHaveValue('123456');
});

test ("object taken username", async ({page}) => {
    await objectSignUp.fillFields('demouser','demo@1learnwebdriverio.com','123456');
    await objectSignUp.signUp.click();
    await expect (objectSignUp.errorMesssage).toContainText(`username is already taken.`);
    await expect (objectSignUp.errorMesssage).toHaveCount(1);
});

test ("object email is not valid", async ({page}) => {
    await objectSignUp.fillFields('elebedev1','elebedevmail1.ru','123456');
    await objectSignUp.signUp.click();
    await expect (objectSignUp.errorMesssage).toContainText(`email is invalid`);
});

test ("object taken email", async ({page}) => {
    await objectSignUp.fillFields('elebedev1','-','123456');
    await objectSignUp.signUp.click();
    await expect (objectSignUp.errorMesssage).toContainText(`email is already taken.`);
});

test ("register", async ({page}) => {
    await objectSignUp.fillFields('elebedev2','elebedev@mail2.ru','123456');
    await objectSignUp.signUp.click();
    await expect (objectSignUp.settings).toContainText(`Settings`);
});

test ("object taken all", async ({page}) => {
    await objectSignUp.fillFields('demouser','-','123456');
    await objectSignUp.signUp.click();
    await expect (objectSignUp.errorMesssages).toContainText(`username is already taken.`);
    await expect (objectSignUp.errorMesssages).toContainText(`email is already taken.`);
    await expect (objectSignUp.errorMesssage).toHaveCount(2);
});