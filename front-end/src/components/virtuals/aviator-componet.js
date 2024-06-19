import React, { ChangeEvent, useEffect, useState } from "react";
import BlogTitle from "../layouts/blog-title";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';
import {Helmet} from "react-helmet";
import { useParams } from "react-router";
import dateTimeToDate from "../../Utilities/dateTimeToString";
import { FaMinus, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import Images from "../../Utilities/Images";
const AviatorComponent = () => {
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [isLoading, setLoading] = useState(false)
    const {id} = useParams()
    const {slug} = useParams()
    const [pageTile, setPageTitle] = useState("Predict5ive Aviator")
  const [shareUrl, setShareUrl] = useState(null)
    const [newslug, setNewslug] = useState(null)
    const [post, setPost] = useState([])
    const [postViewed, setPostViewed] = useState(false)
    const account_type = localStorage.getItem("account_type")
    const [userData, setUserData] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const [oddsHistory, setOddsHistory] = useState(["1.1", "1", "1.23", "3.22", "2.5", "4.6", "1.1", "1", "1.23", "3.22", "2.5", "4.6"])
    const [thumbNail, setThumbNail] = useState(null)

    const [randomNumber0, setRandomNumber0] = useState(0)
    const [randomNumber1, setRandomNumber1] = useState(0)
    const [randomNumber2, setRandomNumber2] = useState(0)
    const [gameStarted, setGameStarted] = useState(false)
    const [gameEnded, setGameEnded] = useState(false)
    const [cashOut, setCashOut] = useState(false)
    const [hasStake, setHasStake] = useState(false)
    const [stake, setStake] = useState(10)
    const [currentOdds, setCurrentOdds] = useState(0)

    const setRandomValues = () => {

        let value1 = RandomNumberGen()

        let min2 = 0
        let max2 = 99
        let value2 = Math.floor(Math.random() * max2) + min2
        setRandomNumber2(value2)
        
        let value0 = parseFloat(value1+'.'+value2).toFixed(2)
        setRandomNumber0(value0)
        setRandomNumber1(value0)
        //alert(value0)
    }

    const RandomNumberGen = () => {
        let result = 1;
        const numbers = [1, 1, 4, 1, 2, 3, 1, 1, 1, 45, 1, 1, 2, 3, 1, 3, 1, 4, 5, 1, 2, 1, 1, 1, 1, 2, 1, 10, 3, 2, 1, 3, 2, 5, 6, 9, 6, 2, 1, 2, 6, 2, 100, 1, 1, 2, 3, 1, 3, 1, 4, 5, 1, 2, 1, 1, 1, 1, 2, 1, 50, 1, 1, 2, 3, 1, 3, 1, 4, 5, 1, 2, 1, 1, 1, 1, 2, 1, 10, 1, 1, 2, 3, 1, 3, 1, 4, 5, 1, 2, 1, 1, 1, 1, 2, 1, 20,1, 1, 2, 3, 1, 3, 1, 4, 5, 1, 2, 1, 1, 1, 1, 2, 1, 30,1, 1, 2, 3, 1, 3, 1, 4, 5, 1, 2, 1, 1, 1, 1, 2, 1, 9, 4, 3, 2, 1, 10, 1, 1, 2, 3, 1, 3, 1, 4, 5, 1, 2, 1, 1, 1, 1, 2, 1,];
        const numsLength = numbers.length;
        result = numbers[(Math.floor(Math.random() * numsLength))]
        return result;
    }


    const updateStake = (x) =>{
            if(x==='add'){
                setStake(stake+1)
            }
            if(x!=='add' && stake > 10){
                setStake(stake-1)
            }        
    }

      const CounterAnimation = (props) => {
        const [count, setCount] = useState(props.initialValue)
        const [startCount, setStartCount] = useState(props.initialValue)
const [currentOdds, setCurrentOdds] = useState(props.initialValue)
const [cashOut, setCashOut] = useState(props.cashout)
let duration = 50; //1000 = 1 sec
useEffect(()=>{
    let startValue = props.initialValue
    /*const interval = Math.floor(
        duration/(targetValue - initialValue)
    )*/
    const interval = duration;
    const counter = setInterval(()=>{
        startValue += 0.01
        setCount(startValue.toFixed(2))
        if(!cashOut) {
            setCurrentOdds(startValue.toFixed(2))
        }
        
        if(startValue >= props.targetValue){   
            clearInterval(counter)  
            setTimeout(()=>{
            //starting new game ---
            //game ended
            setStartCount(0)
            setGameStarted(false)
        }, 3000)
        }
        //starting new game ---
        
        /*
        if(startValue < targetValue){
            setCurrentOdds(startValue.toFixed(2))
        } */
        
    }, interval)
    
    //set current odds for cash out
    //setCurrentOdds(startValue)    
    return () => {
        clearInterval(counter)
        setRandomNumber1(0) //reset target value

    }
}, [props.targetValue, props.initialValue, randomNumber0])

useEffect(()=>{
    setGameEnded(false)
    setRandomValues()
    let startValue = props.initialValue
    /*const interval = Math.floor(
        duration/(targetValue - initialValue)
    )*/
    
    const interval = 1000;
    const counter_ = setInterval(()=>{
        startValue += 10
        setStartCount(startValue)
        if(startValue >= 100 && randomNumber1 > 0){
            //game ended
            setCount(0)
            setGameStarted(true)
            //setRandomValues()
            clearInterval(counter_)
        }
    }, interval)
    return () => {
        clearInterval(counter_)               
    }
}, [gameStarted])


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

                
            <section className="w-full md:w-2/3 flex flex-col items-center px-3">
            <div className="w-full bg-white dark:bg-gray-800 dark:text-white shadow-md rounded px-8 pt-2 pb-4 mb-4">
            {isLoading? <div className="text-purple-500 m-5">Please wait...</div> : '' }
            
            <div className="h-80 dark:bg-gray-800 dark:text-white flex flex-col items-center px-3">
<div className="w-full">

<div class="flex overflow-x-scroll pb-2 hide-scroll-bar no-scrollbar">
        <div class="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
{oddsHistory.map(x =>
        <div class="inline-block px-1">
        <div className="text-center max-w-xs overflow-hidden transition-shadow duration-300 ease-in-out shadow m-2 text-neutral-900 dark:text-neutral-300">
            {x}x
            </div>
            </div>
    )}
    </div>
    </div>

    <div 
    style={{backgroundImage: `url(${gameStarted? Images.rocket_animation : gameEnded? Images.blast : Images.galaxy})`, backgroundRepeat: `no-repeat`, backgroundSize: `cover`}}
    class="flex flex-col rounded-lg dark:bg-gray-800 dark:text-white justify-center items-center h-60 bg-gray-100 gap-4">

{gameStarted? <div className="w-full flex flex-nowrap text-5xl font-bold justify-center text-center">
        <div className={count>=props.targetValue? 'text-start text-yellow-200 w-20 flex' : 'w-20 text-white flex'}>{count} 
        <span className="text-end">{props.text}</span>
        </div>
        </div>
        :
        <div className="w-full text-xl font-semibold justify-center text-center">
            <div className="text-white text-xl">Loading...</div>
            <div className="flex justify-center flex-nowrap">
            <div style={{width: 200}} className={'rounded-full justify-start items-start bg-gray-200 flex'}>
            <div style={{width: startCount*2}} 
            className="w-full bg-purple-800 h-1.5 rounded-full">
            </div>
            </div>
            </div>
            </div>
        }


   {/* gameStarted? <CounterAnimation
    initialValue={1}
    targetValue={randomNumber0}
    text={'x'}
    cashout={cashOut}
    />
    :
    <GameStartsAnimation
    initialValue={1}
    targetValue={10}
    text={'x'}
    />
*/    }

    </div>


</div>
</div>

                </div>
                <div class="w-full flex rounded-lg dark:bg-gray-800 dark:text-white justify-center items-center h-40 gap-4">      
<div className="w-1/2 text-white h-20"> 
    <div className="rounded-lg dark:bg-gray-800 flex">
    <div onClick={()=>updateStake('remove')} className="flex w-full justify-start"> <FaMinusCircle/> </div>
    <div className="flex w-full justify-center font-bold"> {stake} </div>
    <button type="button" onClick={()=>updateStake('add')} className="flex w-full justify-end"> <FaPlusCircle/> </button>
    </div>
    <div className="rounded-lg dark:bg-gray-800 flex">
    <div onClick={()=>addStake(10)} className="flex w-full justify-center bg-purple-800 dark:bg-gray-800 rounded-lg p-1 m-1"> 10 </div>
    <div onClick={()=>addStake(50)} className="flex w-full justify-center bg-purple-800 dark:bg-gray-800 rounded-lg p-1 m-1"> 50 </div>
    <div onClick={()=>addStake(100)} className="flex w-full justify-center bg-purple-800 dark:bg-gray-800 rounded-lg p-1 m-1"> 100 </div>
    </div>
    <div className="rounded-lg dark:bg-gray-800 flex">
    <div onClick={()=>addStake(500)} className="flex w-full justify-center bg-purple-800 dark:bg-gray-800 rounded-lg p-1 m-1"> 500 </div>
    <div onClick={()=>addStake(1000)} className="flex w-full justify-center bg-purple-800 dark:bg-gray-800 rounded-lg p-1 m-1"> 1K </div>
    <div onClick={()=>addStake(2000)} className="flex w-full justify-center bg-purple-800 dark:bg-gray-800 rounded-lg p-1 m-1"> 2K </div>
    </div>
</div>
<div onClick={()=>requestCashout()} className="w-1/2 flex bg-green-600 border-white text-white items-center justify-center rounded-lg h-28"> 
<div className="text-xl font-bold text-center">Cash Out
<div>{gameStarted? (parseFloat(stake) * parseFloat(currentOdds)).toFixed() : stake }</div>
</div>
</div>
</div>
</section>
            <ToastContainer />

        
    
    </React.Fragment>
)
      }

      /*
      const GameStartsAnimation = ({
        initialValue,
        targetValue,
        text,
      }) => {
const [count, setCount] = useState(initialValue)
const duration = 1000; //1000 = 1 sec
useEffect(()=>{
    let startValue = initialValue
    const interval = duration;
    const counter = setInterval(()=>{
        startValue += 1
        setCount(startValue)
        if(startValue >= targetValue){
            //game ended
            setGameStarted(true)
            clearInterval(counter)
        }
    }, interval)
    return () => {
        clearInterval(counter)
    }
}, [targetValue, initialValue])
return (
    <div className="w-full flex flex-nowrap text-xl font-semibold justify-center text-center"><div className={count>=targetValue?'text-center text-red-600 w-20 flex':'w-20 flex'}>Starts in ..{count}</div></div>
)
      }
      */

      
      const requestCashout = () => {
        setCashOut(true)
        if(gameStarted){
        alert(currentOdds * stake)
        }
      }

      const addStake = (x) =>{
        let amount = stake+parseInt(x)
        setStake(amount)      
        }

        useEffect(()=>{
            setRandomValues()
        },[randomNumber0])

      /*
    useEffect(() => {
      //window.scrollTo(0, 0)
    }, [])

      useEffect(() => {
        setRandomValues()
      }, []); */


    return (
        <CounterAnimation
    initialValue={1}
    targetValue={randomNumber0}
    text={'x'}
    cashout={cashOut}
    />
    )
}
export default AviatorComponent