import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Logo from '../assets/mycomm.png';

function Register ({ setTokenFunc }) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPass, setConfirmPass] = React.useState('');
    const navigate = useNavigate();

    // Submits the register form when the enter key is pressed in any of the fields
    function handleKeyDown (event) {
        if (event.key === 'Enter') {
        event.preventDefault();
        newUserRequest();
        }
    }

    // POST request for registering a new user
    const newUserRequest = async () => {
        console.log(email, password, confirmPass, name);
        if (password === confirmPass && name !== '' && email !== '' && password !== '' && confirmPass !== '') {
        try {
            const response = await axios.post('http://localhost:5005/admin/auth/register', {
            email,
            password,
            name
            });
            setTokenFunc(response.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response.data.error);
        }
        } else if (name === '' || email === '' || password === '' || confirmPass === '') {
            alert('Please fill in all fields');
        } else if (password !== confirmPass) {
            alert('Passwords do not match');
        }
    }

    return (
    <>
        <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>
        <div id='background-container' class="d-flex justify-content-center align-items-center login-background">
            <div id='outside-box' class="mx-auto login-form">
                <img src={Logo} alt="MyComms Logo" class='login-logo'/>
                <h3 class='login-text'>Create an account</h3>
                <TextField className='login-input-box' id="register-name-box" label="Name" variant="outlined" type="text" onChange={e => setName(e.target.value)} value ={name} onKeyDown={handleKeyDown} /> <br /><br />
                <TextField className='login-input-box' id="register-email-box" label="Email" variant="outlined" type="text" onChange={e => setEmail(e.target.value)} value ={email} onKeyDown={handleKeyDown} /> <br /><br />
                <TextField className='login-input-box' id="register-pass-box" label="Password" variant="outlined" type="password" onChange={e => setPassword(e.target.value)} value ={password} onKeyDown={handleKeyDown} /> <br /><br />
                <TextField className='login-input-box' id="register-confirmpass-box" label="Confirm Password" variant="outlined" type="password" onChange={e => setConfirmPass(e.target.value)} value ={confirmPass} onKeyDown={handleKeyDown} /> <br /><br />
                <Button onClick={newUserRequest} variant="contained" style={{ backgroundColor: '#000CA4', width: '75%', borderRadius: "20px", fontFamily: 'Poppins' }}>Register</Button>
                <br/><br/>
                <p><a class="link-opacity-100" href="/" style={{ color: '#5A89F7', fontFamily: 'Poppins' }}>Already have an account? Log in</a></p>
            </div>
        </div>
    </>
    );
}

export default Register;
