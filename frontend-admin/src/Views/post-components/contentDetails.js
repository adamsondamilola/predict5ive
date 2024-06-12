import { useEffect, useMemo, useRef, useState } from "react";
import requestHandler from "../../Utilities/requestHandler";
import Loading from "../../Utilities/Loading";
import { toast } from "react-toastify";
import number_format from "../../Utilities/number_format";
import { DownloadTableExcel } from "react-export-table-to-excel";

const ContentDetails = (props) => {
  const tableRef = useRef(null);
    const [pageTile, setPageTitle] = useState("Content Details")
    const [isLoading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [postTitle, setPostTitle] = useState(null)
    const [constPosts, setConstPosts] = useState(20)

    const checkIfLoggedIn = async () => {
        setLoading(true)
        let x = await requestHandler.get('auth/logged/user', true);
        if(x != null && x.status === 0){
            window.location.href = "/auth/login/redirect"
        }
        setLoading(false)
      }

      const [postDetails, setPostDetails] = useState([])
      const getContentDetails = async () => {
        setLoading(true)
        let x = await requestHandler.get('admin/post/'+props.id+'/details', true);
        if(x != null && x.status === 1){
            //console.log(x.message)
            setPostDetails(x.message)
            setPostTitle(x.message.length > 0? x.message[0].post_title : null)
        }
        else{
            toast.error(x.message)
        }
        setLoading(false)
      }

      const [postExportDetails, setPostExportDetails] = useState([])
      const exportContentDetails = async () => {
        setLoading(true)
        let x = await requestHandler.get('admin/post/'+props.id+'/details', true);
        if(x != null && x.status === 1){
            //console.log(x.message)
            setPostExportDetails(x.message)
        }
        else{
            toast.error(x.message)
        }
        setLoading(false)
      }
    
     
    useEffect(() => {
      exportContentDetails()
        getContentDetails()
        document.title = pageTile
    },[pageTile])


    
    return(
        <div className="col">
           <h2 class="small-title">Video Overview</h2>
           {isLoading? <Loading/> : ''}
            <div class="card h-100-card">
            <DownloadTableExcel
                    filename="Influencers table"
                    sheet="Influencers Clicks and Shares"
                    currentTableRef={tableRef.current}
                >
            <button style={{display: postExportDetails.length > 0? 'flex' : 'none' }} className="btn btn-primary text-center">
        Export to Excel
      </button>
      </DownloadTableExcel>
                        <div style={{display: postExportDetails.length < 1 && !isLoading? 'flex' : 'none' }} class="card-body mb-n2 border-last-none h-100">
                        <h2 className="text-center small-title">
        No Data 
      </h2>
      </div>
      
      <table className="table table-striped" ref={tableRef}>
        <thead>
          <tr> <th colSpan={4}><span className="text-primary">Title:</span> {postTitle}</th> </tr>
          <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Views</th>
          <th>Shares</th>
          </tr>
          </thead>
          <tbody>
      {postExportDetails.map(x =>         
          <tr>
          <td>{x.username}</td>
          <td>{x.email}</td>
          <td>{number_format(x.clicks)}</td>
          <td>{number_format(x.shares)}</td>
          </tr>          
      )}
      </tbody>
</table>
            {/*postExportDetails.map(x => <div class="border-bottom border-separator-light mb-2 pb-2">
              
                            <div class="row g-0 sh-6">
                              <div class="col">
                                <div class="card-body d-flex flex-row pt-0 pb-0 ps-3 pe-0 h-100 align-items-center justify-content-between">
                                  <div class="d-flex flex-column">
                                    <div class="text-normal text-muted">{x.username} | {x.email}</div>
                                    <div class="row g-0">
                                    <div class="col">
                          <i class="fa-regular fa-eye m-1"></i> 
                            <span class="align-middle">{number_format(x.clicks)}</span>
                                    </div>
                                    <div class="col">
                          <i class="fa-regular fa-share-nodes m-1"></i> 
                            <span class="align-middle">{number_format(x.shares)}</span>
                                    </div>
                                    </div>
                                  </div>
                                  
                                  <div class="d-flex">
                                    <Link to={'/admin/user/'+x.user_id+'/'+x.email} class="btn btn-outline-secondary btn-sm ms-1" type="button">User Details</Link>
                                   </div>
                                </div>
                              </div>
                            </div>
                          </div>
      )*/}
                        
                        </div>
                
        </div>

)
}

export default ContentDetails;