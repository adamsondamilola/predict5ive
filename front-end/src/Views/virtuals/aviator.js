"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import BlogTitle from "../../components/layouts/blog-title";
import { useCookies } from 'react-cookie';
import PredictGame from "../../components/games/predict-game";
import Predictions from "../../components/games/predictions";
import LatestPosts from "../../components/posts/latestPosts";
import RandomPosts from "../../components/posts/randomPosts";
import PredictionsSlider from "../../components/games/predictions-slider";
import AviatorComponent from "../../components/virtuals/aviator-componet";

export default function Aviator() {
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [name, setName] = useState('');
    const [numRows, setNumRows] = useState(20);

    
    var options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }


    useEffect(() => {
       
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

<AviatorComponent />
    
        </section>

    
    </>
    )
}
