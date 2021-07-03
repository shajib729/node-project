import React from 'react'
import { NavLink } from 'react-router-dom'
import './Error.css'

function Error() {
    return (
        <section className="error_section">
            <div className="container">
                <span className="404">404</span>
                <h1 className="title">
                    We are sorry, page not found!
                </h1>
                <p>The page you are looking for might doesn't exist</p>
                <NavLink to="/">Back To Home</NavLink>
            </div>
        </section>
    )
}

export default Error
