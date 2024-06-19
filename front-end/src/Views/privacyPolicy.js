import React, { ChangeEvent, useEffect, useState } from "react";
//import BlogTitle from "../layouts/blog-title";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';
import {Helmet} from "react-helmet";
import { useParams } from "react-router";
const PrivacyPolicy = () => {
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [isLoading, setLoading] = useState(false)
    const {id} = useParams()
    const {slug} = useParams()
    const [pageTile, setPageTitle] = useState("Privacy Policy")
    const [newslug, setNewslug] = useState(null)
    const [post, setPost] = useState([])
    const [postViewed, setPostViewed] = useState(false)
    const [editPost, setEditPost] = useState(false)
    const account_type = localStorage.getItem("account_type")
    const [userData, setUserData] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const [sessionId, setSessionId] = useState(null)
    const [thumbNail, setThumbNail] = useState(null)

    const options = {  
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
  
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])


    return (
        <React.Fragment>

<Helmet>
                <meta charSet="utf-8" />
                <title>{pageTile}</title>
                <meta name="description" content={pageTile} />
            </Helmet>

            <section className="mb-10 w-full flex flex-col items-center px-3">
                Privacy Policy
            </section>
                
            <section className="w-full md:w-2/3 flex flex-col items-center px-3">
            <div className="bg-white dark:bg-gray-800 dark:text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {isLoading? <div className="text-purple-500 m-5">Please wait...</div> : '' }
            
                    <div style={{display: isLoading? 'none' : 'block'}} className="bg-white dark:bg-gray-800">
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-white text-xl font-bold mb-2">
                            {pageTile}
                            </label>
                        </div>
                        <div className="mb-4">
                        <div style={{whiteSpace: "pre-wrap"}}>
                        Predict5ive.com Privacy Policy <br/>
Effective Date:  May 16, 2024<br/><br/>

Predict5ive.com ("Predict5ive", "we", "us", or "our") respects the privacy of our users ("you", "your"). This Privacy Policy describes the types of information we collect from and about you when you visit our website (<a href="/">https://www.predict5ive.com/</a>), and how we use that information.
<br/><br/>
<b>Information We Collect</b><br/><br/>

<b>We collect the following types of information:</b>
<br/>
Personal Information: You may provide us with personal information, such as your name, email address, and IP address, when you subscribe to our newsletter, create an account, or leave a comment.
Non-Personal Information: We also collect non-personal information, such as browsing history, device information, and usage data, when you visit our website. This information is collected through cookies and other tracking technologies.
Use of Information
<br/><br/>
<b>We use the information we collect to:</b>
<br/>
Provide and improve our website and services<br/>
Send you newsletters and promotional emails (with your consent)<br/>
Personalize your experience on our website<br/>
Analyze how users interact with our website<br/>
Respond to your inquiries and requests<br/>
Sharing of Information
<br/><br/>
We may share your information with third-party service providers who help us operate our website and business. These service providers are contractually obligated to keep your information confidential and to use it only for the purposes for which it was disclosed.
<br/><br/>
We will not share your personal information with any third-party advertisers or marketing companies without your consent.
<br/><br/>
<b>Cookies and Tracking Technologies</b>
<br/>
We use cookies and other tracking technologies to collect non-personal information about your use of our website. Cookies are small data files that are stored on your device. You can control your cookie settings in your web browser.
<br/><br/>
<b>Data Security</b>
<br/>
We take reasonable steps to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no website or internet transmission is completely secure.
<br/><br/>
<b>Children's Privacy</b>
<br/>
Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13.
<br/><br/>
<b>Changes to this Privacy Policy</b>
<br/>
We may update this Privacy Policy from time to time. We will post any changes on our website.
<br/><br/>
<b>Contact Us</b>
<br/>
If you have any questions about this Privacy Policy, please contact us by email at info@predict5ive.com.
                        </div>
                        </div>
                        
                        

                    </div>
                </div>
</section>
            <ToastContainer />

        </React.Fragment>
    )
}
export default PrivacyPolicy