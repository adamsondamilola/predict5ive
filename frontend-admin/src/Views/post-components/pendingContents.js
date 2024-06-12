import { useEffect, useState } from "react";
import Loading from "../../Utilities/Loading";
import requestHandler from "../../Utilities/requestHandler";
import { toast } from "react-toastify";
import TimeInWords from "../../Utilities/timeInWords";
import number_format from "../../Utilities/number_format";
import { Link } from "react-router-dom";
import truncate from "../../Utilities/truncateString";

const PendingContents = () => {

    const [pageTile, setPageTitle] = useState("Pending Contents")
    const [isLoading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [constPosts, setConstPosts] = useState(20)

    const checkIfLoggedIn = async () => {
        setLoading(true)
        let x = await requestHandler.get('auth/logged/user', true);
        if(x != null && x.status === 0){
            window.location.href = "/auth/login/redirect"
        }
        setLoading(false)
      }

      const getContents = async () => {
        setLoading(true)
        let x = await requestHandler.get('admin/post/pending', true);
        if(x != null && x.status === 1){
            setPosts(x.message)
            //console.log(x.message)
        }
        else{
            toast.error(x.message)
        }
        setLoading(false)
      }

      const getMoreContents = async () => {
        setLoading(true)
        let newConstPosts = constPosts + 20;
        setConstPosts(newConstPosts)
        let x = await requestHandler.get('content/'+newConstPosts+'/list', true);
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
        //checkIfLoggedIn()
        getContents()
        document.title = pageTile
    },[pageTile])

    return(
        <div className="col">
            {isLoading? <Loading/> : ''}
            <div class="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-2 mb-5">
                {posts.map(x => 
                <div class="col">
                  <div class="card h-100">
                    {x.post_image != null? <img src={x.post_image} class="card-img-top sh-19" alt="card image" />
                :
                <video src={x.post_video} className="card-img-top sh-19" alt="video"></video>    
                }
                    
                    <div class="card-body">
                      <h5 class="heading mb-3">
                        <Link to={"/content/"+x.id+"/"+x.slug} class="body-link ">
                          <span class="clamp-line sh-5" data-line="2">{truncate(x.post_title, 50)}</span>
                        </Link>
                      </h5>
                      <div>
                        <div class="row g-0">
                        <div class="col-auto pe-3">
                          <i class="fa-regular fa-eye m-1"></i> 
                            <span class="align-middle">{number_format(x.clicks)}</span>
                          </div>
                          {/*<div class="col">
                          <i class="fa-regular fa-share m-1"></i> 
                            <span class="align-middle">{number_format(x.shares)}</span>
              </div>*/}
                          {x.post_video !== null? <div class="col">
                          <i class="fa-regular fa-clock m-1"></i> 
                            <span class="align-middle"><TimeInWords time={x.duration} /> </span>
                          </div> : ''}
                          <div class="col">
                          <i onClick={()=>deleteBtn(x.id)} class="fa-regular fa-trash m-1 text-danger"></i> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}                
        </div>
        {isLoading? <Loading/> 
        : 
        <div style={{display: posts.length > 20? 'flex' : 'none'}} class="row mb-5">
          <button onClick={getMoreContents} className="btn btn-primary btn-clock btn-lg">Load More</button>
        </div>
        }
        </div>  
    )
}

export default PendingContents;