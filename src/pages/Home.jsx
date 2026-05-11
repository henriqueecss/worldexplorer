import { useState, useEffect } from 'react'
import { getAllCountries } from '../services/countriesService'
import CountryCard from '../components/CountryCard'
import Header from '../components/Header'
import styles from './Home.module.css'

function Home() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getAllCountries()
      .then(data => setCountries(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = countries.filter(country => {
    const matchName = country.name.common.toLowerCase().includes(search.toLowerCase())
    const matchRegion = region ? country.region === region : true
    return matchName && matchRegion
  })

  if (loading) return <p>Carregando...</p>
  if (error) return <p>Erro: {error}</p>

  return (
    <div>
      <Header />
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Buscar país..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.input}
        />
        <select
          value={region}
          onChange={e => setRegion(e.target.value)}
          className={styles.select}
        >
          <option value="">Todas as regiões</option>
          <option value="Africa">África</option>
          <option value="Americas">Américas</option>
          <option value="Asia">Ásia</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className={styles.grid}>
        {filtered.map(country => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  )
}

export default Home