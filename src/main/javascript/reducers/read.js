import {
  UPDATE_READING_STEPPER,
  UPDATE_READING_LISTS,
  SUBMIT_READING_ITEM,
  UPDATE_READING_ITEM,
} from '../actions/read'

export function readingStepperReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_READING_STEPPER:
    return Object.assign({}, state, action.readingStepper)
    default:
    return state
  }
}

export function readingListReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_READING_LISTS:
    return action.readingLists
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
