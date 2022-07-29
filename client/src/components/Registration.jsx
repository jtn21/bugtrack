import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Registration = () => {
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpw,setConfirmpw] = useState("");

    const [errors,setErrors] = useState([]);
    const navigate = useNavigate();


// have the error in .then because that is still going through. We are not getting the .catch/404 error
// cannot .then('navigate) because it will not log data into db

    const handleSubmit = (e)=> {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/user/register`, {firstName,lastName,email,password,confirmpw}, {withCredentials:true})
        .then(res=>{
            console.log('res after registering',res)
            if(res.data.errors){
                setErrors(res.data.errors)
                console.log(res.data.errors)
            }
            else{
                navigate('/dashboard')
            }
        })

        .catch(err=>{ 
            console.log('err:', err)
        })
    }

    return (
        <div class="container mt-5">
        <form onSubmit={handleSubmit}>
        <h1>Registration Form</h1> 
            <div className='form-group'>
                <label>First Name:</label>
                <input type="text" className='form-control' name="firstname" placeholder='First Name' onChange={(e)=>setFirstname(e.target.value)} value={firstName}/> 
                <p className="text-danger">{errors.firstName?.message}</p>
            </div>
            <div className='form-group'>
                <label>Last Name:</label>
                <input type="text" className='form-control' name="lastname" placeholder='Last Name' onChange={(e)=>setLastname(e.target.value)} value={lastName}/> 
                <p className="text-danger">{errors.lastName?.message}</p>
            </div>
            <div className='form-group'>
                <label>Email:</label>
                <input type="text" className='form-control' name="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email}/> 
                <p className="text-danger">{errors.email?.message}</p>
            </div>
            <div className='form-group'>
                <label>Password:</label>
                <input type="password" className='form-control' name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/> 
                <p className="text-danger">{errors.password?.message}</p>
            </div>
            <div className='form-group'>
                <label>Confirm Password:</label>
                <input type="password" className='form-control' name="confirmpw" placeholder="Confirm Password" onChange={(e)=>setConfirmpw(e.target.value)} value={confirmpw}/> 
                <p className="text-danger">{errors.confirmpw?.message}</p>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
    
    )
}

export default Registration

