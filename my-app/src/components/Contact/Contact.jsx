import React from 'react'
import './Contact.css'

function Contact() {
    return (
        <section className="contact_section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="contact-phone">
                            <div className="icon">
                                <ion-icon name="phone-portrait"></ion-icon>
                            </div>
                            <div>
                                <h5>Phone</h5>
                                <p>+8801813423</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
