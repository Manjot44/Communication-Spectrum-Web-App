import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import TextFieldComponent from "../components/TextFieldComponent";
import SelectDOBComponent from "../components/SelectDOBComponent";
import DropdownComponent from "../components/DropdownComponent";
import SubscribeComponent from "../components/SubscribeComponent";

function EnterAccDetails({ token, setTokenFunc }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [profession, setProfession] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [postcode, setPostcode] = React.useState("");
  const [date, setDate] = React.useState(dayjs("2024-01-01"));
  const [isSubscribed, setSubscribe] = React.useState(false);
  const navigate = useNavigate();

  // Submits the register form when the enter key is pressed in any of the fields
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCreateButton();
    }
  }

  // Check to make sure all the fields are filled in and are valid
  const handleCreateButton = () => {
    const postcodePattern = /^[0-9]{4,6}$/;

    if (!name.trim()) {
      alert("Please enter your name.");
    } else if (!postcodePattern.test(postcode)) {
      alert("Please enter a valid postcode (4-6 digits).");
    } else if (
      email === "" ||
      profession === "" ||
      country === "" ||
      date === ""
    ) {
      alert("Please fill in all fields");
    } else {
      createAccProfile();
    }
  };

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
    } catch (err) {
      alert(err.response.data.error);
    }
    navigate("/UserManage");
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
          <h4 className="login-text">Please Enter Account Details</h4>

          <TextFieldComponent
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <br />
          <br />
          <TextFieldComponent
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <br />
          <br />
          <SelectDOBComponent
            label="Date of Birth"
            value={date}
            onChange={(newDate) => setDate(newDate)}
          />
          <br />
          <br />
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
          />
          <br />
          <br />
          <TextFieldComponent
            label="Postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <br />
          <br />
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
          />
          <br />
          <SubscribeComponent
            checked={isSubscribed}
            onChange={(e) => setSubscribe(e.target.checked)}
            label="Subscribe to MyComms Newsletter"
          />
          <br />
          <br />
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
            Create Account Profile
          </Button>
        </div>
      </div>
    </>
  );
}

export default EnterAccDetails;
