import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Item from '../components/Item';
import UserProfileCircles from '../components/UserProfileCircles';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserProfileContainer ({ token, setTokenFunc}) {
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

    function goToUserProfileContainer () {
        navigate('/home');
    }
    
    return (
        <>
            <div class='d-flex justify-content-center' style={{ display:'flex' }} >
                <div style={{ width:'85%'}} >
                    <Grid container spacing={2}>
                        {profiles && Object.entries(profiles).map(profile => (
                            <UserProfileCircles profileName={profile[1].name}></UserProfileCircles>
                        ))}
                        <Button style={{ width:'200px', height:'190px', border:"1px solid #26C3BA" }}>+</Button>
                    </Grid>
                </div>
            </div>

        </>
    );
}

export default UserProfileContainer;
