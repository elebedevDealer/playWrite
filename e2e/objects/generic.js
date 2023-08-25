const { expect } = require("@playwright/test");

exports.Generic = class Generic{
    constructor(page){
        this.page = page;
        this.url = page.locator("./");
        this.navbarConduit = page.locator("//nav[@data-qa-id='site-header']/div/a[(@href='/')and(contains(text(),'conduit'))]");
        this.home = page.locator("//nav[@data-qa-id='site-header']//li/a[(@href='/')and(contains(text(),'Home'))]");
        this.footerConduit = page.locator("//footer/div[@data-qa-id='site-footer']//a[(@href='/')and(contains(text(),'conduit'))]")
        this.thinkster = page.locator("//footer/div[@data-qa-id='site-footer']//a[(@href='https://thinkster.io')and((text()='Thinkster'))]")

}

async load(){
    await this.page.goto(url);
}

};