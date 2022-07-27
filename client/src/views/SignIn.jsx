import React from 'react';
import Registration from '../components/Registration';
import Login from '../components/Login';


const SignIn = () => {
    return (
    <div>
        <div class="row">
            <div class="col">
                <Registration></Registration>
            </div>
            <div class="col">
                <Login></Login>
            </div>
        </div>
    </div>
    )
}

export default SignIn