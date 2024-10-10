import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Item from './Item';

function UserProfileCircles ({ profileName }) {
    const navigate = useNavigate();

    function goToUserProfileCircles () {
        navigate('/home');
    }
    
    return (
        <>
            <Grid container direction="column" spacing={0}>
                <Grid item xs={12}>
                    <Box sx={{ backgroundColor: 'white', border:'1px solid black', height: '150px', width:'200px' }}>
                        Picture
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ backgroundColor: '#6B4BEF', height: '40px', color: 'white' }}>
                        {profileName}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default UserProfileCircles;
