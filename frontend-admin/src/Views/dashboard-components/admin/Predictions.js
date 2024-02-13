import React, { Component, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { useCookies } from 'react-cookie';
import Loading from '../../../Utilities/Loading';
import TitleSection from '../../layout-components/TitleSection';
import PredictionsView from '../user/PredictionsView';

const PredictionsDash = () => {

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
    
    const getOptions = {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +token    
      }
  };

    const getGames = () => {  
		setLoading(true)    
        fetch(process.env.REACT_APP_MAIN_API +'game/pending_games',getOptions)
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 1) {
                    setGames(json.message);
                    
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
  
    const updateOutcome = (id, winOrLose) =>{
        setLoading(true)
    
        
    
        fetch(endPoint + 'game/'+id+'/'+winOrLose+'/admin_approve_game', getOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        if (json.status == 1) {
                            {toast.success(json.message)} 
                            getGames()
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
	   getGames() 
    },[])

return <>

<TitleSection title="Predictions"/>

<PredictionsView />
{/*
<div style={{display: isLoading? `none` : `block`}} class="row">

{games.map(x => 
<div className='table-responsive'>  
  <table className='table'>
<thead>
<tr>
<td>Username</td>
<td>Status</td>
<td>Date Posted</td>
<td>Game Date</td>
<td>Home</td>
<td>Away</td>
<td>Prediction</td>
<td>Country</td>
<td>League</td>
</tr>
</thead>
<tbody>
  <tr>
  <td>{x.username}</td>
    <td>
    <p style={{display: x.status==0? `block` : `none`}} className='text-center text-danger'> Pending! </p>
    <p style={{display: x.status==1? `block` : `none`}} className='text-center text-success'> Approved <i className='fa fa-check-circle'></i> </p>
    <p style={{display: x.status==2? `block` : `none`}} className='text-center text-danger'> Rejected <i className='fa fa-times'></i> </p>
    </td>
  <td>{x.date_posted}</td>
  <td>{x.game_time}</td>
  <td>{x.home_team}</td>
  <td>{x.away_team}</td>
  <td>{x.prediction}</td>
  <td>{x.country}</td>
  <td>{x.league}</td>
  </tr>
</tbody>
  </table>
  <div onClick={() => updateOutcome(x.id, 1)} class="col-4"> <div className='text-white card text-center bg-success'>Approve</div></div>
  <div onClick={() => updateOutcome(x.id, 0)} class="col-4"> <div className='text-white card text-center bg-danger'>Delete</div></div>
  </div>
)}

</div>	*/}
<center>{isLoading? <Loading /> : null}</center>

<ToastContainer />
</>
}
export default PredictionsDash