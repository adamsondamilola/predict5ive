import { useState } from "react"
import urls from "./urls";
//import urls from "./urls";

const get = async (url, bearer) => {

    let data = []
    let token = null;
    try{
        let tok = localStorage.getItem('access_token');
      if(tok != null){
        //tok = JSON.parse(tok);
        token = tok //tok.access_token
      }
    }
    catch (e){
        console.error(e)
    }

    let header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }

      if(bearer === true){
        header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +token          
          }
      }

    const postOptions = {
        method: 'GET',
        headers: header
    };

   // if(token != null){

      try {
        const response = await fetch(urls.apiurl + url, postOptions);    
        const result = await response.json();
        console.log("Success:", result);
        data = result
      } catch (error) {
        console.error(error);
      }   
      return data; 
   // }
}


const post = async (url, form, boole, bearer) => {
    let data = []
    let token = null;
    try{
      let tok = localStorage.getItem('access_token');
    if(tok != null){
      //tok = JSON.parse(tok);
      token = tok //tok.access_token
    }
  }
    catch (e){
        console.error(e)
    }

    let header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }

      if(bearer == true){
        header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +token          
          } 
      }

    const postOptions = {
        method: 'POST',
        headers: header,
        body: JSON.stringify(form)
    };

    
    try {
      
      const response = await fetch(urls.apiurl + url, postOptions);    
        
      if(boole === true){
        if(response === true) return true;
        else return false;
      }else{
        const result = await response.json();
        console.log("Success:", result);
        data = result
      }
        
      } catch (error) {
        console.error(error);
      }  
      return data 
}

export default {get, post}