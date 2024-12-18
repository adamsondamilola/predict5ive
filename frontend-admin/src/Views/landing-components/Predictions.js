import React, { Component, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { useCookies } from 'react-cookie';
import Loading from '../../Utilities/Loading';

const Predictions = () => {

	const [games, setGames] = useState([]); 
	const [isLoading, setLoading] = useState(false)
	const [yesterdayGames, setYesterdayGames] = useState(false);
	const [todayGames, setTodayGames] = useState(true);
	const [tomorrowGames, setTomorrowGames] = useState(false);
    const [cookies, setCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    
    var options = {  
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +token
      }
    }

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

return <section>
<div className='row mt-5'>
<div class="container">
<h2 class="">Our Predictions</h2> </div>
</div>
<div class="row m-1">

<div className='col-4' onClick={()=>getGames('yesterday')}> <div className={yesterdayGames? `text-dark card text-center bg-warning` : `text-white card text-center bg-success`}>Recent</div> </div>
<div className='col-4' onClick={()=>getGames('today')}> <div className={todayGames? `text-dark card text-center bg-warning` : `text-white card text-center bg-success`}>Today</div> </div>
<div className='col-4' onClick={()=>getGames('tomorrow')}> <div className={tomorrowGames? `text-dark card text-center bg-warning` : `text-white card text-center bg-success`}>Next</div> </div>
</div>

{/*PC VIEW*/}
<div style={{display: isLoading? `none` : `block`}} class="col-12 table-cont d-none d-lg-block text-center">
<table border={0} className='table bg-white'>
<thead>
<tr className='text-dark bg-warning'>
                            <th scope="col">Time</th>
                            <th>Country</th>
                            <th>Leagues</th>
                            <th>Match</th>
                            <th>Tips</th>
                            <th>Result</th>
                            <th>VOTE</th>
                       </tr>
                       </thead>
                       <tbody>
{games.map(x => 
  <tr>
    <td scope="col">{x.game_time}</td>
    <td> {x.country} </td>
    <td> {x.league} </td>
    <td><b>{x.home_team}</b> VS <b>{x.away_team}</b></td>
    <td><b>{x.prediction}</b></td>
    <td> <span className='text-center'>{x.result == null? `* - *` : x.result}</span> 
  {/*<span style={{display: x.win_or_lose==0? `block` : `none`}} className='text-center text-danger'> Pending! </span>
  <span style={{display: x.win_or_lose==1? `block` : `none`}} className='text-center text-success'> <i className='fa fa-check-circle'></i> </span>
  <span style={{display: x.win_or_lose==2? `block` : `none`}} className='text-center text-danger'> <i className='fa fa-times-circle'></i> </span>
  <span style={{display: x.win_or_lose==3? `block` : `none`}} className='text-center text-warning'> <i className='fa fa-times-circle'></i> </span>*/}
   </td>
   <td> 
   {isLoading? <Loading /> : 
       <div>
        <button onClick={()=>voteGame(x.id, "downvote")} className='btn btn-small btn-danger bg-danger mr-1'> <i className='fa fa-thumbs-down'></i> {x.downvotes} </button>
   <button onClick={()=>voteGame(x.id, "upvote")} className='btn btn-small btn-success ml-1'> <i className='fa fa-thumbs-up'></i> {x.upvotes} </button>
       </div>
       }
   </td>
  </tr>
)}
</tbody>
</table>
</div>	

{/*MOBILE VIEW*/}
<div style={{display: isLoading? `none` : `block`}} class="table-responsive d-lg-none text-center">
<table border={0} className='table bg-white'>
<thead>
<tr className='text-dark bg-warning'>
                            <th>Match</th>
                            <th>Time</th>
                            <th>Tips</th>
                            <th>Result</th>
                       </tr>
                       </thead>
                       
{games.map(x => 
    <tbody>
  <tr>
    <td><b>{x.home_team}</b> VS <b>{x.away_team}</b></td>
    <td>{x.game_time}</td>
    <td><b>{x.prediction}</b></td>
    <td> <span className='text-center'>{x.result == null? `* - *` : x.result}</span> 
   </td>
  </tr>
  <tr>
       <td colSpan={4}> 
       {isLoading? <Loading /> : 
       <div>
        <button onClick={()=>voteGame(x.id, "downvote")} className='btn btn-small btn-danger bg-danger mr-1'> <i className='fa fa-thumbs-down'></i> {x.downvotes} </button>
   <button onClick={()=>voteGame(x.id, "upvote")} className='btn btn-small btn-success ml-1'> <i className='fa fa-thumbs-up'></i> {x.upvotes} </button>
       </div>
       }
    </td>
  </tr>
  </tbody>
)}

</table>
</div>	



<ToastContainer />
</section>
}
export default Predictions