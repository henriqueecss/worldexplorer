const USERS_KEY = 'wex_users'
const SESSION_KEY = 'user'

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || []
}

export function registerUser(email, password) {
  const users = getUsers()
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('E-mail já cadastrado.')
  }
  users.push({ email: email.toLowerCase(), password })
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function loginUser(email, password) {
  const users = getUsers()
  const user = users.find(
    u => u.email === email.toLowerCase() && u.password === password
  )
  if (!user) throw new Error('E-mail ou senha incorretos.')
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email }))
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(SESSION_KEY))
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

export function resetPassword(email, newPassword) {
  const users = getUsers()
  const idx = users.findIndex(u => u.email === email.toLowerCase())
  if (idx === -1) throw new Error('E-mail não encontrado.')
  users[idx].password = newPassword
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}
