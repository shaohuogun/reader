import {
  UPDATE_WIZARD,
  UPDATE_PROGRESS,
  SUBMIT_CHANNEL,
  UPDATE_CHANNEL
} from '../actions/tool'

export function wizardReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_WIZARD:
    return Object.assign({}, state, action.wizard)
    default:
    return state
  }
}

export function progressReducer(state = {}, action) {
  console.log(state)
  switch (action.type) {
    case UPDATE_PROGRESS:
    return action.progress
    default:
    return state
  }
}

export function channelReducer(state = {}, action) {
  switch (action.type) {
    case SUBMIT_CHANNEL:
    return Object.assign({}, state, action.channel)
    case UPDATE_CHANNEL:
    return Object.assign({}, state, action.channel)
    default:
    return state
  }
}
