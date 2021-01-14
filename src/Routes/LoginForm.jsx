import React, { useState } from 'react';
import { useHistory } from 'react-router';
// import { axios } from '../Axios';
import axios from 'axios';
import './LoginForm.scss';

const LoginForm = ({setLoggedIn, setUser}) => {

    const validationMessages = ['', 'Please fill in all the required fields', 'Invalid Username/Password'];

    let history = useHistory();

    const [credentials, setCredentials] = useState({
        username: "system",
        password: "system123",
    })
    const [registrationCredentials, setRegistrationCredentials] = useState({
        username: 'user123',
        password: 'password',
        role: 'expert',
        team: 18
    })
    const [validationMessage, setValidationMessage] = useState(validationMessages[0]);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);

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
            axios.get('http://localhost:8080/api/users')
                .then((response) => {
                    let user = response.data.find(u => u.username === credentials.username)
                    if(user && user.password === credentials.password){
                        setUser(user);
                        setLoggedIn(true);
                        setValidationMessage(validationMessages[0])
                        history.push('/itil-events')
                    } else {
                        setValidationMessage(validationMessages[2])
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            
        }
        
    }

    const handleRegistration = async () => {
        
        if(showRegistrationForm){
            try {
                await axios.post('http://localhost:8000/users', registrationCredentials)
            }
            catch (error) {
                console.log(error)
            }
        } else {
            setShowRegistrationForm(true);
            return
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

                    <button className='login-button login-1' onClick={validateAndLogIn}>Log In</button>

                </div>
                <div className={showRegistrationForm ? 'login-inputs-wrapper' : 'login-inputs-wrapper register-hidden'}>
                        <div className='login-inputs-row'>
                            <label className='login-inputs-label'>Username</label>
                            <input type='text' name='username' value={registrationCredentials.username} className='login-inputs-input' onChange={(e) => setRegistrationCredentials({...registrationCredentials, username: e.target.value})}></input>
                        </div>
                        <div className='login-inputs-row'>
                            <label className='login-inputs-label'>Password</label>
                            <input type='password' name='password' value={registrationCredentials.password} className='login-inputs-input' onChange={(e) => setRegistrationCredentials({...registrationCredentials, password: e.target.value})}></input>
                        </div>

                </div>
                <button className='login-button' onClick={() => handleRegistration()}>Register</button>
               
            </div>
        </div>
    )
}

export default LoginForm;