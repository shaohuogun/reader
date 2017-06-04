import {routerReducer as routing} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'
import {combineReducers} from 'redux'
import {
  UPDATE_WIZARD,
  UPDATE_PROGRESS,
  SUBMIT_CHANNEL,
  UPDATE_CHANNEL,
  UPDATE_PAGINATION,
  GENERATING_EBOOK,
  GENERATED_EBOOK,
  POSTING_EBOOK,
  POSTED_EBOOK
} from '../actions'

function wizardReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_WIZARD:
    return Object.assign({}, state, action.wizard)
    default:
    return state
  }
}

function progressReducer(state = {}, action) {
  console.log(state)
  switch (action.type) {
    case UPDATE_PROGRESS:
    return action.progress
    default:
    return state
  }
}

function paginationReducer(state = {}, action) {
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

function ebookReducer(state = {}, action) {
  switch (action.type) {
    case GENERATING_EBOOK:
    return Object.assign({}, state, {status: 'generating', channelId: action.channelId})
    case GENERATED_EBOOK:
    return Object.assign({}, state, {status: 'generated', ...action.ebook})
    case POSTING_EBOOK:
    return Object.assign({}, state, {status: 'posting'})
    case POSTED_EBOOK:
    return Object.assign({}, state, {status: 'posted'})
    default:
    return state
  }
}

const rootReducer = combineReducers({
  routing,
  wizard: wizardReducer,
  progress: progressReducer,
  form: formReducer,
  channel: channelReducer,
  pagination: paginationReducer,
  ebook: ebookReducer
})

export default rootReducer
