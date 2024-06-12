import { useEffect, useState } from "react";
import requestHandler from "../../Utilities/requestHandler";
import { Link } from "react-router-dom";
import number_format from "../../Utilities/number_format";
import Loading from "../../Utilities/Loading";

const ContentsOverview = () => {

    const [pageTile, setPageTitle] = useState("Contents Overview")
    const [isLoading, setLoading] = useState(false)
    const [overviews, setOverViews] = useState({
        posts: 0, 
        pending_posts: 0, 
        approved_posts: 0, 
        shared_posts: 0, 
        not_shared_posts: 0, 
        clicks: "0", 
        shares: 0, 
        approved_comments: 0,
        users: 0,
        blocked: 0,
        active: 0})

    const checkIfLoggedIn = async () => {
      let x = await requestHandler.get('auth/logged/user', true);
      if(x != null && x.status === 0){
          window.location.href = "/auth/login/redirect"
      }
    }

    const userStats = async () => {
      setLoading(true)
        let x = await requestHandler.get('admin/stats', true);
        if(x != null && x.status === 1){
            let y = x.message;
            setOverViews(y)
        }
        setLoading(false)
      }
    
      
    useEffect(() => {
      //checkIfLoggedIn()
        document.title = pageTile
        userStats()
    },[pageTile])

    return(
        <div className="col">
        <h2 class="small-title">Contents Overview</h2>
        {isLoading? <Loading/> : ''}
                <div class="mb-5">
                  <div class="row g-2">

                  <div class="col-12 col-sm-6 col-lg-6">
                        <Link to="/content/all">
                      <div class="card bg-primary hover-border-primary">
                        <div class="card-body">
                          <div class="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                            <span className="text-white">CONTENTS</span>
                            <i className="fa-regular fa-list text-white"></i>
                          </div>
                          <div class="text-small text-white mb-1">Total</div>
                          <div class="cta-1 text-white">{number_format(parseInt(overviews.posts))}</div>
                        </div>
                      </div>
                      </Link>
                    </div>

                    <div class="col-12 col-sm-6 col-lg-6">
                        <Link to="/content/pending">
                      <div class="card bg-warning hover-border-primary">
                        <div class="card-body">
                          <div class="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                            <span className="text-white">PENDING CONTENTS</span>
                            <i className="fa-regular fa-list text-white"></i>
                          </div>
                          <div class="text-small text-white mb-1">Total</div>
                          <div class="cta-1 text-white">{parseInt(overviews.pending_posts)}</div>
                        </div>
                      </div>
                      </Link>
                    </div>

                    
                    <div class="col-12 col-sm-6 col-lg-6">
                    <Link to="/content/shared">
                      <div class="card bg-info hover-border-primary">
                        <div class="card-body">
                          <div class="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                            <span>CONTENTS SHARED</span>
                            <i className="fa-regular fa-share"></i>
                          </div>
                          <div class="text-small mb-1">Total</div>
                          <div class="cta-1">{number_format(overviews.shared_posts)}</div>
                        </div>
                      </div>
                      </Link>
                    </div>

                    <div class="col-12 col-sm-6 col-lg-6">
                    <Link to="/content/not-shared">
                      <div class="card bg-danger hover-border-primary">
                        <div class="card-body">
                          <div class="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                            <span>CONTENTS NOT SHARED</span>
                            <i className="fa-regular fa-share"></i>
                          </div>
                          <div class="text-small mb-1">Total</div>
                          <div class="cta-1">{overviews.not_shared_posts}</div>
                        </div>
                      </div>
                      </Link>
                    </div>
                    
                    <div class="col-12 col-sm-6 col-lg-6">
                        {/*<Link to="/content/filter">*/}
                      <div class="card bg-success hover-border-primary">
                        <div class="card-body">
                          <div class="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                            <span className="text-white">SHARES</span>
                            <i className="fa-regular fa-share-nodes text-white"></i>
                          </div>
                          <div class="text-small text-white mb-1">Total</div>
                          <div class="cta-1 text-white">{parseInt(overviews.shares)}</div>
                        </div>
                      </div>
                      {/*</Link>*/}
                    </div>

                    <div class="col-12 col-sm-6 col-lg-6">
                        {/*<Link to="/content/filter/all">*/}
                      <div class="card hover-border-primary">
                        <div class="card-body">
                          <div class="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                            <span>CLICKS</span>
                            <i className="fa-regular fa-eye text-primary"></i>
                          </div>
                          <div class="text-small text-muted mb-1">Total</div>
                          <div class="cta-1 text-primary">{parseInt(overviews.clicks)}</div>
                        </div>
                      </div>
                      {/*</Link>*/}
                    </div>                   

                  </div>
                </div>

                <h2 class="small-title">Users Overview</h2>
                <div class="mb-5">
                  <div class="row g-2">

                  <div class="col-12 col-sm-6 col-lg-6">
                        <Link to="/admin/users">
                      <div class="card hover-border-primary">
                        <div class="card-body">
                          <div class="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                            <span>USERS</span>
                            <i className="fa-regular fa-users text-primary"></i>
                          </div>
                          <div class="text-small text-muted mb-1">Total</div>
                          <div class="cta-1 text-primary">{parseInt(overviews.users)}</div>
                        </div>
                      </div>
                      </Link>
                    </div>

                    <div class="col-12 col-sm-6 col-lg-6">
                      <div class="card hover-border-primary">
                        <div class="card-body">
                          <div class="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                            <span>USERS ACTIVE</span>
                            <i className="fa-regular fa-users text-success"></i>
                          </div>
                          <div class="text-small text-muted mb-1">Total</div>
                          <div class="cta-1 text-primary">{number_format(parseInt(overviews.users))}</div>
                        </div>
                      </div>
                    </div>

                    <div class="col-12 col-sm-6 col-lg-6">
                      <div class="card hover-border-primary">
                        <div class="card-body">
                          <div class="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                            <span>USERS BLOCKED</span>
                            <i className="fa-regular fa-users text-danger"></i>
                          </div>
                          <div class="text-small text-muted mb-1">Total</div>
                          <div class="cta-1 text-primary">{overviews.blocked}</div>
                        </div>
                      </div>
                    </div>

                    </div>
                    </div>
        </div>  
    )
}

export default ContentsOverview;