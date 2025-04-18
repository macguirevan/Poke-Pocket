import { useState, useEffect } from 'react'
import Logo from '../../assets/logo.svg'
import { useLocation, Link } from 'react-router-dom'
import Auth from './Auth/Auth'
import Avatar from './Avatar/Avatar'
import styles from './Header.module.css'
import CreateListingButton from './CreateListingButton/CreateListingButton'
import { useSearch } from '../../contexts/SearchContext'

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('userId') !== null);
  const { searchTerm, setSearchTerm } = useSearch();
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(localStorage.getItem('userId') !== null);
    };

    handleStorageChange();

    window.addEventListener('storage', handleStorageChange);

    const localStorageSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      localStorageSetItem.apply(this, [key, value]);

      if (key === 'userId') {
        window.dispatchEvent(new Event('localStorageChange'));
      }
    };

    window.addEventListener('localStorageChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
      localStorage.setItem = localStorageSetItem;
    };
  }, []);

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={Logo} alt="Logo" width="200px" />
      </Link>

      {location.pathname === '/' && (
        <input
          className={styles.searchInput}
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}

      {loggedIn ? (
        <>
          <CreateListingButton />
          <Avatar />
        </>
      ) : (
        <Auth />
      )}
    </header>
  );
}