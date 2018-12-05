import { RESET } from "../actions/current"
import { SET_ONE_EVENT } from "../actions/events"
import { SET_TICKET } from "../actions/tickets"
import { localStorageJwtKey } from "../constants"
import { USER_LOGIN_SUCCESS, USER_LOGOUT } from "../actions/users"

const checkForJwt = () => {
  try {
    return !!localStorage.getItem(localStorageJwtKey)
  }
  catch (e) {
    console.log(`Error retrieving data from local storage`, e)
  }
}

const init = {
  title: 'Tickety',
  hasJwt: checkForJwt()
}

export default (state = init, { type, payload }) => {
  switch (type) {

    case RESET:
      return {
        ...state,
        title: init.title
      }

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        hasJwt: true
      }

    case USER_LOGOUT:
      return {
        ...state,
        hasJwt: false
      }

    case SET_ONE_EVENT:
      return {
        ...state,
        title: payload.title
      }

    case SET_TICKET:
      return {
        ...state,
        title: payload.event.title
      }

    default:
      return state
  }
}