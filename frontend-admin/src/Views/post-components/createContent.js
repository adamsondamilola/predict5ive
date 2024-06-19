import { useEffect, useState } from "react";
import Loading from "../../Utilities/Loading";
import requestHandler from "../../Utilities/requestHandler";
import { toast } from "react-toastify";

const CreateContent = () => {
    const [pageTile, setPageTitle] = useState("Create new content")
    let token = localStorage.getItem('access_token')
    let date = new Date()
    const [postTitle, setPostTitle] = useState('');
    const [postImage, setPostImage] = useState(null);
    const [postVideo, setPostVideo] = useState(null);
    const [postVideo2, setPostVideo2] = useState(null);
    const [postContent, setPostContent] = useState('');
    const [postDate, setPostDate] = useState(date.toLocaleDateString('en-CA'));
    const [status, setStatus] = useState(1);
    const [duration, setDuration] = useState(null);
    const [size, setSize] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [previewVideo, setPreviewVideo] = useState(null);
    const [previewVideo2, setPreviewVideo2] = useState(null);
    const [isLoading, setLoading] = useState(false)
    const [isVideoLoading, setIsVideoLoading] = useState(false)
    const [isVideoLoading2, setIsVideoLoading2] = useState(false)
    
    const checkIfLoggedIn = async () => {
      //await requestHandler.post('admin/notification/push', {sound: "default", title: "New Content Alert", body: "This is a test", notification_type: "Content"}, false, true)
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
 
        fetch(process.env.REACT_APP_MAIN_API + 'post/upload_image', postOptions)
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
                    setIsVideoLoading(false)
                    //window.location.href = '/user/profile/update'
                }
                else {
                    toast.error(json.message)
                    setLoading(false)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => {setLoading(false); setIsVideoLoading(false);})
            
    }

    const uploadVideo2 = (vd) => {
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
          //setDuration(duration)
          //setSize(vd?.size)            
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
                  setPostVideo2(json.message)
                  setIsVideoLoading2(false)
                  //window.location.href = '/user/profile/update'
              }
              else {
                  toast.error(json.message)
                  setLoading(false)
              }
          })
          .catch((error) => console.error(error))
          .finally(() => {setLoading(false); setIsVideoLoading2(false);})
          
  }

      const handleVideoFile = (e) => {
        setLoading(true)
        setIsVideoLoading(true)
        if(e) {
        setPreviewVideo(URL.createObjectURL(e[0]));
        //handle file upload
        uploadVideo(e[0]);
        console.log('files: ', e);
        //setIsVideoLoading(false)
        }
        setLoading(false)        
      }

      const handleVideoFile2 = (e) => {
        setLoading(true)
        setIsVideoLoading2(true)
        if(e) {
        setPreviewVideo2(URL.createObjectURL(e[0]));
        //handle file upload
        uploadVideo2(e[0]);
        console.log('files: ', e);
        //setIsVideoLoading(false)
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
        let url = 'post/new_post';
        setLoading(true)
        //let x = await requestHandler.post(url, {post_title:postTitle, post_image: postImage, post_video: postVideo, post_short_video: postVideo2, post_content: postContent, size: size?.toString(), duration: duration, status: status, post_date: postDate}, false, true)
        let x = await requestHandler.post(url, {post_title:postTitle, post_image: postImage, post_content: postContent, status: status, post_date: postDate}, false, true)
            if(x != null && x.status === 1)
            {

              //send push notification if post is published
              //if(status == 1) await requestHandler.post('admin/notification/push', {sound: "default", title: postTitle, body: postContent, notification_type: "Content"}, false, true)


                //uploadImage(previewImage[0])
                toast.success(x.message)
                window.location.href="/content/all"
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
        <h2 class="small-title">Create Content</h2>
              <div class="card mb-5">
                <div class="card-body">
                  <form encType="multipart/form-data">
                  {/*<div style={{display: previewVideo !== null? 'flex' : 'none'}} class="mb-3 row">
                  <div className="d-flex justify-content-center">
                    <div class="position-relative mb-3">
                        <div className="embed-responsive embed-responsive-16by9">
                        <video width={320} height={320} src={previewVideo} className="embed-responsive-item" alt="video" controls>
                            </video>
                        </div>
                        </div>
                      </div>                      
                    </div>
                    <div class="mb-3 row">
                      <label class="col-lg-2 col-md-3 col-sm-4 col-form-label">Upload Video</label>
                      <div class="col-sm-8 col-md-9 col-lg-10">
                        {isVideoLoading? <p className="text-primary">Please wait. Video is uploading...</p> : 
                        <input className="form-control" accept="video/*" style={{display: 'flex'}} type="file" onChange={x => handleVideoFile(x.target.files)} />
                        }                        
                      </div>
                    </div>                    
                    <div style={{display: previewVideo2 !== null? 'flex' : 'none'}} class="mb-3 row">
                  <div className="d-flex justify-content-center">
                    <div class="position-relative mb-3">
                        <div className="embed-responsive embed-responsive-16by9">
                        <video width={320} height={320} src={previewVideo2} className="embed-responsive-item" alt="video" controls>
                            </video>
                        </div>
                        </div>
                      </div>                      
                    </div>
                    <div class="mb-3 row">
                      <label class="col-lg-2 col-md-3 col-sm-4 col-form-label">Upload Video Preview</label>
                      <div class="col-sm-8 col-md-9 col-lg-10">
                        {isVideoLoading2? <p className="text-primary">Please wait. Video preview is uploading...</p> : 
                        <input className="form-control" accept="video/*" style={{display: 'flex'}} type="file" onChange={x => handleVideoFile2(x.target.files)} />
                        }                        
                      </div>
                    </div>*/}

                  <div style={{display: previewImage !== null ? 'flex' : 'none'}} class="mb-3 row">
                  <div className="d-flex justify-content-center">
                    <div class="sw-13 position-relative mb-3">
                        <img src={previewImage} width={320} height={450} class="img-fluid" alt="thumb" />
                        </div>
                      </div>                      
                    </div>
                    <div class="mb-3 row">
                      <label class="col-lg-2 col-md-3 col-sm-4 col-form-label">Image/Thumbnail</label>
                      <div class="col-sm-8 col-md-9 col-lg-10">
                        {isLoading && postImage !== null? <p className="text-primary">Please wait. Image is uploading...</p> : 
                        <input className="form-control" accept="image/*" style={{display: 'flex'}} type="file" onChange={e => handleImageFile(e.target.files)} />
                        }                        
                      </div>
                    </div>
                    <div class="mb-3 row">
                      Or
                    </div>
                    <div class="mb-3 row">
                      <label class="col-lg-2 col-md-3 col-sm-4 col-form-label">Post Image URL</label>
                      <div class="col-sm-8 col-md-9 col-lg-10">
                        <input type="text" placeholder="https://" class="form-control" onChange={e => setPostImage(e.target.value)} value={postImage} />
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
                        <textarea value={postContent} onChange={e => setPostContent(e.target.value)} class="form-control" rows="3"> </textarea>
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
                        <input type="datetime-local" class="form-control" onChange={e => setPostDate(e.target.value)} value={postDate} />
                      </div>
                    </div>

                    <div class="mb-3 row mt-5">
                      <div class="col-sm-8 col-md-9 col-lg-10 ms-auto">
                      {isVideoLoading? <p className="text-primary">Please wait. Video is uploading...</p> : ''}
                      {isVideoLoading2? <p className="text-primary">Please wait. Video preview is uploading...</p> : ''}
                      {isLoading && postImage !== null? <p className="text-primary">Please wait. Image is uploading...</p> : ''}
                        
                      {isLoading? <Loading/> : 
                        <button onClick={sendContent} type="button" class="btn btn-primary">Post</button>
                       }                        
                      </div>
                    </div>
                  </form>
                </div>
              </div>
        </div>  
    )
}

export default CreateContent;