import { USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILED } from '../actions/users'
import { RESET } from '../actions/current'

const init = {
  success: false,
  error: undefined
}

export default (state = init, { type, payload }) => {
  switch (type) {
    case USER_SIGNUP_SUCCESS:
      return {
        success: true
      }

    case USER_SIGNUP_FAILED:
      return {
        error: payload
      }

    case RESET:
      return init

    default:
      return state
  }
}
