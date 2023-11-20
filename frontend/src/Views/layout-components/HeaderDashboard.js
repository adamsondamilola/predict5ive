import React, { Component, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import Modal from 'react-modal';

const HeaderDashboard = () => {

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
					<Link className="main-logo" to="/">
          {websiteDetails.title}
					</Link>
				</div>
								<div className="main-sidebar-body">
									<ul className="nav">


						<li className="nav-item">
							<a className="nav-link" href="/admin/dashboard"><i className="fa fa-home sidemenu-icon"></i><span className="sidemenu-label">Dashboard</span></a> 
										</li>
						<li className="nav-item">
							<a className="nav-link" href="/admin/add_game"><i className="fa fa-plus-circle sidemenu-icon"></i><span className="sidemenu-label">Add Game</span> &nbsp;&nbsp;&nbsp;&nbsp;</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/admin/add_post"><i className="fa fa-plus sidemenu-icon"></i><span className="sidemenu-label">Add Post</span> &nbsp;&nbsp;&nbsp;&nbsp;</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/admin/games"><i className="fa fa-circle sidemenu-icon"></i><span className="sidemenu-label">Games</span> &nbsp;&nbsp;&nbsp;&nbsp;</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/admin/posts"><i className="fa fa-pen sidemenu-icon"></i><span className="sidemenu-label">Posts</span> &nbsp;&nbsp;&nbsp;&nbsp;</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/admin/announcements"><i className="fa fa-list sidemenu-icon"></i><span className="sidemenu-label">Announcements</span> &nbsp;&nbsp;&nbsp;&nbsp;</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/admin/withdrawals"><i className="fe fe-grid sidemenu-icon"></i><span className="sidemenu-label">Withdrawals</span> &nbsp;&nbsp;&nbsp;&nbsp;</a>
										</li>
										
										<li className="nav-item">
							<a className="nav-link" href="/admin/users"><i className="fa fa-users sidemenu-icon"></i><span className="sidemenu-label">Users</span></a>
											
										</li>
										<li className="nav-item">
											<a className="nav-link" href="/admin/coupon"><i className="fe fe-layout sidemenu-icon"></i><span className="sidemenu-label">Coupon</span></a>
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
                        <a href="index#"><img src="/assets/img/brand/dark-logo.png" className="mobile-logo" alt="logo" /></a>
                    </div>
                        
                            </div>
                         
            </div>
        </div>


{/*mobile header*/}

</>
        
    )

}
export default HeaderDashboard