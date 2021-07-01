import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Signup.css"

function Signup() {
    return (
        <section className="signup_section">
            <div className="container">
                <div className="row form_container">
                    <div className="col-md-6">
                        <form action="#">
                            <h1>Create Account</h1>
                            
                            <input type="text" name="name" placeholder="Name" autoComplete="off"/>
                            <input type="email" name="email" placeholder="Email" autoComplete="off"/>
                            <input type="text" name="phone" placeholder="Phone" autoComplete="off"/>
                            <input type="text" name="work" placeholder="work" autoComplete="off"/>
                            <input type="password" name="password" placeholder="Password" autoComplete="off"/>
                            <input type="password" name="cpassword" placeholder="Confirm Password" autoComplete="off"/>
                            <button type="submit">Sign Up</button>

                            <div className="for_mobile">
                            <p>Already have account 😍? Let's </p><NavLink to="/login">Sign In</NavLink>
                            </div>
                        </form>

                    </div>

                    <div className="col-md-6 m-0 p-0">
                            <div className="ask-sign-in p-4">
                                    <h1>Welcome Back!</h1>
                                    <p className="text-center">To keep connected with us please login with your personal info</p>
                                    <NavLink to="/login">Sign In</NavLink>
                            </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup
