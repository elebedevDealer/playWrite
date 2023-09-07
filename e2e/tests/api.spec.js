const { test, expect } = require("@playwright/test");
const { API } = require("../helper/API");
const {Chance} = require('chance');



test ("create article through API1", async({page}) => {
    const api = new API ("https://conduit-api.learnwebdriverio.com/api");
    const chance = new Chance();
    
    let articleDetails;
    let title = "dick " + chance.sentence({words: 1});
    let description = "dick2 " + chance.sentence({words :2})
    let body = "dick3 " + chance.paragraph({sentence: 2})

    articleDetails = {"article":{
    "author":{},
    "title": title,
    "description": description,
    "body": body,
    "tagList":[]}}
    
    console.log(articleDetails)
    
    
    const articleResponce = await api.addArticle('demo@learnwebdriverio.com','wdiodemo', articleDetails);

    const getArticle = await api.getArticle('demo@learnwebdriverio.com','wdiodemo', articleResponce.slug);
    
    await expect(getArticle.title).toEqual(articleDetails.article.title)

})

    test ("edit article through API2", async({page}) => {
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
        let title2 = `dick ${chance.sentence({words: 1})} Dick Head`;
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

test ("delete article through API2", async({page}) => {
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

    //console.log(articleResponce2)
    

    const articleDelete = await api.deleteArticle('demo@learnwebdriverio.com','wdiodemo', articleResponce.slug)
    console.log(articleDelete)



})