import React from 'react';
import Registration from './Registration';
import Login from './Login';


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