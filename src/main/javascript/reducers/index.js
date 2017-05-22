import {routerReducer as routing} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'
import {combineReducers} from 'redux'
import {
  REQUEST_CHANNEL, RECEIVE_CHANNEL
} from '../actions'

function createChannel(state = {
  isFetching: false,
  didInvalidate: false,
  channel: {}
}, action) {
  switch (action.type) {
    case REQUEST_CHANNEL:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false,
      channel: action.channel,
    })
    case RECEIVE_CHANNEL:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      channel: action.channel,
      lastUpdated: action.receivedAt
    })
    default:
    return state
  }
}

const rootReducer = combineReducers({
  routing,
  form: formReducer,
  createChannel
})

export default rootReducer
