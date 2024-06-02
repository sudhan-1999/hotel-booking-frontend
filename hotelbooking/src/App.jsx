import './App.css';
import {Routes,Route,useLocation} from 'react-router-dom';
import Register from './register';
import Login from './login';
import Home from './home';
import Booking from './booking';
import { useEffect } from 'react';
import axios from 'axios';
import Booked from './booked';
//import Search from './search';


function App() {
 // let location = useLocation();
    useEffect(() => {
    async function hotel() {
      try{
      await axios.get("http://localhost:8000/home")
      .then((response)=>{ 
        console.log(response.data);
        localStorage.setItem("data", JSON.stringify(response.data));
      })
      }catch(err){
        console.log(err);
      }
    }
    hotel();
  }, []);//location

  return (
    <>
      <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/book/:_id" element={<Booking />} />
          <Route path="/createOrder" element={<Booked />} />

        </Routes>
      </>
      
  )
}

export default App
