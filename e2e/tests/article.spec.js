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
    
    //const token = await api.getToken('demo@learnwebdriverio.com','wdiodemo')
    //console.log (token);
    
    let articleDetails;

    articleDetails = {"article":{"author":{},"title":"dick","description":"dick2","body":"dick3","tagList":[]}}

    const articleResponce = await api.addArticle('demo@learnwebdriverio.com','wdiodemo', articleDetails)

    console.log(articleResponce)


   /* let objectArticle = new ObjectArticle(page);
    await objectArticle.testArticle();
    await objectArticle.editArticle.click();
    await objectArticle.articleBody.fill('8888');
    await objectArticle.publish.click();
    await expect (objectArticle.createdArticleBody).toHaveText("8888") 
   */ 
});