import { useState, useEffect, useMemo } from 'react'
import { getAllCountries } from '../services/countriesService'

export function useCountries() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('')
  const [sort, setSort] = useState('name-asc')

  useEffect(() => {
    getAllCountries()
      .then(data => setCountries(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    return countries
      .filter(c => {
        const matchName = c.name.common.toLowerCase().includes(search.toLowerCase())
        const matchRegion = region ? c.region === region : true
        return matchName && matchRegion
      })
      .sort((a, b) => {
        if (sort === 'name-asc')  return a.name.common.localeCompare(b.name.common)
        if (sort === 'name-desc') return b.name.common.localeCompare(a.name.common)
        if (sort === 'pop-desc')  return b.population - a.population
        if (sort === 'pop-asc')   return a.population - b.population
        return 0
      })
  }, [countries, search, region, sort])

  const regions = [...new Set(countries.map(c => c.region).filter(Boolean))].sort()

  return { countries, filtered, loading, error, search, setSearch, region, setRegion, sort, setSort, regions }
}
