"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import BlogTitle from "../../components/layouts/blog-title";
import { useCookies } from 'react-cookie';
import PredictGame from "../../components/games/predict-game";
import Predictions from "../../components/games/predictions";
import PremiumPredictions from "../../components/games/premium-predictions";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import AboutPremiumTips from "../../components/games/about-premium-tips";
import {Helmet} from "react-helmet";
export default function PremiumGames() {
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [name, setName] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [numRows, setNumRows] = useState(20);
    const [posts, setPosts] = useState([{id: 1,
    user_id: 0,
    post_title: '',
    post_image: '',
    post_content: '',
    status: 1,
    post_date: '',
    clicks: 0,
    likes: 0,
    dislikes: 0,
    unique_id: '',
    comments: 0,
    first_name: '',
    last_name: ''}]);
    const [isLoading, setLoading] = useState(false)

    
    var options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    const checkSubscription = () => { 
		setLoading(true)    
        fetch(endPoint +'user/check-subscription', options)
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 1) {
                    setSubscribed(true);
                    setLoading(false)				
                }
				else{
					//{toast.error("An error occurred!")} 
                    toast.error(json.message)
                    setLoading(false)
				}
            })
            .catch((error) => console.error(error))
            .finally(() => console.log(""));
						
    }

    const GetUserDetails = () => {
        
        // if (token != null) {
             fetch(endPoint + 'auth/user-profile', options)
                 .then((response) => response.json())
                 .then((json) => {
                     if (json.status === 1) {
                        
                     } else {
                         //window.location.replace("/");
                         window.location.href="/auth/login";
                     }
                 })
                 .catch((error) => console.error(error))
                 .finally(() => setLoading(false))
        // }
     }

    useEffect(() => {
        GetUserDetails()
        checkSubscription();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

  return (
    <>
    
    <Helmet>
                <meta charSet="utf-8" />
                <title>Premium Games</title>
                <link rel="canonical" href="http://predict5ive.com/premium" />
            </Helmet>
            

    <section className="w-full flex flex-col items-center px-3">
    <BlogTitle/>
    </section>
    
    

        {/*Main posts*/}
    <section className="w-full md:w-2/3 flex flex-col items-center px-3">


   {subscribed? <PremiumPredictions /> : <AboutPremiumTips />}

    <PredictGame/>
    
        </section>

        <ToastContainer />
    </>
    )
}
