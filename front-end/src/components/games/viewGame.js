import React, { ChangeEvent, useEffect, useState } from "react";
import BlogTitle from "../layouts/blog-title";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';
import {Helmet} from "react-helmet";
import { useParams } from "react-router";
import PredictionsSlider from "./predictions-slider";
import dateTimeToDate from "../../Utilities/dateTimeToString";
const ViewGame = () => {
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
        let curUrl = 'game/'+id+'/get_game'
        fetch(endPoint + curUrl, options)
              .then((response) => response.json())
              .then((json) => {
                  if (json.status === 1) {
                    let x = json;
                      setPost(x.message)
              setNewslug(x.message.slug)
              let ttl = x.message.home_team+' vs '+x.message.away_team
              setPageTitle(ttl)
              setThumbNail(x.message.home_logo)
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
                <link rel="canonical" href={"http://predict5ive.com/game/"+id+"/"+slug} />
                <meta name="description" content={pageTile} />
                <meta name="keywords" content={post.length>0? post.slug.replaceAll(/-/gi, ",") : ''} />
            </Helmet>

            <section className="w-full flex flex-col items-center px-3">
                <BlogTitle />
            </section>
                
            <section className="w-full md:w-2/3 flex flex-col items-center px-3">
            <div className="w-full bg-white dark:bg-gray-800 dark:text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {isLoading? <div className="text-purple-500 m-5">Please wait...</div> : '' }
            
            <div className="dark:bg-gray-800 dark:text-white flex flex-col items-center px-3">
<div className="w-full shadow m-2">
<div className="grid grid-cols-1 m-2">
    <p><b>{post.country} - {post.league}</b></p>
    {post.game_type}
</div>

<div class="flex flex-col dark:bg-gray-800 dark:text-white justify-center items-center h-40 bg-gray-100 gap-4">
<div class="flex flex-wrap justify-center items-center gap-4 w-full">
<div class="w-1/4 text-center px-4 leading-loose text-sm">
    <div><img className="items-center justify-center" src={post.home_logo} width={45} height={45}/></div>
    <div className="">{post.home_team}</div>
</div>
<div class="w-1/4 text-center px-4 leading-loose text-sm">
    {post.result == '' || post.result == null? 'VS' : post.result}
    </div>
    <div class="w-1/4 items-center text-center px-4 leading-loose text-sm">
        <div><img src={post.away_logo} width={45} height={45}/></div>
        <div>{post.away_team}</div>
        </div>
</div>
</div>

<div class="flex flex-col justify-center items-center h-20 gap-4">
<div class="flex flex-wrap justify-center items-center gap-4 w-full">
<div class="w-1/4 items-center text-center leading-loose text-sm">
    {post.game_date!=null? dateTimeToDate(post.game_date) : ''}
    </div>
    <div class="w-1/4 items-center text-center leading-loose text-sm">
    {post.prediction}
  </div>
  <div class="w-1/4 items-center text-center  leading-loose text-sm">
<div>Odds</div> 
</div>
</div>
</div>

<div class="flex flex-col dark:bg-gray-800 dark:text-white justify-center items-center h-8 bg-gray-100 gap-4">
<div class="flex flex-wrap justify-center items-center gap-4 w-full">
<div class="w-1/4 items-center text-center leading-loose text-sm">
    {post.game_time}
    </div>
    <div class="w-1/4 items-center text-center leading-loose text-sm">
    <div>{post.accuracy}%</div> 
  </div>
  <div class="w-1/4 items-center text-center  leading-loose text-sm">

<div className={post.win_or_lose == 1? 'text-green-600 bold' : post.win_or_lose == 2? 'text-red-500' : ''}>{post.odds}</div>
</div>
</div>
</div>

</div>
</div>

<div id="container-4a5201007af178eab2fd18e685912bcc"></div>
                </div>
<PredictionsSlider />
</section>
            <ToastContainer />

        </React.Fragment>
    )
}
export default ViewGame