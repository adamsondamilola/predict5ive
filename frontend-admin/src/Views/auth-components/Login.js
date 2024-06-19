import Loading from '../../Utilities/Loading';
import ConvertToRate from '../../Utilities/ConvertToRate';
import React, { Component, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCookies } from "react-cookie";
import AlertToast from '../../Utilities/AlertToast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import TitleBanner from '../layout-components/TitleBanner';
import Announcement from '../general-components/Announcement';



const Login = () => {
const [email, setEmail] = useState(null);
const [username, setUsername] = useState(null);
const [password, setPassword] = useState(null);
const [errMsg, setErrMsg] = useState(null);
const [isLoading, setLoading] = useState(false)

const [cookies, setCookie] = useCookies(["token"]); 
const [token, setToken] = useState(cookies.token);

const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)


var options = {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +token
    }
  }

  const GetUserDetails = () => {
     
       if(token != null){
        fetch(process.env.REACT_APP_MAIN_API + 'auth/user-profile', options)
        .then((response) => response.json())
        .then((json) => {
            if (json.status == 1) { 
              window.location.replace("/admin/dashboard");
              
            }else{
              //
            }
        })
        .catch((error) => console.error(error))
        .finally(console.log("")) 
       }

 
}

useEffect( () => {
  GetUserDetails()
},[]);

const loginAction = () =>{
    setLoading(true)
    const postOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            
        },
        body: JSON.stringify({ 
                email: email,
                password: password,
         })
    };

    fetch(endPoint + 'auth/login', postOptions)
                .then((response) => response.json())
                .then((json) => {
                    if (json.status == 1) {
                        {toast.success(json.message)} 
                        setLoading(false)
                        localStorage.setItem('access_token', json.message.original.access_token);
                        setCookie("token", json.message.original.access_token, {
                            path: "/"
                          });
                          setToken(cookies.token)
                          if(json.message.original.user.account_type == "Admin"){
                            window.location.replace("/admin/dashboard");
                          }
                          else{
                            window.location.replace("/user/dashboard");
                          }
                        

            }
                    else {
                        {toast.error(json.message)} 
                        setLoading(false)
                    }    
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
}

const formView = <div className='row'>
<div class="row justify-content-center text-center d-flex">
            

                       <div class="row">                        
                       

                        <div class="col-12 mt-3">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input class="form-control" 
                                    type="email"
                                    onChange={e => setEmail(e.target.value)} 
                                    value={email}
                                    />
                                </div>
                            </div>

                            <div class="col-12 mt-3">
                                <div class="form-group">
                                    <label>Password</label>
                                    <input class="form-control" 
                                    type="password"
                                    onChange={e => setPassword(e.target.value)} 
                                    value={password}/>
                                </div>                                
                            </div>

                            <div class="col-12 mt-3">                            
                                {isLoading? <Loading /> :
                                <button class="default-btn register" onClick={() => loginAction()} type="button">
                                <i className='fa fa-arrow-right'></i>
                            </button>
                            }
                            </div>

                            <div class="col-12 mt-3">
                                <p class="create">New to Us? <Link to="/register">Register</Link></p>
                            </div>
                            <div class="col-12 mt-3">
                                <p class="create">Forgot Password? <Link to="/forgot">Reset</Link></p>
                            </div>
                        </div>
        </div>
        <ToastContainer />

    </div>

    return (<>
    <Announcement/>
    <TitleBanner Title="Login" Info={formView} />
     </>)
    

    

}
export default Login