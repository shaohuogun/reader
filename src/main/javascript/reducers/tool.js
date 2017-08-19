import {
  SUBMIT_CHANNEL,
  UPDATE_CHANNEL,
  UPDATE_EBOOK_STEPPER,
  UPDATE_PROGRESS
} from '../actions/tool'

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

export function ebookStepperReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_EBOOK_STEPPER:
    return Object.assign({}, state, action.ebookStepper)
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
