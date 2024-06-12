import { useEffect, useRef, useState } from "react";
import requestHandler from "../../Utilities/requestHandler";
import Loading from "../../Utilities/Loading";
import { toast } from "react-toastify";
import number_format from "../../Utilities/number_format";
import dateTimeToDate from "../../Utilities/dateTimeToString";
import { DownloadTableExcel } from 'react-export-table-to-excel';

const FilterContents = () => {
    const tableRef = useRef(null);
    const [pageTile, setPageTitle] = useState("Contents")
    const [isLoading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [constPosts, setConstPosts] = useState(20)
    const [fromDate, setFromDate] = useState(null)
    const [toDate, setToDate] = useState(null)

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
        let x = await requestHandler.get('content/'+constPosts+'/list', true);
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
        let x = await requestHandler.get('content/'+id+'/delete', true);
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

      const [postExportDetails, setPostExportDetails] = useState([])
      const exportContentDetails = async (fromD, toD) => {
        setLoading(true)
        let x = await requestHandler.get('admin/post/'+fromD+'/'+toD+'/filter', true);
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
        exportContentDetails(null, null)
        //checkIfLoggedIn()
        //getContents()
        document.title = pageTile
    },[pageTile])

    
     

    return(
        <div className="col">
           <h2 class="small-title">Clicks and Shares</h2>
           {isLoading? <Loading/> : ''}
            <div class="row mb-5">
            <div className="row mb-3">
            <DownloadTableExcel
                    filename="Influencers table"
                    sheet="Influencers Clicks and Shares"
                    currentTableRef={tableRef.current}
                >
            <button style={{display: postExportDetails.length > 0? 'flex' : 'none' }} className="btn btn-primary text-center">
        Export to Excel
      </button>
      </DownloadTableExcel>
      </div>

      <div className="row mb-3">
      <div className="row d-flex justify-content-center">
                        <div className="col">
                            <label>From date</label>
                            <input type="date" className="form-control" onChange={e => setFromDate(e.target.value)} />
                        </div>
                        <div className="col">
                            <label>To date</label>
                            <input type="date" className="form-control" onChange={e => setToDate(e.target.value)}/>
                        </div>
                        <div className="col">
                            <button style={{display: isLoading? 'none' : 'flex'}} onClick={() => exportContentDetails(fromDate, toDate)} type="button" className="btn btn-primary mt-3">Filter</button>
                        </div>
                    </div>
                    </div>

            <table className="table table-striped" ref={tableRef}>
              <thead>
                <tr>
                <th>Date Posted</th>
                <th>Video Title</th>
                <th>Username</th>
                {/*<th>Full Name</th>*/}
                <th>Email</th>
                <th>Views</th>
                <th>Shares</th>
                </tr>
                
                </thead>
                <tbody>
            {postExportDetails.map(x =>
                <tr>
                <td>{dateTimeToDate(x.post_date)}</td>
                <td>{x.post_title}</td>
                <td>{x.username}</td>
                {/*<td>{x.first_name} {x.last_name}</td>*/}
                <td>{x.email}</td>
                <td>{number_format(x.clicks)}</td>
                <td>{number_format(x.shares)}</td>
                </tr>
                )}    
                </tbody>    
                </table>            
        </div>
        </div>  
    )
}

export default FilterContents;