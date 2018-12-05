import { SET_EVENTS } from "../actions/events"

const init = {
  events: [],
  page: undefined,
  count: undefined
}

// todo: don't re-request seen pages
export default (state = init, { type, payload }) => {
  switch (type) {

    case SET_EVENTS:
      if (payload.count) return payload
      return { count: state.count, ...payload }

    default:
      return state
  }
}