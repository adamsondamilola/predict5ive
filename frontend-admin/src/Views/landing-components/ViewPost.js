
import TitleBanner from '../layout-components/TitleBanner';
import React, { Component, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { Link, useParams } from 'react-router-dom';
import TruncatePost from '../../Utilities/TruncatePost';
import { useCookies } from 'react-cookie';

const ViewPost = () => {
    const {id} = useParams();
    const [post, setPost] = useState({});
    const [cookies, setCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [userDetails, setUserDetails] = useState([])
    const [websiteDetails, setWebsiteDetails] = useState([])
    
    const getPost = () => {      
        fetch(process.env.REACT_APP_MAIN_API +'post/'+id+'/get_post')
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 1) {
                    var x = json.message;
                    setPost(x)
                }else{
                    {toast.error(json.message)}
                }
            })
            .catch((error) => console.error(error))
            .finally(() => console.log(""));
    }
  
   // const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
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
              //
            }else{
                {toast.warning("You are viewing this page as a guest.")}
            }
        })
        .catch((error) => console.error(error))
        .finally(console.log("")) 
       } 
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


    useEffect(()=>{
        GetWebsiteDetails()
        GetUserDetails()
        getPost()
    },[])

return(
    <>
    <TitleBanner Title={post.post_title} Info="Remember to always share after viewing new post."/>
    <section class="elementor-section elementor-top-section elementor-element elementor-element-194549b9 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="194549b9" data-element_type="section">
<div class="elementor-container elementor-column-gap-default">
<div class="elementor-row">
<div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-40774220" data-id="40774220" data-element_type="column">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-widget-wrap">
    
<div className='row'>
<article class="elementor-post elementor-grid-item post type-post status-publish format-standard has-post-thumbnail hentry category-uncategorized">
<a class="elementor-post__thumbnail__link" href="#">
<div class="elementor-post__thumbnail"><img width="800" height="534" src={post.post_image} class="attachment-large size-large wp-image-782" alt="Soccer Player Scoring A Goal At Field" loading="lazy" /></div>
</a>
<div class="elementor-post__text">
<h3 class="elementor-post__title">
<a href="#">
{post.post_title} </a>
</h3>
 <div class="elementor-post__meta-data">
<span class="elementor-post-date">
{post.post_date} </span> 
</div>
<div class="elementor-post__excerpt">
<div dangerouslySetInnerHTML={{ __html: post.post_content }} />
</div>
</div>
</article>
</div>


<div className='row mt-5'>
<div className='col-md-12'> Kindy copy share the text in the box and share on your Facebook timeline and WhatsApp status </div>
<div className='col-md-12'>
    <textarea
        value={"Sponsored:" +post.post_title +" "
        + websiteDetails.website + post.id+"/post"}
    />
</div>
</div>

</div>
</div>
</div>
</div>
</div>
</section>
<ToastContainer />
    </>
)
}
export default ViewPost