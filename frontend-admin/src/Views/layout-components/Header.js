import React, { Component, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import Modal from 'react-modal';

const Header = () => {

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
  removeCookie('token')    

}

    useEffect( () => {
        GetWebsiteDetails()
          GetUserDetails()
        // PageBarTitle(pageName);
     },[]);
    
return (
<div data-elementor-type="header" data-elementor-id="197" class="elementor elementor-197 elementor-location-header">
<div class="elementor-section-wrapd">
<header class="elementor-section elementor-top-section elementor-element elementor-element-cdfba2f elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="cdfba2f" data-element_type="section">
<div class="elementor-container elementor-column-gap-no">
<div class="elementor-row">
<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-2159941" data-id="2159941" data-element_type="column">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-widget-wrap">
<div class="elementor-element elementor-element-b0a424b elementor-widget__width-initial elementor-widget elementor-widget-spacer" data-id="b0a424b" data-element_type="widget" data-widget_type="spacer.default">
<div class="elementor-widget-container">
<div class="elementor-spacer">
<div class="elementor-spacer-inner"></div>
</div>
</div>
</div>
<div class="elementor-element elementor-element-5069498 elementor-widget__width-initial elementor-widget elementor-widget-spacer" data-id="5069498" data-element_type="widget" data-widget_type="spacer.default">
<div class="elementor-widget-container">
<div class="elementor-spacer">
<div class="elementor-spacer-inner"></div>
</div>
</div>
</div>
<div class="elementor-element elementor-element-1569f3e elementor-widget__width-auto elementor-widget elementor-widget-heading" data-id="1569f3e" data-element_type="widget" data-widget_type="heading.default">
<div class="elementor-widget-container">
<span class="elementor-heading-title elementor-size-default">{websiteDetails.title}</span> </div>
</div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-094a029" data-id="094a029" data-element_type="column">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-widget-wrap">
<div class="elementor-element elementor-element-e024d3f elementor-widget__width-auto elementor-nav-menu__align-right elementor-nav-menu--stretch elementor-nav-menu--dropdown-tablet elementor-nav-menu__text-align-aside elementor-nav-menu--toggle elementor-nav-menu--burger elementor-widget elementor-widget-nav-menu" data-id="e024d3f" data-element_type="widget" data-settings="{&quot;full_width&quot;:&quot;stretch&quot;,&quot;layout&quot;:&quot;horizontal&quot;,&quot;submenu_icon&quot;:{&quot;value&quot;:&quot;&lt;i class=\&quot;fas fa-caret-down\&quot;&gt;&lt;\/i&gt;&quot;,&quot;library&quot;:&quot;fa-solid&quot;},&quot;toggle&quot;:&quot;burger&quot;}" data-widget_type="nav-menu.default">
<div class="elementor-widget-container">

<nav class="elementor-nav-menu--main elementor-nav-menu__container elementor-nav-menu--layout-horizontal e--pointer-background e--animation-shrink">
<ul id="menu-1-e024d3f" class="elementor-nav-menu"><li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-1056 current_page_item menu-item-1062"><Link to="/" aria-current="page" class="elementor-item">Home</Link></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-1056 current_page_item menu-item-1062"><Link to="/posts" aria-current="page" class="elementor-item">Posts</Link></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-359"><Link to="/faq" class="elementor-item">FAQ</Link></li>
<li style={{display: userDetails==""? `block` : `none`}} class="menu-item menu-item-type-custom menu-item-object-custom menu-item-367"><Link to="/login" class="elementor-item">Log In</Link></li>
<li style={{display: userDetails!=""? `block` : `none`}} class="menu-item menu-item-type-custom menu-item-object-custom menu-item-367"><Link to="/user/dashboard" class="elementor-item">Dashboard</Link></li>
<li style={{display: userDetails!=""? `block` : `none`}} class="menu-item menu-item-type-custom menu-item-object-custom menu-item-367"><Link to="#" class="elementor-item" onClick={()=>logOut()}>Log Out</Link></li>
</ul> 
</nav>


<div onClick={() => openModal()} class="elementor-menu-toggle" role="button" tabindex="0" aria-label="Menu Toggle" aria-expanded="false">
<i aria-hidden="true" role="presentation" class="elementor-menu-toggle__icon--open eicon-menu-bar"></i><i aria-hidden="true" role="presentation" class="elementor-menu-toggle__icon--close eicon-close"></i> <span class="elementor-screen-only">Menu</span>
</div>
<nav class="elementor-nav-menu--dropdown elementor-nav-menu__container" aria-hidden="true">
<ul id="menu-2-e024d3f" class="elementor-nav-menu">
    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-1056 current_page_item menu-item-1062"><Link to="/" aria-current="page" class="elementor-item" tabindex="-1">Home</Link></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-359"><Link to="/posts" class="elementor-item" tabindex="-1">Posts</Link></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-359"><Link to="/faq" class="elementor-item" tabindex="-1">FAQ</Link></li>
<li style={{display: userDetails==""? `block` : `none`}} class="menu-item menu-item-type-custom menu-item-object-custom menu-item-367"><Link to="/login" class="elementor-item" tabindex="-1">Log In</Link></li>
<li style={{display: userDetails!=""? `block` : `none`}} class="menu-item menu-item-type-custom menu-item-object-custom menu-item-367"><Link to="/user/dashboard" class="elementor-item" tabindex="-1">Dashboard</Link></li>
<li style={{display: userDetails!=""? `block` : `none`}} class="menu-item menu-item-type-custom menu-item-object-custom menu-item-367"><Link to="#" class="elementor-item" tabindex="-1" onClick={()=>logOut()}>Log Out</Link></li>
<li style={{display: userDetails==""? `block` : `none`}} class="menu-item menu-item-type-custom menu-item-object-custom menu-item-367"><Link to="/register" class="elementor-item" tabindex="-1">Register</Link></li>
</ul> </nav>
</div>
</div>


</div>
</div>
</div>
</div>
</div>
</header>
</div>

<div style={{zIndex: 1000, display: mobileNavOpen? `block` : `none`}} class="card">
  <div className='text-center text-danger'> 
  <i onClick={() => closeModal()} className='fa fa-times fs-3'></i> 
  </div>
<ul onClick={() => closeModal()} id="menu-2-e024d3f" class="elementor-nav-menu">
    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-1056 current_page_item menu-item-1062"><Link to="/" aria-current="page" class="elementor-item" tabindex="-1">Home</Link></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-359"><Link to="/posts" class="elementor-item" tabindex="-1">Posts</Link></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-359"><Link to="/faq" class="elementor-item" tabindex="-1">FAQ</Link></li>
<li style={{display: userDetails==""? `block` : `none`}} class="menu-item menu-item-type-custom menu-item-object-custom menu-item-367"><Link to="/login" class="elementor-item" tabindex="-1">Log In</Link></li>
<li style={{display: userDetails!=""? `block` : `none`}} class="menu-item menu-item-type-custom menu-item-object-custom menu-item-367"><Link to="/user/dashboard" class="elementor-item" tabindex="-1">Dashboard</Link></li>
<li style={{display: userDetails!=""? `block` : `none`}} class="menu-item menu-item-type-custom menu-item-object-custom menu-item-367"><Link to="#" class="elementor-item" tabindex="-1" onClick={()=>logOut()}>Log Out</Link></li>
<li style={{display: userDetails==""? `block` : `none`}} class="menu-item menu-item-type-custom menu-item-object-custom menu-item-367"><Link to="/register" class="elementor-item" tabindex="-1">Register</Link></li>
</ul> 
</div>

<ToastContainer />
</div>

)
}
export default Header