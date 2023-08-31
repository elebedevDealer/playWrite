const { test, expect } = require("@playwright/test");
const { ObjectArticle} = require("../objects/article");
const { ObjectSignIn } = require("../objects/login.js");
const { API } = require("../helper/API");


/*test.beforeEach(async ({page}) => {
    let objectSignIn = new ObjectSignIn(page);
    await objectSignIn.goto();
    await objectSignIn.login("demo@learnwebdriverio.com", "wdiodemo");
});
*/

test ("create article", async({page}) => {
    let objectArticle = new ObjectArticle(page);
    await objectArticle.newArticle.click();
    await objectArticle.article("dick", "dick2", "dick3", "dick4")
    await objectArticle.publish.click();
    await expect (objectArticle.createdArticleBody).toHaveText("dick3")

});  

test ("edit article", async({page}) => {
    let objectArticle = new ObjectArticle(page);
    await objectArticle.testArticle();
    await objectArticle.editArticle.click();
    await objectArticle.articleBody.fill('8888');
    await objectArticle.publish.click();
    await expect (objectArticle.createdArticleBody).toHaveText("8888") 
});

test ("edit article through API", async({page}) => {
    const api = new API ("https://conduit-api.learnwebdriverio.com/api");
    
    let articleDetails;

    articleDetails = {"article":{"author":{},"title":"dick22","description":"dick2","body":"dick3","tagList":[]}}

    const articleResponce = await api.addArticle('demo@learnwebdriverio.com','wdiodemo', articleDetails)

    console.log(articleResponce)
    let objectSignIn = new ObjectSignIn(page);
    let objectArticle = new ObjectArticle(page);
    await objectSignIn.goto();
    await objectSignIn.login("demo@learnwebdriverio.com", "wdiodemo")
    await page.locator('//h1[(@data-qa-type="preview-title")and(contains(text(),"dick22"))]').click()
    
    await objectArticle.editArticle.click();
    await objectArticle.articleBody.fill('8888');
    await objectArticle.publish.click();
    await expect (objectArticle.createdArticleBody).toHaveText("8888")

    const articleDelete = await api.deleteArticle('demo@learnwebdriverio.com','wdiodemo', articleResponce.slug)
    console.log(articleDelete)
});