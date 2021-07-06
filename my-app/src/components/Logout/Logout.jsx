import React, { useEffect, useContext } from 'react'
import {useHistory} from 'react-router-dom'
import { toast } from 'react-toastify';

// import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

    import {UserContext} from '../../App'

function Logout() {
    
    const { state, dispatch } = useContext(UserContext);


    const history = useHistory();

    // promise
    useEffect(() => {
        fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            
            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            } else {
                dispatch({type:'USER',payload:false})
                toast.error("Logout Successfully");
                setTimeout(() => {
                history.push('/login')                
                },1000)
            }
        }).catch((err) => {
            console.log("error logout");
        })
    },[]);

    return (
        <div>
            <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
            <h1 className="text-center" style={{color:'var(--text-color)'}}>Logout Success</h1>
        </div>
    )
}

export default Logout
