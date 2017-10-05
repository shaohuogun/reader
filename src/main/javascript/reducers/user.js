import {
  UPDATE_AGREEMENT
} from '../actions/user'

export function userReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_AGREEMENT:
    return action.agreed
    default:
    return state
  }
}
