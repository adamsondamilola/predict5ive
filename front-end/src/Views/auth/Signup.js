import React, { useEffect, useState } from "react";
//import BlogTitle from "@/components/layouts/blog-title";
//import AuthLayout from "@/components/layouts/auth-layout";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { Link } from "react-router-dom";
import countryAndDialCodes from "../../components/utilities/countries";
import BlogTitle from "../../components/layouts/blog-title";
import {Helmet} from "react-helmet";

const Signup = () => {

    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [dialCode, setDialCode] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [country, setCountry] = useState('');
    const [countries, setCountries] = useState(countryAndDialCodes);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isLoading, setLoading] = useState(false)

    //    const onClickm = () => toast('Toast is good', { hideProgressBar: true, autoClose: 2000, type: 'success' })


    var options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    const GetUserDetails = () => {

        if (token != null) {
            fetch(endPoint + 'auth/user-profile', options)
                .then((response) => response.json())
                .then((json) => {
                    if (json.status == 1) {
                        window.location.replace("/");
                    } else {
                        //
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false))
        }


    }

    useEffect(() => {
        GetUserDetails()
    }, []);

    const checkInputB4Submit = () => {
        if(country == ''){
            toast.error('Select your country')
        }
        else signupAction()
    }

    const signupAction = () => {
        setLoading(true)
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ 
                first_name: firstName,
                last_name: lastName,
                email: email,
                //phone: dialCode+phone,
                //username: username,
                country: country,
                password: password,
                password_confirmation: password2
         })
        };

        fetch(endPoint + 'auth/register', postOptions)
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 1) {
                    { toast.success(json.message) }
                    setLoading(false)
                    loginAction()
                                }
                else {
                    { toast.error(json.message) }
                    setLoading(false)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }

    const loginAction = () => {
        setLoading(true)
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        };

        fetch(endPoint + 'auth/login', postOptions)
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 1) {
                    { toast.success(json.message) }
                    setLoading(false)

                    setCookie("token", json.message.original.access_token, {
                        path: "/"
                    });
                    setToken(cookies.token)
                    if (json.message.original.user.account_type == "Admin") {
                        window.location.replace("/admin/dashboard");
                    }
                    else {
                        window.history.back()
                        //window.location.replace("/");
                    }

                }
                else {
                    { toast.error(json.message) }
                    setLoading(false)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }

    return (
        <>

<Helmet>
                <meta charSet="utf-8" />
                <title>Sign Up</title>
                <link rel="canonical" href="http://predict5ive.com/signup" />
            </Helmet>

            <section className="w-full flex flex-col items-center px-3">
                <BlogTitle />
            </section>


            <section className="w-full flex flex-col items-center px-3">
                <div className="w-full max-w-xs">
                    <form autoComplete="off" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                First Name
                            </label>
                            <input autoComplete={"off"} value={firstName} onChange={e => setFirstName(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Last Name
                            </label>
                            <input value={lastName} onChange={e => setLastName(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Country
                            </label>
                            <select onChange={e => setCountry(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value={country}>{country == ''? 'Select' : country}</option>
                                {
                                    countries.map( (x) =>
                                    <option key={x.label} value={x.value}>{x.value}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input autoComplete={"off"} value={email} onChange={e => setEmail(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input value={password} onChange={e => setPassword(e.currentTarget.value)} className="shadow appearance-none border border-purple-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                               Confirm Password
                            </label>
                            <input value={password2} onChange={e => setPassword2(e.currentTarget.value)} className="shadow appearance-none border border-purple-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************" />
                        </div>
                        <div className="flex items-center justify-between">
                            <p style={{ display: isLoading ? `block` : `none` }} className="text-purple-500 text-xs italic">Please wait...</p>
                            <button style={{ display: !isLoading ? `block` : `none` }} onClick={checkInputB4Submit} className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Sign Up
                            </button>
                            <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/auth/forgot-password">
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="w-full items-center justify-between flex flex-col mt-3">
                        Have an account? <Link className="font-bold text-sm text-blue-500 hover:text-blue-800" href="/auth/login">
                        &#128073; Log In
                            </Link>
                        </div>
                    </form>
                </div>
            </section>

            <ToastContainer />

        </>
    )
}

export default Signup;