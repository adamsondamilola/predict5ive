"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import BlogTitle from "../../components/layouts/blog-title";
import { useCookies } from 'react-cookie';
import PredictGame from "../../components/games/predict-game";
import Predictions from "../../components/games/predictions";
import LatestPosts from "../../components/posts/latestPosts";
import RandomPosts from "../../components/posts/randomPosts";
import PredictionsSlider from "../../components/games/predictions-slider";

export default function Home() {
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [name, setName] = useState('');
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

    const GetUserDetails = () => {

        if (token != null) {
            fetch(endPoint + 'auth/user-profile', options)
                .then((response) => response.json())
                .then((json) => {
                    if (json.status == 1) {
                       setName(json.message.first_name)
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false))
        }
    }

    const GetPosts = (num) => {
        setLoading(true)

        fetch(endPoint + 'post/'+num+'/get-posts')
                .then((response) => response.json())
                .then((json) => {
                    if (json.status == 1) {
                       setPosts(json.message)
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false))
        
    }

    const loadMorePosts = () => {
        setLoading(true)
        let newNum = numRows + 20;
        setNumRows(newNum)
        GetPosts(newNum)
        setLoading(false)
    }

    useEffect(() => {
        GetUserDetails()
        //GetPosts(numRows)
        //alert(postUniqueId)
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

  return (
    <>
    
    <section className="w-full flex flex-col items-center px-3">
    <BlogTitle/>
    </section>    

        {/*Main posts*/}
    <section className="w-full md:w-2/3 flex flex-col items-center px-3">

<PredictionsSlider/>
<LatestPosts />

    {/*<PredictGame/>*/}
    {/*<Predictions />*/}

    <RandomPosts/>
    
        </section>

    
    </>
    )
}
