import React, { ChangeEvent, useEffect, useState } from "react";
import BlogTitle from "../layouts/blog-title";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';
import {Helmet} from "react-helmet";
import { useParams } from "react-router";
import MostRecentPosts from "./mostRecentPosts";
import TruncatePost from "../../Utilities/TruncatePost";
const ViewPost = () => {
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [isLoading, setLoading] = useState(false)
    const {id} = useParams()
    const {slug} = useParams()
    const [pageTile, setPageTitle] = useState("Predict5ive Sports News and Tips")
  const [shareUrl, setShareUrl] = useState(null)
    const [newslug, setNewslug] = useState(null)
    const [post, setPost] = useState([])
    const [postViewed, setPostViewed] = useState(false)
    const [viewMore, setViewMore] = useState(true)
    const account_type = localStorage.getItem("account_type")
    const [userData, setUserData] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const [sessionId, setSessionId] = useState(null)
    const [thumbNail, setThumbNail] = useState(null)

    const options = {  
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
  
    const getContents = async () => {
        setLoading(true)      
        let curUrl = 'post/read/'+id+'/'+slug+''
        fetch(endPoint + curUrl, options)
              .then((response) => response.json())
              .then((json) => {
                  if (json.status === 1) {
                    let x = json;
                      setPost(x.message)
              setNewslug(x.message.slug)
              setPageTitle(x.message.post_title)
              setThumbNail(x.message.post_image)
              setPostViewed(true)
                      setLoading(false)
                  }
                  else {
                      setLoading(false)
                  }
              })
              .catch((error) => console.error(error))
              .finally(() => setLoading(false))
      }


    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

      useEffect(() => {
        getContents()
      }, []);


    return (
        <React.Fragment>

<Helmet>
                <meta charSet="utf-8" />
                <title>{pageTile}</title>
                <link ref={"icon"} href={thumbNail} />
                <link rel="canonical" href={"http://predict5ive.com/post/"+id+"/"+slug} />
                <meta name="description" content={post.post_title} />
                <meta name="keywords" content={post.length>0? post.slug.replaceAll(/-/gi, ",") : ''} />
            </Helmet>

            <section className="w-full flex flex-col items-center px-3">
                <BlogTitle />
            </section>
                
            <section className="w-full md:w-2/3 flex flex-col items-center px-3">
            <div className="bg-white dark:bg-gray-800 dark:text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {isLoading? <div className="text-purple-500 m-5">Please wait...</div> : '' }
            
                    <div style={{display: isLoading? 'none' : 'block'}} className="bg-white dark:bg-gray-800">
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-white text-xl font-bold mb-2">
                            {pageTile}
                            </label>
                            <img class="h-auto max-w-full rounded-lg" src={thumbNail} />
                            <p className="text-muted">
                              {post.post_date}
                            </p>
                        </div>
                        <div className="mb-4">
                        <div style={{whiteSpace: "pre-wrap"}}>
                        {viewMore? TruncatePost(post.post_content) : post.post_content}
                        </div>
                        </div>

                        <div style={{display: viewMore? 'block' : 'none'}} className="mb-4">
<a onClick={()=>setViewMore(false)} href={process.env.REACT_APP_ADSTERRA} target="_blank" rel="nofollow" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
  Read More
    </a>

                        </div>
                        
                        <div id="container-4a5201007af178eab2fd18e685912bcc"></div>           

                    </div>
                </div>
<MostRecentPosts />
</section>
            <ToastContainer />

        </React.Fragment>
    )
}
export default ViewPost