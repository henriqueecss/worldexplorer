import { useState, useEffect } from 'react'
import { getFavorites, removeFavorite, updateNote } from '../services/favoritesService'
import Header from '../components/Header'
import styles from './Favorites.module.css'

function Favorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    setFavorites(getFavorites())
  }, [])

  function handleRemove(cca3) {
    removeFavorite(cca3)
    setFavorites(getFavorites())
  }

  function handleNoteChange(cca3, note) {
    updateNote(cca3, note)
    setFavorites(getFavorites())
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h2>⭐ Minha Lista</h2>
        {favorites.length === 0 && <p>Nenhum país favoritado ainda.</p>}
        {favorites.map(country => (
          <div key={country.cca3} className={styles.item}>
            <img
              className={styles.flag}
              src={country.flags.svg}
              alt={`Bandeira de ${country.name.common}`}
            />
            <div className={styles.info}>
              <h3>{country.name.common}</h3>
              <p>Capital: {country.capital?.[0] ?? 'N/A'}</p>
              <p>Região: {country.region}</p>
              <textarea
                className={styles.note}
                placeholder="Adicione uma anotação..."
                value={country.note}
                onChange={e => handleNoteChange(country.cca3, e.target.value)}
              />
              <button
                className={styles.removeBtn}
                onClick={() => handleRemove(country.cca3)}
              >
                🗑️ Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favorites