import {
  UPDATE_READING_STEPPER,
  SUBMIT_READING_ITEM,
  UPDATE_READING_ITEM,
  UPDATE_EBOOK_STEPPER,
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

export function readingItemReducer(state = {}, action) {
  switch (action.type) {
    case SUBMIT_READING_ITEM:
    return Object.assign({}, state, action.readingItem)
    case UPDATE_READING_ITEM:
    return Object.assign({}, state, action.readingItem)
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
  console.log(state)
  switch (action.type) {
    case UPDATE_PICKING_PROGRESS:
    return action.progress
    case UPDATE_GENERATING_PROGRESS:
    return action.progress
    default:
    return state
  }
}
