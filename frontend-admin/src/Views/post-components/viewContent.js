import { useEffect, useState } from "react";
import requestHandler from "../../Utilities/requestHandler";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Loading from "../../Utilities/Loading";
import number_format from "../../Utilities/number_format";
import RecentContents from "./recentContents";
import UpdateContent from "./updateContent";
import { RWebShare } from "react-web-share";
import urls from "../../Utilities/urls";
import dateTimeToDate from "../../Utilities/dateTimeToString";
import RandomString from "../../Utilities/randomString";
import ContentDetails from "./contentDetails";
import HeadTags from "../layout-components/headTags";
 
const ViewContent = ({route}) => {

  const [pageTile, setPageTitle] = useState("Love World Influencer")
  const [shareUrl, setShareUrl] = useState(null)
    const [newslug, setNewslug] = useState(null)
    const {id} = useParams()
    const {slug} = useParams()
    const {userId} = useParams()
    const [isLoading, setLoading] = useState(false)
    const [post, setPost] = useState([])
    const [postViewed, setPostViewed] = useState(false)
    const [editPost, setEditPost] = useState(false)
    const account_type = localStorage.getItem("account_type")
    const [userData, setUserData] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const [sessionId, setSessionId] = useState(null)
    const [thumbNail, setThumbNail] = useState(null)

    const userProfile = async () => {
      setLoading(true)
      let x = await requestHandler.get('user/profile', true);
      if(x != null && x.status === 1)
      {
          let y = x.message;
          setUserData(y[0])
          setLinkToShare(y[0].user_id, slug)
          
      }
      else {
        setLinkToShare(null, slug)
      }
      
      //get post
      //alert("hey")
      getContents()

      setLoading(false)
    }

    const getContents = async () => {
      setLoading(true)
        //alert(sessionId)
        //if(sessionId != null){
        let session_Id = localStorage.getItem('sessionId')
        let curUrl = 'content/'+userId+'/'+id+'/'+slug+session_Id+''
        /*if(userId === undefined) 
        {
          //alert("session_Id")
          curUrl = 'content/'+id+'/'+slug+''
        }*/
        curUrl = 'post/read/'+id+'/'+slug+''
        
        let x = await requestHandler.get(curUrl, true);
        if(x != null && x.status === 1)
        {
            setPost(x.message)
            setNewslug(x.message.slug)
            setPageTitle(x.message.post_title)
            setThumbNail(x.message.post_image)
            setPostViewed(true)
            console.log(x.message)
        }
        else
        {
            toast.error(x.message)
        }
      
      
      //}
        setLoading(false)
      }
    
      const deleteBtn = async (id) => {
        let canDelete = window.confirm("Do you want to delete post?")
        if(canDelete){

        setLoading(true)
        let x = await requestHandler.get('post/'+id+'/delete_post', true);
        if(x != null && x.status === 1){
            toast.success(x.message)
            window.location.href="/content/all"
        }
        else{
            toast.error(x.message)
        }
        setLoading(false)
    }

      }

      const ShareBtn = () => {

        return <RWebShare
                data={{
                    text: post.post_title,
                    url: shareUrl,
                    title: "Share - "+post.post_title,
                }}
                onClick={() => shareContent() }
            >
                      <button class="btn btn-sm btn-icon btn-icon-only btn-outline-primary ms-1" type="button">
                      <i class="fa-regular fa-share text-center"></i>
                      </button>
                      </RWebShare>
      }

      const shareContent = async () =>{
        setLoading(true)
        /*
        let curUrl = 'content/'+userId+'/'+slug+'/share'
        if(userId === undefined){
          curUrl = 'content/'+slug+'/share'
        }*/
        let curUrl = 'content/'+id+'/'+slug
        let x = await requestHandler.get(curUrl, true);
        if(x != null && x.status === 1){
            //toast.success(x.message)
            //window.location.href="/content/all"
        }
        else{
            toast.error(x.message)
        }
        setLoading(false)
      }

      const setLinkToShare = (user_id, post_uid) =>{
        /*
        if(user_id !== null){
          const shareUrl_ = urls.appUrl+"content/"+user_id+"/"+id+"/"+post_uid+""
            setShareUrl(shareUrl_)
            }
          else setShareUrl(urls.appUrl+"content/"+id+"/"+post_uid+"")
          */
          setShareUrl(urls.appUrl+"content/"+id+"/"+slug+"")
      }

      const setSession = () => {
        //set user unique session
        let session_Id = localStorage.getItem('sessionId')
        if(session_Id == null){
          let randStr = RandomString(15)
          setSessionId(randStr)
          localStorage.setItem('sessionId', randStr)
        }
      }
      useEffect(() => {
        setSession()
      })

    useEffect(() => {      
      userProfile()
      document.title = pageTile
        //setLinkToShare()
    },[slug])

    

    const Content = () => {
       return  <div class="card mt-5 mb-5">
        <div class="card-body mt-5 p-0">
                  <div class="glide glide-gallery" id="glideBlogDetail">
                    <div class="glide glide-large">
                    {isLoading? '' : 
                    <img src={post.post_image}
                    className="responsive border-0 rounded-top-end rounded-top-start img-fluid mb-3 w-100" 
                    />
                    }
                    <div style={{position: 'fixed', zIndex: 500, bottom: 100, padding: 10, right: 10}} class="text-muted d-lg-none">
                    <div class="row">
                    <ShareBtn />
                    </div>
                  </div>

                    </div>
                    
                  </div>
                  <div class="card-body pt-0">

                    <h4 class="mb-3">{post.post_title}</h4>
                    <p className="text-muted">
                              {dateTimeToDate(post.post_date)}
                            </p>
                    <div style={{whiteSpace: "pre-wrap"}}>
                            {post.post_content}                            
                    </div>

                  </div>
                </div>
                <div class="card-footer border-0 pt-0">
                <div class="row align-items-center">

                  <div class="col-8 text-muted">
                    <div class="row g-0">
                    <div class="col-auto pe-3">
                          <span class="align-middle"> <i class="fa-regular fa-eye m-1"></i>  {number_format(post.clicks)}</span>
                          </div>
                          <div class="col">
                            <span class="align-middle">  <i class="fa-regular fa-share m-1"></i>{number_format(post.shares)} </span>
                          </div>
                          {/*<div class="col">
                            <span class="align-middle">  <i class="fa-regular fa-clock m-1"></i><TimeInWords time={post.duration} /> </span>
    </div>*/}
                    </div>
                  </div>

                  
                  <div class="col-4 d-none d-lg-block">
                    <div class="d-flex align-items-center justify-content-end ">
                    <ShareBtn />
                    </div>
                  </div>

                </div>
              </div>
            </div>
    }


    return(
      <>
          <HeadTags
            title={"Love World Influencer"}
            metaDescription={pageTile !== null? pageTile : "Love World Influencers Platform"}
          ></HeadTags>

        <div className="col">

<div class="row">
            <div class="col-12 col-xl-8 col-xxl-9 mb-5">
                {isLoading? <Loading/> : ''}
                <div style={{display: userData.account_type === "Super Admin" && !editPost? 'block' : 'none'}}>
                  <div class="col-12 col-md-12 d-flex align-items-start justify-content-start m-1">
                <button onClick={() => editPost? setEditPost(false) : setEditPost(true) } type="button" class="btn btn-outline-primary btn-icon btn-icon-start w-100 w-md-auto m-1">
                  <i data-cs-icon="edit-square"></i>
                  <span>Edit</span>
                </button>
                <button onClick={() => deleteBtn(post.id)} type="button" class="btn btn-danger m-1">Delete</button>
                <button onClick={() => {showDetails? setShowDetails(false) : setShowDetails(true)}} type="button" class="btn btn-success m-1">{showDetails? 'Hide Overview' : 'Video Overview'}</button>
              </div>
              </div>

                {editPost? <UpdateContent
                id={post.id}
                unique_id={slug}
                post_title={post.post_title}
                post_image={post.post_image}
                post_content={post.post_content}
                status={post.status}
                post_date={post.post_date}
                /> : showDetails? <ContentDetails id={post.id} /> : <Content/> }

            </div>

            <RecentContents />

            </div>
        
        </div> 
        </> 
    )
}

export default ViewContent;