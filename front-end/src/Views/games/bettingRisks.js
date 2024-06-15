import React, { ChangeEvent, useEffect, useState } from "react";
import BlogTitle from "../../components/layouts/blog-title";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';
import Images from "../../Utilities/Images";
import {Helmet} from "react-helmet";
const BettingRisks = () => {
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [isLoading, setLoading] = useState(false)
    const [bookingCode, setBookingCode] = useState('');
    const [bookmaker, setBookmaker] = useState('');
    const [bookmaker_, setBookmaker_] = useState('');
    const [odds, setOdds] = useState('');

    const bettingTips = [
        {id: 1, title: "Depression", tip: "People accepts losing money in different ways. Using money you cannot afford to lose to play bet is not recommended and totally wrong because of your mental health."},
        {id: 2, title: "Relationship Problems", tip: "Gambling can take your time and money. If your partner doesn’t share in your gambling adventure, it will cause problems in your relationship."},
        {id: 3, title: "Debt", tip: "Borrowing money because you think a game is 100% sure can lead you into deep debts. No game prediction is 100%"},
        {id: 4, title: "Illegal Activities", tip: "Gambling can make one end up doing illegal activities to raise money for gambling"},
        {id: 5, title: "Health Issues", tip: "Because of the stress and anxiety that comes with gambling, one can develop health issues like heart attack and high blood pressure"},
        {id: 6, title: "Suicide", tip: "Chronic gambling can lead to huge debt and deep depression which often ends in suicide. It is recommended to take a break or quit when thoughts like this starts coming"},
    ]

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <>

<Helmet>
                <meta charSet="utf-8" />
                <title>Risks of Betting</title>
                <link rel="canonical" href="http://predict5ive.com/risks-of-gambling" />
            </Helmet>

            <section className="w-full flex flex-col items-center px-3">
                <BlogTitle />
            </section>
                
            <section className="w-full md:w-2/3 flex flex-col items-center px-3">
            <div className="bg-white dark:bg-gray-800 dark:text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                 
                    <div className="bg-white dark:bg-gray-800">
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                                Betting/Gambling Risks
                            </label>
                            <img src={Images.gambling} />
                        </div>
                        <div className="mb-4">
                        Discipline and proper informations are very important to every individual that like to gamble. There is nothing without its risk, that is why we think its important you know the risk of addictive gambling and how you can be free if you need help.
                        </div>
                        
                        <div className="mb-4">
                        {bettingTips.map((x) => 
                        <div className="mb-5" key={x.id}>
                            {x.id}. <b>{x.title}</b>: {x.tip}
                        </div>
                        )}
                        </div> 
                        <div className="mb-4">
                        If you need help, kindly visit <a href="https://www.begambleaware.org/">begambleaware.org</a> now.
                        </div>
                        

                    </div>
                </div>
</section>

            <ToastContainer />

        </>
    )
}
export default BettingRisks