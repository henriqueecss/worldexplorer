import styles from './Spinner.module.css'

function Spinner({ message = 'Carregando...' }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.ring} />
      <p className={styles.message}>{message}</p>
    </div>
  )
}

export default Spinner
