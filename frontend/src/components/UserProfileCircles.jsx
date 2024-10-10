import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Item from './Item';

function UserProfileCircles ({ profileName, profilePicture }) {
    const navigate = useNavigate();

    function goToUserProfileCircles () {
        navigate('/home');
    }
    
    return (
        <>
            <Grid container direction="column" spacing={0}>
                <Grid item xs={12}>
                    <img
                        src={profilePicture}
                        className="profile-picture"
                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                    />
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
