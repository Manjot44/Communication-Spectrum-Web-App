import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import TextFieldComponent from "../components/TextFieldComponent";
import DropdownComponent from "../components/DropdownComponent";
import SelectDOBComponent from "../components/SelectDOBComponent";
import NotificationPopup from "../components/NotificationPopup";
import ImageCropperModal from "../components/ImageCropperModal";
import { useNotification } from "../services/notificationService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { DarkBlueButton, LoginText, LoginFormBox, LoginBackground, LoginStack } from "../Wrappers.jsx";

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

  /* Every User Profile Must Have a Name. 
    Function triggered when Create User Profile button clicked */
  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);

    if (value.trim() === "") {
      setNameError("Name cannot be empty.");
    } else {
      setNameError("");
    }
  };

  /* DOB must be in the past/present but not future. 
    Function triggered when wrong date selected */
  const handleDobChange = (newDate) => {
    if (newDate.isAfter(dayjs())) {
      setDobError("Date of birth cannot be in the future.");
      setDob(dayjs());
    } else {
      setDob(newDate);
      setDobError("");
    }
  };

  /* Postcode must be a 4 digit number
    Function triggered when Box has been clicked away from */
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

  /* Following fields (name, dob..) must be filled to create account
    Function triggered create user profile button clicked */
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

  /* Function to store the profile picture added for the user profile */
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result); // Store the original image for cropping
      setIsCropperOpen(true);          // Open the cropper modal
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  /* Function to help crop out images */
  const handleCropComplete = (croppedImage) => {
    setProfilePicture(croppedImage);
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
      <LoginBackground>
        <LoginFormBox>
          <LoginStack spacing={2.5}>
            <br />
            <LoginText>
              <b>Add New User</b>
            </LoginText>
            <TextFieldComponent
              label="Name"
              value={name}
              onChange={handleNameChange}
              error={!!nameError}
              helperText={nameError}
            />
            <SelectDOBComponent
              label="Date of Birth"
              value={dob}
              onChange={handleDobChange}
              error={!!dobError}
              helperText={dobError}
              width="75%"
            />
            <TextFieldComponent
              label="Postcode"
              value={postcode}
              onChange={handlePostcodeChange}
              error={!!postcodeError}
              helperText={postcodeError}
            />
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
            <TextFieldComponent
              label="Interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
            <TextFieldComponent
              label="Key Environments (e.g., home, school, workplaces)"
              value={environments}
              onChange={(e) => setEnvironments(e.target.value)}
            />
            <div style={{ width: "75%" }}>
              <label htmlFor="profilePicture">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
                className="form-control"
              />
            </div>
            <DarkBlueButton onClick={handleCreateButton} variant="contained">
              Create User Profile
            </DarkBlueButton>
            <p>
              <a
                className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                href="/UserManage"
                style={{ fontFamily: "Poppins" }}
              >
                <b>Go Back</b>
              </a>
            </p>
          </LoginStack>
        </LoginFormBox>
      </LoginBackground>

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
