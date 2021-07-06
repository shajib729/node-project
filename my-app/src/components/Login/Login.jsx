import React, { useState,useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import "./Login.css"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {UserContext} from '../../App'

function Login() {

    const { state, dispatch } = useContext(UserContext);
    
    const history = useHistory();
    const [userMatch, setUserMatch] = useState({ email: "", password: "" })
    
    const handleChange = (e) => {

        let name= e.target.name;
        let value = e.target.value;
        setUserMatch({...userMatch,[name]:value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = userMatch;
        
        const res = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email,password
            })
        })
        const data = await res.json();
        // console.log(res);
        // console.log(data);
        if (res.status===422 || !data) {
            // alert()
            toast.error(data.error)
        } else {
            dispatch({type:'USER',payload:true})
            toast.success("Login successful")
            console.log(data.message)

            setTimeout(() =>{
                history.push("/")
            },3000);
        }
    }

    return (
        <section className="login_section">
            <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
            <div className="container">
                <div className="row form_container">
                    
                    <div className="col-md-6 m-0 p-0 d-none d-md-block">
                            <div className="ask-sign-in p-4">
                                    <h1>Hello, Friend!</h1>
                                    <p className="text-center">Enter your personal details and start journey with us</p>
                                    <NavLink to="/signup">Sign Up</NavLink>
                            </div>
                    </div>

                    <div className="col-md-6 m-0 p-0">
                        <form method="POST" onSubmit={onSubmit}>
                            <h1>Sign in</h1>
                            
                            <input type="email" value={setUserMatch.email} onChange={handleChange} name="email" placeholder="Email"  autoComplete="off"/>
                            <input type="password" value={setUserMatch.password} onChange={handleChange} name="password" placeholder="Password" autoComplete="off"/>
                            <button type="submit">Sign In</button>

                            <div className="for_mobile">
                            <p>Don't have account 🤕? Let's </p><NavLink to="/signup">Create</NavLink>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </section>
    )
}

export default Login
