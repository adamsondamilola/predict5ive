import React, { Component, useEffect, useState } from 'react'; 
import TitleSection from '../../layout-components/TitleSection';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import ConvertToRate from '../../../Utilities/ConvertToRate';

const BuyCoupon = () => {
    const [websiteDetails, setWebsiteDetails] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [userDetails, setUserDetails] = useState([])
    const [vendors, setVendors] = useState([])
    const [packages, setPackages] = useState([])

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

    const getPackages = () => {
         
        fetch(process.env.REACT_APP_MAIN_API + 'settings/packages')
      .then((response) => response.json())
      .then((json) => {
          if (json.status == 1) { 
            setPackages(json.message)         
          }
      })
      .catch((error) => console.error(error))
      .finally(console.log(""))
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
                GetVendors(json.message.country)               
              }else{
               window.location.replace("/login");
              }
          })
          .catch((error) => console.error(error))
          .finally(console.log(""))    
}

const GetVendors = (country) => {         
    fetch(process.env.REACT_APP_MAIN_API + 'vendor/'+country+'/vendors', options)
  .then((response) => response.json())
  .then((json) => {
      if (json.status == 1) { 
        setVendors(json.message)                 
      }
      if (json.status == 0) { 
        {toast.error(json.message)}
      }
  })
  .catch((error) => console.error(error))
  .finally(console.log(""))    
}
    
    useEffect( () => {
      GetUserDetails()
        GetWebsiteDetails()
        getPackages()
     },[]);

return <div className='container'>
      <div className='row mt-2'>

      <TitleSection title="Buy Coupon" />
      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
        You can purchase coupon code from vendors listed in here only. If there is no vendor in your country, kindly write to us via our official email address {websiteDetails.email}
      </div>
      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
      Kindly note that a vendor is our representative in a country. However, they are not directly linked to us and their primary assignment is to sell coupon code and some times, make payment if authorized. If you are not satisfied with any vendor. kindly report to us.
      </div>
      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
      <div className='table-responsive'>
        <table>
            <thead> 
                <tr>
                <th>Package</th>
                <th>Amount</th>
                </tr>
            </thead>
            <tbody>
            {packages.map(x =>
                <tr>
                <td>{userDetails.package == x.package? <b>{x.package}</b> : x.package}</td>
                <td>{userDetails.package == x.package? <b>{ConvertToRate(userDetails.country, x.amount)}</b> : ConvertToRate(userDetails.country, x.amount)}</td>
                </tr>
)}
            </tbody>
        </table>
      </div>
      </div>

      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <div className='table-responsive'>
        <table>
            <thead> 
                <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Coupons left</th>
                </tr>
            </thead>
            <tbody>
            {vendors.map(x =>
                <tr>
                <td>{x.first_name} {x.last_name}</td>
                <td>{x.phone}</td>
                <td>{x.coupons}</td>
                </tr>
)}
            </tbody>
        </table> 
      </div>
      </div>
      <ToastContainer />
</div>
</div>
}
export default BuyCoupon