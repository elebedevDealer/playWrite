const { expect } = require("@playwright/test");
const axios = require('axios');
const {Chance} = require('chance');
const { users } = require("../objects/users");

//import axios from "axios" 


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



async addArticle(user, details){
  const token = await this.getToken(user.email, user.password);
  console.log(token);
  const body = details;
  const headers = {
    "headers": {
      "Authorization": `Token ${token}`,
    },
  };

  
  const response = await this.api.post('/articles', body, headers
  );
  //console.log(response);
  return response.data.article;
}

async editArticle(user, details2, slug){
  const token = await this.getToken(user.email, user.password);
  const body = details2
  const headers = {
    "headers": {
      "Authorization": `Token ${token}`,
    },
  };
  const response = await this.api.put(`articles/${slug}`, body, headers
  );
  //console.log(response);
  return response.data.article;
}

async getArticle(user, slug){
  const token = await this.getToken(user.email, user.password);
  const headers = {
    "headers": {
      "Authorization": `Token ${token}`,
    },
  };
  const response = await this.api.get(`articles/${slug}`, headers);
  //console.log(response);
  return response.data.article
}

async deleteArticle(user, slug) {
  const token = await this.getToken(user.email, user.password);
  return this.api.delete(`articles/${slug}`, {
      headers: { Authorization: `Token ${token}` }
  });
}
}