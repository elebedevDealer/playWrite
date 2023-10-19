import {test as setup} from "@playwright/test"
const authFile = 'playwright/.auth/user.json'
const { API } = require("../helper/API"); 


setup('authenticate', async({request}) => {
    //const api = new API("https://conduit-api.learnwebdriverio.com/api");
    const requestPost = await request.post('https://conduit-api.learnwebdriverio.com/api/users/login',  
        {"user":{"email":"demo@learnwebdriverio.com","password":"wdiodemo"}})
    //.then((res) => res.data.user.token);
    console.log(requestPost);
    await request.storageState({path:authFile});
    
    });
