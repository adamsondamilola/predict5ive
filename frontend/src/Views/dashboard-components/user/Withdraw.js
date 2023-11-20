
import React, { Component, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import TitleBanner from '../../layout-components/TitleBanner';
import ConvertToRate from '../../../Utilities/ConvertToRate';
import TitleSection from '../../layout-components/TitleSection';
import { Link } from 'react-router-dom';
import PredictionsDashboard from './Predictions';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../../../Utilities/Loading';

const Withdraw = () => {

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

const GetUserWallet = () => {         
  fetch(process.env.REACT_APP_MAIN_API + 'user/wallet', options)
.then((response) => response.json())
.then((json) => {
    if (json.status == 1) { 
      setWallet(json.message)       
      setTotalAvailable(json.message.main_wallet + json.message.referral_commission + json.message.vendor_commission)
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
      GetUserWallet()
      transactions()
 },[]);

 const withdraw = (walletType) => {   
    setLoading(true)      
    fetch(process.env.REACT_APP_MAIN_API + 'wallet/'+walletType+'/withdraw', options)
  .then((response) => response.json())
  .then((json) => {
      if (json.status == 1) { 
        GetUserWallet()
      transactions()
        {toast.success(json.message)} 
        
      }else{
        {toast.error(json.message)} 
      }
  })
  .catch((error) => console.error(error))
  .finally(console.log(""))
  setLoading(false)
}

return(
    <div className='container'>
      <div className='row mt-2'>

      <TitleSection title="Withdraw" />

      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
Click on the box to withdraw from

<div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
<h1 className="mb-3 text-center fs-30">{ConvertToRate(userDetails.country, totalAvailable)}</h1>
</div>

      </div>

     
      {isLoading? <Loading /> : 
                                    <div onClick={()=>withdraw("main")} className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div className="card overflow-hidden bg-success-gradient">
                                            <div className="card-body">
                                                <div className="d-flex clearfix">
                                                    <div className="text-left">
                                                        <p className="mb-0 text-white fs-24">Main Wallet</p>
                                                        <h4 className="mb-0 text-white fs-30"> {ConvertToRate(userDetails.country, wallet.main_wallet)} </h4>
                                                        <p className="mb-0 text-white icon-service-1"></p><br />
                                                    </div>
                                                    <div className="ml-auto">
                                                        <span className="icon-service text-white ">
                                                            <i className="fa fa-wallet"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                    </div>
                                }

{isLoading? <Loading /> : 
                                    <div onClick={()=>withdraw("referral")} className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div className="card overflow-hidden bg-secondary-gradient">
                                            <div className="card-body">
                                                <div className="d-flex clearfix">
                                                    <div className="text-left">
                                                        <p className="mb-0 text-white fs-24">Referral Comm.</p>
                                                        <h4 className="mb-0 text-white fs-30"> {ConvertToRate(userDetails.country, wallet.referral_commission)} </h4>
                                                        <p className="mb-0 text-white icon-service-1"></p><br />
                                                    </div>
                                                    <div className="ml-auto">
                                                        <span className="icon-service text-white ">
                                                            <i className="fa fa-briefcase"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                    </div>
                                }

{isLoading? <Loading /> : 
                                    <div style={{display: userDetails.account_type == "Vendor" || userDetails.account_type == "Admin"? `block` : `none` }} onClick={()=>withdraw("vendor")} className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div className="card overflow-hidden bg-primary-gradient">
                                            <div className="card-body">
                                                <div className="d-flex clearfix">
                                                    <div className="text-left">
                                                        <p className="mb-0 text-white fs-24">Vendor Comm.</p>
                                                        <h4 className="mb-0 text-white fs-30"> {ConvertToRate(userDetails.country, wallet.vendor_commission)} </h4>
                                                        <p className="mb-0 text-white icon-service-1"></p><br />
                                                    </div>
                                                    <div className="ml-auto">
                                                        <span className="icon-service text-white ">
                                                            <i className="fa fa-briefcase"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                    </div>
                                }


                                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                       <h4>Transactions</h4>
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
export default Withdraw