
import React, { Component, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import TitleBanner from '../../layout-components/TitleBanner';
import ConvertToRate from '../../../Utilities/ConvertToRate';
import TitleSection from '../../layout-components/TitleSection';
import { Link } from 'react-router-dom';
import PredictionsDashboard from './Predictions';
import Loading from '../../../Utilities/Loading';
import { ToastContainer, toast } from 'react-toastify';
import Announcement from '../../general-components/Announcement';
import Images from '../../../Utilities/Images';
import PredictionsView from './PredictionsView';

const DashboardUser = () => {

    const [cookies, setCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [userDetails, setUserDetails] = useState([])
    const [websiteDetails, setWebsiteDetails] = useState([])
    const [wallet, setWallet] = useState([])
    const [totalAvailable, setTotalAvailable] = useState(0)
    const [isLoading, setLoading] = useState(false)    
    const [referrals, setReferrals] = useState([]);
    const [coupon, setCoupon] = useState(null);
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)

    const cardsData = [
        {id: 1, title: userDetails.package, content: 'Package', imgUrl: Images.card_bg_4},
        {id: 2, title: ConvertToRate(userDetails.country, totalAvailable), content: 'Balance', imgUrl: Images.card_bg_2},
        {id: 3, title: ConvertToRate(userDetails.country, wallet.main_wallet), content: 'Main Wallet', imgUrl: Images.card_bg_1},
        {id: 4, title: ConvertToRate(userDetails.country, wallet.referral_commission), content: 'Commission', imgUrl: Images.card_bg_6},
        {id: 5, title: userDetails.country, content: 'Country', imgUrl: Images.card_bg_3},
      ]

      const Card = (props) => (
        <div className="slider_card" style={{backgroundImage: `url(${props.imgUrl})`, backgroundRepeat: `no-repeat`}}>
          <div className="slider_card-content">
            <p className='mt-4'>{ props.content }</p>
            <h2 className='text-white'>{ props.title }</h2>
          </div>
        </div>
      );
      
      const CardContainer = (props) => (
        <div className="slider_cards-container">
          {
            props.cards.map((card) => (
              <Card title={ card.title }
                content={ card.content }
                imgUrl={ card.imgUrl } />
            ))
          }
        </div>
      );

    const getPosts = () => {      
        fetch(endPoint +'user/referrals', options)
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
            fetch(endPoint + 'auth/user-profile', options)
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
  fetch(endPoint + 'user/wallet', options)
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

const GetWebsiteDetails = () => {         
    fetch(endPoint + 'settings/website_settings')
  .then((response) => response.json())
  .then((json) => {
      if (json.status == 1) { 
        setWebsiteDetails(json.message)         
      }
  })
  .catch((error) => console.error(error))
  .finally(console.log(""))
}

const activatePackage = () =>{
    setLoading(true)

    const postOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +token          
        },
        body: JSON.stringify({ 
            coupon: coupon,
         })
    };

    fetch(endPoint + 'user/activate-package', postOptions)
                .then((response) => response.json())
                .then((json) => {
                    if (json.status == 1) {
                        {toast.success(json.message)} 
                        GetUserDetails()
                        setLoading(false)

            }
                    else {
                        {toast.error(json.message)} 
                        setLoading(false)
                    }    
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
}


useEffect( () => {
    GetWebsiteDetails()
      GetUserDetails()
      getPosts()
      GetUserWallet()
 },[]);

return(
    <div className='container'>
      <div className='row mt-2'>

      <TitleSection title="Dashboard" />

<Announcement/>
      

      <div style={{display: userDetails.package_status != null && userDetails.package_status != 1? `block` : `none` }} className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
Your are yet to activate your package. Kindly enter your coupon code below to activate your package. <Link to={"/user/buy_coupon"}> <b>Click here</b></Link> to buy coupon code from vendors near you.
<hr/>
<div class="input-group mb-3">
  <input onChange={e => setCoupon(e.target.value)} maxLength={10} type="tel" class="form-control" placeholder="Coupon" aria-label="Coupon" aria-describedby="basic-addon1" />
  <div onClick={()=>activatePackage()} class="input-group-prepend">
    <span class="input-group-text"> {isLoading? <Loading /> : 'Activate'} </span>
  </div>
</div>
</div>

<CardContainer cards={ cardsData } />


<div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
<PredictionsView/>
</div>


      </div>

<ToastContainer />
</div>
)
}
export default DashboardUser