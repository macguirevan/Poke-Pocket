import { Link } from 'react-router-dom'
import Layout from '../../layout/Layout'

export default function Home() {
  return (
    <Layout>
      <nav>
        <Link to="/listing">Listing</Link>
        <Link to="/user">User</Link>
      </nav>
    </Layout>
  )
}
