import { EDIT_TICKET, SET_TICKET, TOGGLE_TICKET } from '../actions/tickets'
import { RESET } from '../actions/current'

const init = {
  showTicket: false,
  ticketId: undefined,
  ticket: {
    id: undefined,
    event: {
      id: undefined,
    },
  },
}

// todo: don't re-request seen pages
export default (state = init, { type, payload }) => {

  switch (type) {

    case SET_TICKET:
    case EDIT_TICKET:
      return {
        ...state,
        ticket: payload,
      }

    case TOGGLE_TICKET:
      return {
        ...state,
        showTicket: !state.showTicket,
        ticketId: payload ? payload : state.ticketId,
      }

    case RESET:
      return init

    default:
      return state
  }
}