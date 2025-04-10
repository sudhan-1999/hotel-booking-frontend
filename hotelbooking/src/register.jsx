import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Register() {

  const [Name, setName] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  async function click(event) {
    event.preventDefault();
    try { 
      const res = await axios.post("https://hotel-booking-backend-ngja.onrender.com/register", {
        Name,
        Email,
        Password,
      });
  
      console.log(res.data);
      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
  
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("User already exists. Please log in.");
      } else {
        alert("Registration failed. Please try again later.");
      }
      console.error("Axios error:", error); // full log for debugging
    }
  }
  
  return (
    <div className="registerpage">
      <form action="/action_page.php" class="was-validated">
        <div class="mb-3 mt-3">
          <label for="First Name" class="form-label">
            Name:
          </label>

          <input
            type="text"
            class="form-control"
            id="Name"
            placeholder="  Name"
            name="Name"
            onChange={handleFirstNameChange}
            required
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="email" class="form-label">
            Email:
          </label>

          <input
            type="email"
            class="form-control"
            id="Email"
            placeholder="Enter email"
            name="Email"
            onChange={handleEmailChange}
            required
          />
        </div>
        <div class="mb-3">
          <label for="pwd" class="form-label">
            Password:
          </label>

          <input
            type="password"
            class="form-control"
            id="Password"
            placeholder="Enter password"
            name="Password"
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" class="btn btn-primary" onClick={click}>
          Register Now
        </button>
        <p>
          Already Have An Account?
          <a
            style={{ color: "rgb(0, 0, 255)" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
