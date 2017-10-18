export const SUBMIT_MESSAGE = 'SUBMIT_MESSAGE'
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
export const UPDATE_PAGINATION = 'UPDATE_PAGINATION'
export const ASYNC_PAGINATION = 'ASYNC_PAGINATION'

export function submitMessage(message) {
  return {
    type: SUBMIT_MESSAGE,
    message
  }
}

export function updateMessage(message) {
  return {
    type: UPDATE_MESSAGE,
    message
  }
}

export function updateMessagePagination(pagination) {
  return {
    type: UPDATE_PAGINATION,
    pagination
  }
}

export function asyncMessagesInChannel(channelId, page) {
  return dispatch => {
    var url = '/api/channel/' + channelId + '/messages?page=' + page
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(response => response.json())
    .then(json => dispatch(updateMessagePagination(json)))
  }
}
