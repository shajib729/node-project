import React, { useState } from 'react'
import { NavLink,useHistory } from 'react-router-dom'
import "./Signup.css"

function Signup() {
    const history = useHistory();
    const [user, setUser] = useState({ name: "", email: "", phone: "", work: "", password: "", cpassword: "" })
    
    const handleChange = (e) => {
        let name = e.target.name
        let value =e.target.value
        setUser({...user,[name]:value})
    }

    const postData = async (e) => {
        e.preventDefault();
        const { name, email, phone, work, password, cpassword } = user;
        const res = await fetch('/register', {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name,email,phone,work,password,cpassword
            })
        })
        const data = await res.json();

        if (res.status === 422 || !data) {
            window.alert(data.error);
            console.log("Invalid Resgistraton");
            console.log(res);
            console.log(data);
        }else{
            window.alert(data.message);
            console.log("Invalid Resgistraton");
            console.log(res);
            console.log(data);

            history.push("/login")
        }
    }

    return (
        <section className="signup_section">
            <div className="container">
                <div className="row form_container">
                    <div className="col-md-6">
                        <form method="POST" onSubmit={postData}>
                            <h1>Create Account</h1>
                            
                            <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" autoComplete="off"/>
                            <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" autoComplete="off"/>
                            <input type="text" name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" autoComplete="off"/>
                            <input type="text" name="work" value={user.work} onChange={handleChange} placeholder="work" autoComplete="off"/>
                            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" autoComplete="off"/>
                            <input type="password" name="cpassword" placeholder="Confirm Password" value={user.cpassword} onChange={handleChange} autoComplete="off"/>
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
