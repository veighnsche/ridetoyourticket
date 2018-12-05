import * as request from 'superagent'
import { baseUrl } from "../constants"

export const SET_EVENTS = 'SET_EVENTS'
export const SET_ONE_EVENT = 'SET_ONE_EVENT'

const setEvents = events => ({
  type: SET_EVENTS,
  payload: events
})

const setOneEvent = event => ({
  type: SET_ONE_EVENT,
  payload: event
})

export const fetchEventsAndCount = () => dispatch =>
  request
  .get(`${baseUrl}/events`)
  .then(result => dispatch(setEvents(result.body)))
  .catch(err => console.error(err))

// todo: don't re-request seen pages
export const fetchEvents = (page = 0) => dispatch =>
  request
  .get(`${baseUrl}/events/${page}`)
  .then(result => dispatch(setEvents(result.body)))
  .catch(err => console.error(err))

export const fetchOneEvent = id => dispatch =>
  request
  .get(`${baseUrl}/event/${id}`)
  .then(result => dispatch(setOneEvent(result.body)))
  .catch(err => console.error(err))