import { FactCheck, FactCheckRounded, FactCheckSharp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';

const PredictionsSlider = () =>{
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500
      };

    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    const [cookies, setCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
      const [games, setGames] = useState([]); 
    const [result, setResult] = useState('');
    const [home, setHome] = useState('');
    const [away, setAway] = useState('');
    const [daySelected, setDaySelected] = useState('');
    const [isLoading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false);

    const [yesterdayGames, setYesterdayGames] = useState(false);
	const [todayGames, setTodayGames] = useState(true);
	const [tomorrowGames, setTomorrowGames] = useState(false);

    const options = {  
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +token
      }
    }

    const getGames = (day) => { 
        setDaySelected(day) 
		setLoading(true)    

    let url = endPoint +'game/'+day+'/get_games_new'
        /*if(day=="yesterday"){
          url = endPoint +'game/old_games'
        }*/

        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 1) {
                    setGames(json.message);
                    if(day=="yesterday"){ 
						setTodayGames(false)
						setTomorrowGames(false)
						setYesterdayGames(true)
                        setLoading(false)
					}
                    else if(day=="today"){ 
						setTodayGames(true)
						setTomorrowGames(false)
						setYesterdayGames(false)
                        setLoading(false)
					}
                    else if(day=="tomorrow"){ 
						setTodayGames(false)
						setTomorrowGames(true)
						setYesterdayGames(false)
                        setLoading(false)
					}
					if(json.message == ""){
						toast.error("Sorry, no game found. Check back later.")
                        setLoading(false)
					} 
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

    useEffect(() => {
    }, []);

    useEffect(()=>{
        getGames('today') 
     },[])

return(
  
    <div className="text-white dark:bg-gray-800 dark:text-white rounded container mx-auto flex flex-wrap py-6 mb-5">

<div className="w-full dark:bg-gray-800 dark:text-white flex flex-col items-center px-3">
<ul
  class="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0"
  role="tablist"
  data-te-nav-ref>
  <li onClick={()=>getGames('yesterday')} role="presentation">
    <a
      href="#tabs-home"
      class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-2 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-300 hover:isolate hover:border-transparent focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
      >{daySelected === "yesterday"? <span className="text-white dark:text-purple-700"><b>Yesterday</b></span> : 'Yesterday'}</a>
  </li>
  <li onClick={()=>getGames('today')} role="presentation">
    <a
      href="#tabs-profile"
      class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-2 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-300 hover:isolate hover:border-transparent focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
      >{daySelected === "today"? <span className="text-white dark:text-purple-700"><b>Today</b></span> : 'Today'}</a>
  </li>
  <li onClick={()=>getGames('tomorrow')} role="presentation">
    <a
      href="#tabs-messages"
      class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-2 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-300 hover:isolate hover:border-transparent focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
      >{daySelected === "tomorrow"? <span className="text-white dark:text-purple-700"><b>Tomorrow</b></span> : 'Tomorrow'}</a>
  </li>
</ul>
</div>


{isLoading? <div className="text-white dark:text-purple-500 m-5">Please wait...</div>
:
<div
        class="flex overflow-x-scroll pb-10 hide-scroll-bar"
      >
        <div
          class="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 "
        >
{games.map(x =>
    <div class="inline-block px-1">
<div className="w-64 h-58 max-w-xs overflow-hidden transition-shadow duration-300 ease-in-out shadow m-2 text-neutral-900 dark:text-neutral-300">
<div className="grid grid-cols-1 m-2 text-white">
    <p><b>{x.country} - {x.league}</b></p>
    {x.game_type}
</div>

<div class="flex flex-col rounded-lg dark:bg-gray-800 dark:text-white justify-center items-center h-40 bg-gray-100 gap-4">
<div class="justify-start items-center w-full">
<div class="flex text-center px-4 leading-loose text-sm">
    <div><img src={x.home_logo} width={23} height={23}/></div>
    <div className="ml-3">{x.home_team}</div>
</div>
<div class="text-center px-4 leading-loose text-sm">
    {x.result == '' || x.result == null? x.game_time +" :: "+ x.prediction : x.result}
    </div>
    <div class="flex items-center text-center px-4 leading-loose text-sm">
        <div><img src={x.away_logo} width={23} height={23}/></div>
        <div className="ml-3">{x.away_team}</div>
        </div>
</div>
</div>
</div>
</div>
)}
</div>
</div>
}
                    
    

<ToastContainer />

    </div>
    
)
}

export default PredictionsSlider