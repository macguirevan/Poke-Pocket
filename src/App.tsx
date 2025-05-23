import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Listing from './pages/Listing/Listing'
import User from './pages/User/User'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import CreateListing from './pages/CreateListing/CreateListing'
import 'bootstrap/dist/css/bootstrap.min.css'
import TermsOfService from './pages/Terms of Service/TermsOfService'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/listing" element={<Listing />} />
      <Route path="/listing/:id" element={<Listing />} />
      <Route path="/createlisting" element={<CreateListing />} />
      <Route path="/terms" element={<TermsOfService />} />
      {/* Single route pattern handles all usernames */}
      <Route path="/user/:userId" element={<User />} />
      
      {/* Existing /user route for current user's profile */}
      <Route path="/user" element={<User />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}