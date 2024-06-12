import { useEffect, useState } from "react";
import requestHandler from "../../Utilities/requestHandler";
import { toast } from "react-toastify";
import TimeInWords from "../../Utilities/timeInWords";
import truncate from "../../Utilities/truncateString";
import { Link } from "react-router-dom";

const RecentContents = () => {

    const [isLoading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])

      const getContents = async () => {
        setLoading(true)
        let x = await requestHandler.get('post/get_recent_posts', true);
        if(x != null && x.status === 1){
            setPosts(x.message)
            //console.log(x.message)
        }
        else{
            toast.error(x.message)
        }
        setLoading(false)
      }
    
      const deleteBtn = async (id) => {
        let canDelete = window.confirm("Do you want to delete post?")
        if(canDelete){

        setLoading(true)
        let x = await requestHandler.get('post/'+id+'/delete_post', true);
        if(x != null && x.status === 1){
            toast.success(x.message)
            getContents()
        }
        else{
            toast.error(x.message)
        }
        setLoading(false)
    }

      }

    useEffect(() => {
        getContents()
    },[])

    return(
        <div className="col">
            
            <h2 class="small-title">Recent Contents</h2>
            <div class="row mb-5">
                {posts.map(x => 
                <div class="col-12 m-1">
                  <div class="card h-100">
                    {x.post_image != null? <img src={x.post_image} class="card-img-top sh-19" alt="card image" />
                :
                ''    
                }
                    
                    <div class="card-body">
                      <h5 class="heading mb-3">
                        <Link to={"/content/"+x.id+"/"+x.slug} class="body-link ">
                          <span class="clamp-line sh-5" data-line="2">{truncate(x.post_title, 50)}</span>
                        </Link>
                      </h5>
                      <div>
                      </div>
                    </div>
                  </div>
                </div>
                )}
                
        </div>
        </div>  
    )
}

export default RecentContents;