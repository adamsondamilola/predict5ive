import React, { Component, useEffect, useState } from 'react';
import Header from './Header';
import { Link, Outlet } from "react-router-dom";

const FooterDashboard = () => {    

     return (
        <div className="main-footer text-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <span>Copyright &copy; 2023 | All rights reserved.</span>
                    </div>
                </div>
            </div>
            <div className="sticky_bottom_button"><Link to="/admin/add_game"><img width="50" height="50" src="/assets/images/add.png" alt="" /></Link></div>
        </div>
    )
}
export default FooterDashboard