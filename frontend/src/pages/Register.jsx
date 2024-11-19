import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TextFieldComponent from "../components/TextFieldComponent";
import "../App.css";
import Logo from "../assets/Mycommsproblue.png";
import { DarkBlueButton, LoginText, LoginFormBox, LoginBackground, LoginStack } from "../Wrappers.jsx";

function Register({ setTokenFunc }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const navigate = useNavigate();

  // Submits the register form when the enter key is pressed in any of the fields
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      newUserRequest();
    }
  }

  // POST request for registering a new user
  const newUserRequest = async () => {
    // For debug: print all user information to register
    // console.log(email, password, confirmPass, name);
    if (
      password === confirmPass &&
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPass !== ""
    ) {
      try {
        const response = await axios.post(
          "http://localhost:5005/admin/auth/register",
          {
            email,
            password,
            name,
          }
        );
        await setTokenFunc(response.data.token); 
        navigate('/enterAccDetails'); 
      } catch (err) {
        alert(err.response.data.error);
      }
    } else if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPass === ""
    ) {
      alert("Please fill in all fields");
    } else if (password !== confirmPass) {
      alert("Passwords do not match");
    }
  };

  return (
    <>
      <LoginBackground>
        <LoginFormBox>
          <LoginStack spacing={2.5}>
            <img src={Logo} alt="MyComms Logo" class="login-logo" />
            <LoginText>
              Create an account
            </LoginText>
            <TextFieldComponent
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <TextFieldComponent
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <TextFieldComponent
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              type="password"
            />
            <TextFieldComponent
              label="Confirm Password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              onKeyDown={handleKeyDown}
              type="password"
            />
            <DarkBlueButton onClick={newUserRequest} variant="contained">
              Register
            </DarkBlueButton>
            <a
              class="link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              href="/"
              style={{ fontFamily: "Poppins" }}
            >
              Already have an account? <b>Log in</b>
            </a>
          </LoginStack>
        </LoginFormBox>
      </LoginBackground>
    </>
  );
}

export default Register;
