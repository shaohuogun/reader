import {routerReducer as routing} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'
import {combineReducers} from 'redux'
import {
  UPDATE_WIZARD,
  SUBMIT_CHANNEL,
  UPDATE_CHANNEL,
  UPDATE_PAGINATION
} from '../actions'

function wizardReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_WIZARD:
    return Object.assign({}, state, action.wizard)
    default:
    return state
  }
}

function paginationReducer(state = {}, action) {
  console.log(state)
  switch (action.type) {
    case UPDATE_PAGINATION:
    return Object.assign({}, state, action.pagination)
    default:
    return state
  }
}

function channelReducer(state = {}, action) {
  switch (action.type) {
    case SUBMIT_CHANNEL:
    return Object.assign({}, state, action.channel)
    case UPDATE_CHANNEL:
    return Object.assign({}, state, action.channel)
    default:
    return state
  }
}

const rootReducer = combineReducers({
  routing,
  form: formReducer,
  wizard: wizardReducer,
  channel: channelReducer,
  pagination: paginationReducer
})

export default rootReducer
