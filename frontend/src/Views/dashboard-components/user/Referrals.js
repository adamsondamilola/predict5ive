
import React, { Component, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import TitleBanner from '../../layout-components/TitleBanner';
import ConvertToRate from '../../../Utilities/ConvertToRate';
import TitleSection from '../../layout-components/TitleSection';

const Referrals = () => {

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
               window.location.replace("/login");
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

    const referralLink = <></>
return(
<div className='row'> 
    <TitleSection title="Referrals"/>

<div className='col-md-12 mb-3'>
    If you need to invite anyone, below is your referral link.
</div>
<div className='col-md-12 mb-3'>
<input className='form-control' value={websiteDetails.website + userDetails.username+"/register"}/>
</div>
<div className='col-md-12 mb-3'>
If you have sent your referral link out, kindly check below to see users that has signed up with your link.
</div>

<div className='col-md-12 mb-3'>
    <h1 className='text-center'> {referrals.length} </h1>
</div>

<div className='table-responsive'>
<table className='table'>
<tr>
<th>Username</th>
<th>Package</th>
<th>Commission.</th>
</tr>
{referrals.map(x =>
  <tr>
    <td>{x.username}</td>
    <td>{x.package}</td>
    <td>{ConvertToRate(userDetails.country, x.bonus)}</td>
  </tr>
  )}
</table>

</div>
</div>

)
}
export default Referrals