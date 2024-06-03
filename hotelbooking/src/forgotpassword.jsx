import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Forgotpassword() {
  const navigate = useNavigate();
    const [email,setEmail]=useState("");
    const[Password,setPassword]=useState("");

    
  const handleClick = async (event) => {
    event.preventDefault();
    try {
      console.log(email,Password)
      const response = await axios.post("http://localhost:8000/forgotpassword", { email,Password });
        navigate("/login");
      
      
    } catch (error) {
      console.error("There was an error!", error);
    }
    setEmail("");
    setPassword("");
  };
    
  return (
    <Form className="login">
<Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
        />
      </Form.Group> 
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={Password}
          onChange={(e)=>{setPassword(e.target.value)}}
        />
      </Form.Group>
      <Button type="submit" onClick={handleClick}>
        Reset
      </Button>
      </Form>
)
}

export default Forgotpassword