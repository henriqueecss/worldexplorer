import { createContext, useContext, useState } from 'react'
import {
  getFavorites,
  addFavorite as addToStorage,
  removeFavorite as removeFromStorage,
  updateNote as updateInStorage,
} from '../services/favoritesService'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => getFavorites())

  function addFavorite(country) {
    addToStorage(country)
    setFavorites(getFavorites())
  }

  function removeFavorite(cca3) {
    removeFromStorage(cca3)
    setFavorites(getFavorites())
  }

  function updateNote(cca3, note) {
    updateInStorage(cca3, note)
    setFavorites(getFavorites())
  }

  function isFavorite(cca3) {
    return favorites.some(f => f.cca3 === cca3)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, updateNote, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}
