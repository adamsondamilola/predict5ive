import React, { ChangeEvent, useEffect, useState } from "react";
import BlogTitle from "../../components/layouts/blog-title";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';
import Images from "../../Utilities/Images";
import {Helmet} from "react-helmet";
const BettingTips = () => {
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [isLoading, setLoading] = useState(false)
    const [bookingCode, setBookingCode] = useState('');
    const [bookmaker, setBookmaker] = useState('');
    const [bookmaker_, setBookmaker_] = useState('');
    const [odds, setOdds] = useState('');

    const bettingTips = [
        {id: 1, tip: "Do not let your emotion of love for a team make you place a bet on them."},
        {id: 2, tip: "Always check teams form."},
        {id: 3, tip: "Don't not let odds detects your decision but statistics."},
        {id: 4, tip: "Home is always is always the better side. So vote on home when it's the favorite to win."},
        {id: 5, tip: "1 value bet between 1.3 - 2.0 odds is enough. If you must combine games, it should be between 2 - 5 games."},
        {id: 6, tip: "The higher the number of games, the greater the probability of losing."},
        {id: 7, tip: "Do not bet on draw. Only bet on winning or win or draw."},
        {id: 8, tip: "Both team to score and over 2.5 goals is risky is risky. If your convinced both team will score, bet on over 1.5 instead. It reduces the risk by 50%."},
        {id: 9, tip: "Do not bet on new seasons until each team  has played at least five matches."},
        {id: 10, tip: "Your focus should be on the popular leagues. Then other leagues if there's no or little games from the popular leagues."},
        {id: 11, tip: "If you want to play on games more than 5, it's strongly advised to split the game. If for example you have 10 games, you can split the game to 3, 3, 4 or 4, 4, 2 or 2, 3, 3, 2 or 2, 2, 2, 2, 2"},
        {id: 12, tip: "Use bookmakers that offer better odds"},
        {id: 13, tip: "Have at least 5 bet account. If you start winning in an unusual way, your account might get blocked 🚫"},
        {id: 14, tip: "Do not put your life savings on sport betting. Always use less than 5% of your money to invest. Betting with what you can't afford can have a very devastating impact on you. "},
        {id: 15, tip: "Learn to be very patient. You don't have to play your game today and get all the results today. Letting your game run for days increases your probability of winning."},
        {id: 16, tip: "Betting can be addictive if you put too much hope on it. Just like a business, it can crash if proper measures isn't taken. "},
        {id: 17, tip: "Live betting gives more profit, but its usually best for single games. You have higher odds on live betting."},
        {id: 18, tip: "You can't always be right, so embrace your loss and be more careful with the games you pick."},
        {id: 19, tip: "Its good to give up or take a break if you're losing too much."},
        {id: 20, tip: "Though it's possible, but do not have the mindset of making millions overnight."},
        {id: 21, tip: "Never bet all your capital. If you invest 10k for instance, use 1k (10%) to bet. If you win, bet 1k again the next day. "},
        {id: 22, tip: "Do not increase your stake till you've made at least 100% of your capital. Increase should not be more than 15% of the total amount you have on your betting account."},
        {id: 23, tip: "Use Predict 5ive mobile app for daily sure games. "}
    ]

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <>

<Helmet>
                <meta charSet="utf-8" />
                <title>Betting Tips</title>
                <link rel="canonical" href="http://predict5ive.com/betting-tips" />
            </Helmet>

            <section className="w-full flex flex-col items-center px-3">
                <BlogTitle />
            </section>
                
            <section className="w-full md:w-2/3 flex flex-col items-center px-3">
            <div className="bg-white dark:bg-gray-800 dark:text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                 
                    <div className="bg-white dark:bg-gray-800">
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                                Betting Tips
                            </label>
                            <img src={Images.betting} />
                        </div>
                        <div className="mb-4">
                        To bet is to take risk, to make profit is to take calculated risk. The below are the measures to take before playing bet.
                        </div>
                        
                        <div className="mb-4">
                        {bettingTips.map((x) => 
                        <div className="mb-5" key={x.id}>
                            <b>{x.id}</b>. {x.tip}
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
export default BettingTips