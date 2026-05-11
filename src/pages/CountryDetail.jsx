import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCountryByCode, getCountriesByCodes } from '../services/countriesService'
import { useFavorites } from '../context/FavoritesContext'
import { useToast } from '../context/ToastContext'
import Header from '../components/Header'
import Spinner from '../components/Spinner'
import styles from './CountryDetail.module.css'

function CountryDetail() {
  const { cca3 } = useParams()
  const navigate = useNavigate()
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const { showToast } = useToast()

  const [country, setCountry] = useState(null)
  const [borders, setBorders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getCountryByCode(cca3)
      .then(async data => {
        setCountry(data)
        if (data.borders && data.borders.length > 0) {
          const borderCountries = await getCountriesByCodes(data.borders)
          setBorders(borderCountries)
        } else {
          setBorders([])
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [cca3])

  function handleFavorite() {
    if (!country) return
    const summary = {
      cca3: country.cca3,
      name: country.name,
      capital: country.capital,
      region: country.region,
      population: country.population,
      flags: country.flags,
    }
    if (isFavorite(country.cca3)) {
      removeFavorite(country.cca3)
      showToast(`${country.name.common} removido dos favoritos`, 'info')
    } else {
      addFavorite(summary)
      showToast(`${country.name.common} adicionado aos favoritos!`, 'success')
    }
  }

  if (loading) return (
    <>
      <Header />
      <Spinner />
    </>
  )

  if (error) return (
    <>
      <Header />
      <div className={styles.centered}>
        <p className={styles.errorMsg}>Não foi possível carregar o país</p>
        <p className={styles.errorDetail}>{error}</p>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>← Voltar</button>
      </div>
    </>
  )

  const favorited = isFavorite(country.cca3)
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A'
  const currencies = country.currencies
    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol ?? ''})`).join(', ')
    : 'N/A'
  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0].common
    : country.name.common

  return (
    <>
      <Header />
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>← Voltar</button>

        <div className={styles.content}>
          <img
            className={styles.flag}
            src={country.flags.svg}
            alt={`Bandeira de ${country.name.common}`}
          />

          <div className={styles.info}>
            <div className={styles.titleRow}>
              <h2>{country.name.common}</h2>
              <button
                className={favorited ? styles.favoritedBtn : styles.favoriteBtn}
                onClick={handleFavorite}
              >
                {favorited ? '★ Favoritado' : '☆ Favoritar'}
              </button>
            </div>

            <div className={styles.details}>
              {[
                ['Nome oficial', country.name.official],
                ['Nome nativo', nativeName],
                ['Capital', country.capital?.[0] ?? '—'],
                ['Região', country.region],
                ['Sub-região', country.subregion ?? '—'],
                ['População', country.population.toLocaleString()],
                ['Área', country.area ? `${country.area.toLocaleString()} km²` : '—'],
                ['Moedas', currencies],
                ['Idiomas', languages],
                ['Domínio', country.tld?.[0] ?? '—'],
              ].map(([label, value]) => (
                <div key={label} className={styles.detailRow}>
                  <span className={styles.detailLabel}>{label}</span>
                  <span className={styles.detailValue}>{value}</span>
                </div>
              ))}
            </div>

            {borders.length > 0 && (
              <div className={styles.borders}>
                <span className={styles.bordersLabel}>Países vizinhos</span>
                <div className={styles.borderList}>
                  {borders.map(b => (
                    <button
                      key={b.cca3}
                      className={styles.borderChip}
                      onClick={() => navigate(`/country/${b.cca3}`)}
                    >
                      {b.name.common}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CountryDetail
