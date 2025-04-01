import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <nav>
      <Link to="/listing">Listing</Link>
      <Link to="/user">User</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  )
}
