import React, { Component, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { useCookies } from 'react-cookie';
import Loading from '../../../Utilities/Loading';
import TitleSection from '../../layout-components/TitleSection';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

const PredictionsView = () => {

    const [cookies, setCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
	const [games, setGames] = useState([]); 
	const [isLoading, setLoading] = useState(false)
	const [yesterdayGames, setYesterdayGames] = useState(false);
	const [todayGames, setTodayGames] = useState(true);
	const [tomorrowGames, setTomorrowGames] = useState(false);
  const [showModal, setShowModal] = useState(false);
	const [teams, setTeams] = useState(null);
	const [result, setResult] = useState(null);
	const [gameId, setGameId] = useState(null);
  const [winOrLose, setWinOrLose] = useState(0)
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)

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

      const ModalForm = <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
      >
      <Modal show={true} onHide={false}>
        <Modal.Header onClick={()=>closeModal()} closeButton>
          <Modal.Title>{teams}</Modal.Title>
        </Modal.Header>
      
        <Modal.Body>
        <div className='row'>

        <div class="col-6">
  <input className='form-control m-2' placeholder='Prediction' value={result} onChange={e => setResult(e.target.value)}  />
  </div>

        <div class="col-6">
    <select className='form-control m-2' onChange={e => setWinOrLose(e.target.value)}>
    <option value={winOrLose}>{winOrLose}</option>
    <option value={0}>Game Pending</option>
    <option value={1}>Won</option>
    <option value={2}>Lose</option>
    <option value={3}>Canceled</option>
    </select>
  </div>
        <div class="col-6 mt-3">                            
                                {isLoading? <Loading /> :
                                <button class="default-btn register" onClick={() => updateGame()} type="button">
                                <i className='fa fa-arrow-right'></i>
                            </button>
                            }
                            </div>
        </div>
        </Modal.Body>
      
        <Modal.Footer>
          {/*<Button onClick={()=>closeModal()} variant="secondary">Close</Button>*/}
        </Modal.Footer>
      </Modal>
      </div>

    const getEditGames = (id) => { 
      setGameId(id); 
      setLoading(true)    
          fetch(process.env.REACT_APP_MAIN_API +'game/'+id+'/get_game', options)
              .then((response) => response.json())
              .then((json) => { 
                  if (json.status == 1) {
                          setResult(json.message.result)
                          setTeams(json.message.home_team +" VS "+ json.message.away_team)
                          setWinOrLose(json.message.win_or_lose)
                          setShowModal(true);
            if(json.message == ""){
              {toast.error("Sorry, no game found. Check back later.")}
            } 
                  }
                   if (json.status == 0) {
              {toast.error(json.message)}
                  }
              })
              .catch((error) => console.error(error))
              .finally(() => console.log(""));
        setLoading(false)
        
      }

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
                id: gameId,
                result: result,
                win_or_lose: winOrLose
            
             })
        };
    
        fetch(endPoint + 'game/update_game_outcome', postOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        if (json.status == 1) {
                            getGames()
                            {toast.success(json.message)} 
                            setLoading(false);
                            setShowModal(false);                         
    
                }
                        else {
                            {toast.error(json.message)} 
                            setLoading(false)
                        }    
                    })
                    .catch((error) => console.error(error))
                    .finally(() => setLoading(false));
    }
    

    const getGames = (day) => {  
		setLoading(true)    
        fetch(process.env.REACT_APP_MAIN_API +'admin/'+day+'/get_games', options)
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

return <div className='row mt-2'>
<div class="row m-1">
<div className='col-4' onClick={()=>getGames('yesterday')}> <div className={yesterdayGames? `text-white card text-center bg-primary` : `text-white card text-center bg-success`}>Recent</div> </div>
<div className='col-4' onClick={()=>getGames('today')}> <div className={todayGames? `text-white card text-center bg-primary` : `text-white card text-center bg-success`}>Today</div> </div>
<div className='col-4' onClick={()=>getGames('tomorrow')}> <div className={tomorrowGames? `text-white card text-center bg-primary` : `text-white card text-center bg-success`}>Next</div> </div>
</div>

{/*Show Modal*/}
{showModal? ModalForm : ""}

{/*PC VIEW*/}
<div style={{display: isLoading? `none` : `block`}} class="col-12 table-cont d-none d-lg-block text-center">
<table border={0} className='table bg-white'>
<thead>
<tr className='text-white'>
                            <th scope="col">Time</th>
                            <th>Country</th>
                            <th>Leagues</th>
                            <th>Match</th>
                            <th>Tips</th>
                            <th>Result</th>
                            <th>Posted by</th>
                            <th>Vote</th>
                       </tr>
                       </thead>
                       <tbody>
{games.map(x => 
  <tr>
    <td scope="col">{x.game_time}</td>
    <td> {x.country} </td>
    <td> {x.league} <p className='text-primary'>{x.game_type}</p> </td>
    <td><b>{x.home_team}</b> VS <b>{x.away_team}</b></td>
    <td><b>{x.prediction}</b></td>
    <td><b>{x.result}</b>
    <p>
    {isLoading? <Loading/> : 
    <button class="btn-success btn-sm" onClick={() => getEditGames(x.id)}>
                                <i className='fa fa-pen'></i>
                            </button> 
                            }
      </p>
      <p><Link target='_blank' to={"/admin/"+x.id+"/update_game"} className='text-white card text-center bg-success'>Edit Full</Link></p>
      </td>
    <td> {x.username} </td>
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
<tr className='text-white'>
                            <th>Match</th>
                            <th>Time</th>
                            <th>Tips</th>
                            

                       </tr>
                       </thead>
                       
{games.map(x => 
    <tbody>
  <tr>
    <td><b>{x.home_team}</b> VS <b>{x.away_team}</b></td>
    <td>{x.game_time}</td>
    <td><b>{x.prediction}</b></td>
    
   </tr>
  <tr>
       <td colSpan={3}> 
       {isLoading? <Loading /> : 
       <div>
        <button onClick={()=>voteGame(x.id, "downvote")} className='btn btn-small btn-danger bg-danger mr-1'> <i className='fa fa-thumbs-down'></i> {x.downvotes} </button>
   <button onClick={()=>voteGame(x.id, "upvote")} className='btn btn-small btn-success ml-1'> <i className='fa fa-thumbs-up'></i> {x.upvotes} </button>
       </div>
       }
    </td>   
  </tr>
  <tr>
  <th colSpan={3}>Result</th>
  </tr>
  <tr>
  <td colSpan={3}> {x.result} 
  <p>
    {isLoading? <Loading/> : 
    <button class="btn-success btn-sm" onClick={() => getEditGames(x.id)}>
                                <i className='fa fa-pen'></i>
                            </button>
                            }
      </p>
      <p><Link target='_blank' to={"/admin/"+x.id+"/update_game"} className='text-white card text-center bg-success'>Edit Full</Link></p>

      </td>
  </tr>

  <tr>
  <th colSpan={3}>Country/Type</th>
  </tr>
  <tr>
  <td colSpan={3}> {x.country} - {x.league} <p className='text-primary'>{x.game_type}</p> </td>
  </tr>
  </tbody>
)}

</table>
</div>	

<center>{isLoading? <Loading /> : null}</center>

<ToastContainer />
</div>
}

export default PredictionsView