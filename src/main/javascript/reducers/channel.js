import {
  SUBMIT_CHANNEL,
  UPDATE_CHANNEL,
  UPDATE_PROGRESS_PICKING_MESSAGE,
  UPDATE_PROGRESS_GENERATING_EBOOK
} from '../actions/channel'

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

export function progressReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_PROGRESS_PICKING_MESSAGE:
    return Object.assign({}, state, {pickingMessage: action.progress})
    case UPDATE_PROGRESS_GENERATING_EBOOK:
    return Object.assign({}, state, {generatingEbook: action.progress})
    default:
    return state
  }
}
