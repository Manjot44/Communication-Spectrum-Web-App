import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import TextFieldComponent from "../components/TextFieldComponent";
import DropdownComponent from "../components/DropdownComponent";
import SelectDOBComponent from "../components/SelectDOBComponent";
import NotificationPopup from "../components/NotificationPopup";
import ImageCropperModal from "../components/ImageCropperModal";
import { useNotification } from "../services/notificationService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function EnterUserDetails({ token, setTokenFunc }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState(dayjs("2024-01-01"));
  const [postcode, setPostcode] = useState("");
  const [postcodeError, setPostcodeError] = useState("");
  const [nameError, setNameError] = useState("");
  const [dobError, setDobError] = useState("");
  const [communication, setCommunication] = useState("");
  const [interests, setInterests] = useState("");
  const [environments, setEnvironments] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const { notify, showNotification, notificationMessage } = useNotification();
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
    if (newDate.isAfter(dayjs())) {
      setDobError("Date of birth cannot be in the future.");
      setDob(dayjs());
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
      /^(0[289][0-9]{2})|([1-9][0-9]{3})|(2[0-5][0-9]{2})$/;

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
      notify("Please fill in all required fields");
    } else if (nameError || dobError || postcodeError) {
      notify("Please resolve validation errors before submitting.");
    } else {
      createUserProfile();
    }
  };

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file); // Create an Object URL for Blob
      setSelectedImage(objectUrl); // Set Object URL for cropper
      setIsCropperOpen(true);
  
      // Revoke Object URL after cropping to prevent memory leaks
      return () => URL.revokeObjectURL(objectUrl);
    }
  };
  
  const handleCropComplete = (croppedBlob) => {
    // Read the cropped Blob as an ArrayBuffer for binary storage
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result); // Store ArrayBuffer
    };
    reader.readAsArrayBuffer(croppedBlob);
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
      notify("User profile created successfully");
      navigate("/UserManage");
    } catch (error) {
      console.error("Error creating user:", error);
      notify("An error occurred while creating the user.");
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
          <h4>
            <b>Add New User</b>
          </h4>

          <div style={{ marginBottom: "20px" }}>
            <TextFieldComponent
              label="Name"
              value={name}
              onChange={handleNameChange}
              error={!!nameError}
              helperText={nameError}
            />
          </div>

          <div className="mx-auto" style={{ marginBottom: "20px" }}>
            <SelectDOBComponent
              label="Date of Birth"
              value={dob}
              onChange={handleDobChange}
              error={!!dobError}
              helperText={dobError}
              width="75%"
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
              width="75%"
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

          <div
            className="form-group mx-auto"
            style={{ marginBottom: "20px", width: "75%" }}
          >
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
          <br />
          <br />
          <p>
            <a
              className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              href="/UserManage"
              style={{ fontFamily: "Poppins" }}
            >
              <b>Go Back</b>
            </a>
          </p>
        </div>
      </div>

      {/* Notification Popup */}
      {showNotification && (
        <NotificationPopup
          message={notificationMessage}
          duration={5000}
          onClose={() => notify("")}
        />
      )}

      {/* Image Cropper Modal */}
      <ImageCropperModal
        open={isCropperOpen}
        onClose={() => setIsCropperOpen(false)}
        image={selectedImage}
        onCropComplete={handleCropComplete}
        defaultAspect={1}
        circleCrop
      />
    </>
  );
}

export default EnterUserDetails;
