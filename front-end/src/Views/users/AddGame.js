import React, { ChangeEvent, useEffect, useState } from "react";
import BlogTitle from "../../components/layouts/blog-title";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';
import {Helmet} from "react-helmet";
const AddGame = () => {
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [postTitle, setPostTitle] = useState('');
    const [postImage, setPostImage] = useState('');
    const [postContent, setPostContent] = useState('');
    const [isLoading, setLoading] = useState(false)
    const [bookingCode, setBookingCode] = useState('');
    const [bookmaker, setBookmaker] = useState('');
    const [bookmaker_, setBookmaker_] = useState('');
    const [odds, setOdds] = useState('');

    const copyToClipB = (text) =>{
        navigator.clipboard.writeText(text)
        toast.success("Code copied to clipboard")
    }
 

    const bookMakers = [
        {id: 1, bookmaker: "1Xbet"},
        {id: 1, bookmaker: "Bet9ja"},
        {id: 1, bookmaker: "Betking"},
        {id: 1, bookmaker: "BetPawa"},
        {id: 1, bookmaker: "Nairabet"},
        {id: 1, bookmaker: "Sportybet"},
        {id: 1, bookmaker: "Others"}
    ]
 
     
    var options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    const [gameCodes, setGameCodes] = useState([])

    const GetUserGames = () => {
        if (token != null) {
            fetch(endPoint + 'admin/user/booking-codes', options)
                .then((response) => response.json())
                .then((json) => {
                    if (json.status == 1) {
                        setGameCodes(json.message)
                    } else {
                        //window.location.replace("/");
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false))
        }
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
                bookmaker: bookmaker == "Others" && bookmaker_ != ''? bookmaker_ : bookmaker,
                code: bookingCode,
                odds: odds
             })
        };
    
        fetch(endPoint + 'admin/booking/add', postOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        if (json.status == 1) {
                            {toast.success(json.message)} 
                            setLoading(false)
                            setBookingCode('')
                            setBookmaker_('')
                            setBookmaker('')
                            setOdds('')
                            GetUserGames()
                }
                        else {
                            {toast.error(json.message)}
                            setLoading(false)
                        }    
                    })
                    .catch((error) => console.error(error))
                    .finally(() => setLoading(false));
    }

    useEffect(() => {
        
        GetUserDetails()
        GetUserGames()
        //alert(postUniqueId)
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Add Booking Codes</title>
                <link rel="canonical" href="http://predict5ive.com/post-game" />
            </Helmet>
            <section className="w-full flex flex-col items-center px-3">
                <BlogTitle />
            </section>
                
            <section className="w-full md:w-2/3 flex flex-col items-center px-3">
                <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                 
                    <form className="bg-white">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Booking Code
                            </label>
                            <input value={bookingCode} onChange={e => setBookingCode(e.currentTarget.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Odds
                            </label>
                            <input value={odds} onChange={e => setOdds(e.currentTarget.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                        </div>
                        {bookmaker != "Others"? 
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Bookmaker
                            </label>
                            <select onChange={e => setBookmaker(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value={bookmaker}>{bookmaker == ''? 'Select' : bookmaker}</option>
                                {
                                    bookMakers.map( (x) =>
                                    <option key={x.id} value={x.bookmaker}>{x.bookmaker}</option>
                                    )
                                }
                            </select>
                        </div> 
                        :
                        ''
                        }
                        {bookmaker == "Others"?
                            <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                            Bookmaker
                            </label>
                            <input value={bookmaker_} onChange={e => setBookmaker_(e.currentTarget.value)} placeholder="Enter Bookmaker" className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                        </div>
                        :
                        ''
                        }

                        <div className="w-full items-center justify-between flex flex-col mt-3">
                        <p style={{ display: isLoading ? `block` : `none` }} className="text-red-500 text-xs italic">Please wait...</p>
                            <button style={{ display: !isLoading ? `block` : `none` }} onClick={addAction} className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Post
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
<p className="mb-5">Codes you posted</p>

                {gameCodes.map(x => 
        <div
        class="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div class="p-6">
          <h5
            class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {x.code} ({x.odds})
          </h5>
          <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            <i>{x.bookmaker}</i>
          </p>
          <button onClick={()=>copyToClipB(x.code)} className="button inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Copy Code
                            </button>
        </div>
        <div
          class="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
          {x.date_posted} | {x.status == 1? <span className="text-green-500">Approved</span> : <span className="text-red-500">Pending</span>}
        </div>
      </div>
       )}

                </div>
                
</div>
</section>

            <ToastContainer />

        </>
    )
}
export default AddGame