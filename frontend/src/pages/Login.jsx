import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Logo from './mycomm.png'

function Login ({ setTokenFunc }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    // Submits the login form when the enter key is pressed in any of the fields
    function handleKeyDown (event) {
        if (event.key === 'Enter') {
        newUserRequest();
        }
    }

    // Register button directs to register
    function goToRegister () {
        navigate('/register');
    }

    // POST request for logging in a new user
    const newUserRequest = async () => {
        console.log(email, password);
        if (email !== '' && password !== '') {
        try {
            const response = await axios.post('http://localhost:5005/admin/auth/login', {
            email,
            password
            });
            setTokenFunc(response.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response.data.error);
        }
        } else if (email === '' || password === '') {
        alert('Please fill in all fields');
        }
    }

    return (
    <>
        <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>
        <div id='background-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#000CA4' }}>
            <div id='outside-box' style={{ width: '30%', height: '60vh', textAlign: 'center', backgroundColor: 'white', borderRadius: '15px' }}>
                <img src={Logo} alt="MyComms Logo" style={{ maxWidth: '70%', height: 'auto'}}/>
                <h2 style={{ fontFamily: 'Poppins', color: 'Black' }}>Login to your account</h2>
                <TextField id="login-email-box" label="Email" variant="outlined" type='text' onChange={e => setEmail(e.target.value)} value ={email} onKeyDown={handleKeyDown} style={{ backgroundColor: '#eff6ff', width: '75%' }}/> <br /><br />
                <TextField id="login-pass-box" label="Password" variant="outlined" type='password' onChange={e => setPassword(e.target.value)} value ={password} onKeyDown={handleKeyDown} style={{ backgroundColor: '#eff6ff', width: '75%' }}/> <br /><br />
                <Button onClick={newUserRequest} variant="contained">Login</Button>
                <Button onClick={goToRegister} variant="contained">Register</Button> <br /><br />
            </div>
        </div>
    </>
    );
}

export default Login;
