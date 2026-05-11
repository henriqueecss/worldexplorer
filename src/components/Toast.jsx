import { useToast } from '../context/ToastContext'
import styles from './Toast.module.css'

function ToastInner({ toast }) {
  return (
    <div className={`${styles.toast} ${styles[toast.type]}`}>
      {toast.message}
    </div>
  )
}

function Toast() {
  const { toast } = useToast()
  if (!toast) return null
  return <ToastInner key={toast.id} toast={toast} />
}

export default Toast
