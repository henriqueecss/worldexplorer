import { useCountries } from '../hooks/useCountries'
import CountryCard from '../components/CountryCard'
import Header from '../components/Header'
import Spinner from '../components/Spinner'
import styles from './Home.module.css'

const SORT_OPTIONS = [
  { value: 'name-asc',  label: 'Nome A → Z' },
  { value: 'name-desc', label: 'Nome Z → A' },
  { value: 'pop-desc',  label: 'Maior população' },
  { value: 'pop-asc',   label: 'Menor população' },
]

function Home() {
  const { countries, filtered, loading, error, search, setSearch, region, setRegion, sort, setSort } = useCountries()

  if (loading) return (
    <>
      <Header />
      <Spinner />
    </>
  )

  if (error) return (
    <>
      <Header />
      <div className={styles.errorState}>
        <p className={styles.errorTitle}>Não foi possível carregar os países</p>
        <p className={styles.errorDetail}>{error}</p>
        <button className={styles.retryBtn} onClick={() => window.location.reload()}>
          Tentar novamente
        </button>
      </div>
    </>
  )

  return (
    <div>
      <Header />
      <div className={styles.hero}>
        <span className={styles.heroEyebrow}>{countries.length} países · 8 regiões</span>
        <h1 className={styles.heroTitle}>WorldExplorer</h1>
        <p className={styles.heroSubtitle}>
          Uma coleção curada de países ao redor do mundo, explorando sua cultura, geografia e características únicas.
        </p>
      </div>
      <div className={styles.filters}>
        <input
          className={styles.input}
          type="text"
          placeholder="Buscar país..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className={styles.select} value={region} onChange={e => setRegion(e.target.value)}>
          <option value="">Todas as regiões</option>
          <option value="Africa">África</option>
          <option value="Americas">Américas</option>
          <option value="Asia">Ásia</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceania</option>
        </select>
        <select className={styles.select} value={sort} onChange={e => setSort(e.target.value)}>
          {SORT_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className={styles.count}>{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</span>
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
