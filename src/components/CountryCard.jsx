function CountryCard({ country }) {
  return (
    <div>
      <img src={country.flags.svg} alt={`Bandeira de ${country.name.common}`} width={80} />
      <h3>{country.name.common}</h3>
      <p>Capital: {country.capital?.[0] ?? 'N/A'}</p>
      <p>Região: {country.region}</p>
      <p>População: {country.population.toLocaleString()}</p>
    </div>
  )
}

export default CountryCard