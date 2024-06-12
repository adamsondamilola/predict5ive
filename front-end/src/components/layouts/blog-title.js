import { Link } from "react-router-dom"

const BlogTitle = () => {
    return (
<div>
        <div className="flex flex-col items-center py-12 mt-10">
            <Link className="font-bold text-white uppercase hover:text-yellow-700 text-2xl" to="/">
              {process.env.REACT_APP_TITLE}
            </Link>
            <p className="text-lg text-white text-center">
            {process.env.REACT_APP_SUBTITLE} 
            </p>
        </div>
        </div>
           )
}

export default BlogTitle