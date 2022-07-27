import React,{useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const IssueForm = () => {

    const [subject, setSubject] = useState();
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [assigned, setAssigned] = useState("");
    const [resolved, setResolved] = useState(false);
    const [user, setUser] = useState('')

    
    const [errors, setErrors] = useState('')
    const navigate = useNavigate()


    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post(`http://localhost:8000/api/issue/addIssue`, {subject, description, priority, assigned, resolved})
        .then(res=>{
            console.log('res after registering',res)
            if(res.data.errors){
                setErrors(res.data.errors)
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
    <div>IssueForm
        <Link to="/dashboard">Nvm</Link>

        <form onSubmit={handleSubmit}>
        <h1>Issue Form</h1> 
            <div className='form-group'>
                <label>Subject:</label>
                <input type="text" className='form-control' name="subject" placeholder='Subject' onChange={(e)=>setSubject(e.target.value)} value={subject}/> 
                <p className="text-danger">{errors.subject?.message}</p>
            </div>
            <div className='form-group'>
                <label>Description:</label>
                <input type="text" className='form-control' name="description" placeholder='Description' onChange={(e)=>setDescription(e.target.value)} value={description}/> 
                <p className="text-danger">{errors.description?.message}</p>
            </div>
            <div className='form-group'>
                <label>Priority:</label>
                <input type="text" className='form-control' name="priority" placeholder="Priority" onChange={(e)=>setPriority(e.target.value)} value={priority}/> 
                <p className="text-danger">{errors.priority?.message}</p>
            </div>
            <div className='form-group'>
                <label>assigned:</label>
                <input type="text" className='form-control' name="assigned" placeholder="Assigned to" onChange={(e)=>setAssigned(e.target.value)} value={assigned}/> 
                <p className="text-danger">{errors.assigned?.message}</p>
            </div>
            <div className='form-group'>
                <label>Resolved:</label>
                <input type="checkbox" className='form-control' name="resolved" checked={resolved} onChange={(e)=>setResolved(e.target.checked)}/> 
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>


    </div>
    
    )
}

export default IssueForm