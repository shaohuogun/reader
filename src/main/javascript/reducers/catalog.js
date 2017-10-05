import {
  UPDATE_CATALOGS
} from '../actions/catalog'

export function catalogReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_CATALOGS:
    return action.catalogs
    default:
    return state
  }
}
