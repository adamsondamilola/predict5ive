import React, { Component } from 'react'; 
import Header from './Header';
import { Outlet} from "react-router-dom";
import Footer from './Footer';

const Layout = () => {    
return <>
{/*<Header/>*/}
<div data-elementor-type="page" data-elementor-id="1172" class="elementor elementor-1172">
<div class="elementor-inner">
<div class="elementor-section-wrap">
<Outlet/>
</div>
</div>
</div>
{/*<Footer/>*/}
</>

}
export default Layout