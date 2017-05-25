import {routerReducer as routing} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'
import {combineReducers} from 'redux'
import {
  UPDATE_WIZARD, REQUEST_CHANNEL, RECEIVE_CHANNEL
} from '../actions'

function wizardReducer(state = {}, action) {
  console.log(state)
  switch (action.type) {
    case UPDATE_WIZARD:
    state = Object.assign({}, state, action.wizard)
    console.log(state)
    return state
    default:
    return state
  }
}

function channelReducer(state = {}, action) {
  switch (action.type) {
    case REQUEST_CHANNEL:
    return Object.assign({}, state, action.channel)
    case RECEIVE_CHANNEL:
    return Object.assign({}, state, action.channel)
    default:
    return state
  }
}

const rootReducer = combineReducers({
  routing,
  form: formReducer,
  wizard: wizardReducer,
  channel: channelReducer
})

export default rootReducer
