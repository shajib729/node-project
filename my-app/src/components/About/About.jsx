import React,{ useState,useEffect} from 'react'
import './About.css'
import { useHistory } from "react-router-dom"

function About() {

    const [userData,setUserData]=useState([]);
    const history = useHistory();

    const callAboutPage = async () => {
        try {
            const res = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            console.log(res);
            const data = await res.json();
            setUserData(data);
            // console.log(data);
            if (res.status!==200) {
                // const error = new Error(res.error)
                // throw error
                console.log('erroro');
            }
            
        } catch (err) {
            console.log("Error found");
            history.push('/login')
        }
    }

    useEffect(() => {
        callAboutPage()
    }, []);
    return (
        <section className="about_section">
            <div className="container">
                <form >
                    <div className="row m-auto">
                        <div className="col-md-4 profile">
                            <img src="./img/profile.jpg" className="" alt="ProfileImage" />
                        </div>

                        <div className="col-md-6 my-3 my-md-0">
                            <div className="profile-head text-left">
                                <h5>{userData.name}</h5>
                                <h6>{userData.work}</h6>
                                <p>Ranking: <span>1/10</span></p>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <p>Edit Profile</p>
                        </div>

                    </div>

                    <div className="row my-4 about-bottom">
                         {/* left side url */}
                         <div className=" about-url col-md-4 d-flex flex-column m-md-0 my-4">
                            <h5>Work</h5>
                            <a href="facebook" target="_blank">Facebook</a>
                            <a href="instagram" target="_blank">Facebook</a>
                            <a href="facebook" target="_blank">Twitter</a>
                            <a href="facebook" target="_blank">Youtube</a>
                        </div>

                        {/* about title */}
                        <div className="about-info col-md-8">
                            <div className="about-item d-flex">
                                <label >User ID</label>
                                <p>{userData._id}</p>
                            </div>
                            <div className="about-item d-flex">
                                <label >Name</label>
                                <p>{userData.name}</p>
                            </div>
                            <div className="about-item d-flex">
                                <label >Email</label>
                                <p>{userData.email}</p>
                            </div>
                            <div className="about-item d-flex">
                                <label >Profession</label>
                                <p>{userData.work}</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default About
