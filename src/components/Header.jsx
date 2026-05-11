import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

function Header() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <header className={styles.header}>
      <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        🌍 WorldExplorer
      </h1>
      <nav className={styles.nav}>
        <button className={styles.navBtn} onClick={() => navigate('/')}>Início</button>
        <button className={styles.navBtn} onClick={() => navigate('/favorites')}>⭐ Minha Lista</button>
        <button className={styles.button} onClick={handleLogout}>Sair</button>
      </nav>
    </header>
  )
}

export default Header