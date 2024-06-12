import { FactCheck, FactCheckRounded, FactCheckSharp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';

const Predictions = () =>{


    const sports = [
        {id: 1, sport: "Soccer", status: 0},
        {id: 2, sport: "Basketball", status: 0},
        {id: 3, sport: "Field Hockey", status: 0},
        {id: 4, sport: "Tennis", status: 0},
        {id: 5, sport: "Table Tennis", status: 0},
        {id: 6, sport: "Volleyball", status: 0},
        {id: 7, sport: "Baseball", status: 0},
        {id: 8, sport: "Golf", status: 0},
    ]
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
	const [teams, setTeams] = useState(null);
	const [gameId, setGameId] = useState(null);
  const [winOrLose, setWinOrLose] = useState(0)

    const options = {  
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +token
      }
    }

    const closeModal = () =>{
        setShowModal(false)
      }
    const ResultModal = () =>{
    
        return (
      
      <>
          {showModal ? (
            <>
              <div
                className="justify-center items-center p-5 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h4 className="text-2xl text-indego-600 ">
                        Result
                      </h4>
                      <div onClick={()=> setShowModal(false)}
                        className="text-purple-500 background-transparent uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      >
                        X
                      </div>
                     </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                     
                      <div style={{whiteSpace: "pre-wrap"}}>{result}</div>

                       </p>
                      
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <div onClick={()=>setShowModal(false)}
                        className="text-purple-500 background-transparent uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      >
                        X
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
      </>
        )
      }

      const getGames = (day) => { 
        setDaySelected(day) 
		setLoading(true)    

    let url = endPoint +'game/'+day+'/get_games_new'
        if(day=="yesterday"){
          url = endPoint +'game/old_games'
        }

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
  
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded container mx-auto flex flex-wrap py-6 mb-5">

<div className="w-full dark:bg-gray-800 dark:text-white flex flex-col items-center px-3">
<ul
  class="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0"
  role="tablist"
  data-te-nav-ref>
  <li onClick={()=>getGames('yesterday')} role="presentation">
    <a
      href="#tabs-home"
      class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-2 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
      >{daySelected === "yesterday"? <span className="text-purple-700"><b>Yesterday</b></span> : 'Yesterday'}</a>
  </li>
  <li onClick={()=>getGames('today')} role="presentation">
    <a
      href="#tabs-profile"
      class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-2 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
      >{daySelected === "today"? <span className="text-purple-700"><b>Today</b></span> : 'Today'}</a>
  </li>
  <li onClick={()=>getGames('tomorrow')} role="presentation">
    <a
      href="#tabs-messages"
      class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-2 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
      >{daySelected === "tomorrow"? <span className="text-purple-700"><b>Tomorrow</b></span> : 'Tomorrow'}</a>
  </li>
</ul>
</div>


{isLoading? <div className="text-purple-500 m-5">Please wait...</div>
:
<>
{games.map(x =>
<div className="w-full dark:bg-gray-800 dark:text-white md:w-1/2 flex flex-col items-center px-3">
<div className="w-full shadow m-2">
<div className="grid grid-cols-1 m-2">
    <p><b>{x.country} - {x.league}</b></p>
    {x.game_type}
</div>

<div class="flex flex-col dark:bg-gray-800 dark:text-white justify-center items-center h-40 bg-gray-100 gap-4">
<div class="flex flex-wrap justify-center items-center gap-4 w-full">
<div class="w-1/4 text-center px-4 leading-loose text-sm">
    <div><img src={x.home_logo} width={45} height={45}/></div>
    <div>{x.home_team}</div>
</div>
<div class="w-1/4 text-center px-4 leading-loose text-sm">
    {x.result == '' || x.result == null? 'VS' : x.result}
    </div>
    <div class="w-1/4 items-center text-center px-4 leading-loose text-sm">
        <div><img src={x.away_logo} width={45} height={45}/></div>
        <div>{x.away_team}</div>
        </div>
</div>
</div>

<div class="flex flex-col justify-center items-center h-20 gap-4">
<div class="flex flex-wrap justify-center items-center gap-4 w-full">
<div class="w-1/4 items-center text-center leading-loose text-sm">
    {x.game_time} | {x.accuracy}%
    </div>
    <div class="w-1/4 items-center text-center leading-loose text-sm">
    {x.prediction}
  </div>
  <div class="w-1/4 items-center text-center  leading-loose text-sm">
<div className={x.win_or_lose == 1? 'text-green-600 bold' : x.win_or_lose == 2? 'text-red-500' : ''}>{x.odds}</div> 
</div>
</div>
</div>
</div>
</div>
)}
</>
}
                    
    

<ResultModal/>
<ToastContainer />

    </div>
    
)
}

export default Predictions