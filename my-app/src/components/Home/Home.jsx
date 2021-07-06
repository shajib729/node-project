import React,{ useEffect,useState} from 'react'
import './Home.css'
import { useHistory } from "react-router-dom"

function Home() {

    const [userName,setUserName]=useState();
    const history = useHistory();

    const homeData = async () => {
        try {
            const res = await fetch("/getData", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            console.log(data);
           if (res.status!==200) {
                console.log('erroro');
           } else {
               console.log("USer logged in");
               setUserName(data.name)
               console.log(userName);
            }
            
        } catch (err) {
            console.log("User is not logged in");
        }
    }


    useEffect(() => {
        homeData()
    },[])

    return (
        <section className="home_section">
            <div className="home">
                <h1 className="text-center">{userName?`Hello ${userName}` : "Hello"}</h1>
                <h2 className="text-center">Welcome To MERN Project</h2>
            </div>
        </section>
    )
}

export default Home
