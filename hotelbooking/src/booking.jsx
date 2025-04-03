import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function Booking() {
  const navigate = useNavigate();
  const { _id } = useParams();
  console.log(_id, useParams);
  const data = localStorage.getItem("data");
  const datas = JSON.parse(data);
  const hotel = datas.find((data) => data._id === _id);
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [book, setBook] = useState(false);

  async function check() {

    try {
      const response = await axios.post(
        `https://hotel-booking-backend-ngja.onrender.com/bookings/room/${_id}`,
        {
          checkin,
          checkout,
        }
      );
      navigate(`/booked`);
    } catch (err) {
      console.log(err.message);
      if (err.message == "Request failed with status code 400") {
        setBook(true);
      }
    }
  }

  if (!hotel) {
    return <div>Hotel data not found...!</div>;
  }

  return (
    <>
      <div className="nav">
        <Navbar
          bg="primary"
          expand="lg"
          style={{ height: "auto", width: "100%" }}
        >
          <Container>
            <Navbar.Brand href="/" style={{ color: "white" }}>
              Hotel Booking
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/" style={{ color: "white" }}>
                  Home
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="book">
      <Card key={hotel._id} className="card">
  <div className="card-img-container">
    <Card.Img variant="top" src={hotel.thumbnail} />
  </div>
  <Card.Body>
    <Card.Title>{hotel.Name}</Card.Title>
    <Card.Text>{hotel.description}</Card.Text>
    <Card.Text>{hotel.description1}</Card.Text>
    <Card.Text>{hotel.description2}</Card.Text>

    {/* Amenities Section BELOW the Description */}
    <div className="amenities">
      <h4>Amenities</h4>
      <ul>
        {hotel.amenities?.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>
    </div>
  </Card.Body>
</Card>

</div>

<div className="book1">
  <div>Check In</div>
  <input type="date" onChange={(e) => setCheckin(e.target.value)} />
  <br />
  <div>Check Out</div>
  <input type="date" onChange={(e) => setCheckout(e.target.value)} />
</div>

<div className="check">
  <Button onClick={check}>Reserve</Button>
  {book && <p className="error-message">Room Already Booked</p>}
</div>


    </>
  );
}

export default Booking;
