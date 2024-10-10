import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Item from '../components/Item';
import UserProfileContainer from '../components/UserProfileContainer';

function UserManage ({setTokenFunc}) {
    const navigate = useNavigate();

    function goToUserManage () {
        navigate('/home');
    }
    
    return (
        <>
            <h1>Select User</h1>
            <UserProfileContainer></UserProfileContainer>

        </>
    );
}

export default UserManage;
