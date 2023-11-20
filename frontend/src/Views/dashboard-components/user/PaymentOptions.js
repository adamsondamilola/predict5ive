
import React, { Component, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import TitleBanner from '../../layout-components/TitleBanner';
import ConvertToRate from '../../../Utilities/ConvertToRate';
import TitleSection from '../../layout-components/TitleSection';
import { Link } from 'react-router-dom';
import PredictionsDashboard from './Predictions';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../../../Utilities/Loading';

const PaymentOptions = () => {

    const [cookies, setCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [userDetails, setUserDetails] = useState([])
    const [paymentOptions, setPaymentOptions] = useState([])
    const [name, setName] = useState(null)
    const [bank, setBank] = useState(null)
    const [number, setNumber] = useState(null)
    const [bitcoin, setBitcoin] = useState(null)
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    const [isLoading, setLoading] = useState(false)
    const [update, setUpdate] = useState(false)

  
    
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
const getPaymentOptions = () => {         
      fetch(endPoint + 'wallet/payment-options', options)
    .then((response) => response.json())
    .then((json) => {
        if (json.status == 1) { 
          setPaymentOptions(json.message)           
        }else{
            {toast.error(json.message)} 
        }
    })
    .catch((error) => console.error(error))
    .finally(console.log(""))

}


const updateBankAction = () =>{
    setLoading(true)
    const postOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +token    
        },
        body: JSON.stringify({ 
            name: name,
            bank: bank,
            number: number,
            bitcoin: bitcoin,
        })
    };

    fetch(endPoint + 'wallet/update-payment-options', postOptions)
                .then((response) => response.json())
                .then((json) => {
                    if (json.status == 1) {
                        {toast.success(json.message)} 
                        getPaymentOptions()
                        setUpdate(false)
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
    getPaymentOptions()
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
                                                    <th>Account Name</th>
                                                    <td>{paymentOptions.name}</td>
                                                </tr>
                                                <tr>
                                                    <th>Bank or Network</th>
                                                    <td>{paymentOptions.bank}</td>
                                                </tr>
                                                <tr>
                                                    <th>Account Number or Mobile Money</th>
                                                    <td>{paymentOptions.number}</td>
                                                </tr>
                                                <tr>
                                                    <th>Bitcoin Wallet</th>
                                                    <td>{paymentOptions.bitcoin}</td>
                                                </tr>                                                    
                                                    
                                                </tbody>
                                            </table>
                                        </div>

                                        <div style={{display: paymentOptions != ""? `none` : `block`}} className='table-responsive'>
                                            <table className='table'>
                                                 <tbody>
                                                    <tr>
                                                        <th colSpan={2} className='text-danger'>Update Payment Options</th>
                                                    </tr>
                                                    <tr>
                                                    <th>Account Name</th>
                                                    <td> <input type='text' maxLength={50} onChange={ e => setName(e.target.value)} /> </td>
                                                </tr>
                                                <tr>
                                                    <th>Bank or Network</th>
                                                    <td> <input type='text' maxLength={50} onChange={ e => setBank(e.target.value)} /> </td>
                                                </tr>
                                                <tr>
                                                    <th>Account Number or Mobile Money</th>
                                                    <td> <input type='number' maxLength={20} onChange={ e => setNumber(e.target.value)} /> </td>
                                                </tr>
                                                <tr>
                                                    <th>Bitcoin Wallet</th>
                                                    <td> <input type='text' maxLength={100} onChange={ e => setBitcoin(e.target.value)} /> </td>
                                                </tr>
                                                <tr>
                                                    <th>Update</th>
                                                    <td> {isLoading? <Loading /> :
                                                    <button onClick={()=>updateBankAction()} className='btn btn-block btn-lg'>Update Mode of Payment</button> } </td>
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
export default PaymentOptions