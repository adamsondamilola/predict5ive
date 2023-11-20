
import React, { Component, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import TitleBanner from '../../layout-components/TitleBanner';
import ConvertToRate from '../../../Utilities/ConvertToRate';
import TitleSection from '../../layout-components/TitleSection';
import { Link } from 'react-router-dom';
import PredictionsDashboard from './Predictions';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../../../Utilities/Loading';

const Account = () => {

    const [cookies, setCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [userDetails, setUserDetails] = useState([])
    const [websiteDetails, setWebsiteDetails] = useState([])
    const [oldPassword, setOldPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    const [isLoading, setLoading] = useState(false)

  
    
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


const updatePasswordAction = () =>{
    setLoading(true)
    const postOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +token    
        },
        body: JSON.stringify({ 
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
        })
    };

    fetch(endPoint + 'auth/update-password', postOptions)
                .then((response) => response.json())
                .then((json) => {
                    if (json.status == 1) {
                        {toast.success(json.message)} 
                        setConfirmPassword("")
                        setNewPassword("")
                        setOldPassword("")
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
    
    GetUserDetails()
 },[]);


return(
    <div className='container'>
      <div className='row mt-2'>

      <TitleSection title="Account" />
                                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <div className='table-responsive'>
                                            <table className='table'>
                                                 <tbody>
                                                 <tr>
                                                    <th>Name</th>
                                                    <td>{userDetails.first_name} {userDetails.last_name}</td>
                                                </tr>
                                                <tr>
                                                    <th>Phone</th>
                                                    <td>{userDetails.phone}</td>
                                                </tr>
                                                <tr>
                                                    <th>Email</th>
                                                    <td>{userDetails.email}</td>
                                                </tr>
                                                <tr>
                                                    <th>Country</th>
                                                    <td>{userDetails.country}</td>
                                                </tr>
                                                <tr>
                                                    <th>Package</th>
                                                    <td>{userDetails.package}</td>
                                                </tr>
                                                    
                                                    
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className='table-responsive'>
                                            <table className='table'>
                                                 <tbody>
                                                    <tr>
                                                        <th colSpan={2} className='text-danger'>Update Password</th>
                                                    </tr>
                                                    <tr>
                                                    <th>Old Password</th>
                                                    <td> <input type='password' maxLength={50} onChange={ e => setOldPassword(e.target.value)} /> </td>
                                                </tr>
                                                <tr>
                                                    <th>New Password</th>
                                                    <td> <input type='password' maxLength={50} onChange={ e => setNewPassword(e.target.value)} /> </td>
                                                </tr>
                                                <tr>
                                                    <th>Confirm Password</th>
                                                    <td> <input type='password' maxLength={50} onChange={ e => setConfirmPassword(e.target.value)} /> </td>
                                                </tr>
                                                <tr>
                                                    <th>Update</th>
                                                    <td> {isLoading? <Loading /> :
                                                    <button onClick={()=>updatePasswordAction()} className='btn btn-block btn-lg'>Update Password</button> } </td>
                                                </tr>
                                                </tbody>
                                                </table>
                                                </div>
                                    </div>
      </div>

      <ToastContainer />
</div>
)
}
export default Account