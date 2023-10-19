const { test, expect } = require("@playwright/test");
const { API } = require("../helper/API");
const {Chance} = require('chance');
const {users} = require("../objects/users")

function articleDetailz(marker = 'default') {
    const chance = new Chance();
    let articleDetails;
    let title = ` ${marker}` + chance.sentence({ words: 1 });
    let description = "dick2 " + chance.sentence({ words: 2 });
    let body = "dick3 " + chance.paragraph({ sentence: 2 });
  
    articleDetails = {
      article: {
        author: {},
        title: title,
        description: description,
        body: body,
        tagList: [],
      },
    };
  
    return articleDetails;
    //egor dick
    
  }
  
  test("create article through API1", async ({ page }) => {
    const api = new API("https://conduit-api.learnwebdriverio.com/api");
    const marker = 'Article create';
    const firstArticle = articleDetailz(marker);


    const articleResponce = await api.addArticle(users.user1, firstArticle);
    const getArticle = await api.getArticle(users.user1, articleResponce.slug);
   
    
    await expect(getArticle.title).toEqual(firstArticle.article.title);

    console.log(getArticle.title);
  });

    test ("edit article through API2", async({page}) => {
        const api = new API ("https://conduit-api.learnwebdriverio.com/api");
        
        const articleResponce = await api.addArticle(users.user1, articleDetailz())

        const updatedArticle = articleDetailz()
        console.log(updatedArticle.article.title + '11111');
        
        const updatedArticleResponce = await api.editArticle(users.user1, updatedArticle, articleResponce.slug)
        
        console.log(`Title from response: ${updatedArticleResponce.title}`);
    
        await expect(updatedArticleResponce.title).toEqual(updatedArticle.article.title);
})

test ("delete article through API2", async({page}) => {
    const api = new API ("https://conduit-api.learnwebdriverio.com/api");
    const articleResponce = await api.addArticle(users.user1, articleDetailz())

    const updatedArticle = articleDetailz()
    console.log(updatedArticle);
        
    const updatedArticleResponce = await api.editArticle(users.user1, updatedArticle, articleResponce.slug)
    
    console.log(updatedArticleResponce);

    
    const articleDelete = await api.deleteArticle(users.user1, articleResponce.slug)
    console.log(articleDelete)

    await expect(articleDelete.data).toBeFalsy();

})