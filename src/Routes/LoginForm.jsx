import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { axios } from '../Axios';
import './LoginForm.scss';

const LoginForm = ({setLoggedIn, setUser}) => {

    const validationMessages = ['', 'Please fill in all the required fields', 'Invalid Username/Password'];

    let history = useHistory();

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })
    const [validationMessage, setValidationMessage] = useState(validationMessages[0]);
    // const [loggedUser, setLoggedUser] = useState({});

    const handleChange = (e) => {
        e.preventDefault();
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const validateAndLogIn = () => {
        if(credentials.username === '' || credentials.password === '') {
            setValidationMessage(validationMessages[1]);
        }
        else {
            axios.get('/api/users')
                .then((response) => {
                    let user = response.data.find(u => u.username === credentials.username)
                    if(user && user.password === credentials.password){
                        setUser(user);
                        setLoggedIn(true);
                        setValidationMessage(validationMessages[0])
                    } else {
                        setValidationMessage(validationMessages[2])
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            
        }
        
    }

    return(
        <div className='login-page-wrapper'>
            <div className='login-form-wrapper'>
                <h2>Event Management</h2>
                <div className='validation-message'>{validationMessage}</div>
                <div className='login-inputs-wrapper'>
                    <div className='login-inputs-row'>
                        <label className='login-inputs-label'>Username</label>
                        <input type='text' name='username' value={credentials.username} className='login-inputs-input' onChange={handleChange}></input>
                    </div>
                    <div className='login-inputs-row'>
                        <label className='login-inputs-label'>Password</label>
                        <input type='password' name='password' value={credentials.password} className='login-inputs-input' onChange={handleChange}></input>
                    </div>
                    <button className='login-button' onClick={validateAndLogIn}>Log In</button>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;