import * as request from 'superagent'
import { baseUrl } from '../constants'

export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

const addComment = comment => ({
  type: ADD_COMMENT,
  payload: comment,
})

const editComment = comment => ({
  type: EDIT_COMMENT,
  payload: comment
})

export const sendComment = (ticketId, comment) => (dispatch, getState) => {

  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  request
  .post(`${baseUrl}/tickets/${ticketId}/comments`)
  .send(comment)
  .set('Authorization', `Bearer ${jwt}`)
  .then(result => dispatch(addComment(result.body)))
  .catch(err => console.error(err))
}

export const sendEditedComment = (commentId, comment) => (dispatch, getState) => {

  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  request
  .put(`${baseUrl}/comments/${commentId}`)
  .send(comment)
  .set('Authorization', `Bearer ${jwt}`)
  .then(result => dispatch(editComment(result.body)))
  .catch(err => console.error(err))
}