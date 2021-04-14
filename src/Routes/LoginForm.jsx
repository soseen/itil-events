import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// import { axios } from '../Axios';
import axios from 'axios';
import './LoginForm.scss';

const LoginForm = ({setLoggedIn, setUser, teamsData}) => {

    // const GUEST = {
    //     username: 'guest',
    //     role: 'guest',
    //     team: null
    //   }

    const validationMessages = ['', 'Please fill in all the required fields', 'Invalid Username/Password'];

    let history = useHistory();

    axios.defaults.withCredentials = true;

    const [credentials, setCredentials] = useState({
        username: "system",
        password: "123",
    })
    const [registrationCredentials, setRegistrationCredentials] = useState({
        username: '',
        password: '',
        role: 'expert',
        team: null
    })
    const [validationMessage, setValidationMessage] = useState('');
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [teamSelectVisible, setTeamSelectVisible] = useState(true);

    useEffect(() => {

        // axios.defaults.withCredentials = true;
        axios.get('http://localhost:8000/user').then((response) => {
            if(response.data.isLoggedIn) {
                setUser(response.data.user)
                setLoggedIn(response.data.isLoggedIn)
                if(response.data.user.subscriptionActive.active){
                    history.push('/status');
                } else {
                    history.push('/subscribe');
                }
                
            } 
        })

    }, [setLoggedIn, setUser])

    const handleChange = (e) => {
        e.preventDefault();
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const validateAndLogIn = async () => {
        if(credentials.username === '' || credentials.password === '') {
            setValidationMessage(validationMessages[1]);
        }
        else {
            const response = await axios.post("http://localhost:8000/user", {
                username: credentials.username,
                password: credentials.password,
                })
            // const subscriptionActive = checkIfUserSubscribed(response.data.user);
            setUser(response.data.user);
            setValidationMessage(response.data.message);
            setLoggedIn(response.data.isLoggedIn);
            console.log(response.data)
            // if(response.data.isLoggedIn && response.data.user.subscriptionActive.active) {
            //     history.push('/itil-events');
            // } else if (response.data.isLoggedIn && !response.data.user.subscriptionActive.active) {
            //     history.push('/subscribe');
            // }
        }

        
        
    }

    const selectRole = (e) => {
        if(e.target.value === 'system'){
            setRegistrationCredentials({
                ...registrationCredentials,
                team: null,
                role: 'system'
            })
            setTeamSelectVisible(false);
        } else {
            setTeamSelectVisible(true);
            setRegistrationCredentials({
                ...registrationCredentials,
                role: e.target.value
            })
        }


    }

    const selectTeam = (e) => {

        if(e.target.name !== 'null'){
            setRegistrationCredentials({
                ...registrationCredentials,
                team: parseInt(e.target.value),
            })
        } else {
            setRegistrationCredentials({
                ...registrationCredentials,
                team: null
            })
        }
        
    }

    const handleRegistration = async () => {
        
        if(showRegistrationForm){

            if(registrationCredentials.username === '' || registrationCredentials.password === '') {
                setValidationMessage(validationMessages[1]);
                return
            } else {
                try {
                    const response = await axios.post('http://localhost:8000/userCreate', registrationCredentials)
                    setValidationMessage(response.data.message);
                }
                catch (error) {
                    console.log(error)
                }
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
                        <div className='login-inputs-row'>
                            <label className='login-inputs-label'>Role</label>
                            <select name='select-role' className='register-inputs-select' onChange={selectRole}>
                                <option value='expert'>Ekspert</option>
                                <option value='system'>System</option>
                            </select>
                        </div>
                        <div className={teamSelectVisible ? 'login-inputs-row' : 'login-inputs-row select-hidden'}>
                            <label className='login-inputs-label'>Team</label>
                            <select name='select-team' className='register-inputs-select' onChange={selectTeam}>
                                <option name='nonne' value={null}>None</option>
                                {teamsData.map((team) => 
                                (
                                <option key={team.id} name={team.name} value={team.id}>{team.name}</option>
                                )
                                )}
                            </select>
                        </div>
                        

                </div>
                <button className='login-button' onClick={() => handleRegistration()}>Register</button>
               
            </div>
        </div>
    )
}

export default LoginForm;