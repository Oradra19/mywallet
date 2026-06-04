const TOKEN_KEY = 'token'
const USER_KEY = 'user'
const TRANSACTIONS_KEY = 'transactions'

function parseJson(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setStoredToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function getStoredUser() {
  return parseJson(localStorage.getItem(USER_KEY), null)
}

export function setStoredUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearAuthStorage() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getStoredTransactions() {
  return parseJson(localStorage.getItem(TRANSACTIONS_KEY), [])
}

export function setStoredTransactions(transactions) {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions))
}
