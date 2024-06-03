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

  async function check() {
    console.log(_id, checkin, checkout);

    try {
      const response = await axios.post(
        `http://localhost:8000/bookings/room/${_id}`,
        {
          checkin,
          checkout,
        }
      );

      console.log(response.data);

      navigate(`/booked`);
    } catch (err) {
      console.log(err);
    } finally {
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
            <Navbar.Brand href="/home" style={{ color: "white" }}>
              Hotel Booking
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/home" style={{ color: "white" }}>
                  Home
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="book">
        <Card key={hotel._id} style={{ width: "80%" }}>
          <Card.Img
            variant="top"
            src={hotel.thumbnail}
            style={{ width: "100%" }}
          />
          <Card.Body>
            <Card.Title>{hotel.Name}</Card.Title>
            <Card.Text>{hotel.description}</Card.Text>
            <Card.Text>{hotel.description1}</Card.Text>
            <Card.Text>{hotel.description2}</Card.Text>
            <Card.Text>{hotel.description3}</Card.Text>
            <Card.Text>{hotel.description4}</Card.Text>
            <Card.Text>
              <p style={{ fontWeight: "bold" }}>Amenities</p>
              <ul>
                <li>{hotel.amenities[0]}</li>
                <li>{hotel.amenities[1]}</li>
                <li>{hotel.amenities[2]}</li>
                <li>{hotel.amenities[3]}</li>
                <li>{hotel.amenities[4]}</li>
                <li>{hotel.amenities[5]}</li>
                <li>{hotel.amenities[6]}</li>
                <li>{hotel.amenities[7]}</li>
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="book1">
        <div>Check In</div>
        <div>
          <input type="date" onChange={(e) => setCheckin(e.target.value)} />
        </div>
        <br />
        <div>Check Out</div>
        <div>
          <input type="date" onChange={(e) => setCheckout(e.target.value)} />
        </div>
        <br />
        <div
          className="button"
          style={{ display: "flex", justifyContent: "space-between" }}
        ></div>
      </div>
      <div className="check">
        <Button onClick={check} >Check Availability</Button>
      </div>
    </>
  );
}

export default Booking;
