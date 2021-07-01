import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Login.css"

function Login() {
    return (
        <section className="login_section">
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
                        <form action="#">
                            <h1>Sign in</h1>
                            
                            <input type="email" name="email" placeholder="Email"  autoComplete="off"/>
                            <input type="password" name="password" placeholder="Password" autoComplete="off"/>
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
