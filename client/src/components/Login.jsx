import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post(`http://localhost:8000/api/user/login`,{email,password}, {withCredentials:true})
            .then(res=>{
                console.log("response when logging in", res)
                if(res.data.error){
                    setError(res.data.error)
                }else{
                    navigate('/dashboard')
                }
            })
            .catch(err=>console.log('err when logging in:', err))
    }


    return (
    <div class="container mt-5">
        <form onSubmit={handleSubmit}>
        <h1>Login Form</h1> 
            <div className='form-group'>
                <label>Email:</label>
                <input type="text" className='form-control' name="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email}/> 

            </div>
            <div className='form-group'>
                <label>Password:</label>
                <input type="password" className='form-control' name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/> 
            </div>
            <p className="text-danger">{error}</p>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>

    </div>
    )
}

export default Login