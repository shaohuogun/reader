import {
  UPDATE_AGREEMENT
} from '../actions/entry'

export function signupReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_AGREEMENT:
    return action.agreed
    default:
    return state
  }
}
