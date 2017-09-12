import {
  UPDATE_READING_STEPPER,
  SUBMIT_READING_ITEM,
  UPDATE_READING_ITEM,
  UPDATE_MESSAGE_STEPPER,
  UPDATE_CATALOGS,
  SUBMIT_MESSAGE,
  UPDATE_MESSAGE,
  UPDATE_CHANNEL_STEPPER,
  SUBMIT_CHANNEL,
  UPDATE_CHANNEL,
  UPDATE_PICKING_PROGRESS,
  UPDATE_GENERATING_PROGRESS
} from '../actions/tool'

export function readingStepperReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_READING_STEPPER:
    return Object.assign({}, state, action.readingStepper)
    default:
    return state
  }
}

export function readingReducer(state = {}, action) {
  switch (action.type) {
    case SUBMIT_READING_ITEM:
    return Object.assign({}, state, action.readingItem)
    case UPDATE_READING_ITEM:
    return Object.assign({}, state, action.readingItem)
    default:
    return state
  }
}

export function messageStepperReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_MESSAGE_STEPPER:
    return Object.assign({}, state, action.messageStepper)
    default:
    return state
  }
}

export function catalogReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_CATALOGS:
    return action.catalogs
    default:
    return state
  }
}

export function messageReducer(state = {}, action) {
  switch (action.type) {
    case SUBMIT_MESSAGE:
    return Object.assign({}, state, action.message)
    case UPDATE_MESSAGE:
    return Object.assign({}, state, action.message)
    default:
    return state
  }
}

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
