import React, { Component, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { useCookies } from 'react-cookie';
import Loading from '../../../Utilities/Loading';
import { Link } from 'react-router-dom';
import TitleSection from '../../layout-components/TitleSection';

const AddPrediction = () => {

    const [cookies, setCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
	const [games, setGames] = useState([]); 
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
        fetch(process.env.REACT_APP_MAIN_API +'game/user_get_games', options)
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 1) {
                    
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
    const [league, setLeague] = useState(null)
    const [homeTeam, setHomeTeam] = useState(null)
    const [awayTeam, setAwayTeam] = useState(null)
    const [prediction, setPrediction] = useState(null)
    const [gameDate, setGameDate] = useState(null)
    const [gameTime, setGameTime] = useState(null)
    const [status_, setStatus] = useState(1)
    const [winOrLose, setWinOrLose] = useState(0)
    const [isPremium, setIsPremium] = useState(0)

    

    const addGame = () =>{
        setLoading(true)    
        const postOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +token    
            },
            body: JSON.stringify({
                username: username,
                country: country,
                league: league,
                home_team: homeTeam,
                away_team: awayTeam,
                prediction: prediction,
                game_date: gameDate,
                game_time: gameTime            
             })
        };
    
        fetch(endPoint + 'game/user_new_game', postOptions)
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

<TitleSection title="Add Game"/>
        
        <div className='row'>
<div class="col-6">
  <input className='form-control m-2' placeholder='Country' value={country} onChange={e => setCountry(e.target.value)}  />
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
  <input className='form-control m-2' type='Date' value={gameDate} onChange={e => setGameDate(e.target.value)}  />
  </div>
  <div class="col-6">
  <input className='form-control m-2' placeholder='Game Time' value={gameTime} onChange={e => setGameTime(e.target.value)}  />
  </div>
  </div>
  
  <div class="col-12 mt-3">                            
                                {isLoading? <Loading /> :
                                <button class="default-btn register" onClick={() => addGame()} type="button">
                                <i className='fa fa-arrow-right'></i>
                            </button>
                            }
                            </div>
<div className='mt-5'></div>

                            {games.map(x => 
	<div className='col-lg-12 mt-1'>

<div className='table-responsive'>  
  <table className='table'>
<thead>
<tr>
<td>Status</td>
<td>Date Posted</td>
<td>Game Date</td>
<td>Home</td>
<td>Away</td>
<td>Prediction</td>
</tr>
</thead>
<tbody>
  <tr>
    <td>
    <p style={{display: x.status==0? `block` : `none`}} className='text-center text-danger'> Pending! </p>
    <p style={{display: x.status==1? `block` : `none`}} className='text-center text-success'> Approved <i className='fa fa-check-circle'></i> </p>
    </td>
  <td>{x.date_posted}</td>
  <td>{x.game_time}</td>
  <td>{x.home_team}</td>
  <td>{x.away_team}</td>
  <td>{x.prediction}</td>
  </tr>
</tbody>
  </table>
	
  </div>
  </div>
)}

<ToastContainer />
</>
}
export default AddPrediction