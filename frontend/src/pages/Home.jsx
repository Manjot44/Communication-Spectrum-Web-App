import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function Home ({setTokenFunc}) {
    const navigate = useNavigate();
    const [viewModal, setViewModal] = React.useState(false);

    function goToUserManage () {
        navigate('/usermanage');
    }
    
    return (
        <>
            <h1>Home</h1>
            <Button onClick={goToUserManage} variant="contained" style={{ backgroundColor: '#000CA4', width: '75%', borderRadius: "20px", fontFamily: 'Poppins' }}>Manage users</Button><br /><br />

        </>
    );
}

export default Home;
