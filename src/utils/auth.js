import Cookies from 'js-cookie'

const TokenKey = 'I_Have_A_Dream'
const TimeKey = 'Login_TimeKey'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setTimeKey(time) {
  return Cookies.set(TimeKey, time)
}

export function getTimeKey() {
  return Cookies.get(TimeKey)
}

export function removeTimeKey() {
  return Cookies.remove(TimeKey)
}