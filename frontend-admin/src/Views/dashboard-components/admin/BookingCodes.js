
import React, { Component, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import TitleBanner from '../../layout-components/TitleBanner';
import ConvertToRate from '../../../Utilities/ConvertToRate';
import PredictionsDash from './Predictions';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../../../Utilities/Loading';
import TitleSection from '../../layout-components/TitleSection';

const BookingCodes = () => {

    const [cookies, setCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [userDetails, setUserDetails] = useState([])
    const [websiteDetails, setWebsiteDetails] = useState([])
    
    const [servicesList, setServicesList] = useState([]);
    const [subject, setSubject] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoading, setLoading] = useState(false);    
    const getBookingCodes = () => {      
        fetch(process.env.REACT_APP_MAIN_API +'admin/booking/codes', options)
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 1) {
                    var x = json.message;
                    setServicesList(x)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => console.log(""));
    }
  
    
    var options = {  
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +token
          
        }
      }

      const addAction = () =>{
        setLoading(true)
        const postOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +token    
            },
            body: JSON.stringify({ 
                bookmaker: subject,
                code: message
             })
        };
    
        fetch(process.env.REACT_APP_MAIN_API + 'admin/booking/add', postOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        if (json.status == 1) {
                            setMessage("")
                            setSubject("")
                            getBookingCodes()
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

    const deleteAction = (id) => {
        setLoading(true)
        if(window.confirm('Are you sure you want to delete Booking Code?')){
          fetch(process.env.REACT_APP_MAIN_API +'admin/'+ id+'/booking/delete', options)
          .then((response) => response.json())
          .then((json) => {
              if (json.status == 1) {
                getBookingCodes()
                {toast.success(json.message)} 
                setLoading(false)
              }else{
                {toast.error(json.message)}
              }
          })
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
        }else{
          //
        }
        
    }   

    const approveAction = (id) => {
      setLoading(true)
      if(window.confirm('Are you sure you want to approve Booking Code?')){
        fetch(process.env.REACT_APP_MAIN_API +'admin/'+ id+'/booking/approve', options)
        .then((response) => response.json())
        .then((json) => {
            if (json.status == 1) {
              getBookingCodes()
              {toast.success(json.message)} 
              setLoading(false)
            }else{
              {toast.error(json.message)}
            }
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      }else{
        //
      }
      
  }   

      const GetUserDetails = () => {
         
            fetch(process.env.REACT_APP_MAIN_API + 'auth/user-profile', options)
          .then((response) => response.json())
          .then((json) => {
              if (json.status == 1) { 
                setUserDetails(json.message) 
                
              }else{
               // alert(token)
               //window.location.replace("/login");
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

useEffect( () => {
    GetWebsiteDetails()
      getBookingCodes()
 },[]);

 const getList =  <div class="row">	

                   <div class="col-lg-12">
                     <div class="contact-form">
                             <div class="row">
                                 
                                 
                                 <div class="col-12">
                                     <div class="form-group">
                                     <select className='form-control' onChange={e => setSubject(e.target.value)}>
                                     <option value={""}>Select Bookmaker</option>
                                     <option value={"Sportybet"}>Sportybet</option>
    <option value={"Bet9ja"}>Bet9ja</option>
    <option value={"1Xbet"}>1Xbet</option>
    <option value={"Nairabet"}>Nairabet</option>
    </select>
                                     </div>
                                 </div>
     
                                 <div class="col-12">
                                     <div class="form-group">
                                         <input class="form-control" value={message} onChange={e => setMessage(e.target.value)} required="" placeholder="Booking Code" />
                                         <div class="help-block with-errors"></div>
                                     </div>
                                 </div>
     
     
                              <div class="col-xl-12 col-12">

           </div>

                             {isLoading? <Loading /> :
                             <button class="btn btn-primary" onClick={() => addAction()} type="button">
                             Post Booking Code 
                         </button>
                         }
                             </div>
                     </div>
                 </div>

     <div class="col-xl-12 col-12 mt-5">
           <div class="table-responsive">
               <table class="table table-striped">
                   <tbody>
               <tr>
               <th>Bookmaker</th>
               <th>Code</th>
               <th>Action</th>
                 </tr>
               {servicesList.map(sr =>
                 <tr>
                   <td>{sr.bookmaker}</td>
                   <td>{sr.code} - ({sr.odds})</td>
                   {sr.status === 0 ? <td class="text-end text-danger">Inactive  
                   <span class="text-muted text-nowrap">
                   <i onClick={()=>approveAction(sr.id)} className='fa fa-check text-success'> Approve</i> </span>
                   </td> 
                   : 
                   null
                   }

                             {sr.status === 1 ? <td class="text-end text-success">Live</td> : null}
                  <td><span class="text-muted text-nowrap">
                   <i onClick={()=>deleteAction(sr.id)} className='fa fa-times text-danger'> Delete</i> </span> </td>
                   </tr>
               )}
               </tbody>
                </table>
             </div>


         </div>
     </div>
 

 return <div class="wrapper">

    <TitleSection title="BookingCodes"/>

   <div className='row justify-content-center'>     
{isLoading? <Loading /> : getList }
</div>  
       
<ToastContainer />
</div>



}
export default BookingCodes