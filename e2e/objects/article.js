const { expect } = require("@playwright/test");

exports.ObjectArticle = class ObjectArticle {

    constructor(page){
        this.page = page;
        this.newArticle = page.locator('//a[@href="/editor"]');
        this.articleTitle = page.locator('//input[@data-qa-id="editor-title"]');
        this.articleDescription = page.locator('//input[@data-qa-id="editor-description"]');
        this.articleBody = page.locator('//div[@data-qa-id="editor-body"]//textarea');
        this.articleTags = page.locator('//input[@data-qa-id="editor-tags"]');
        this.publish = page.locator('//button[@data-qa-id="editor-publish"]');
        this.createdArticleBody = page.locator('//div[@data-qa-id="article-body"]/p');
        this.createdArticleDescription = page.locator('')
        this.editArticle = page.locator('//div[@class="banner"]//a[@data-qa-id="article-edit"]');

    }

    async article(title, description, body, tags){
        await this.articleTitle.fill(title);
        await this.articleDescription.fill(description);
        await this.articleBody.fill(body);
        await this.articleTags.fill(tags);
    }    

    async testArticle(){
        await this.newArticle.click();
        await this.article("dick11", "dick22", "dick33", "dick44");
        await this.publish.click();
    }
}