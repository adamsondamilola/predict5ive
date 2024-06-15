import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import Predictions from "../../components/games/predictions";
import { Helmet } from "react-helmet";
import BlogTitle from "../../components/layouts/blog-title";

const SportsPredictionsTips = () =>{

    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    const [cookies, setCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [result, setResult] = useState([]);
    const [isLoading, setLoading] = useState(false)

    function truncateString(str, num) {
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    }
    
    const options = {  
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }



return(
  
    <>

<Helmet>
                <meta charSet="utf-8" />
                <title>Betting Tips</title>
                <link rel="canonical" href="http://predict5ive.com/predictions" />
            </Helmet>

            <section className="w-full flex flex-col items-center px-3">
    <BlogTitle/>
    </section>    

        {/*Main posts*/}
    <section className="w-full md:w-2/3 flex flex-col items-center px-3">

<div className="w-full dark:bg-gray-800 dark:text-white flex flex-col items-center px-3">
<p className="text-xl text-white dark:text-white font-semibold pb-5">Our Tips 
</p>
</div>    
<Predictions />  
             
    </section>
<ToastContainer />

    </>
    
)
}

export default SportsPredictionsTips