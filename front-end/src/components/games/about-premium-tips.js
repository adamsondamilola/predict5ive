import React, { ChangeEvent, useEffect, useState } from "react";
import BlogTitle from "../layouts/blog-title";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';
import Images from "../../Utilities/Images";
import { Link } from "react-router-dom";
import { FaHandPointRight } from "react-icons/fa";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

const AboutPremiumTips = () => {
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [isLoading, setLoading] = useState(false)
    
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pck, setPck] = useState("");
  const [phone, setPhone] = useState("2348123456789");

    const bettingTips = [
        {id: 1, tip: "No ads"},
        {id: 2, tip: "1 Value bet daily"},
        {id: 3, tip: "Get the best picks of the day"},
        {id: 4, tip: "Get more value for your money"},
        {id: 5, tip: "See predictions from the future."}
    ]

    const premiumPlans = [
        {package: "1", package_name: "1 Week", amount: "3000"},
        {package: "2", package_name: "2 Weeks", amount: "5000"},
        {package: "3", package_name: "1 Month", amount: "8000"},
        {package: "4", package_name: "6 Months", amount: "40000"},
        {package: "5", package_name: "1 Year", amount: "70000"},
    ]

    var options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    const GetUserDetails = () => {
        
        // if (token != null) {
             fetch(endPoint + 'auth/user-profile', options)
                 .then((response) => response.json())
                 .then((json) => {
                     if (json.status === 1) {
                        setName(json.message.first_name+" "+json.message.last_name)
                        setEmail(json.message.email)
                     } else {
                         
                     }
                 })
                 .catch((error) => console.error(error))
                 .finally(() => setLoading(false))
        // }
     }

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

      useEffect(() => {
        GetUserDetails()
    }, []);

    const config = {
        //public_key: "FLWPUBK_TEST-3818e669a7a3d251be14366da90c7855-X",
        public_key: "FLWPUBK-5175450463b1fd24708ec551dd052ab7-X",
        tx_ref: Date.now(),
        amount: amount+".00",
        currency: "NGN",
        payment_options: "card,mobilemoney,ussd",
        customer: {
          email: email,
          phone_number: phone,
          name: name,
        },
        customizations: {
          title: "Predict 5ive",
          description: "Predict 5ive Subscription",
          logo: "https://play-lh.googleusercontent.com/M-3SNcYitOiujSJo0WjGLt95jI8oZbvqPfSMn4n-NUTD1ElYCc1I68wq75Eh5qCRC7Q=w480-h960-rw",
        },
      };
    
      const handleFlutterPayment = useFlutterwave(config);

      const subsctibeToPackage = () => {
        setLoading(true)
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                package_status: pck,
                amount: amount,
            })
        };

        fetch(endPoint + 'user/activate-subscription', postOptions)
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 1) {
                    toast.success(json.message) 
                    setLoading(false)
                     window.location.replace("/premium");
                }
                else {
                    toast.error(json.message)
                    setLoading(false)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }
    

    return (
        <>                
            <div className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="bg-white dark:bg-gray-800 dark:text-white">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="username">
                                Premium Tips
                            </label>
                            <img src={Images.betting} />
                        </div>
                        <div className="mb-4">
                        For the best and safe odds and ads free experience, try Predict 5ive premium subscription.
                        </div>
                        <div className="mb-4">
                        With premium subscription, you get more value.
                        </div>
                        <div className="mb-4">
                        Benefits of Premium Subscription
                        </div>
                        
                        <div className="mb-4">
                        {bettingTips.map((x) => 
                        <div className="mb-5" key={x.id}>
                            <b>{x.id}</b>. {x.tip}
                        </div>
                        )}
                        </div> 

                        <div className="mb-4">
                        You need to subscribe to see games. Below are the available subscription plans on Predict 5ive. For more information, kindly write to us info@predict5ive.com
                        </div>

                        <div className="mb-4">
                        {premiumPlans.map((x) => 
                        <div className="mb-5" key={x.package}>
                           <div class="flex flex-col justify-center items-center h-20 gap-4">
<div class="flex flex-wrap justify-center items-center gap-4 w-full">
<div class="w-1/4 items-center text-center leading-loose text-sm">
    {x.package_name}
    </div>
    <div class="w-1/4 items-center text-center leading-loose text-sm">
    <FaHandPointRight/>
  </div>
  <div class="w-1/4 items-center text-center  leading-loose text-sm">
  <button
          onClick={() =>
            {
                setPck(x.package)
                setAmount(x.amount);
                if(parseInt(amount) > 0 && parseInt(pck) > 0){
                    handleFlutterPayment({
                        callback: (response) => {
                          console.log(response);
                          //alert(response.status)
                          if(response.status === "successful"){
                            subsctibeToPackage()
                          }
                          closePaymentModal();
                        },
                        onClose: () => {},
                      });
                }
            }
          }
        >
  ₦{x.amount}
  </button>
</div>
</div>
</div>
                        </div>
                        )}
                        </div> 
                        
                        <div className="mb-4">
                        <Link className="flex mr-2" to={"/betting-tips"}><FaHandPointRight/>  Check out our 23 betting tips</Link>
                        </div>
                        <div className="mb-4">
                        <Link className="flex mr-2" to={"/risks-of-betting"}><FaHandPointRight/> If you are an addicted gambler, you need to see this</Link>
                        </div>

                    </div>
                </div>

            <ToastContainer />

        </>
    )
}
export default AboutPremiumTips