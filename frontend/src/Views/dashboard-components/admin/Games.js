import React, { Component, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { useCookies } from 'react-cookie';
import Loading from '../../../Utilities/Loading';
import { Link } from 'react-router-dom';
import TitleSection from '../../layout-components/TitleSection';

const Games = () => {

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
        fetch(process.env.REACT_APP_MAIN_API +'game/admin_get_games', options)
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
                        game_time: gameTime,
                        status: status_,
                        win_or_lose: winOrLose,
                        is_premium: isPremium
            
             })
        };
    
        fetch(endPoint + 'game/new_game', postOptions)
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

<TitleSection title="Games"/>



                            {games.map(x => 
	<div className='col-lg-12 card mt-1'>
<div className='row'>
	<div class="col-5">
	<p className='text-center'><b>{x.home_team}</b></p>
  </div>
  <div class="col-2">
	<p className='text-center'>{x.result == null? `VS` : x.result}</p>
    
  </div>
  <div class="col-5">
	<p className='text-center'><b>{x.away_team}</b></p>
  </div>
  <div class="col-8">
	<p className='text-center'>{x.country} - {x.league}</p>
  </div>
  <div class="col-4">
	<p className=' text-success'>{x.prediction}</p>
  </div>
  <div class="col-6">
	<p className='text-center'>{x.game_time}</p>
  </div>
  <div class="col-6">
  <p style={{display: x.win_or_lose==0? `block` : `none`}} className='text-center text-danger'> Pending! </p>
  <p style={{display: x.win_or_lose==1? `block` : `none`}} className='text-center text-success'> <i className='fa fa-check-circle'></i> </p>
  <p style={{display: x.win_or_lose==2? `block` : `none`}} className='text-center text-danger'> <i className='fa fa-times-circle'></i> </p>
  <p style={{display: x.win_or_lose==3? `block` : `none`}} className='text-center text-warning'> <i className='fa fa-times-circle'></i> </p>
  </div>

  <div onClick={() => deleteGame(x.id)} class="col-6"> <div className='text-white card text-center bg-danger'>Delete</div></div>
  <div class="col-6"> <Link to={"/admin/"+x.id+"/update_game"} className='text-white card text-center bg-success'>Edit</Link></div>

  </div>
  </div>
)}

<ToastContainer />
</>
}
export default Games