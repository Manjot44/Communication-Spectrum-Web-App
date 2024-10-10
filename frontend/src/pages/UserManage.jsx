import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Item from '../components/Item';
import UserProfileContainer from '../components/UserProfileContainer';
import Logo from '../assets/mycomm.png';
import '../App.css'

function UserManage ({ token, setTokenFunc }) {
    const navigate = useNavigate();
    const [profiles, setProfileData] = React.useState({});

    React.useEffect(() => {
        axios.get('http://localhost:5005/store', {
            headers: {
                Authorization: token,
            }
        }).then((response) => {
            setProfileData(response.data.store.users);
            console.log(response.data.store)
            console.log(profiles);
        }).catch((error) => {
            console.log(token);
            console.error('Error fetching profiles:', error.response ? error.response.data : error.message);
        });
    }, []);

    function goToUserManage () {
        navigate('/home');
    }

    function logOut () {
        console.log(token);
        navigate('/')
    }

    return (
        <>
            <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>
            <div class='d-flex justify-content-between'>
                <img src={Logo} alt="MyComms Logo" style={{ maxWidth: '15%', height: 'auto' }}/>
                <Button style={{ width: '10%'}} onClick={logOut}>LOG OUT</Button>
            </div>
            <div class='d-flex justify-content-center align-items-center'>
                <h1 class="login-text" style={{ marginTop: '15vh' }}>Select User Profile</h1>
            </div>
            <UserProfileContainer token={token}></UserProfileContainer>
        </>
    );
}

export default UserManage;
