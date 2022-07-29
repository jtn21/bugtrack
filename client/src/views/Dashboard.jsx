import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import Display from './Display'



const Dashboard = () => {

    const [loggedInUser, setLoggedInUser] = useState({})
    
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/getloggedinuser`, {withCredentials: true})
            .then(res=>{
                console.log("res when getting logged in user:", res)
                if(res.data.results){
                    setLoggedInUser(res.data.results)
                }
            })
            .catch(err=>{
                console.log(err)
                navigate('/')
            })
    },[])

    const handleLogout = ()=>{
        axios.get(`http://localhost:8000/api/user/logout`, {withCredentials:true})
            .then(res=>{
                navigate('/')
            })
            .catch(err=>{
                console.log(err)
            })
    }


    return (
        <div>
            <h1> Hello {loggedInUser.firstName} </h1>

            <Link to="/issues/new">Submit New Ticket</Link>
            <Display></Display>

            <button onClick={handleLogout} className="btn btn-danger">Log Out</button>


        </div>
    )
}

export default Dashboard