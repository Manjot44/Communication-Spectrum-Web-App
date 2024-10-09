import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import TextFieldComponent from '../components/TextFieldComponent';
import SelectDOBComponent from '../components/SelectDOBComponent';
import DropdownComponent from '../components/DropdownComponent';
import SubscribeComponent from '../components/SubscribeComponent';

function EnterAccDetails ({ token, setTokenFunc }) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [profession, setProfession] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [postcode, setPostcode] = React.useState('');
    const [date, setDate] = React.useState(dayjs('2024-01-01'));
    const [isSubscribed, setSubscribe] = React.useState(false);
    const navigate = useNavigate();

    // Submits the register form when the enter key is pressed in any of the fields
    function handleKeyDown (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleCreateButton();
        }
    }

    const handleCreateButton = () => {
        createAccProfile();
    }

    // Get the current presentation database of user and append acc profile to json
    let currentData = ''
    let store = ''
    const createAccProfile = async () => {
        axios.get('http://localhost:5005/store', {
        headers: {
            Authorization: token,
        }
        }).then((response) => {
            currentData = response.data.store;

            // Update the user with data of their account profile
            store = Object.assign({}, currentData, {
                Profile: {
                    name: name,
                    email: email,
                    dob: date,
                    location: country,
                    postcode: postcode,
                    profession: profession,
                    subscribed: isSubscribed
                }
            });

            // Put Request to Save the New Data
            saveProfile();
        })
    }

    // Save the account profile data to database
    const saveProfile = async () => {
        try {
            await axios.put('http://localhost:5005/store', {
                store
            },
            {
                headers: {
                    Authorization: token,
                }
            });
        } catch (err) {
            alert(err.response.data.error);
        }
        navigate('/');
    }

    return (
    <>
        <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>
        <div id='background-container' class="d-flex justify-content-center align-items-center login-background">
            <div id='outside-box' class="mx-auto login-form">
                <br/>
                <h4 class='login-text'>Please Enter Account Details</h4>
                
                <TextFieldComponent
                    label='Full Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <br /><br />
                <TextFieldComponent
                    label='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <br /><br />
                <SelectDOBComponent
                    label="Date of Birth"
                    value={date}
                    onChange={(newDate) => setDate(newDate)}
                />
                <br /><br />
                <DropdownComponent
                    id="country-form"
                    label="Select Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    options={[
                    { value: 'Australia', label: 'Australia' },
                    { value: 'New Zealand', label: 'New Zealand' },
                    { value: 'China', label: 'China' },
                    { value: 'India', label: 'India' },
                    { value: 'United States', label: 'United States' },
                    { value: 'United Kingdom', label: 'United Kingdom' },
                    { value: 'Kazakhstan', label: 'Kazakhstan' },
                    ]}
                />
                <br /><br />
                <TextFieldComponent
                    label= 'Postcode'
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <br /><br />
                <DropdownComponent
                    id="profession-form"
                    label="Profession"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    options={[
                    { value: 'Speech Therapist', label: 'Speech Therapist' },
                    { value: 'Behaviour Support Practitioner', label: 'Behaviour Support Practitioner' },
                    { value: 'Educator', label: 'Educator' },
                    { value: 'Psychologist', label: 'Psychologist' },
                    { value: 'Support Worker', label: 'Support Worker' },
                    { value: 'Parent/Carer', label: 'Parent/Carer' },
                    { value: 'Other', label: 'Other' },
                    ]}
                />
                <br />
                <SubscribeComponent
                    checked={isSubscribed}
                    onChange={(e) => setSubscribe(e.target.checked)}
                    label="Subscribe to MyComms Newsletter"
                />
                <br /><br/>

                <Button onClick={handleCreateButton} variant="contained" style={{ backgroundColor: '#000CA4', width: '75%', borderRadius: "20px", fontFamily: 'Poppins' }}>Create Account Profile</Button>
            </div>
        </div>
    </>
    );
}

export default EnterAccDetails;
