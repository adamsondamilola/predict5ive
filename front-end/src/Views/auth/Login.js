"use client";
import React, { useEffect, useState } from "react";
import BlogTitle from "../../components/layouts/blog-title";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet";

const Login = () => {

    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [token, setToken] = useState(cookies.token);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false)

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
                    window.history.back()
                    /*if (json.message.original.user.account_type == "Admin") {
                        window.location.replace("/admin/dashboard");
                    }
                    else {
                        window.history.back()
                        //window.location.replace("/");
                    }*/


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
                <title>Log In</title>
                <link rel="canonical" href="http://predict5ive.com/auth/login" />
            </Helmet>
            <section className="w-full flex flex-col items-center px-3">
                <BlogTitle />
            </section>


            <section className="w-full flex flex-col items-center px-3">
                <div className="w-full max-w-xs">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                                Email
                            </label>
                            <input value={email} onChange={e => setEmail(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="Email" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input value={password} onChange={e => setPassword(e.currentTarget.value)} className="shadow appearance-none border border-purple-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************" />
                            {/*<p className="text-purple-500 text-xs italic">Please choose a password.</p>*/}
                        </div>
                        <div className="flex items-center justify-between">
                            <p style={{ display: isLoading ? `block` : `none` }} className="text-purple-500 text-xs italic">Please wait...</p>
                            <button style={{ display: !isLoading ? `block` : `none` }} onClick={loginAction} className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Log In
                            </button>
                            <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/auth/forgot-password">
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="w-full items-center justify-between flex flex-col mt-3">
                        <Link className="font-bold text-sm text-blue-500 hover:text-blue-800" to="/auth/signup">
                        &#128073; Create New Account
                            </Link>
                        </div>
                    </form>
                </div>
            </section>

            <ToastContainer />

        </>
    )
}

export default Login;