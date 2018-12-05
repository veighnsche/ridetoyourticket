import { SET_ONE_EVENT } from '../actions/events'
import { ADD_TICKET, EDIT_TICKET } from '../actions/tickets'

const init = []

// todo: don't re-request seen pages
export default (state = init, { type, payload }) => {
  switch (type) {

    case SET_ONE_EVENT:
      return payload.tickets

    case ADD_TICKET:
      return [payload, ...state]

    case EDIT_TICKET:
      return state.map(comment => comment.id === payload.id ? payload : comment)

    default:
      return state
  }
}
