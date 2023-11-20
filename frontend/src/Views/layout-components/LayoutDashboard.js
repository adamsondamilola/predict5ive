import React, { Component } from 'react'; 
import Header from './Header';
import { Outlet} from "react-router-dom";
import Footer from './Footer';
import HeaderDashboard from './HeaderDashboard';
import FooterDashboard from './FooterDashboard';

const LayoutDashboard = () => {    
return <body className='main-body leftmenu'>
<HeaderDashboard/>
<div className="main-content side-content pt-0">

<div className="container-fluid">
    <div className="inner-body">
<Outlet/>
</div>
</div>
</div> 
<FooterDashboard/>
</body>

}
export default LayoutDashboard