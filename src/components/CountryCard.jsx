import styles from './CountryCard.module.css'

function CountryCard({ country }) {
  return (
    <div className={styles.card}>
      <img
        className={styles.flag}
        src={country.flags.svg}
        alt={`Bandeira de ${country.name.common}`}
      />
      <div className={styles.info}>
        <h3>{country.name.common}</h3>
        <p>Capital: {country.capital?.[0] ?? 'N/A'}</p>
        <p>Região: {country.region}</p>
        <p>População: {country.population.toLocaleString()}</p>
      </div>
    </div>
  )
}

export default CountryCard