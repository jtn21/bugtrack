import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Details = () => {
    const [issue,setIssue] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

//for getting individual ticket
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/issue/${id}`)
        .then(res=>setIssue(res.data))
        .catch(err=>console.log(err))
    },[])


    const handleDelete = ()=>{
        axios.delete(`http://localhost:8000/api/issue/${id}`)
            .then(res=>navigate('/dashboard'))
            .catch(err=>console.log(err))
    }


    return (
        <div >
            {
                issue?
                    <div className ="w-50 card text-white bg-secondary mx-auto">
                        <container >
                            <div className='card-header bg-dark '>
                                <h4>Subject: {issue.subject} </h4>
                            </div>
                            <div className='card-body '>
                                <h5 className='card-title d-flex align-items-start '>Assigned to: {issue.assigned}</h5>
                                <h5 className='card-title d-flex align-items-start'>Priority: {issue.priority} </h5>
                                <h5 className='card-title d-flex align-items-start'>Resolved: {issue.resolved?"Yes":"No"}</h5>
                                <h5 className='card-title d-flex align-items-start'>Description: </h5>
                                <p className='card-text d-flex'>{issue.description}</p>


                                <a href='/dashboard' class='btn btn-warning'>Current Issues</a>
                                <button type="button" class='btn btn-danger' onClick={e=>handleDelete(issue._id)}>Delete Issue</button>
                            </div>
                            <div class="card-footer text-white">
                                Submitted by: {issue.firstName} {issue.lastName} 
                            </div>

                        </container>
                    </div>:
                    <h1>Sike!</h1>
            }
            
        </div>
    )
}

export default Details