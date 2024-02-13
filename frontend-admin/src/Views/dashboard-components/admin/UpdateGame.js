import React, { Component, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { useCookies } from 'react-cookie';
import Loading from '../../../Utilities/Loading';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import TitleSection from '../../layout-components/TitleSection';

const UpdateGame = () => {

    const {id} = useParams();
    const [cookies, setCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
	const [games, setGames] = useState({}); 
	const [isLoading, setLoading] = useState(false)
	const [yesterdayGames, setYesterdayGames] = useState(false);
	const [todayGames, setTodayGames] = useState(true);
	const [tomorrowGames, setTomorrowGames] = useState(false);
	const [result, setResult] = useState(null);
	const [gameDay, setGameDay] = useState(null);
    const [userDetails, setUserDetails] = useState([])
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    
    var options = {  
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +token
          
        }
      }

      const deleteGame = (id) =>{
        let x = window.confirm("You are about to delete a game");
        if(x){
        fetch(process.env.REACT_APP_MAIN_API + 'game/'+id+'/delete_game', options)
        .then((response) => response.json())
        .then((json) => {
            if (json.status == 1) { 
                getGames()
                {toast.success(json.message)}
                window.location.replace("/admin/games");
              }            else if (json.status == 0) { 
                {toast.error(json.message)}
              }else{
                {toast.error("Error!")}
            }
        })
        .catch((error) => console.error(error))
        .finally(console.log(""))
    }
      } 

    const GetUserDetails = () => {
         
        fetch(process.env.REACT_APP_MAIN_API + 'auth/user-profile', options)
      .then((response) => response.json())
      .then((json) => {
          if (json.status == 1) { 
            setUserDetails(json.message) 
            setUsername(json.message.username)
          }else{
           // alert(token)
           //window.location.replace("/login");
          }
      })
      .catch((error) => console.error(error))
      .finally(console.log(""))

 
}


    const getGames = () => {  
		setLoading(true)    
        fetch(process.env.REACT_APP_MAIN_API +'game/'+id+'/get_game', options)
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 1) {
                  setCountry(json.message.country)
                    setCountryCode(json.message.country_code)
                  setLeague(json.message.league)
                        setHomeTeam(json.message.home_team)
                        setAwayTeam(json.message.away_team)
                        setPrediction(json.message.prediction)
                        setResult(json.message.result)
                        setGameDate(json.message.game_date)
                        setGameTime(json.message.game_time)
                        setGameType(json.message.game_type)
                        setAccuracy(json.message.accuracy)
                        setOdds(json.message.odds)
                        setStatus(json.message.status)
                        setWinOrLose(json.message.win_or_lose)
                        setIsPremium(json.message.is_premium)
                    setGames(json.message);
					if(json.message == ""){
						{toast.error("Sorry, no game found. Check back later.")}
					} 
                }
                else if (json.status == 0) {
						{toast.error(json.message)}
                }
				else{
					{toast.error("An error occurred!")} 
				}
            })
            .catch((error) => console.error(error))
            .finally(() => console.log(""));
			setLoading(false)
			
    }
  
    const [username, setUsername] = useState(null)
    const [country, setCountry] = useState(null)
    const [countryCode, setCountryCode] = useState(null)
    const [league, setLeague] = useState(null)
    const [homeTeam, setHomeTeam] = useState(null)
    const [awayTeam, setAwayTeam] = useState(null)
    const [prediction, setPrediction] = useState(null)
    const [gameDate, setGameDate] = useState(null)
    const [gameTime, setGameTime] = useState(null)
    const [gameType, setGameType] = useState(null)
    const [accuracy, setAccuracy] = useState(null);
    const [odds, setOdds] = useState(null);
    const [status_, setStatus] = useState(1)
    const [winOrLose, setWinOrLose] = useState(0)
    const [isPremium, setIsPremium] = useState(0)

    

    const updateGame = () =>{
        setLoading(true)
    
        const postOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +token    
            },
            body: JSON.stringify({
                id: id,
                country: country,
                country_code: countryCode,
                        league: league,
                        home_team: homeTeam,
                        away_team: awayTeam,
                        prediction: prediction,
                        result: result,
                        game_date: gameDate,
                        game_time: gameTime,
                        game_type: gameType,
                        accuracy: accuracy,
                        odds: odds,
                        status: status_,
                        win_or_lose: winOrLose,
                        is_premium: isPremium
            
             })
        };
    
        fetch(endPoint + 'game/update_game', postOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        if (json.status == 1) {
                            getGames()
                            {toast.success(json.message)} 
                            setLoading(false)                            
    
                }
                        else {
                            {toast.error(json.message)} 
                            setLoading(false)
                        }    
                    })
                    .catch((error) => console.error(error))
                    .finally(() => setLoading(false));
    }
    
    useEffect(()=>{
	   GetUserDetails()
       getGames()
    },[])

