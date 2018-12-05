import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import ReduxThunk from 'redux-thunk'

import { storeJwt, socketIo } from './middleware'
import reducers from './reducers'
import SocketIO from './socketio'

const reducer = combineReducers(reducers)

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f

const socket = new SocketIO()

const enhancer = compose(
  applyMiddleware(
    ReduxThunk,
    storeJwt,
    socketIo(socket)
  ),
  devTools
)

const store = createStore(reducer, enhancer)

// when JWT was coming from localStorage, connect via websockets
const initialCurrentUser = store.getState().currentUser
if (initialCurrentUser) {
  socket.connect(store.dispatch, initialCurrentUser.jwt)
}

export default store
