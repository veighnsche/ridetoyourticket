import { SET_ONE_EVENT } from "../actions/events"
import { RESET } from "../actions/current"

const init = {}

// todo: don't re-request seen pages
export default (state = init, { type, payload }) => {
  switch (type) {

    case SET_ONE_EVENT:
      return payload

    case RESET:
      return init

    default:
      return state
  }
}