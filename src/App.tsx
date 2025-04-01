import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/page'
import Listing from './pages/listing/page'
import User from './pages/user/page'
import Login from './pages/login/page'
import Register from './pages/register/page'

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
