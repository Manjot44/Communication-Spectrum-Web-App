import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Logo from '../assets/mycomm.png';
import Apple from '../assets/apple.png';
import Facebook from '../assets/Facebook.png';
import Google from '../assets/Google.png';
import '../App.css';

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
                navigate('/home');
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
        <div id='background-container' class="d-flex justify-content-center align-items-center login-background">
            <div id='outside-box' class="mx-auto login-form">
                <img src={Logo} alt="MyComms Logo" class='login-logo'/>
                <h3 class='login-text'>Log In to your account</h3>
                <TextField className='login-input-box' id="login-email-box" label="Email" variant="outlined" type='text' onChange={e => setEmail(e.target.value)} value ={email} onKeyDown={handleKeyDown}/> <br /><br />
                <TextField className='login-input-box' id="login-pass-box" label="Password" variant="outlined" type='password' onChange={e => setPassword(e.target.value)} value ={password} onKeyDown={handleKeyDown}/> <br /><br />
                <Button onClick={newUserRequest} variant="contained" style={{ backgroundColor: '#000CA4', width: '75%', borderRadius: "20px", fontFamily: 'Poppins' }}>Login</Button><br /><br />
                <p><a class="link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="/register" style={{ fontFamily: 'Poppins' }}>Dont have an account? <b>Register here</b></a></p>
                <p style={{ fontFamily: 'Poppins' }}>Or log in with socials</p>
                <div className="d-flex justify-content-around mx-auto" style= {{ width: '75%' }}>
                    <img src={Apple} alt="apple logo" className="login-alternate-signin"/>
                    <img src={Google} alt="google logo" className="login-alternate-signin"/>
                    <img src={Facebook} alt="facebook logo" className="login-alternate-signin"/>
                </div>
            </div>
        </div>
    </>
    );
}

export default Login;
