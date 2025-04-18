
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';


function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [initialData, setInitialData] = useState([]);
  const [selectedHotels, setSelectedHotels] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    // Load initial data from localStorage
    const data = localStorage.getItem("data");
    const parsedData = JSON.parse(data);
    if (parsedData) {
      setInitialData(parsedData);
    }
    async function searchHotels() {
      try {
        console.log(`Searching for hotels with search term: ${search}`);
        const response = await axios.get(`https://hotel-booking-backend-ngja.onrender.com/home/${search}`);
        setResults(response.data);
      } catch (err) {
        console.error('Error fetching hotels:', err);
      }
    }
    if (searchTriggered) {
      searchHotels();
      setSearchTriggered(false);
    }
  }, [searchTriggered, search]);
/* */
  const handleSearch = () => {
    setSearchTriggered(true);
  };
 //check for uesr loged in
 useEffect(() => {
 const userData = localStorage.getItem("user_data");
 if (userData) {
   setLogin(!login);
 }
},[]);
 //logout
 const loggingout = () => {
   localStorage.removeItem("user_data");
   setLogin(!login);
   navigate("/");
 }
  const handleSelectHotel = (hotel) => {
    setSelectedHotels((prevSelected) => {
      if (prevSelected.some(h => h._id === hotel._id)) {
        return prevSelected.filter(h => h._id !== hotel._id);
      }
      if (prevSelected.length < 2) {
        return [...prevSelected, hotel];
      }
      return prevSelected;
    });
  };

  const handleCompare = () => {
    setShowComparison(true);
  };

  const displayHotels = search ? results : initialData;

  return (
    <>
      <div className="nav" > 
        <Navbar bg="primary" expand="lg"  style={{ height: "auto", width: "100%" }}>
          <Container>
            <Navbar.Brand href="/" style={{color:"white"}}>Hotel Booking</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/" style={{color:"white"}}>Home</Nav.Link>
                {login ? <Nav.Link  style={{color:"white"}} onClick={loggingout}>logout</Nav.Link> : <Nav.Link href="/login" style={{color:"white"}} >login</Nav.Link>}
              </Nav>
            </Navbar.Collapse>
            <Form inline>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    onChange={(e) => { setSearch(e.target.value) }}
                  />
                </Col>
                <Col xs="auto">
                  <Button type="button" onClick={handleSearch}>Search</Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </Navbar>
      </div>

      <Container className="mt-4">
        {selectedHotels.length === 2 && (
          <Button onClick={handleCompare} className="mb-3">
            Compare Selected Hotels
          </Button>
        )}
        
        {displayHotels.length > 0 ? (
          <Row>
            {displayHotels.map((hotel) => (
              <Col md={3} key={hotel._id} className="mb-4">
                <Card   style={{ cursor: 'pointer', border: selectedHotels.some(h => h._id === hotel._id) ? '2px solid green' : 'none' }}>
                  <Card.Img variant="top" src={hotel.thumbnail}  onClick={() => { navigate(`/book/` + hotel._id) }}/>
                  <Card.Body>
                    <Card.Title>{hotel.Name}</Card.Title>
                    <Button 
                      variant={selectedHotels.some(h => h._id === hotel._id) ? "danger" : "primary"} 
                      onClick={() => handleSelectHotel(hotel)}
                    >
                      {selectedHotels.some(h => h._id === hotel._id) ? "Deselect" : "Compare"}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="notfound">Not found..!</div>
        )}

        <Modal show={showComparison} onHide={() => setShowComparison(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Compare Hotels</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedHotels.length === 2 && (
              <Row>
                {selectedHotels.map((hotel) => (
                  <Col md={6} key={hotel._id}>
                    <Card>
                      <Card.Img variant="top" src={hotel.thumbnail} />
                      <Card.Body>
                        <Card.Title>{hotel.Name}</Card.Title>
                        <Card.Text>Location: {hotel.location}</Card.Text>
                        <Card.Text>Price: RS.{hotel.price}</Card.Text>
                        <Card.Text>
                          <strong>Amenities:</strong>
                          <ul>
                            {hotel.amenities.map((amenity, index) => (
                              <li key={index}>{amenity}</li>
                            ))}
                          </ul>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default Home;
