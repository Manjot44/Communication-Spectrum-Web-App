import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Item from '../components/Item';

function UserManage ({setTokenFunc}) {
    const navigate = useNavigate();

    function goToUserManage () {
        navigate('/home');
    }
    
    return (
        <>
            <h1>User Manage</h1>
            <Grid container spacing={2}>
                <Grid item xs={1.5}>
                    <Item>
                        <div style={{ height: 10 }} >User</div>
                        <div style={{ height: 200 }} ></div>
                    </Item>
                </Grid>
                <Grid item xs={1.5}>
                    <Item>
                        <div style={{ height: 10 }} >User</div>
                        <div style={{ height: 200 }} ></div>
                    </Item>
                </Grid>
                <Grid item xs={1.5}>
                    <Item>
                        <div style={{ height: 10 }} >User</div>
                        <div style={{ height: 200 }} ></div>
                    </Item>
                </Grid>
                <Grid item xs={1.5}>
                    <Item>
                        <div style={{ height: 10 }} >+</div>
                        <div style={{ height: 200 }} ></div>
                    </Item>
                </Grid>
                <Grid item xs={1.5}>
                    <Item>
                        <div style={{ height: 10 }} ></div>
                        <div style={{ height: 200 }} ></div>
                    </Item>
                </Grid>
                <Grid item xs={1.5}>
                    <Item>
                        <div style={{ height: 10 }} ></div>
                        <div style={{ height: 200 }} ></div>
                    </Item>
                </Grid>
                <Grid item xs={1.5}>
                    <Item>
                        <div style={{ height: 10 }} ></div>
                        <div style={{ height: 200 }} ></div>
                    </Item>
                </Grid>
                <Grid item xs={1.5}>
                    <Item>
                        <div style={{ height: 10 }} ></div>
                        <div style={{ height: 200 }} ></div>
                    </Item>
                </Grid>
                <Grid item xs={1.5}>
                    <Item>
                        <div style={{ height: 10 }} ></div>
                        <div style={{ height: 200 }} ></div>
                    </Item>
                </Grid>
                <Grid item xs={1.5}>
                    <Item>
                        <div style={{ height: 10 }} ></div>
                        <div style={{ height: 200 }} ></div>
                    </Item>
                </Grid>
                <Grid item xs={1.5}>
                    <Item>
                        <div style={{ height: 10 }} ></div>
                        <div style={{ height: 200 }} ></div>
                    </Item>
                </Grid>
                <Grid item xs={1.5}>
                    <Item>
                        <div style={{ height: 10 }} ></div>
                        <div style={{ height: 200 }} ></div>
                    </Item>
                </Grid>
                <Grid item xs={1.5}>
                    <Item>
                        <div style={{ height: 10 }} ></div>
                        <div style={{ height: 200 }} ></div>
                    </Item>
                </Grid>
                <Grid item xs={1.5}>
                    <Item>
                        <div style={{ height: 10 }} ></div>
                        <div style={{ height: 200 }} ></div>
                    </Item>
                </Grid>
                <Grid item xs={1.5}>
                    <Item>
                        <div style={{ height: 10 }} ></div>
                        <div style={{ height: 200 }} ></div>
                    </Item>
                </Grid>
                <Grid item xs={1.5}>
                    <Item>
                        <div style={{ height: 10 }} ></div>
                        <div style={{ height: 200 }} ></div>
                    </Item>
                </Grid>
            </Grid>

        </>
    );
}

export default UserManage;
