import { Link } from 'react-router-dom'
import styles from './Auth.module.css'

export default function Auth() {
  return (
    <div className={styles.auth}>
      <Link to="/login" className={styles.login}>Login</Link>
      <Link to="/register" className={styles.register}>Register</Link>
    </div>
  )
}