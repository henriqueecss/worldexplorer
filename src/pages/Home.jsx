import { useState, useEffect } from 'react'
import { getAllCountries } from '../services/countriesService'
import CountryCard from '../components/CountryCard'

function Home() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getAllCountries()
      .then(data => setCountries(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Carregando...</p>
  if (error) return <p>Erro: {error}</p>

  return (
     <div>
    {countries.map(country => (
      <CountryCard key={country.cca3} country={country} />
    ))}
  </div>
  )
}

export default Home