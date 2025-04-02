import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Listing from './pages/Listing/Listing'
import User from './pages/User/User'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/listing" element={<Listing />} />
      <Route path="/User" element={<User />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}
