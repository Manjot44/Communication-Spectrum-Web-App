import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Item from './Item';

function UserProfileCircles ({setTokenFunc}) {
    const navigate = useNavigate();

    function goToUserProfileCircles () {
        navigate('/home');
    }
    
    return (
        <>
            <Grid size={1.5} style={{  }} >
                <Item>
                    
                    User
                </Item>
            </Grid>
        </>
    );
}

export default UserProfileCircles;
