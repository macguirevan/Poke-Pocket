import Logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import Auth from './Auth/Auth'
import Avatar from './Avatar/Avatar'
import styles from './Header.module.css'

export default function Header() {
  const isLoggedIn = window.localStorage.getItem('userInfo') !== null;

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={Logo} alt="Logo" width="200px" />
      </Link>
      <input className={styles.searchInput} placeholder="Search" />
      {isLoggedIn ? <Avatar /> : <Auth />}
    </header>
  )
}