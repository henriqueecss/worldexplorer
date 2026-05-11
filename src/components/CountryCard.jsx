import { useNavigate } from 'react-router-dom'
import styles from './CountryCard.module.css'
import { useFavorites } from '../context/FavoritesContext'
import { useToast } from '../context/ToastContext'

function fmt(n) {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`
  return n.toLocaleString()
}

function CountryCard({ country }) {
  const navigate = useNavigate()
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const { showToast } = useToast()
  const favorited = isFavorite(country.cca3)

  function handleFavorite(e) {
    e.stopPropagation()
    if (favorited) {
      removeFavorite(country.cca3)
      showToast(`${country.name.common} removido dos favoritos`, 'info')
    } else {
      addFavorite(country)
      showToast(`${country.name.common} adicionado aos favoritos!`, 'success')
    }
  }

  return (
    <div className={styles.card} onClick={() => navigate(`/country/${country.cca3}`)}>
      <button
        className={`${styles.starBtn} ${favorited ? styles.starActive : ''}`}
        onClick={handleFavorite}
        title={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        {favorited ? '★' : '☆'}
      </button>

      <div className={styles.cardHeader}>
        <img
          className={styles.flag}
          src={country.flags.svg}
          alt={`Bandeira de ${country.name.common}`}
        />
        <div className={styles.nameGroup}>
          <h3 className={styles.name}>{country.name.common}</h3>
          {country.subregion && (
            <span className={styles.tag}>{country.subregion}</span>
          )}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.row}>
        <span className={styles.label}>Capital</span>
        <span className={styles.value}>{country.capital?.[0] ?? '—'}</span>
      </div>

      <div className={styles.divider} />

      <div className={styles.row}>
        <span className={styles.label}>População</span>
        <span className={styles.value}>{fmt(country.population)}</span>
      </div>

      <div className={styles.divider} />
    </div>
  )
}

export default CountryCard