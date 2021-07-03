import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const getLocalData = () => {
    let list = localStorage.getItem("theme")
    if (list) {
        return localStorage.getItem("theme")
    } else {
        return 'light'
    }
}

function Navbar() {
    

    const [toggle, setToggle] = useState(false);
    const [dark, setDark] = useState(getLocalData());

    dark==='dark' ? document.body.classList.add("dark") : document.body.classList.remove("dark")
   
    const darkClcik = () => {
        setDark(dark==='light'?"dark":"light")
    }

    useEffect(() => {
        localStorage.setItem("theme", dark)
   },[dark]) 
   
    return (
        <section className="nav_section">
            <nav className="container">
                <h1 className="logo">LOGO</h1>
                <ul className={toggle?"nav_menu active_menu":"nav_menu"}>
                    <li>
                    <NavLink exact to="/" activeClassName="active_link" onClick={()=>setToggle(false)}>
                        Home
                    </NavLink>
                    </li>
                    
                    <li>
                    <NavLink to="/about" activeClassName="active_link" onClick={()=>setToggle(false)}>
                        About
                    </NavLink>
                    </li>

                    <li>
                    <NavLink to="/contact" activeClassName="active_link" onClick={()=>setToggle(false)}>
                        Contact
                    </NavLink>
                    </li>

                    <li>
                    <NavLink to="/signup" activeClassName="active_link" onClick={()=>setToggle(false)}>
                        Sign Up
                    </NavLink>
                    </li>
                    
                    <li>
                    <NavLink to="/login" activeClassName="active_link" onClick={()=>setToggle(false)}>
                        Login
                    </NavLink>
                    </li>
                    
                </ul>

                <div className={toggle?"active toggle cngClr":"toggle"} onClick={()=>setToggle(!toggle)}></div>
            </nav>

            <div className={dark==='dark' ? "theme-change active_theme" : "theme-change"} onClick={darkClcik}>
                <div className="moon">
                    <ion-icon name="moon"></ion-icon>
                </div>
                <div className="sun">
                    <ion-icon name="sunny"></ion-icon>
                </div>
            </div>
        </section>
    )
}

export default Navbar
