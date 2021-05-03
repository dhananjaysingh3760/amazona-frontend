import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux';
import { register } from '../actions/registerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function RegisterScreen(props) {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const userRegister = useSelector(state => state.userRegister);
    const {userInfo , loading,error} = userRegister;
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Password and Confirm Password does not match');
        }else{
            dispatch(register(name,email,password));
        }
    }
    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    },[props.history,redirect,userInfo])
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Create your account</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <lable htmlFor="name">Name</lable>
                    <input type="text" id= "name" placeholder="Enter your name" required onChange={(e)=> {setName(e.target.value)}}></input>
                    
                </div>
                <div>
                    <lable htmlFor="email">Email address</lable>
                    <input type="email" id= "email" placeholder="Enter Email" required onChange={(e)=> {setEmail(e.target.value)}}></input>
                    
                </div>
                <div>
                    <lable htmlFor="password">Password</lable>
                    <input type="password" id= "password" placeholder="Enter password" required onChange={(e)=> {setPassword(e.target.value)}}></input>
                </div>
                <div>
                    <lable htmlFor="confirmPassword">Confirm Password</lable>
                    <input type="password" id= "confirmPassword" placeholder="Confirm password" required onChange={(e)=> {setConfirmPassword(e.target.value)}}></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Register</button>
                </div>
                <div>
                    <lable></lable>
                    <div>
                        Already have an account<Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterScreen
