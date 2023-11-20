
import React, { Component, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import TitleBanner from '../../layout-components/TitleBanner';
import ConvertToRate from '../../../Utilities/ConvertToRate';
import PredictionsDash from './Predictions';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../../../Utilities/Loading';
import TitleSection from '../../layout-components/TitleSection';

const Announcements = () => {

    const [cookies, setCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [userDetails, setUserDetails] = useState([])
    const [websiteDetails, setWebsiteDetails] = useState([])
    
    const [servicesList, setServicesList] = useState([]);
    const [subject, setSubject] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoading, setLoading] = useState(false);    
    const getAnnouncements = () => {      
        fetch(process.env.REACT_APP_MAIN_API +'admin/announcement/list', options)
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
                subject: subject,
                message: message
             })
        };
    
        fetch(process.env.REACT_APP_MAIN_API + 'admin/announcement/add', postOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        if (json.status == 1) {
                            setMessage("")
                            setSubject("")
                            getAnnouncements()
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
        if(window.confirm('Are you sure you want to delete Announcement?')){
          fetch(process.env.REACT_APP_MAIN_API +'admin/'+ id+'/announcement/delete', options)
          .then((response) => response.json())
          .then((json) => {
              if (json.status == 1) {
                getAnnouncements()
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
      getAnnouncements()
 },[]);

 const getList =  <div class="row">	

                   <div class="col-lg-12">
                     <div class="contact-form">
                             <div class="row">
                                 
                                 
                                 <div class="col-12">
                                     <div class="form-group">
                                         <input value={subject} type="text" onChange={e => setSubject(e.target.value)} class="form-control" required="" data-error="Please enter your subject" placeholder="Subject" />
                                         <div class="help-block with-errors"></div>
                                     </div>
                                 </div>
     
                                 <div class="col-12">
                                     <div class="form-group">
                                         <textarea class="form-control" value={message} onChange={e => setMessage(e.target.value)} required="" data-error="Write your message" placeholder="Announcement"></textarea>
                                         <div class="help-block with-errors"></div>
                                     </div>
                                 </div>
     
     
                              <div class="col-xl-12 col-12">

           </div>

                             {isLoading? <Loading /> :
                             <button class="btn btn-primary" onClick={() => addAction()} type="button">
                             Post Announcement 
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
               <th>Subject</th>
               <th>Message</th>
               <th>Status</th>
               <th>Action</th>
                 </tr>
               {servicesList.map(sr =>
                 <tr>
                   <td>{sr.subject}</td>
                   <td>{sr.message}</td>
                   {sr.status === 0 ? <td class="text-end text-danger">Inactive</td> : null}
                             {sr.status === 1 ? <td class="text-end text-success">Live</td> : null}
                  <td><span class="text-muted text-nowrap">
                   <i onClick={()=>deleteAction(sr.id)} className='fa fa-times text-danger'> delete</i> </span> </td>
                   </tr>
               )}
               </tbody>
                </table>
             </div>


         </div>
     </div>
 

 return <div class="wrapper">

    <TitleSection title="Announcements"/>

   <div className='row justify-content-center'>     
{isLoading? <Loading /> : getList }
</div>  
       
<ToastContainer />
</div>



}
export default Announcements