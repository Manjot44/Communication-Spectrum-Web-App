import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import TextFieldComponent from "../components/TextFieldComponent";
import DropdownComponent from "../components/DropdownComponent";
import SelectDOBComponent from "../components/SelectDOBComponent";

function AddUser({ token, setTokenFunc }) {
  const [name, setName] = React.useState("");
  const [dob, setDob] = React.useState(dayjs("2024-01-01"));
  const [postcode, setPostcode] = React.useState("");
  const [communication, setCommunication] = React.useState("");
  const [interests, setInterests] = React.useState("");
  const [environments, setEnvironments] = React.useState("");
  const [profilePicture, setProfilePicture] = React.useState("");
  const navigate = useNavigate();

  // Submits the register form when the enter key is pressed in any of the fields
  function handleKeyDown (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleCreateButton();
  }
  }
  
  // Check to make sure all the fields are filled in
  const handleCreateButton = () => {
  if (name === '' || dob === '' || postcode === '' || communication === '' || interests === '' || environments === '' || profilePicture === '') {
    alert('Please fill in all fields')
  } else {
    createUserProfile();
  }
  }

  // Handle profile picture upload
  const handleProfilePictureUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    setProfilePicture(reader.result); // Store base64 image
  };
  if (file) {
    reader.readAsDataURL(file); // Convert to base64
  }
  };

  // Validate all fields before submitting
  const handleCreateUser = () => {
    if (name === '' || dob === '' || postcode === '' || communication === '' || interests === '' || environments === '') {
      alert('Please fill in all fields');
    } else {
      createUserProfile();  // Create the user profile
    }
  };

  // Function to create the new user profile
  const createUserProfile = async () => {
    try {
      const formattedDate = dob.format('YYYY-MM-DD');
      await axios.post("http://localhost:5005/admin/new_user", {
        name,
        dob: formattedDate,
        postcode,
        communication,
        interests,
        environments,
        profilePicture
      },
      {
        headers: {
          Authorization: token,
        }
      });
    alert('User profile created successfully');
    navigate('/UserManage');  // Navigate back to UserManage on success
  } catch (error) {
    console.error('Error creating user:', error);
    alert('An error occurred while creating the user.');
  }
  };

  return (
  <>
    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>
    <div id="background-container" className="d-flex justify-content-center align-items-center login-background">
      <div id="outside-box" className="mx-auto login-form">
        <br/>
        <h4>Add New User</h4>

        <TextFieldComponent
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <br /><br />

        <SelectDOBComponent
          label="Date of Birth"
          value={dob}
          onChange={(newDate) => setDob(newDate)}
        />
        <br /><br />

        <TextFieldComponent
          label="Postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <br /><br />

        <DropdownComponent
          id="communication-form"
          label="Communication Method"
          value={communication}
          onChange={(e) => setCommunication(e.target.value)}
            options={[
                { value: 'Spoken Language', label: 'Spoken Language' },
                { value: 'Body Language', label: 'Body Language' },
                { value: 'Eye Contact', label: 'Eye Contact' },
                { value: 'Hugs', label: 'Hugs' },
                { value: 'Pointing', label: 'Pointing' },
                { value: 'Visual Supports', label: 'Visual Supports' },
                { value: 'AAC Devices', label: 'AAC Devices' },
                { value: 'Digital Communications', label: 'Digital Communications' },
                { value: 'Basic Sign Language', label: 'Basic Sign Language' }
              ]}
          width='75%'
        />
        <br /><br />

        <TextFieldComponent
          label="Interests"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <br /><br />

        <TextFieldComponent
          label="Key Environments (e.g., home, school, workplaces)"
          value={environments}
          onChange={(e) => setEnvironments(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <br />
        <br />
        <div className='form-group mx-auto' style={{ width: '75%' }}>
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureUpload}
            className="form-control"
          />
        </div>
        <br />
        <Button onClick={handleCreateUser} variant="contained" style={{ backgroundColor: '#000CA4', width: '75%', borderRadius: "20px", fontFamily: 'Poppins' }}>
          Create New User
        </Button>
        <br />
        <br />
        <p>
            <a
              class="link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              href="/UserManage"
              style={{ fontFamily: "Poppins" }}
            >
            <b>Go Back</b>
            </a>
        </p>
      </div>
    </div>
  </>
  );
}

export default AddUser;
