import React, { Component, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { useCookies } from 'react-cookie';
import Loading from '../../../Utilities/Loading';
import TitleSection from '../../layout-components/TitleSection';
import PredictionsView from './PredictionsView';

const PredictionsDashboard = () => {

    const [cookies, setCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
	const [games, setGames] = useState([]); 
	const [isLoading, setLoading] = useState(false)
	const [yesterdayGames, setYesterdayGames] = useState(false);
	const [todayGames, setTodayGames] = useState(true);
	const [tomorrowGames, setTomorrowGames] = useState(false);
	const [result, setResult] = useState(null);
	const [gameDay, setGameDay] = useState(null);
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)

    const getGames = (day) => {  
		setLoading(true)    
        fetch(process.env.REACT_APP_MAIN_API +'game/'+day+'/get_games')
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 1) {
                    setGames(json.message);
                    if(day=="yesterday"){ 
						setTodayGames(false)
						setTomorrowGames(false)
						setYesterdayGames(true)
					}
                    else if(day=="today"){ 
						setTodayGames(true)
						setTomorrowGames(false)
						setYesterdayGames(false)
					}
                    else if(day=="tomorrow"){ 
						setTodayGames(false)
						setTomorrowGames(true)
						setYesterdayGames(false)
					}
					if(json.message == ""){
						{toast.error("Sorry, no game found. Check back later.")}
					} 
                }
				else{
					{toast.error("An error occurred!")} 
				}
            })
            .catch((error) => console.error(error))
            .finally(() => console.log(""));
			setLoading(false)

			
    }

    var options = {  
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +token
        }
      }

    const voteGame = (id, voteType) => {
        setLoading(true)      
        fetch(process.env.REACT_APP_MAIN_API +'game/'+id+'/'+voteType+'/game_vote', options)
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 1) {
                  {toast.success(json.message)}
                }else{
                    {toast.error(json.message)}
                }
            })
            .catch((error) => console.error(error))
            .finally(() => console.log(""));
            setLoading(false)
    }
  
    useEffect(()=>{
	   getGames('today') 
    },[])

return <div className='row mt-2'>
    <TitleSection title="Predictions" />

<PredictionsView/>

<center>{isLoading? <Loading /> : null}</center>

<ToastContainer />
</div>
}

export default PredictionsDashboard