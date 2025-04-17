import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import Logo from '../../assets/logo.svg'
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
        <img src={Logo} alt="PokéTrade Logo" className={styles.logo} />
        <p className={styles.tagline}>A central hub for Pokémon TCG Pocket players to connect easily</p>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.sectionTitle}>Connect With Us</h4>
          <div className={styles.socialLinks}>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaTwitter className={styles.socialIcon} />
              <span>Twitter</span>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaFacebook className={styles.socialIcon} />
              <span>Facebook</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaInstagram className={styles.socialIcon} />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.legalLinks}>
          <Link to="/terms" className={styles.legalLink}>Terms of Service</Link>
          <span className={styles.divider}>|</span>
          <Link to="/privacy" className={styles.legalLink}>Privacy Policy</Link>
        </div>
        <p className={styles.copyright}>&copy; {new Date().getFullYear()} Poké Pocket. All rights reserved.</p>
      </div>
    </footer>
  )
}