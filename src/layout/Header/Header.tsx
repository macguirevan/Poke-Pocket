import Logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import Auth from './Auth/Auth'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={Logo} alt="Logo" width="200px" />
      </Link>
      <input />
      {/* if logged in: Avatar, else: Auth */}
      <Auth />
    </header>
  )
}