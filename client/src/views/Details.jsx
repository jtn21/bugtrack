import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

const Details = () => {
    const [issue,setIssue] = useState('')
    const {id} = useParams()


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/issue/${id}`)
        .then(res=>setIssue(res.data))
        .catch(err=>console.log(err))
    },[])

    return (
        <div>
            <div>
                <container>
                    <div>
                        <h6>Assigned: {issue.assigned}</h6>
                        <h6>Resolved: {issue.resolved?"Yes":"No"}</h6>
                        <h6>Priority: {issue.priority} </h6>
                    </div>
                </container>
            </div>
            {
                issue?
                <div>
                    <h1>subject: {issue.subject}</h1>
                </div>:
                <h1>Sike!</h1>
            }
        </div>
    )
}

export default Details