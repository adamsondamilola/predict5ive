import React, { Component, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import Modal from 'react-modal';

const UserHeaderDashboard = () => {

    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [userDetails, setUserDetails] = useState([])
    const [websiteDetails, setWebsiteDetails] = useState([])

    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    function openModal() {
      setMobileNavOpen(true);
    }
  
    function closeModal() {
      setMobileNavOpen(false);
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
               // window.location.replace("/login");
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
const logOut = () => {  
    removeCookie('token')  
    var options = {  
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +token
        }
      }   
    fetch(process.env.REACT_APP_MAIN_API + 'auth/logout', options)
  .then((response) => response.json())
  .then((json) => {
      if (json.status == 1) { 
        {toast.success(json.message)} 
        window.location.replace("/")
      }
  })
  .catch((error) => console.error(error))
  .finally(console.log(""))
}

    useEffect( () => {
        GetWebsiteDetails()
          GetUserDetails()
        // PageBarTitle(pageName);
     },[]);
    
     return (
<>

            {/*pc view*/}
            <div className="main-sidebar main-sidebar-sticky side-menu">
				<div className="sidemenu-logo">
					<h4 className="main-logo text-white">
						{websiteDetails.title} 
					</h4>
				</div>
								<div className="main-sidebar-body">
									<ul className="nav">

						<li className="nav-item">
							<a className="nav-link" href="/user/dashboard"><i className="fa fa-home sidemenu-icon"></i><span className="sidemenu-label">Dashboard</span></a> 
										</li>
                    <li className="nav-item">
							<a className="nav-link" href="/user/predictions"><i className="fa fa-star text-warning sidemenu-icon"></i><span className="sidemenu-label">Predictions</span> &nbsp;&nbsp;&nbsp;&nbsp;</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/user/your_predictions"><i className="fa fa-star sidemenu-icon"></i><span className="sidemenu-label">Your Predictions</span> &nbsp;&nbsp;&nbsp;&nbsp;</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/user/add_prediction"><i className="fa fa-plus sidemenu-icon"></i><span className="sidemenu-label">Add Prediction</span> &nbsp;&nbsp;&nbsp;&nbsp;</a>
						</li>
						 <li className="nav-item">
							<a className="nav-link" href="/user/payment_options"><i className="fa fa-money sidemenu-icon"></i><span className="sidemenu-label">Payment Options</span> &nbsp;&nbsp;&nbsp;&nbsp;</a>
						</li> 
						<li className="nav-item">
							<a className="nav-link" href="/user/withdraw"><i className="fa fa-wallet sidemenu-icon"></i><span className="sidemenu-label">Withdraw</span> &nbsp;&nbsp;&nbsp;&nbsp;</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/user/transactions"><i className="fa fa-list sidemenu-icon"></i><span className="sidemenu-label">Transactions</span> &nbsp;&nbsp;&nbsp;&nbsp;</a>
						</li>

						<li className="nav-item">
							<a className="nav-link" href="/user/referrals"><i className="fe fe-users sidemenu-icon"></i><span className="sidemenu-label">Referrals</span> &nbsp;&nbsp;&nbsp;&nbsp;</a>
										</li>
										
										<li style={{display: userDetails.account_type == "Vendor" || userDetails.account_type == "Admin"? `block` : `none` }} className="nav-item">
											<a className="nav-link" href="/user/coupon"><i className="fe fe-grid sidemenu-icon"></i><span className="sidemenu-label">Coupons</span></a>
						</li>
                        <li className="nav-item">
							<a className="nav-link" href="/user/account"><i className="fe fe-user sidemenu-icon"></i><span className="sidemenu-label">Account</span></a>											
										</li>
												<li className="nav-item">
							<a className="nav-link" href="/user/faq"><i className="fa fa-question sidemenu-icon"></i><span className="sidemenu-label">Presentation/FAQ</span> &nbsp;&nbsp;&nbsp;&nbsp;</a>
						</li>

										<li onClick={()=>logOut()} className="nav-item">
											<span className="nav-link"><i className="fe fe-unlock sidemenu-icon"></i><span className="sidemenu-label ">Logout</span></span></li>
									</ul>
								</div>
			</div>



            <div className="main-header side-header sticky">
            <div className="container-fluid">
                <div className="main-header-left">
                    <a className="main-header-menu-icon" href="#" id="mainSidebarToggle"><span></span></a>
                </div>
                <div className="main-header-center">
                    <div className="responsive-logo">
                        <h4>
                        {websiteDetails.title} </h4>
                    </div>
                        
                            </div>
                         
            </div>
        </div>

</>
        
    )

}
export default UserHeaderDashboard