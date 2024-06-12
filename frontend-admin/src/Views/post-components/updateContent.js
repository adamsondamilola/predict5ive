import { useEffect, useState } from "react";
import Loading from "../../Utilities/Loading";
import requestHandler from "../../Utilities/requestHandler";
import { toast } from "react-toastify";

const UpdateContent = (props) => {
    const [pageTile, setPageTitle] = useState("Update content")
    let token = localStorage.getItem('access_token')
    let date = new Date()
    const [postId, setPostId] = useState(props.id)
    const [postTitle, setPostTitle] = useState(props.post_title);
    const [postImage, setPostImage] = useState(props.post_image);
    const [postVideo, setPostVideo] = useState(props.post_video);
    const [postVideo2, setPostVideo2] = useState(props.post_short_video);
    const [postContent, setPostContent] = useState(props.post_content);
    const [postDate, setPostDate] = useState(props.post_date);
    const [status, setStatus] = useState(props.status);
    const [duration, setDuration] = useState(props.duration);
    const [size, setSize] = useState(props.size);
    const [previewImage, setPreviewImage] = useState(props.post_image);
    const [previewVideo, setPreviewVideo] = useState(props.post_video);
    const [previewVideo2, setPreviewVideo2] = useState(props.post_short_video);
    const [isLoading, setLoading] = useState(false)

    const deleteBtn = async (id) => {
        let canDelete = window.confirm("Do you want to delete post?")
        if(canDelete){

        setLoading(true)
        let x = await requestHandler.get('content/'+id+'/delete', true);
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

    
    const checkIfLoggedIn = async () => {
        let x = await requestHandler.get('auth/logged/user', true);
        if(x != null && x.status === 0){
            window.location.href = "/auth/login/redirect"
        }
      }

      const uploadImage = (img) => {
        setLoading(true)
      const formData = new FormData();
//      formData.append('name', fileX.name);
      formData.append('file', img, img.name);
    console.log(formData)

        const postOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            contentType: false,
            processData: false,
            body: formData
        };

        fetch(process.env.REACT_APP_MAIN_API + 'content/upload/image', postOptions)
            .then((response) => response.json())
            .then((json) => {
                if (json.status === 1) {
                    //toast.success('Image uploaded')
                    setLoading(false)
                    setPostImage(json.message)
                    //window.location.href = '/user/profile/update'
                }
                else {
                    toast.error(json.message)
                    setLoading(false)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }

    function convertHMS(value) {
      const sec = parseInt(value, 10); // convert value to number if it's string
      let hours = Math.floor(sec / 3600); // get hours
      let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
      let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
      // add 0 if value < 10; Example: 2 => 02
      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
    }

    const uploadVideo = (vd) => {
        setLoading(true)

        new Promise((resolve, reject) => {
          var reader = new FileReader();
          reader.onload = function () {
            var aud = new Audio(reader.result);
            aud.onloadedmetadata = function () {
              resolve(convertHMS(aud.duration));
            };
          };
          reader.readAsDataURL(vd);
        })
          .then((duration) => {
            setDuration(duration)
            setSize(vd?.size)
          })
          .catch((err) => {
            console.log(err);
          });

      const formData = new FormData();
//      formData.append('name', fileX.name);
//formData.append('file', vd, vd.name);
formData.append('file', vd);
console.log(formData)
    
        const postOptions = {
            method: 'POST',
            headers: {
                //'Accept': 'application/json',
                //'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            contentType: false,
            processData: false,
            body: formData
        };
        fetch(process.env.REACT_APP_MAIN_API + 'content/upload/video', postOptions)
            .then((response) => response.json())
            .then((json) => {
                if (json.status === 1) {
                    //toast.success(json.message)
                    setLoading(false)
                    setPostVideo(json.message)
                    //window.location.href = '/user/profile/update'
                }
                else {
                    toast.error(json.message)
                    setLoading(false)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
            
    }

      const handleVideoFile = (e) => {
        setLoading(true)
        if(e) {
        setPreviewVideo(URL.createObjectURL(e[0]));
        //handle file upload
        uploadVideo(e[0]);
        console.log('files: ', e);
        }
        setLoading(false)
      }

      const handleImageFile = (e) => {
        setLoading(true)
        if(e) {
        setPreviewImage(URL.createObjectURL(e[0]));
            setPostImage(e)
        //handle file upload
        uploadImage(e[0]);

        console.log('files: ', e);
        }
        setLoading(false)
      }

      const sendContent = async () =>{
        //alert(duration)
        let url = 'content/update';
        setLoading(true)
        let x = await requestHandler.post(url, {post_title:postTitle, post_image: postImage, post_video: postVideo, post_content: postContent, size: size.toString(), duration: duration, status: status, post_date: postDate, id: postId}, false, true)
            if(x != null && x.status === 1)
            {
                //uploadImage(previewImage[0])
                toast.success(x.message)
                window.location.href="/content/"+x.id+"/"+x.slug
            }
            else if(x != null && x.status === 0)
            {
                toast.error(x.message)
            }
            else
            {
                toast.error('Something went wrong')
            }
        setLoading(false)
    }
  
      useEffect(() => {
        //checkIfLoggedIn()
          document.title = pageTile
      },[pageTile])


    return(
        <div className="col">
        <h2 class="small-title">Update Content</h2>
              <div class="card mb-5">
                <div class="card-body">
                  <form encType="multipart/form-data">
                  <div style={{display: previewVideo !== null? 'flex' : 'none'}} class="mb-3 row">
                  <div className="d-flex justify-content-center">
                    <div class="position-relative mb-3">
                        <div className="embed-responsive embed-responsive-16by9">
                        <video width={'100%'} src={previewVideo} className="embed-responsive-item" alt="video" controls>
                            </video>
                        </div>
                        </div>
                      </div>                      
                    </div>
                    <div class="mb-3 row">
                      <label class="col-lg-2 col-md-3 col-sm-4 col-form-label">Upload Video</label>
                      <div class="col-sm-8 col-md-9 col-lg-10">
                        {isLoading? <Loading/> : 
                        <input className="form-control" accept="video/*" style={{display: 'flex'}} type="file" onChange={x => handleVideoFile(x.target.files)} />
                        }                        
                      </div>
                    </div>
                  <div style={{display: previewImage !== null ? 'flex' : 'none'}} class="mb-3 row">
                  <div className="d-flex justify-content-center">
                    <div class="sw-13 position-relative mb-3">
                        <img src={previewImage} class="img-fluid" alt="thumb" />
                        </div>
                      </div>                      
                    </div>
                    <div class="mb-3 row">
                      <label class="col-lg-2 col-md-3 col-sm-4 col-form-label">Video Preview</label>
                      <div class="col-sm-8 col-md-9 col-lg-10">
                        {isLoading? <Loading/> : 
                        <input className="form-control" accept="image/*" style={{display: 'flex'}} type="file" onChange={e => handleImageFile(e.target.files)} />
                        }                        
                      </div>
                    </div>
                    <div class="mb-3 row">
                      <label class="col-lg-2 col-md-3 col-sm-4 col-form-label">Title</label>
                      <div class="col-sm-8 col-md-9 col-lg-10">
                        <input type="text" class="form-control" onChange={e => setPostTitle(e.target.value)} value={postTitle} />
                      </div>
                    </div>
                    
                    <div class="mb-3 row">
                      <label class="col-lg-2 col-md-3 col-sm-4 col-form-label">Description</label>
                      <div class="col-sm-8 col-md-9 col-lg-10">
                        <textarea value={postContent} onChange={e => setPostContent(e.target.value)} class="form-control" rows="3">Details about video</textarea>
                      </div>
                    </div>

                    <div class="mb-3 row">
                      <label class="col-lg-2 col-md-3 col-sm-4 col-form-label">Schedule</label>
                      <div class="col-sm-8 col-md-9 col-lg-10">
                        <select onChange={e => setStatus(e.target.value)} class="form-control" data-width="100%" id="genderSelect">
                          <option value={1}>{'Publish Now'}</option>
                          <option value={0}>{'Publish Later'}</option>
                        </select>
                      </div>
                    </div>

                    <div style={{display: status == 0? 'flex' : 'none'}} class="mb-3 row">
                      <label class="col-lg-2 col-md-3 col-sm-4 col-form-label">Publish Date</label>
                      <div class="col-sm-8 col-md-9 col-lg-10">
                        <input type="date" class="form-control" onChange={e => setPostDate(e.target.value)} value={postDate} />
                      </div>
                    </div>

                    <div class="mb-3 row mt-5">
                      <div class="col-sm-8 col-md-9 col-lg-10 ms-auto">
                      {isLoading || postVideo == null? <Loading/> : 
                        <button style={{display: postVideo !== null? 'flex' : 'none'}} onClick={sendContent} type="button" class="btn btn-primary">Update</button>
                       }                        
                      </div>
                    </div>

                    <div class="mb-3 row mt-5">
                      <div class="col-sm-8 col-md-9 col-lg-10 ms-auto">
                        <button style={{display: postVideo !== null? 'flex' : 'none'}} onClick={() => deleteBtn(postId)} type="button" class="btn btn-danger">Delete</button>
                      </div>
                    </div>

                  </form>
                </div>
              </div>
        </div>  
    )
}

export default UpdateContent;