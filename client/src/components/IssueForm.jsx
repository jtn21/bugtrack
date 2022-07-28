import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'


const IssueForm = () => {

    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [assigned, setAssigned] = useState("");
    const [resolved, setResolved] = useState(false);
    const [loggedinuser, setLoggedInUser] = useState('')

    const [errors, setErrors] = useState([]);
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


    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post(`http://localhost:8000/api/issue`, {subject, description, priority, assigned, resolved, firstName: loggedinuser.firstName, lastName: loggedinuser.lastName, userId: loggedinuser._id})
        .then(res=>{
            console.log('res after submit',res)
            if(res.data.errors){
                setErrors(res.data.errors)
                console.log(setErrors)
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
    <div>
        
        <Link to="/dashboard">Return to Dashboard</Link>

        <div class="w-50 p-3 bg-info bg-gradient text-white d-flex justify-content-center mx-auto mt-5">
            <form onSubmit={handleSubmit}>
            <h1>Issue Form</h1> 
                <div className="col-auto">
                    <label>Subject:</label>
                    <input type="text" className='form-control' name="subject" placeholder='Subject' onChange={(e)=>setSubject(e.target.value)} value={subject}/> 
                    <p className="text-danger">{errors.subject?.message}</p>
                </div>
                <div className="col-auto">
                    <label>Description:</label>
                    <input type="text" className='form-control' name="description" placeholder='Description' onChange={(e)=>setDescription(e.target.value)}  value={description}/> 
                    <p className="text-danger">{errors.description?.message}</p>
                </div>
                <div className="col-auto">
                    <label>Assigned:</label>
                    <input type="text" className='form-control' name="assigned" placeholder="Assigned to" onChange={(e)=>setAssigned(e.target.value)} value={assigned}/> 
                    <p className="text-danger">{errors.assigned?.message}</p>
                </div>
                <div className="col-auto">
                    <label>Priority:</label>
                    <select value={priority} className='form-control' name="priority" onChange={(e)=>setPriority(e.target.value)}>
                        <option value="hidden">Choose Priority Level</option>
                        <option value="Urgent">Urgent</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <p className="text-danger">{errors.priority?.message}</p>
                </div>
                <div className="col-auto">
                    <input type="checkbox" className='form-check-input' name="resolved" checked={resolved} onChange={(e)=>setResolved(e.target.checked)}/> 
                    <label>Resolved</label>
                </div>
                <button type="submit" class="btn btn-primary mt-3" >Submit</button>
            </form>
        </div>
        


    </div>
    
    )
}

export default IssueForm