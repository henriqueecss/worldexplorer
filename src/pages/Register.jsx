import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../services/authService'
import { useToast } from '../context/ToastContext'
import styles from './Login.module.css'

function getStrength(password) {
  if (!password) return null
  let score = 0
  if (password.length >= 8)           score++
  if (password.length >= 12)          score++
  if (/[A-Z]/.test(password))         score++
  if (/[0-9]/.test(password))         score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { label: 'Fraca',  level: 1 }
  if (score <= 3) return { label: 'Média',  level: 2 }
  return             { label: 'Forte',  level: 3 }
}

function Register() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [error, setError]       = useState(null)
  const navigate    = useNavigate()
  const { showToast } = useToast()

  const strength = getStrength(password)

  function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!email || !password || !confirm)  { setError('Preencha todos os campos.'); return }
    if (!email.includes('@'))              { setError('E-mail inválido.'); return }
    if (password.length < 8)              { setError('A senha deve ter no mínimo 8 caracteres.'); return }
    if (!/[A-Z]/.test(password))          { setError('A senha deve conter pelo menos uma letra maiúscula.'); return }
    if (!/[0-9]/.test(password))          { setError('A senha deve conter pelo menos um número.'); return }
    if (password !== confirm)             { setError('As senhas não coincidem.'); return }

    try {
      registerUser(email, password)
      showToast('Conta criada com sucesso!', 'success')
      navigate('/login')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <h1>WorldExplorer</h1>
          <p>Crie sua conta</p>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="register-email">E-mail</label>
            <input id="register-email" className={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="register-password">Senha</label>
            <input id="register-password" className={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} />
            {strength && (
              <div className={styles.strengthWrapper}>
                <div className={styles.strengthBar}>
                  {[1, 2, 3].map(n => (
                    <div
                      key={n}
                      className={`${styles.strengthSegment} ${n <= strength.level ? styles[`strength${strength.level}`] : ''}`}
                    />
                  ))}
                </div>
                <span className={styles.strengthLabel}>{strength.label}</span>
              </div>
            )}
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="register-confirm">Confirmar senha</label>
            <input id="register-confirm" className={styles.input} type="password" value={confirm} onChange={e => setConfirm(e.target.value)} />
          </div>
          <button className={styles.button} type="submit">Criar conta</button>
        </form>
        <div className={styles.links}>
          <Link to="/login" className={styles.link}>Já tenho conta</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
