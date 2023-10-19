const { test, expect } = require("@playwright/test");
const { API } = require("../helper/API");
const {Chance} = require('chance');
const { ObjectArticle} = require("../objects/article");
const { ObjectSignIn } = require("../objects/login.js");
const { Generic } = require("../objects/generic")
const {users} = require("../objects/users")
const {chromium} = require("/Users/elebedev/PlayWrite/node_modules/playwright-core")
test.use({ storageState: 'playwright/.auth/user.json' });
    



test ("create article through API/ui", async({page}) => {
    //const api = new API ("http://localhost:3000/api/");
    const generic = new Generic(page);

    //const token = await chromium.launch(() => {
    //    return api.getAuthToken(user1.email, user1.password);
    //});

    
    
    await generic.load();

    let objectArticle = new ObjectArticle(page);
    await objectArticle.newArticle.click();
    await objectArticle.article(title, description, body, tags)
    await objectArticle.publish.click();
    await expect (objectArticle.createdArticleBody).toHaveText(body)
})


test ("edit article through API/ui", async({page}) => {
    const api = new API ("https://conduit-api.learnwebdriverio.com/api");
    const chance = new Chance();
    let objectSignIn = new ObjectSignIn(page);
    let objectArticle = new ObjectArticle(page);
    let generic = new Generic(page)
    let title = "dick " + chance.sentence({words: 1});
    let description = "dick2 " + chance.sentence({words :2})
    let body = "dick3 " + chance.paragraph({sentence: 2})
    let articleDetails;
    let description2 = "Super dick " + chance.sentence({words :2})
    

    articleDetails = {"article":{
    "author":{},
    "title": title,
    "description": description,
    "body": body,
    "tagList":[]}}

    
    const articleResponce = await api.addArticle('demo@learnwebdriverio.com','wdiodemo', articleDetails)
    console.log(articleResponce)

    await objectSignIn.goto();
    await objectSignIn.login("demo@learnwebdriverio.com", "wdiodemo")
    await page.locator('//h1[(@data-qa-type="preview-title")]', {hasText: title}).click()
    await objectArticle.editArticle.click();
    await objectArticle.articleDescription.fill(description2);
    await objectArticle.publish.click();
    await generic.home.click();
   
    await expect (generic.previewDescription).toHaveText({description2})

    
})

test ("edit article through API/ui2", async({page}) => {
    const api = new API ("https://conduit-api.learnwebdriverio.com/api");
    const chance = new Chance();
    
    let articleDetails;
    let title = "dick " + chance.sentence({words: 1});
    let description = "dick2 " +chance.sentence({words :2})
    let body = "dick3 " + chance.paragraph({sentence: 2})

    articleDetails = {"article":{
    "author":{},
    "title": title,
    "description": description,
    "body": body,
    "tagList":[]}}
    
    let articleDetails2;
    let title2 = "dick " + chance.sentence({words: 1}) + " Dick Head";
    let description2 = "dick2 " +chance.sentence({words :2})
    let body2 = "dick3 " + chance.paragraph({sentence: 2})

    articleDetails2 = {"article":{
        "author":{},
        "title": title2,
        "description": description2,
        "body": body2,
        "tagList":[]}}

    console.log(articleDetails)
    
    const articleResponce = await api.addArticle('demo@learnwebdriverio.com','wdiodemo', articleDetails)

    //console.log(articleResponce)
    
    const articleResponce2 = await api.editArticle('demo@learnwebdriverio.com','wdiodemo', articleDetails2, articleResponce.slug)

    console.log(articleResponce2)



})
