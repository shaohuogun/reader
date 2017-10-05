import {
  UPDATE_CHANNEL_STEPPER,
  SUBMIT_CHANNEL,
  UPDATE_CHANNEL,
  UPDATE_PICKING_PROGRESS,
  UPDATE_GENERATING_PROGRESS
} from '../actions/channel'

export function channelStepperReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_CHANNEL_STEPPER:
    return Object.assign({}, state, action.channelStepper)
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

export function progressReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_PICKING_PROGRESS:
    return action.progress
    case UPDATE_GENERATING_PROGRESS:
    return action.progress
    default:
    return state
  }
}
