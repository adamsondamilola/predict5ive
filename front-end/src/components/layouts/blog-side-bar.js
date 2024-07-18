import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Images from "../../Utilities/Images";
import MostRecentPostsPortrait from "../posts/mostRecentPostsPortrait";

const BlogSideBar = () =>{

    const blogpost = [{id: 1,
        post_title: '23 Tips to a Profitable Sports Betting',
        post_content: 'To bet is to take risk, to make profit is to take calculated risk. The below are the measures to take before playing bet.',
        post_image: Images.betting,
        url: '/betting-tips'
    },
    {id: 2,
        post_title: 'The Risks of Gambling - A Must Read',
        post_content: 'Discipline and proper informations are very important to every individual that like to gamble. There is nothing without its risk, that is why we think its important you know the risk of addictive gambling and how you can be free if you need help.',
        post_image: Images.gambling,
        url: '/risks-of-betting'
    }]
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [isLoading, setLoading] = useState(false)

    const copyToClipB = (text) =>{
        navigator.clipboard.writeText(text)
        toast.success("Code copied to clipboard")
    }

    function truncateString(str, num) {
        if (str.length <= num) {
          return str
        }
        return str.slice(0, num) + '...'
      }

      const [bookingCodes, setBookingCodes] = useState([])
      const GetBookingCodes = () => {
            fetch(endPoint + 'game/recent_bookings')
                .then((response) => response.json())
                .then((json) => {
                    if (json.status === 1) {
                        setBookingCodes(json.message)
                    } else {
                        //window.location.replace("/");
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false))
    }

    useEffect(() => {
        GetBookingCodes()
        //GetPosts(numRows)
        //GetPopularPosts()
    }, []);

return( 
    <aside className="w-full md:w-1/3 flex flex-col items-center">

<div className="w-full bg-white dark:bg-gray-800 dark:text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

        <p className="text-xl font-semibold pb-5">Recent Booking Codes 
        <Link to="/post-game" className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4">
            Add Code
        </Link>
        </p>
       
        {bookingCodes.map(x => 
        <div
        class="mb-3 block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div class="p-6">
          <h5 class="mb-2 text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {x.code} ({x.odds} odds)
          </h5>
          <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            <i>{x.bookmaker}</i>
          </p>
          <button onClick={()=>copyToClipB(x.code)} className="button inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Copy Code
                            </button>
        </div>
        <div
          class="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
          {x.date_posted}
        </div>
      </div>
       )}
       <Link to="/booking-codes" className="w-full bg-green-800 text-white font-bold text-sm uppercase rounded hover:bg-green-700 flex items-center justify-center px-2 py-3 mt-4">
            See More
        </Link>

    </div>

    <div className="w-full bg-white dark:bg-gray-800 dark:text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="text-xl font-semibold pb-5">Download App : Android</p>
        <p>Click the image below to download and install Predict 5ive Android app on your device. Its absolutely free.</p>
        <p>
            <a href="https://drive.google.com/file/d/1CvgBBEOWBh58ZZnT9oG0Oh-1Id8WYYTZ/view?usp=sharing" target="_blank">
            <img src={"https://play-lh.googleusercontent.com/KHnReEHYCmXBuP5e3BV3zUgQndB0SDU7HIERXFQ8snC5qds9W737RighTax1yTaVyUAh"} 
                alt="App Image"
                style={{margin: `auto`, width: 300, height: 150}}
                className="rounded-lg h-auto w-auto max-w-lg mx-auto"
                />
            </a>
        </p>
    </div>

    <div className="w-full bg-white dark:bg-gray-800 dark:text-white shadow flex flex-col my-4 p-6">
        <p className="text-xl font-semibold pb-5">Featured Posts</p>
        {blogpost.map((post)=> (
            
            <article key={post.id} className="max-w-none format lg:format-lg format-red">
                <img src={post.post_image} 
                alt="Post Image"
                style={{margin: `auto`, width: `100%`, height: 150}}
                className="rounded-lg h-auto w-auto max-w-lg mx-auto"
                />
                <div className="flex flex-col justify-start p-4">
                    <Link to={post.url} className="text-1xl font-bold hover:text-gray-700 pb-4">{post.post_title}</Link>
                     <Link to={post.url} className="pb-6">{truncateString(post.post_content, 50)}</Link>
                </div>
            </article>
            ))}
    </div>


    
    
</aside>
)
}

export default BlogSideBar