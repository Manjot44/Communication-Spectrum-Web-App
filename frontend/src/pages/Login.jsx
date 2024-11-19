import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/Mycommsproblue.png";
import { DarkBlueButton, LoginText, LoginFormBox, LoginBackground, LoginStack } from "../Wrappers.jsx";
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
      <LoginBackground>
        <LoginFormBox>
          <LoginStack spacing={2.5}>
            <img src={Logo} alt="MyComms Logo" class="login-logo" />
            <LoginText>
              Log In to your account
            </LoginText>
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
              type="Password"
            />
            <DarkBlueButton variant="contained" onClick={newUserRequest}>
              Login
            </DarkBlueButton>
            <a
              class="link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              href="/register"
              style={{ fontFamily: "Poppins" }}
            >
              Dont have an account? <b>Register here</b>
            </a>
          </LoginStack>
        </LoginFormBox>
      </LoginBackground>
    </>
  );
}

export default Login;
