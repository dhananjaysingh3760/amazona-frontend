import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SigninScreen() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const submitHandler = (e) =>{
        e.preventDefault();
        //TODO sign in action
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                <div>
                    <lable htmlFor="email">Email address</lable>
                    <input type="email" id= "email" placeholder="Enter Email" required onChange={(e)=> {setEmail(e.target.value)}}></input>
                    
                </div>
                <div>
                    <lable htmlFor="password">password</lable>
                    <input type="password" id= "password" placeholder="Enter password" required onChange={(e)=> {setPassword(e.target.value)}}></input>
                    
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div>
                    <lable></lable>
                    <div>
                        Nem customer?  <Link to="/register">Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SigninScreen
