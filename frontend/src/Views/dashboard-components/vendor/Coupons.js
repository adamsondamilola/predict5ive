import React, { Component, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import TitleBanner from '../../layout-components/TitleBanner';
import ConvertToRate from '../../../Utilities/ConvertToRate';
import TitleSection from '../../layout-components/TitleSection';
import { Link } from 'react-router-dom';
import Loading from '../../../Utilities/Loading';
import { ToastContainer, toast } from 'react-toastify';

const Coupons = () => {

    const [cookies, setCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [userDetails, setUserDetails] = useState([])
    const [websiteDetails, setWebsiteDetails] = useState([])
    const [isLoading, setLoading] = useState(false)  
    const [coupons, setCoupons] = useState([]);
    const [usedcoupons, setUsedCoupons] = useState(false);
    const [unusedcoupons, setUnsedCoupons] = useState(false);
    const [packageData, setPackageData] = useState([])
    const [package_, setPackage] = useState(null)
    const [number, setNumber] = useState(0) 
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)

    var options = {  
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +token
        }
      }

      const generateCoupons = () =>{
        setLoading(true)
    
        const postOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +token          
            },
            body: JSON.stringify({ 
                number: number,
                package: package_,
             })
        };
    
        fetch(endPoint + 'vendor/generate-coupons', postOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        if (json.status == 1) {
                            GetUserDetails()
                            unUsedCoupons()
                            {toast.success(json.message)} 
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
        

    const unUsedCoupons = () => {  
        setCoupons([]);
		setLoading(true)    
        setUnsedCoupons(true)
        setUsedCoupons(false)
        fetch(endPoint +'vendor/vendor-unused-coupons', options)
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 1) {
                    setCoupons(json.message);
                }
				else{
					{toast.error(json.message)} 
				}
            })
            .catch((error) => console.error(error))
            .finally(() => console.log(""));
			setLoading(false)
			
    }

    const usedCoupons = () => {  
		setCoupons([]);
        setLoading(true)    
        setUnsedCoupons(false)
        setUsedCoupons(true)
        fetch(endPoint +'vendor/vendor-used-coupons', options)
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 1) {
                    setCoupons(json.message);
                }
				else{
					{toast.error(json.message)} 
				}
            })
            .catch((error) => console.error(error))
            .finally(() => console.log(""));
			setLoading(false)
			
    }

    const GetUserDetails = () => {         
        fetch(process.env.REACT_APP_MAIN_API + 'auth/user-profile', options)
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

const getPackages = () => {
    fetch(endPoint +'settings/packages')
                .then((response) => response.json())
                .then((json) => {
                    if (json.status == 1) {
                        setPackageData(json.message)
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
}

useEffect( () => {
    unUsedCoupons()
      GetUserDetails()
      getPackages()
 },[]);


    return <div className='row mt-2'>
    <TitleSection title="Coupons" />

    <div style={{display: !isLoading? `block` : `none` }} className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
<div class="input-group mb-3">
<input onChange={e => setNumber(e.target.value)} maxLength={10} type="number" class="form-control" placeholder="Coupon" aria-label="Coupon" aria-describedby="basic-addon1" />
<select class="form-control" onChange={e => setPackage(e.target.value)}>
                                        <option value={""}>Select Package</option>
                                        {
                                        packageData.map(x =>
                                        <option value={x.package}>
                                        {x.package} {ConvertToRate(userDetails.country, x.amount)}
                                        </option>)
                                        }
                                    </select>
  <div onClick={()=>generateCoupons()} class="input-group-prepend">
    <span class="input-group-text"> {isLoading? <Loading /> : 'Generate'} </span>
  </div>
</div>
</div>

<div class="row m-1">

    <div className='col-12 text-center'> <h4>Coupons Left: {userDetails.coupons}</h4> </div>

<div className='col-6' onClick={()=>unUsedCoupons()}> <div className={unusedcoupons? `text-white card text-center bg-primary` : `text-white card text-center bg-success`}>Unused Coupons</div> </div>
<div className='col-6' onClick={()=>usedCoupons()}> <div className={usedcoupons? `text-white card text-center bg-primary` : `text-white card text-center bg-success`}>Used Coupons</div> </div>
</div>

{/*PC VIEW*/}
<div style={{display: isLoading? `none` : `block`}} class="col-12 table-responsive text-center">
<table border={0} className='table bg-white'>
<thead>
<tr className='text-dark'>
                            <th scope="col">Coupon</th>
                            <th>Package</th>
                            <th>Price</th>
                            <th>User</th>
                       </tr>
                       </thead>
                       <tbody>
{coupons.map(x => 
  <tr>
    <td scope="col">{x.coupon}</td>
    <td> {x.package} </td>
    <td> {ConvertToRate(userDetails.country, x.amount)} </td>
    <td><b>{x.user}</b></td>
  </tr>
)}
</tbody>
</table>
</div>	


<center>{isLoading? <Loading /> : null}</center>

<ToastContainer />
</div>
}
export default Coupons