return <>

        <TitleSection title="Update Game" />

        <div className='row'>
<div class="col-6">
  <input className='form-control m-2' placeholder='Country' value={country} onChange={e => setCountry(e.target.value)}  />
  </div>
  <div class="col-6">
  <input className='form-control m-2' maxLength={2} placeholder='Country Code' value={countryCode} onChange={e => setCountryCode(e.target.value)}  />
  </div>
<div class="col-6">
  <input className='form-control m-2' placeholder='League' value={league} onChange={e => setLeague(e.target.value)}  />
  </div>
  <div class="col-6">
  <input className='form-control m-2' placeholder='Home Team' value={homeTeam} onChange={e => setHomeTeam(e.target.value)}  />
  </div>
  <div class="col-6">
  <input className='form-control m-2' placeholder='Away Team' value={awayTeam} onChange={e => setAwayTeam(e.target.value)}  />
  </div>
  <div class="col-6">
  <input className='form-control m-2' placeholder='Prediction' value={prediction} onChange={e => setPrediction(e.target.value)}  />
  </div>
  <div class="col-6">
  <input className='form-control m-2' placeholder='Accuracy' maxLength={2} value={accuracy} onChange={e => setAccuracy(e.target.value)}  />
  </div>
  <div class="col-6">
  <input className='form-control m-2' placeholder='Odds' maxLength={4} value={odds} onChange={e => setOdds(e.target.value)}  />
  </div>
  <div class="col-6">
  <input className='form-control m-2' placeholder='Prediction' value={result} onChange={e => setResult(e.target.value)}  />
  </div>
  <div class="col-6">
  <input className='form-control m-2' type='Date' value={gameDate} onChange={e => setGameDate(e.target.value)}  />
  </div>
  <div class="col-6">
  <input className='form-control m-2' placeholder='Game Time' value={gameTime} onChange={e => setGameTime(e.target.value)}  />
  </div>
  <div class="col-6">
    <select className='form-control m-2' onChange={e => setGameType(e.target.value)}>
    <option value={gameType}>{gameType}</option>
    <option value={"Soccer"}>Soccer</option>
    <option value={"Basketball"}>Basketball</option>
    <option value={"Ice Hockey"}>Ice Hockey</option>
    <option value={"Boxing"}>Boxing</option>
    <option value={"Tennis"}>Tennis</option>
    <option value={"Golf"}>Golf</option>
    </select>
  </div>
  <div class="col-6">
    <select className='form-control m-2' onChange={e => setStatus(e.target.value)}>
    <option value={1}>Publish</option>
    <option value={0}>Pending</option>
    </select>
  </div>
  <div class="col-6">
    <select className='form-control m-2' onChange={e => setIsPremium(e.target.value)}>
    <option value={0}>Free</option>
    <option value={1}>Premium</option>
    </select>
  </div>
  <div class="col-6">
    <select className='form-control m-2' onChange={e => setWinOrLose(e.target.value)}>
    <option value={0}>Game Pending</option>
    <option value={1}>Won</option>
    <option value={2}>Lose</option>
    <option value={3}>Canceled</option>
    </select>
  </div>
  </div>
  <div className='row'>
  <div class="col-6 mt-3">                            
                                {isLoading? <Loading /> :
                                <button class="default-btn register" onClick={() => updateGame()} type="button">
                                <i className='fa fa-arrow-right'></i>
                            </button>
                            }
                            </div>                        

                            <div class="col-6 mt-3">                            
                                {isLoading? <Loading /> :
                                <button class="default-btn register bg-danger" onClick={() => deleteGame(id)} type="button">
                                <i className='fa fa-times'></i>
                            </button>
                            }
                            </div>                        
                            </div>
<ToastContainer />
</>
}
export default UpdateGame