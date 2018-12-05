import { SET_TICKET } from '../actions/tickets'
import { ADD_COMMENT, EDIT_COMMENT } from '../actions/comments'

const init = []

export default (state = init, { type, payload }) => {
  switch (type) {

    case SET_TICKET:
      return payload.comments

    case ADD_COMMENT:
      return [payload, ...state]

    case EDIT_COMMENT:
      return state.map(comment => comment.id === payload.id ? payload : comment)

    default:
      return state
  }
}