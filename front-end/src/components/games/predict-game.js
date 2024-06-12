import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';

const PredictGame = () =>{

    const blogpost = [{id: 1,
        user_id: 0,
        post_title: '',
        post_image: '',
        post_content: '',
        status: 1,
        post_date: '',
        clicks: 0,
        likes: 0,
        dislikes: 0,
        unique_id: '',
        comments: 0
    }]

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
    const [result, setResult] = useState('');
    const [home, setHome] = useState('');
    const [away, setAway] = useState('');
    const [sport, setSport] = useState('');
    const [isLoading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false);

   
    const loginAction = () => {
        setLoading(true)
        setResult('')
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                home: home,
                away: away,
                sport: sport,
            })
        };

        fetch(endPoint + 'game/predict', postOptions)
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 1) {
                    //{ toast.success(json.message) }
                    setResult(json.message)
                    //setShowModal(true)
                    setLoading(false)

                }
                else {
                    { toast.error(json.message) }
                    setLoading(false)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
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

    useEffect(() => {
    }, []);

return(
    <div className="w-full">

        <form className="bg-white dark:bg-gray-800 dark:text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="-mx-3 md:flex mb-4">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block dark:text-white text-gray-700 text-sm mb-2">
                                Home team
                            </label>
                            <input value={home} onChange={e => setHome(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Home" />
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block dark:text-white text-gray-700 text-sm mb-2">
                                Away team
                            </label>
                            <input value={away} onChange={e => setAway(e.currentTarget.value)} className="shadow appearance-none border border-purple-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Away" />
                            {/*<p className="text-purple-500 text-xs italic">Please choose a password.</p>*/}
                        </div>
                        </div>
                        <div className="mb-4">
                            <label className="block dark:text-white text-gray-700 text-sm mb-2">
                                Sport (Optional)
                            </label>
                            <select onChange={e => setSport(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value={sport}>{sport == ''? 'Select' : sport}</option>
                                {
                                    sports.map( (x) =>
                                    <option key={x.id} value={x.sport}>{x.sport}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <p style={{ display: isLoading ? `block` : `none` }} className="text-purple-500 text-xs italic">Please wait...</p>
                            <button style={{ display: !isLoading ? `block` : `none` }} onClick={loginAction} className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button">
                            Predict Game
                            </button>
                        </div>
                           <p className="mt-2"> 
                            {/* .replace(/'**'/g, "🔵") */}        
                        <div style={{whiteSpace: "pre-wrap"}}>{result}</div>
                        </p>
                    </form>
                    
    

<ResultModal/>
<ToastContainer />

    </div>
    
)
}

export default PredictGame