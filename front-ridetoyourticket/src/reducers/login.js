import { USER_LOGIN_FAILED } from '../actions/users'
import { RESET } from '../actions/current'

const init = {
  error: undefined
}

export default (state = init, { type, payload }) => {
  switch (type) {

    case USER_LOGIN_FAILED:
      return {
        error: payload
      }

    case RESET:
      return init

    default:
      return state
  }
}
