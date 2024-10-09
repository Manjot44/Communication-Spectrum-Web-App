import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Item from '../components/Item';
import UserProfileCircles from '../components/UserProfileCircles';

function UserProfileContainer ({setTokenFunc}) {
    const navigate = useNavigate();

    function goToUserProfileContainer () {
        navigate('/home');
    }
    
    return (
        <>
            <div style={{ display:'flex' }} >
                <div style={{ width:'85%' }} >
                    <Grid container spacing={2}>
                        <UserProfileCircles></UserProfileCircles>
                        <UserProfileCircles></UserProfileCircles>
                        <UserProfileCircles></UserProfileCircles>
                        <UserProfileCircles></UserProfileCircles>
                        <UserProfileCircles></UserProfileCircles>
                        <UserProfileCircles></UserProfileCircles>
                        <UserProfileCircles></UserProfileCircles>
                        <UserProfileCircles></UserProfileCircles>
                        <UserProfileCircles></UserProfileCircles>
                        <UserProfileCircles></UserProfileCircles>
                        <UserProfileCircles></UserProfileCircles>
                        <UserProfileCircles></UserProfileCircles>
                        <UserProfileCircles></UserProfileCircles>
                        <UserProfileCircles></UserProfileCircles>
                        <UserProfileCircles></UserProfileCircles>
                        <UserProfileCircles></UserProfileCircles>
                    </Grid>
                </div>
                <Button style={{ width:'15%' }}>+</Button>
            </div>

        </>
    );
}

export default UserProfileContainer;
