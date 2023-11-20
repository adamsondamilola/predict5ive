
import React, { Component, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import TitleBanner from '../../layout-components/TitleBanner';
import ConvertToRate from '../../../Utilities/ConvertToRate';
import PredictionsDash from './Predictions';

const DashboardAdmin = () => {

    const [cookies, setCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [userDetails, setUserDetails] = useState([])
    const [websiteDetails, setWebsiteDetails] = useState([])
    
    const [referrals, setReferrals] = useState([]);
    const getPosts = () => {      
        fetch(process.env.REACT_APP_MAIN_API +'user/referrals', options)
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 1) {
                    var x = json.message;
                    setReferrals(x)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => console.log(""));
    }
  
    
    var options = {  
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +token
          
        }
      }

      const GetUserDetails = () => {
         
            fetch(process.env.REACT_APP_MAIN_API + 'auth/user-profile', options)
          .then((response) => response.json())
          .then((json) => {
              if (json.status == 1) { 
                setUserDetails(json.message) 
                
              }else{
               // alert(token)
               //window.location.replace("/login");
              }
          })
          .catch((error) => console.error(error))
          .finally(console.log(""))
    
     
}

const GetWebsiteDetails = () => {
         
    fetch(process.env.REACT_APP_MAIN_API + 'settings/website_settings')
  .then((response) => response.json())
  .then((json) => {
      if (json.status == 1) { 
        setWebsiteDetails(json.message)         
      }
  })
  .catch((error) => console.error(error))
  .finally(console.log(""))
}

useEffect( () => {
    GetWebsiteDetails()
      GetUserDetails()
      getPosts()
 },[]);

return(
    <>
<PredictionsDash/> 
    </>
)
}
export default DashboardAdmin