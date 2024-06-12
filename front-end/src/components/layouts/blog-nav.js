"use client";
import { FaHome, FaPowerOff, FaSignInAlt, FaSignOutAlt, FaTelegram, FaTwitter, FaUserNinja } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';


const BlogNav = () => {
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [userDetails, setUserDetails] = useState(null)
    const [userRole, setUserRole] = useState('')

    var options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    const GetUserDetails = () => {
        if (token != null) {
            fetch(endPoint + 'auth/user-profile', options)
                .then((response) => response.json())
                .then((json) => {
                    if (json.status == 1) {
                        setUserDetails(json.message);
                        setUserRole(json.message.account_type)
                    }
                })
                .catch((error) => console.error(error))
        }


    }

    const logOut = () => {
        var options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        
        if (token != null) {
            fetch(endPoint + 'auth/logout', options)
                .then((response) => response.json())
                .then((json) => {
                    if (json.status == 1) {
                        toast.success(json.message);
                        removeCookie("token")
                        window.location.replace("/")
                    }
                })
                .catch((error) => console.error(error))
        }


    }

    useEffect(() => {
        GetUserDetails()
    }, []);

    return (
        <nav className="w-full dark:bg-gray-800 dark:text-white py-4 bg-purple-800 shadow fixed w-full z-20 top-0 left-0 ">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between">

            <nav>
                <ul className="flex items-center justify-between font-bold text-sm text-white uppercase no-underline">
                <li><Link className="flex hover:text-gray-200 hover:underline px-2 animate-blink" to="/premium"> 
                Premium
                <span class="flex h-3 w-3 pointer-events-none">
  <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-200 opacity-75"></span>
  <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
</span>
                </Link></li>
                <li style={{display: !userDetails? `block` : `none`}}><Link className="hover:text-gray-200 hover:underline px-4" to="/auth/login"> <FaSignInAlt /> </Link></li>
                <li style={{display: userDetails? `block` : `none`}} onClick={logOut}><Link className="hover:text-gray-200 hover:underline px-4" to="/auth/login"> <FaPowerOff/> </Link></li>
                </ul>
            </nav>

            <div className="flex items-center text-lg no-underline text-white pr-6">
            
                {/*<a className="" href="#">
                <FontAwesomeIcon
                    icon={faYoutube}
                    style={{ fontSize: 20 }}
                />
                </a>
                <a className="pl-6" href="#">
                <FontAwesomeIcon
                    icon={faInstagram}
                    style={{ fontSize: 20 }}
                />
                </a>*/}
                <Link className="pl-6" to="/">
                <FaHome/>
                </Link>
                <a className="pl-6" href="https://t.me/predict_5ive">
                <FaTelegram/>
                </a>
                <a className="pl-6" href="https://twitter.com/predict5ive">
                
                <FaTwitter/>
                </a>
            </div>
        </div>
<ToastContainer/>
<div className="flex flex-col items-center text-white">
<a style={{display: userDetails && userRole == "Admin"? `block` : `none`}} href="/admin/dashboard"> 
                <FaUserNinja/>
                </a>
                </div>
    </nav>

    )
}

export default BlogNav