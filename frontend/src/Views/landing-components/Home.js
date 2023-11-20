import React, { Component, useEffect, useState } from 'react'; 
import Header from '../layout-components/Header';
import Banner from '../layout-components/Banner';
import Mission from './Mission';
import Counter from './Counter';
import Predictions from './Predictions';
import Posts from './Posts';
import Packages from './Packages';
import { useCookies } from 'react-cookie';
import Login from '../auth-components/Login';

const Home = () => {
    const [cookies, setCookie] = useCookies(["token"]); 
    const [token, setToken] = useState(cookies.token);
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
var options = {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +token
    }
  }

  const redirect = () => {
     
    window.location.replace("/login");
}

return <Login/>
}
export default Home;