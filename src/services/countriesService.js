const BASE_URL = 'https://restcountries.com/v3.1'

export async function getAllCountries() {
  const response = await fetch(`${BASE_URL}/all?fields=name,capital,population,region,subregion,flags,cca3`)
  if (!response.ok) throw new Error('Erro ao buscar países')
  return response.json()
}

export async function getCountryByCode(cca3) {
  const response = await fetch(`${BASE_URL}/alpha/${cca3}`)
  if (!response.ok) throw new Error('País não encontrado')
  const data = await response.json()
  return data[0]
}

export async function getCountriesByCodes(codes) {
  if (!codes || codes.length === 0) return []
  const response = await fetch(`${BASE_URL}/alpha?codes=${codes.join(',')}&fields=name,cca3`)
  if (!response.ok) return []
  return response.json()
}