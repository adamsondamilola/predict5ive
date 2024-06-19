import React, { Component, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import TitleSection from '../../layout-components/TitleSection';
import Loading from '../../../Utilities/Loading';

const AddGame = () => {

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
    const [countryCode, setCountryCode] = useState(null)
    const [league, setLeague] = useState(null)
    const [homeTeam, setHomeTeam] = useState(null)
    const [awayTeam, setAwayTeam] = useState(null)
    const [homeLogo, setHomeLogo] = useState(null)
    const [awayLogo, setAwayLogo] = useState(null)
    const [prediction, setPrediction] = useState(null)
    const [gameDate, setGameDate] = useState(null)
    const [gameTime, setGameTime] = useState(null)
    const [gameType, setGameType] = useState(null)
    const [status_, setStatus] = useState(1)
    const [accuracy, setAccuracy] = useState(null);
    const [odds, setOdds] = useState(null);
      const [winOrLose, setWinOrLose] = useState(0)
    const [isPremium, setIsPremium] = useState(0)
    const [isFeatured, setIsFeatured] = useState(0)
    const [slug, setSlug] = useState(null);

    

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
                country_code: countryCode,
                        league: league,
                        home_team: homeTeam,
                        away_team: awayTeam,
                        home_logo: homeLogo,
                        away_logo: awayLogo,
                        prediction: prediction,
                        game_date: gameDate,
                        game_time: gameTime,
                        game_type: gameType,
                        accuracy: accuracy,
                        odds: odds,
                        status: status_,
                        win_or_lose: winOrLose,
                        is_premium: isPremium,
                        is_featured: isFeatured
            
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
    
    const [csvFile, setCsvFile] = useState(null);
    const importGame = async () =>{
      setLoading(true)
      var formData = new FormData();
      formData.append('file', csvFile);
      formData.append('_method', 'post');
      const postOptions = {
          method: 'POST',
          headers: {
              'Authorization': 'Bearer ' +token    
          },
          body: formData
           
      };
  
      fetch(endPoint + 'game/import_game', postOptions)
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
<TitleSection title="Export CSV Game"/>
<div className='row'>
<div class="col-12 m-2">
<input type="file" 
                            name="file"
                            onChange={(e) => setCsvFile(e.target.files[0])}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            className="form-control" />
</div>
<div class="col-12 m-2">
<button disabled={!csvFile || isLoading} class="default-btn register" onClick={() => importGame()} type="button">
                                
                                {isLoading? <Loading /> : <i className='fa fa-upload'></i>}
                            </button>

</div>
</div>

<TitleSection title="Add Game"/>
        
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
  <input className='form-control m-2' placeholder='Home Logo' value={homeLogo} onChange={e => setHomeLogo(e.target.value)}  />
  </div>
  <div class="col-6">
  <input className='form-control m-2' placeholder='Away Logo' value={awayLogo} onChange={e => setAwayLogo(e.target.value)}  />
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
  <input className='form-control m-2' type='Date' value={gameDate} onChange={e => setGameDate(e.target.value)}  />
  </div>
  <div class="col-6">
  <input className='form-control m-2' placeholder='Game Time' value={gameTime} onChange={e => setGameTime(e.target.value)}  />
  </div>
  <div class="col-6">
    <select className='form-control m-2' onChange={e => setGameType(e.target.value)}>
    <option value="">Select Game Type</option>
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
    <select className='form-control m-2' onChange={e => setIsFeatured(e.target.value)}>
    <option value={0}>Not Featured</option>
    <option value={1}>Featured</option>
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
  
  <div class="col-12 mt-3">                            
                                {isLoading? <Loading /> :
                                <button class="default-btn register" onClick={() => addGame()} type="button">
                                <i className='fa fa-arrow-right'></i>
                            </button>
                            }
                            </div>
<div className='mt-5'></div>
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
export default AddGame