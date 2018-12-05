import * as request from 'superagent'
import { baseUrl } from '../constants'

export const SET_TICKET = 'SET_TICKET'
export const TOGGLE_TICKET = 'TOGGLE_TICKET'
export const ADD_TICKET = 'ADD_TICKET'
export const EDIT_TICKET = 'EDIT_TICKET'

export const setTicket = ticket => ({
  type: SET_TICKET,
  payload: ticket,
})

export const toggleTicket = id => ({
  type: TOGGLE_TICKET,
  payload: id,
})

export const addTicket = ticket => ({
  type: ADD_TICKET,
  payload: ticket,
})

export const editTicket = ticket => ({
  type: EDIT_TICKET,
  payload: ticket,
})

const parse = ticket => {
  if (ticket.price) {
    ticket = {
      ...ticket,
      price: Number(ticket.price) * 100,
    }
  }

  return ticket
}

export const fetchTicket = id => dispatch =>
  request
  .get(`${baseUrl}/tickets/${id}`)
  .then(result => dispatch(setTicket(result.body)))
  .catch(err => console.error(err))

export const sendTicket = (eventId, ticket) => (dispatch, getState) => {

  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  request
  .post(`${baseUrl}/events/${eventId}/tickets`)
  .send(parse(ticket))
  .set('Authorization', `Bearer ${jwt}`)
  .then(result => dispatch(addTicket(result.body)))
  .catch(err => console.error(err))
}

export const sendEditedTicket = (ticketId, ticket) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  request
  .put(`${baseUrl}/tickets/${ticketId}`)
  .send(parse(ticket))
  .set('Authorization', `Bearer ${jwt}`)
  .then(result => dispatch(editTicket(result.body)))
  .catch(err => console.error(err))
}