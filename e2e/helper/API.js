const { expect } = require("@playwright/test");
//const axios = require('axios');
import axios from "axios" 

exports.API = class API {
    
    constructor(baseURL){
        this.api = axios.create({baseURL, Accept: 'application/json, text/plain, */*', 'Content-Type': 'application/json'});
        //this.url = page.locator("./");
        
}

async getToken(email, password){
    return await this.api
    .post('/users/login', { user: { email, password } })
    .then((res) => res.data.user.token);

}


async addArticle(email, password, details){
  const token = await this.getToken(email, password);
  console.log(token);
  const body = details;
  const headers = {
    "headers": {
      "Authorization": `Token ${token}`,
    },
  };

  const response = await this.api.post('/articles', body, headers
  );
  console.log(response);
  return response.data.article;
}

async deleteArticle(email, password, slug) {
  const token = await this.getToken(email, password);
  return this.api.delete(`articles/${slug}`, {
      headers: { Authorization: `Token ${token}` }
  });
}


/*
var data = JSON.stringify({
  "article": {
    "author": {},
    "title": "d111111",
    "description": "a1111wacfa",
    "body": "1111afaf",
    "tagList": []
  }
});

var config = {
  method: 'post',
  url: 'https://conduit-api.learnwebdriverio.com/api/articles',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYWM4YWZmNzdhZjZkMWQwMDNjMTM5MiIsInVzZXJuYW1lIjoiZGVtb3VzZXIiLCJleHAiOjE2OTY1OTQ0ODcsImlhdCI6MTY5MTQxMDQ4N30.MlfB-754_Ch3PJ8Z2pfOgMW-ZBi6NXURtW87M6q3E6I', 
    'Content-Type': 'application/json'
  },
  data : data
};


async sendRequest(config){
    await ();
axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
}
*/
}