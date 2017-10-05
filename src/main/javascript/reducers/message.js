import {
  UPDATE_PAGINATION,
  UPDATE_MESSAGE_STEPPER,
  SUBMIT_MESSAGE,
  UPDATE_MESSAGE
} from '../actions/message'

export function paginationReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_PAGINATION:
    return Object.assign({}, state, action.pagination)
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
