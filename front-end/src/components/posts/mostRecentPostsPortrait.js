import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';

const MostRecentPostsPortrait = () =>{

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
    const [result, setResult] = useState([]);
    const [isLoading, setLoading] = useState(false)

    function truncateString(str, num) {
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    }
    
    const options = {  
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    const getContents = async () => {
      setLoading(true)      
      fetch(endPoint + 'post/get_recent_posts', options)
            .then((response) => response.json())
            .then((json) => {
                if (json.status === 1) {
                    setResult(json.message)
                    setLoading(false)
                }
                else {
                    setLoading(false)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
      getContents()
    }, []);


return(
  
<div className="w-full dark:bg-gray-800 dark:text-white flex flex-col items-center">
<p className="text-xl text-left font-semibold pb-5">Recent Sports News</p>
<div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 p-4">
                        
                        {result.map(x => 
        <div
        class="mb-3 block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <article key={x.id} className="max-w-none format lg:format-lg format-red">
                <img src={x.post_image}
                alt="Post Image"
                style={{margin: `auto`, width: `100%`, height: 200}}
                className="rounded-lg h-auto w-auto max-w-lg mx-auto"
                />
                <div className="flex flex-col justify-start p-4">
                    <a href={"/post/"+x.id+"/"+x.slug} className="text-1xl font-bold hover:text-gray-700 pb-4">{truncateString(x.post_title, 50)}</a>
                     <a href={"/post/"+x.id+"/"+x.slug} className="pb-6">{truncateString(x.post_content, 50)}</a>
                </div>
            </article>
        
        <div
          class="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
          {x.post_date}
        </div>
      </div>
       )}

                        </div> 
</div>                    
    
    
)
}

export default MostRecentPostsPortrait