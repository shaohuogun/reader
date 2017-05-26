export const UPDATE_WIZARD = 'UPDATE_WIZARD'
export const SUBMIT_CHANNEL = 'SUBMIT_CHANNEL'
export const UPDATE_CHANNEL = 'UPDATE_CHANNEL'
export const UPDATE_PAGINATION = 'UPDATE_PAGINATION'
export const ASYNC_PAGINATION = 'ASYNC_PAGINATION'

export function updateWizard(wizard) {
  return {
    type: UPDATE_WIZARD,
    wizard
  }
}

export function submitChannel(channel) {
  return {
    type: SUBMIT_CHANNEL,
    channel
  }
}

export function updateChannel(channel) {
  return {
    type: UPDATE_CHANNEL,
    channel,
    receivedAt: Date.now()
  }
}

export function updatePagination(pagination) {
  return {
    type: UPDATE_PAGINATION,
    pagination
  }
}

export function asyncPagination(channelId, page) {
  return dispatch => {
    var url = '/api/channel/' + channelId + '/messages?page=' + page
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(response => response.json())
    .then(json => dispatch(updatePagination(json)))
  }
}
