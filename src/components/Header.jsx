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
      <h1>🌍 WorldExplorer</h1>
      <button className={styles.button} onClick={handleLogout}>Sair</button>
    </header>
  )
}

export default Header