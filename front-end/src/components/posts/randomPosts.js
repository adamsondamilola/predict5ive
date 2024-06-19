import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';

const RandomPosts = () =>{

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
        'Content-Type': 'application/json',
      }
    }

    const getContents = async () => {
      setLoading(true)      
      fetch(endPoint + 'post/get_random_posts', options)
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
  
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded container mx-auto flex flex-wrap py-6 mb-5">
{isLoading? <div className="text-purple-500 m-5">Please wait...</div> : '' }
            
<div className="w-full dark:bg-gray-800 dark:text-white flex flex-col items-center px-3">
<p className="text-xl font-semibold pb-5">Posts You Might Have Missed</p>
<div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                        
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
                     {/*<Link to={"/post/"+x.id+"/"+x.slug} className="pb-6">{truncateString(x.post_content, 100)}</Link>*/}
                </div>
            </article>        
        {/*<div
          class="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
          {x.post_date}
        </div>*/}
      </div>
       )}
    </div> 
</div>                    
    
<ToastContainer />

    </div>
    
)
}

export default RandomPosts