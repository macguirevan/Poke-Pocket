import { useState, useEffect } from 'react'
import Logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import Auth from './Auth/Auth'
import Avatar from './Avatar/Avatar'
import styles from './Header.module.css'

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('username') !== null);

  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(localStorage.getItem('username') !== null);
    }
    
    handleStorageChange();

    window.addEventListener('storage', handleStorageChange);

    const localStorageSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      localStorageSetItem.apply(this, [key, value]);

      if (key === 'username') {
        window.dispatchEvent(new Event('localStorageChange'));
      }
    };

    window.addEventListener('localStorageChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
      localStorage.setItem = localStorageSetItem;
    };
  });

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={Logo} alt="Logo" width="200px" />
      </Link>
      <input className={styles.searchInput} placeholder="Search" />
      {loggedIn ? <Avatar /> : <Auth />}
    </header>
  )
}