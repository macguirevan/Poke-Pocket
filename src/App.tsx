import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Home from './pages/Home/Home'
import Listing from './pages/Listing/Listing'
import User from './pages/User/User'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/listing" element={<Listing />} />
      <Route path="/listing/:id" element={<Listing />} />
      
      {/* Single route pattern handles all usernames */}
      <Route path="/user/:userId" element={<User />} />
      
      {/* Existing /user route for current user's profile */}
      <Route path="/user" element={<User />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}