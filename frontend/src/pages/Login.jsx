import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@mui/material/Button";

// Image assets
// Logos
import Logo from "../assets/Mycommsproblue.png";
import Apple from "../assets/apple.png";
import Facebook from "../assets/Facebook.png";
import Google from "../assets/Google.png";

import TextFieldComponent from "../components/TextFieldComponent";
import "../App.css";

function Login({ setTokenFunc }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  // Submits the login form when the enter key is pressed in any of the fields
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      newUserRequest();
    }
  }

  // POST request for logging in a new user
  const newUserRequest = async () => {
    if (email !== "" && password !== "") {
      try {
        const response = await axios.post(
          "http://localhost:5005/admin/auth/login",
          {
            email,
            password,
          }
        );
        await setTokenFunc(response.data.token);
        navigate("/UserManage");
      } catch (err) {
        const errorMessage =
          err.response && err.response.data && err.response.data.error
            ? err.response.data.error
            : "An error occurred. Please try again.";
        alert(errorMessage);
      }
    } else if (email === "" || password === "") {
      alert("Please fill in all fields");
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
        class="d-flex justify-content-center align-items-center login-background"
      >
        <div id="outside-box" class="mx-auto login-form">
          <img src={Logo} alt="MyComms Logo" class="login-logo" />
          <h3 class="login-text">Log In to your account</h3>

          <TextFieldComponent
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <br />
          <br />
          <TextFieldComponent
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            type="Password"
          />
          <br />
          <br />

          <Button
            onClick={newUserRequest}
            variant="contained"
            style={{
              backgroundColor: "#000CA4",
              width: "75%",
              borderRadius: "20px",
              fontFamily: "Poppins",
            }}
          >
            Login
          </Button>
          <br />
          <br />
          <p>
            <a
              class="link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              href="/register"
              style={{ fontFamily: "Poppins" }}
            >
              Dont have an account? <b>Register here</b>
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
