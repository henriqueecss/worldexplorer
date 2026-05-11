import { useToast } from '../context/ToastContext'
import styles from './Toast.module.css'

function Toast() {
  const { toast } = useToast()

  if (!toast) return null

  return (
    <div className={`${styles.toast} ${styles[toast.type]}`}>
      {toast.message}
    </div>
  )
}

export default Toast
