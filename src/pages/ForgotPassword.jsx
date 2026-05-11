import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUsers, resetPassword } from '../services/authService'
import { useToast } from '../context/ToastContext'
import styles from './Login.module.css'

function ForgotPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { showToast } = useToast()

  function handleEmail(e) {
    e.preventDefault()
    setError(null)
    if (!email.includes('@')) { setError('E-mail inválido.'); return }
    const users = getUsers()
    if (!users.find(u => u.email === email.toLowerCase())) {
      setError('E-mail não encontrado.')
      return
    }
    setStep(2)
  }

  function handleReset(e) {
    e.preventDefault()
    setError(null)
    if (password.length < 6) { setError('A senha deve ter no mínimo 6 caracteres.'); return }
    if (password !== confirm) { setError('As senhas não coincidem.'); return }
    try {
      resetPassword(email, password)
      showToast('Senha redefinida com sucesso!', 'success')
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
          <p>Redefinir senha</p>
        </div>

        {step === 1 && (
          <>
            {error && <p className={styles.error}>{error}</p>}
            <form className={styles.form} onSubmit={handleEmail}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="forgot-email">E-mail</label>
                <input id="forgot-email" className={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <button className={styles.button} type="submit">Continuar</button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            {error && <p className={styles.error}>{error}</p>}
            <form className={styles.form} onSubmit={handleReset}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="forgot-password">Nova senha</label>
                <input id="forgot-password" className={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="forgot-confirm">Confirmar nova senha</label>
                <input id="forgot-confirm" className={styles.input} type="password" value={confirm} onChange={e => setConfirm(e.target.value)} />
              </div>
              <button className={styles.button} type="submit">Redefinir senha</button>
            </form>
          </>
        )}

        <div className={styles.links}>
          <Link to="/login" className={styles.link}>Voltar ao login</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
