const { expect } = require("@playwright/test");

exports.Editor = class Editor{
    constructor(page){
        this.page = page;
        this.title = page.locator('//input[@data-qa-id="editor-title"]')
    }
}