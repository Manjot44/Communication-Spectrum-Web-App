import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import TextFieldComponent from "../components/TextFieldComponent";
import SelectDOBComponent from "../components/SelectDOBComponent";
import DropdownComponent from "../components/DropdownComponent";
import NotificationPopup from "../components/NotificationPopup";
import { useNotification } from "../services/notificationService";
import { DarkBlueButton, LoginText, LoginFormBox, LoginBackground, LoginStack } from "../Wrappers.jsx";

function EnterAccDetails({ token, setTokenFunc }) {
  const [profession, setProfession] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [postcode, setPostcode] = React.useState("");
  const [date, setDate] = React.useState(dayjs("2024-01-01"));
  const [isSubscribed, setSubscribe] = React.useState(false);
  const { notify, showNotification, notificationMessage } = useNotification();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    full_name: "",
    email: "",
    dob: dayjs(),
    location: "",
    postcode: "",
    profession: "",
    is_subbed: false,
  });

  // API Request to feth Information already entered by user
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("http://localhost:5005/admin/auth/get_user_settings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSettings({
          ...response.data,
          dob: dayjs(response.data.dob),
        });
      } catch (error) {
        alert(error.response.data.error);
      }
    };
  
    fetchSettings();
  }, [token]);

  // Submits the register form when the enter key is pressed in any of the fields
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCreateButton();
    }
  }

  // Function called when the Create Account Profile Button is clicked
  // Checks to make sure all the fields are filled in and are valid
  const handleCreateButton = () => {
    const postcodePattern = /^[0-9]{4,6}$/;

    if (!postcodePattern.test(postcode)) {
      notify("Please enter a valid postcode (4-6 digits).");
    } else if (
      profession === "" ||
      country === "" ||
      date === ""
    ) {
      notify("Please fill in all fields");
    } else {
      createAccProfile();
    }
  };

  // API Request to make a new Professional account
  // Data is stored in zdump file
  const createAccProfile = async () => {
    try {
      const formattedDate = date.format("YYYY-MM-DD");
      await axios.put(
        "http://localhost:5005/admin/auth/complete_reg",
        {
          profession,
          country,
          postcode,
          date: formattedDate,
          isSubscribed,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      notify("Account profile created successfully!");
      navigate("/UserManage");
    } catch (err) {
      notify(err.response.data.error);
    }
  };

  return (
    <>
      <LoginBackground>
        <LoginFormBox>
          <LoginStack spacing={2.5}>
            <br />
            <LoginText>
              <b>Please Enter Account Details</b>
            </LoginText>
            <TextFieldComponent
              label="Name"
              value={settings.full_name}
              onKeyDown={handleKeyDown}
              disabled={true}
            />
            <TextFieldComponent
              label="Email"
              value={settings.email}
              onKeyDown={handleKeyDown}
              disabled={true}
            />
            <SelectDOBComponent
              label="Date of Birth"
              value={date}
              onChange={(newDate) => setDate(newDate)}
              width="75%"
            />
            <DropdownComponent
              id="country-form"
              label="Select Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              options={[
                { value: "Australia", label: "Australia" },
                { value: "New Zealand", label: "New Zealand" },
                { value: "China", label: "China" },
                { value: "India", label: "India" },
                { value: "United States", label: "United States" },
                { value: "United Kingdom", label: "United Kingdom" },
                { value: "Kazakhstan", label: "Kazakhstan" },
              ]}
              width="75%"
            />
            <TextFieldComponent
              label="Postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <DropdownComponent
              id="profession-form"
              label="Profession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              options={[
                { value: "Speech Therapist", label: "Speech Therapist" },
                {
                  value: "Behaviour Support Practitioner",
                  label: "Behaviour Support Practitioner",
                },
                { value: "Educator", label: "Educator" },
                { value: "Psychologist", label: "Psychologist" },
                { value: "Support Worker", label: "Support Worker" },
                { value: "Parent/Carer", label: "Parent/Carer" },
                { value: "Other", label: "Other" },
              ]}
              width="75%"
            />
            <DarkBlueButton onClick={handleCreateButton} variant="contained">
              Create Account Profile
            </DarkBlueButton>
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
    </>
  );
}

export default EnterAccDetails;
