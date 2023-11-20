
import React, { Component, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import TitleBanner from '../../layout-components/TitleBanner';
import ConvertToRate from '../../../Utilities/ConvertToRate';
import TitleSection from '../../layout-components/TitleSection';
import { Link } from 'react-router-dom';
import PredictionsDashboard from './Predictions';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../../../Utilities/Loading';

const Transactions = () => {

    const [cookies, setCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [userDetails, setUserDetails] = useState([])
    const [txns, setTxns] = useState([])
    const [websiteDetails, setWebsiteDetails] = useState([])
    const [wallet, setWallet] = useState([])
    const [totalAvailable, setTotalAvailable] = useState(0)
    
    const [isLoading, setLoading] = useState(false)

  
    
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
               window.location.replace("/login");
              }
          })
          .catch((error) => console.error(error))
          .finally(console.log(""))
    
}



const transactions = () => {         
    fetch(process.env.REACT_APP_MAIN_API + 'wallet/transactions', options)
  .then((response) => response.json())
  .then((json) => {
      if (json.status == 1) { 
        setTxns(json.message)       
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
      transactions()
 },[]);


return(
    <div className='container'>
      <div className='row mt-2'>

      <TitleSection title="Transactions" />
     


                                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <div className='table-responsive'>
                                            <table className='table'>
                                                <thead>
                                                    <tr>
                                                    <td>Date</td>
                                                    <td>Type</td>
                                                    <td>Amount</td>
                                                    <td>Status</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {txns.map( x => 
                                                    <tr>
                                                    <td>{new Date(x.created_at).toLocaleDateString()}</td>
                                                    <td>{x.type}</td>
                                                    <td>{ConvertToRate(userDetails.country, x.amount)}</td>
                                                    <td>
                                                        {
                                                            x.status==0?<span className='text-danger'> Pending </span>
                                                            : x.status==1?<span className='text-success'> Successful </span>
                                                            : x.status==2?<span className='text-secondary'> Rejected </span>
                                                            : null 
                                                        }
                                                    
                                                    
                                                    
                                                    </td>
                                                    </tr>)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
      </div>

      <ToastContainer />
</div>
)
}
export default Transactions