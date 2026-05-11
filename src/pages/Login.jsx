import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError('Preencha todos os campos.')
      return
    }

    if (!email.includes('@')) {
      setError('E-mail inválido.')
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.')
      return
    }

    localStorage.setItem('user', JSON.stringify({ email }))
    navigate('/')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <h1>🌍 WorldExplorer</h1>
          <p>Explore países do mundo todo</p>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className={styles.button} type="submit">Entrar</button>
        </form>
      </div>
    </div>
  )
}

export default Login