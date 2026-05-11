import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { logout } from '../services/authService'
import styles from './Header.module.css'

function Header() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.logo} onClick={() => navigate('/')}>
          WorldExplorer
        </button>
      </div>
      <nav className={styles.nav}>
        <button className={styles.navBtn} onClick={() => navigate('/')}>Início</button>
        <button className={styles.navBtn} onClick={() => navigate('/favorites')}>Minha Lista</button>
        <button className={styles.navBtn} onClick={handleLogout}>Sair</button>
        <button className={styles.themeBtn} onClick={toggleTheme} title="Alternar tema">
          {theme === 'light' ? '☽' : '☀'}
        </button>
      </nav>
    </header>
  )
}

export default Header