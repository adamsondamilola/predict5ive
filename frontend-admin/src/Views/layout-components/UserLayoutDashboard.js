import React, { Component } from 'react'; 
import Header from './Header';
import { Outlet} from "react-router-dom";
import Footer from './Footer';
import UserHeaderDashboard from './UserHeaderDashboard';
import UserFooterDashboard from './UserFooterDashboard';

const UserLayoutDashboard = () => {    
return <body className='main-body leftmenu'>
<UserHeaderDashboard/>
<div className="main-content side-content pt-0">

<div className="container-fluid">
    <div className="inner-body">
<Outlet/>
</div>
</div>
</div>
<UserFooterDashboard/>
</body>

}
export default UserLayoutDashboard