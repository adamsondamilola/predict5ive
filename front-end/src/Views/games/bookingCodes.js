import React, { ChangeEvent, useEffect, useState } from "react";
import BlogTitle from "../../components/layouts/blog-title";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';
import Images from "../../Utilities/Images";
import {Helmet} from "react-helmet";
const BookingCodes = () => {
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [isLoading, setLoading] = useState(false)
    const [bookingCode, setBookingCode] = useState('');
    const [bookmaker, setBookmaker] = useState('');
    const [bookmaker_, setBookmaker_] = useState('');
    const [odds, setOdds] = useState('');

    const copyToClipB = (text) =>{
        navigator.clipboard.writeText(text)
        toast.success("Code copied to clipboard")
    }

    const [bookingCodes, setBookingCodes] = useState([])
      const GetBookingCodes = () => {
            fetch(endPoint + 'game/bookings')
                .then((response) => response.json())
                .then((json) => {
                    if (json.status === 1) {
                        setBookingCodes(json.message)
                    } else {
                        //window.location.replace("/");
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false))
    }

    useEffect(() => {
        GetBookingCodes()
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <>

<Helmet>
                <meta charSet="utf-8" />
                <title>Booking Codes</title>
                <link rel="canonical" href="http://predict5ive.com/booking-codes" />
            </Helmet>

            <section className="w-full flex flex-col items-center px-3">
                <BlogTitle />
            </section>
                
            <section className="w-full md:w-2/3 flex flex-col items-center px-3">
            <div className="w-full bg-white dark:bg-gray-800 dark:text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                 
                    <div className="bg-white dark:bg-gray-800">
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                                Booking Codes
                            </label>
                            
                        </div>
                        
                        <div class="mt-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                        
                        {bookingCodes.map(x => 
        <div
        class="mb-3 block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div class="p-6">
          <h5
            class="mb-2 text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {x.code} ({x.odds} odds)
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
          {x.date_posted}
        </div>
      </div>
       )}

                        </div> 
                        

                    </div>
                </div>
</section>

            <ToastContainer />

        </>
    )
}
export default BookingCodes