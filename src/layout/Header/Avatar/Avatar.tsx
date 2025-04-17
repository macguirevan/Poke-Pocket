import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import styles from './Avatar.module.css'
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Avatar() {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const menu = useRef<HTMLDivElement>(null);
  const menuBtn = useRef<HTMLDivElement>(null);
  const userId = localStorage.getItem("userId");

  const toggleDrop = () => {
    setDropDown(!dropDown);
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (menuBtn.current && menuBtn.current.contains(e.target as Node)) {
      return;
    }

    if (menu.current && !menu.current.contains(e.target as Node) && dropDown) {
      setDropDown(false);
    }
  }

  document.addEventListener('mousedown', handleClickOutside);

  return (
      <div className={styles.avatarContainer}>
        <div
          className={styles.iconContainer}
          ref={menuBtn}
          onClick={toggleDrop}
        >
          <FontAwesomeIcon className={styles.icon} icon={faCircleUser} size="2x" />
        </div>
        {dropDown && (
          <div className={styles.profileMenu} ref={menu}>
            <ul>
              <li>
                <Link to={`/user/${userId}`} onClick={() => toggleDrop()}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={() => {
                  toggleDrop()
                  localStorage.removeItem('userId');
                  localStorage.removeItem('username');
                }}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
  )
}