import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [login, setLogin] = useState(true);
  const [captcha, setCaptcha] = useState(null);

  const handleCaptchaChange = (value) => {
    setCaptcha(value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents default form submission behavior
    if (!captcha) {
      setLogin(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/login", { Email, Password, captcha });
      if (response.data.message === "Login successful") {
        setEmail("");
        setPassword("");
        setLogin(true);
        localStorage.setItem("user_data", JSON.stringify(response.data.user));
        navigate("/home");
      } else {
        setLogin(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setLogin(false);
    }
  };

  return (
    <Form className="login" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={Email}
          onChange={handleEmailChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={Password}
          onChange={handlePasswordChange}
        />
      </Form.Group>
      <ReCAPTCHA
        sitekey="6LdWJ-4pAAAAAN4dxXuoJHIgZpqDOdsF_9qxDi9S"
        onChange={handleCaptchaChange}
      />
      {login ? "" : <p style={{ color: "red" }}>Wrong Credentials or Missing CAPTCHA!</p>}
      <Button type="submit">
        Login
      </Button>
      <p>
        <a onClick={() => navigate("/forgot-password")} style={{ cursor: "pointer" }}>Forgot Password?</a>
      </p>
      <p>
        Don't have an account?
        <a
          onClick={() => navigate("/")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Click Here!
        </a>
      </p>
    </Form>
  );
}

export default Login;

