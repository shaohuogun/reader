import {
  UPDATE_PAGINATION,
  GENERATING_EBOOK,
  GENERATED_EBOOK,
  POSTING_EBOOK,
  POSTED_EBOOK
} from '../actions/mine'

export function paginationReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_PAGINATION:
    return Object.assign({}, state, action.pagination)
    default:
    return state
  }
}

export function ebookReducer(state = {}, action) {
  switch (action.type) {
    case GENERATING_EBOOK:
    return Object.assign({}, state, {status: 'generating', channelId: action.channelId})
    case GENERATED_EBOOK:
    return Object.assign({}, state, {status: 'generated', ...action.ebook})
    case POSTING_EBOOK:
    return Object.assign({}, state, {status: 'posting'})
    case POSTED_EBOOK:
    return Object.assign({}, state, {status: 'posted'})
    default:
    return state
  }
}
