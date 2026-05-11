import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../services/authService'
import { useToast } from '../context/ToastContext'
import styles from './Login.module.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { showToast } = useToast()

  function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!email || !password) { setError('Preencha todos os campos.'); return }
    if (!email.includes('@')) { setError('E-mail inválido.'); return }
    if (password.length < 6) { setError('A senha deve ter no mínimo 6 caracteres.'); return }

    try {
      loginUser(email, password)
      showToast('Bem-vindo!', 'success')
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <h1>WorldExplorer</h1>
          <p>Explore países do mundo todo</p>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="login-email">E-mail</label>
            <input id="login-email" className={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="login-password">Senha</label>
            <input id="login-password" className={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button className={styles.button} type="submit">Entrar</button>
        </form>
        <div className={styles.links}>
          <Link to="/forgot-password" className={styles.link}>Esqueci minha senha</Link>
          <Link to="/register" className={styles.link}>Criar conta</Link>
        </div>
      </div>
    </div>
  )
}

export default Login