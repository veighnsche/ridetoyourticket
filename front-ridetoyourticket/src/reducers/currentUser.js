import { USER_LOGIN_SUCCESS, USER_LOGOUT } from '../actions/users'
import { localStorageJwtKey } from '../constants'

let init = null
try {
  const jwt = localStorage.getItem(localStorageJwtKey)
  if (jwt) {
    init = { jwt }
  }
}
catch (e) {
  console.log(`Error retrieving data from local storage`, e)
}

export default (state = init, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_SUCCESS:
      return payload

    case USER_LOGOUT:
      return null

    default:
      return state
  }
}
