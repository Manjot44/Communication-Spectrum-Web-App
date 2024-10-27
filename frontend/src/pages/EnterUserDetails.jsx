import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import TextFieldComponent from "../components/TextFieldComponent";
import DropdownComponent from "../components/DropdownComponent";
import SelectDOBComponent from "../components/SelectDOBComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function AddUser({ token, setTokenFunc }) {
  const [name, setName] = React.useState("");
  const [dob, setDob] = React.useState(dayjs("2024-01-01"));
  const [postcode, setPostcode] = React.useState("");
  const [postcodeError, setPostcodeError] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [dobError, setDobError] = React.useState("");
  const [communication, setCommunication] = React.useState("");
  const [interests, setInterests] = React.useState("");
  const [environments, setEnvironments] = React.useState("");
  const [profilePicture, setProfilePicture] = React.useState("");
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);

    if (value.trim() === "") {
      setNameError("Name cannot be empty.");
    } else {
      setNameError("");
    }
  };

  const handleDobChange = (newDate) => {
    // Prevent setting a date in the future
    if (newDate.isAfter(dayjs())) {
      setDobError("Date of birth cannot be in the future.");
      setDob(dayjs()); // Reset to today's date or a default date
    } else {
      setDob(newDate);
      setDobError("");
    }
  };

  const handlePostcodeChange = (event) => {
    const { value } = event.target;

    if (/^\d{0,4}$/.test(value)) {
      setPostcode(value);
    }

    const postcodePattern =
      /^(0[289][0-9]{2})|([1-9][0-9]{3})|(2[0-5][0-9]{2})|(26[01][0-9])|(26[2-9][0-9])|(29[0-2][0-9])|(29[1-9][0-9])|(3000|[3-4][0-9]{3})|(8[0-9]{3})|(90[0-9]{2})|(50[0-7][0-9])|(58[0-9]{2})|(60[0-7][0-9])|(68[0-9]{2})|(70[0-7][0-9])|(78[0-9]{2})|(08[0-9]{2})|(09[0-9]{2})$/;

    if (value.length === 4 && !postcodePattern.test(value)) {
      setPostcodeError(
        "Invalid Australian postcode. Please enter a valid 4-digit postcode."
      );
    } else if (value.length < 4) {
      setPostcodeError("Postcode must be exactly 4 digits.");
    } else {
      setPostcodeError("");
    }
  };

  const handleCreateButton = () => {
    if (
      name === "" ||
      dob === "" ||
      postcode === "" ||
      communication === "" ||
      interests === "" ||
      environments === ""
    ) {
      alert("Please fill in all required fields");
    } else if (nameError || dobError || postcodeError) {
      alert("Please resolve validation errors before submitting.");
    } else {
      createUserProfile();
    }
  };

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const createUserProfile = async () => {
    try {
      const formattedDate = dob.format("YYYY-MM-DD");
      await axios.post(
        "http://localhost:5005/admin/new_user",
        {
          name,
          dob: formattedDate,
          postcode,
          communication,
          interests,
          environments,
          profilePicture,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      alert("User profile created successfully");
      navigate("/UserManage");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An error occurred while creating the user.");
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Poppins"
        rel="stylesheet"
      ></link>
      <div
        id="background-container"
        className="d-flex justify-content-center align-items-center login-background"
      >
        <div id="outside-box" className="mx-auto login-form">
          <br />
          <h4>Add New User</h4>

          <div style={{ marginBottom: "20px" }}>
            <TextFieldComponent
              label="Name"
              value={name}
              onChange={handleNameChange}
              error={!!nameError}
              helperText={nameError}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <SelectDOBComponent
              label="Date of Birth"
              value={dob}
              onChange={handleDobChange}
              error={!!dobError}
              helperText={dobError}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <TextFieldComponent
              label="Postcode"
              value={postcode}
              onChange={handlePostcodeChange}
              error={!!postcodeError}
              helperText={postcodeError}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <DropdownComponent
              id="communication-form"
              label="Communication Method"
              value={communication}
              onChange={(e) => setCommunication(e.target.value)}
              options={[
                { value: "Spoken Language", label: "Spoken Language" },
                { value: "Body Language", label: "Body Language" },
                { value: "Eye Contact", label: "Eye Contact" },
                { value: "Hugs", label: "Hugs" },
                { value: "Pointing", label: "Pointing" },
                { value: "Visual Supports", label: "Visual Supports" },
                { value: "AAC Devices", label: "AAC Devices" },
                {
                  value: "Digital Communications",
                  label: "Digital Communications",
                },
                { value: "Basic Sign Language", label: "Basic Sign Language" },
              ]}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <TextFieldComponent
              label="Interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <TextFieldComponent
              label="Key Environments (e.g., home, school, workplaces)"
              value={environments}
              onChange={(e) => setEnvironments(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              className="form-control"
            />
          </div>

          <Button
            onClick={handleCreateButton}
            variant="contained"
            style={{
              backgroundColor: "#000CA4",
              width: "75%",
              borderRadius: "20px",
              fontFamily: "Poppins",
            }}
          >
            Create New User
          </Button>
        </div>
      </div>
    </>
  );
}

export default AddUser;
