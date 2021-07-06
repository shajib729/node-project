import React, {useState,useEffect} from 'react'
import './Contact.css'
import { useHistory } from "react-router-dom"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
    const [userData,setUserData]=useState([]);
    const [contactData, setContactData] = useState({ name:'', email:'', message: "" });
    const history = useHistory();

    const userContact = async () => {
        try {
            const res = await fetch("/getData", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // console.log(res);
            const data = await res.json();
            setUserData(data);
            setContactData({ name: data.name, email: data.email });
            if (res.status!==200) {
                // const error = new Error(res.error)
                // throw error
                console.log('erroro');
            }
            
        } catch (err) {
            toast.error("You need to login first");
            setTimeout(() => {
            history.push('/login')                
            },3000)
        }
    }

    useEffect(() => {
        userContact()
    }, []);

                
    const handleChange =(e) => {
        let name = e.target.name
        let value = e.target.value
        setContactData({...contactData,[name]:value})
    }

    const handleSubmit = async (e) => {
        if (userContact===[]) {
            history.push('/login')
        }
        e.preventDefault();
        const { name, email, message } = contactData;

        const res = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, message
            })
        });

        const data = await res.json();
        console.log(res);
        console.log(data);
        if (res.status===422) {
            toast.error(data.error)
        }else {
            toast.success("Message has been sent successfully...");
            console.log("Successfully sent");
            
            setContactData({ ...contactData, message: "" })
        }

        

    }


    return (
        <section className="contact_section">
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
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="contact-info mx-3">
                            <div className="icon">
                                <ion-icon name="phone-portrait"></ion-icon>
                            </div>
                            <div>
                                <h5>Phone</h5>
                                <p>+8801813423</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="contact-info mx-3">
                            <div className="icon">
                                <ion-icon name="mail"></ion-icon>
                            </div>
                            <div>
                                <h5>Email</h5>
                                <p>example@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="contact-info mx-3">
                            <div className="icon">
                                <ion-icon name="navigate"></ion-icon>
                            </div>
                            <div>
                                <h5>Address</h5>
                                <p>Ad,Dhaka,Bangladesh</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row contact-form">
                    <h1 className="form-title">
                        Get In Touch
                    </h1>
                    <form method="POST" onSubmit={handleSubmit}>
                        <input type="text" className="form-control" name="name" value={contactData.name} onChange={handleChange}  placeholder="Enter Your Name"/>
                        <input type="email" className="form-control" name="email" value={contactData.email} onChange={handleChange}  placeholder="Enter Your Email"/>
                        <textarea name="message" className="form-control" name="message" value={contactData.message} onChange={handleChange} placeholder="Meassage"></textarea>
                        <button className="btn btn-primary" type="submit" value="Submit">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact
