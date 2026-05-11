const KEY = 'favorites'

export function getFavorites() {
  return JSON.parse(localStorage.getItem(KEY)) || []
}

export function addFavorite(country) {
  const favorites = getFavorites()
  const already = favorites.find(f => f.cca3 === country.cca3)
  if (already) return
  favorites.push({ ...country, note: '' })
  localStorage.setItem(KEY, JSON.stringify(favorites))
}

export function removeFavorite(cca3) {
  const favorites = getFavorites().filter(f => f.cca3 !== cca3)
  localStorage.setItem(KEY, JSON.stringify(favorites))
}

export function updateNote(cca3, note) {
  const favorites = getFavorites().map(f =>
    f.cca3 === cca3 ? { ...f, note } : f
  )
  localStorage.setItem(KEY, JSON.stringify(favorites))
}