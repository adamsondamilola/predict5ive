import React, { ChangeEvent, useEffect, useState } from "react";
import BlogTitle from "../layouts/blog-title";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';
import Images from "../../Utilities/Images";
import {Helmet} from "react-helmet";
import { useParams } from "react-router";
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
    const [editPost, setEditPost] = useState(false)
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
        getContents()
      }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <>

<Helmet>
                <meta charSet="utf-8" />
                <title>{pageTile}</title>
                <link rel="canonical" href={"http://predict5ive.com/post/"+id+"/"+slug} />
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
                        {post.post_content}
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