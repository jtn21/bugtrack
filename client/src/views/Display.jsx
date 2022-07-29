import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'



const Display = () => {

    const [issues, setIssues] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/issues`)
            .then(res=>setIssues(res.data))
            .catch(err=>console.log(err))
    },[])



    return (
    <div>
        <table className='table table-hover table-bordered w-75 mx-auto text-light'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Subject</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Assigned</th>
                    <th>Resolved</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {
            issues.map((eachIssue,i)=>{
                return(
                    <tr key={i} className="text-light">
                        <td>{eachIssue.firstName} {eachIssue.lastName}</td>
                        <td>{eachIssue.subject}</td>
                        <td className='text-wrap col-5'>{eachIssue.description}</td>
                        <td>{eachIssue.priority}</td>
                        <td>{eachIssue.assigned}</td>
                        <td>{eachIssue.resolved?"Yes":"No"}</td>
                        <td><button className='form-control'><Link to={`/issue/${eachIssue._id}`}>View</Link></button></td>
                    </tr>
                )
            })
        }
            </tbody>
        </table>
    </div>
    )
}

export default Display