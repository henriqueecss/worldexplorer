import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { useToast } from '../context/ToastContext'
import Header from '../components/Header'
import styles from './Favorites.module.css'

function Favorites() {
  const navigate = useNavigate()
  const { favorites, removeFavorite, updateNote } = useFavorites()
  const { showToast } = useToast()

  const [editingCca3, setEditingCca3] = useState(null)
  const [draftNote, setDraftNote] = useState('')

  function handleStartEdit(e, country) {
    e.stopPropagation()
    setEditingCca3(country.cca3)
    setDraftNote(country.note)
  }

  function handleSaveNote(e, cca3) {
    e.stopPropagation()
    updateNote(cca3, draftNote)
    setEditingCca3(null)
    showToast('Anotação salva!', 'success')
  }

  function handleCancelEdit(e) {
    e.stopPropagation()
    setEditingCca3(null)
  }

  function handleRemove(e, cca3) {
    e.stopPropagation()
    removeFavorite(cca3)
    showToast('País removido da lista.', 'info')
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.heading}>Minha Lista</h1>
        <p className={styles.subheading}>
          {favorites.length} {favorites.length === 1 ? 'país salvo' : 'países salvos'}
        </p>
        {favorites.length === 0 && (
          <p className={styles.empty}>Nenhum país adicionado ainda.</p>
        )}
        {favorites.map(country => {
          const isEditing = editingCca3 === country.cca3

          return (
            <div
              key={country.cca3}
              className={styles.item}
              onClick={() => !isEditing && navigate(`/country/${country.cca3}`)}
            >
              <img
                className={styles.flag}
                src={country.flags.svg}
                alt={`Bandeira de ${country.name.common}`}
              />
              <div className={styles.info}>
                <div className={styles.itemHeader}>
                  <h3 className={styles.name}>{country.name.common}</h3>
                  {country.subregion && <span className={styles.tag}>{country.subregion}</span>}
                </div>

                <div className={styles.divider} />
                <div className={styles.row}>
                  <span className={styles.label}>Capital</span>
                  <span className={styles.value}>{country.capital?.[0] ?? '—'}</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.row}>
                  <span className={styles.label}>Região</span>
                  <span className={styles.value}>{country.region}</span>
                </div>
                <div className={styles.divider} />

                <div className={styles.noteSection}>
                  <div className={styles.noteHeader}>
                    <span className={styles.label}>Anotação</span>
                    {!isEditing && (
                      <button
                        className={styles.editBtn}
                        onClick={e => handleStartEdit(e, country)}
                      >
                        Editar
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <>
                      <textarea
                        className={styles.note}
                        value={draftNote}
                        placeholder="Escreva sua anotação..."
                        autoFocus
                        onClick={e => e.stopPropagation()}
                        onChange={e => setDraftNote(e.target.value)}
                      />
                      <div className={styles.noteActions}>
                        <button className={styles.saveBtn} onClick={e => handleSaveNote(e, country.cca3)}>
                          Salvar
                        </button>
                        <button className={styles.cancelBtn} onClick={handleCancelEdit}>
                          Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className={styles.notePreview}>
                      {country.note || <span className={styles.notePlaceholder}>Sem anotações</span>}
                    </p>
                  )}
                </div>

                <div className={styles.divider} />
                <button
                  className={styles.removeBtn}
                  onClick={e => handleRemove(e, country.cca3)}
                >
                  Remover da lista
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Favorites
