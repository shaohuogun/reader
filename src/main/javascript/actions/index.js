export const UPDATE_WIZARD = 'UPDATE_WIZARD'
export const SUBMIT_CHANNEL = 'SUBMIT_CHANNEL'
export const UPDATE_CHANNEL = 'UPDATE_CHANNEL'
export const UPDATE_PAGINATION = 'UPDATE_PAGINATION'
export const ASYNC_PAGINATION = 'ASYNC_PAGINATION'
export const GENERATING_EBOOK = 'GENERATING_EBOOK'
export const GENERATED_EBOOK = 'GENERATED_EBOOK'
export const POSTING_EBOOK = 'POSTING_EBOOK'
export const POSTED_EBOOK = 'POSTED_EBOOK'

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

export function generatingEbook(channelId) {
  return {
    type: GENERATING_EBOOK,
    channelId
  }
}

export function generatedEbook(ebook) {
  return {
    type: GENERATED_EBOOK,
    ebook
  }
}

export function generateEbook(channelId) {
  return dispatch => {
    dispatch(generatingEbook(channelId))
    var url = '/api/ebook/generate?targetType=1&targetId=' + channelId
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(response => response.json())
    .then(json => {
      dispatch(generatedEbook(json))
      dispatch(updateWizard({
        stepIndex: 2
      }))
    })
  }
}

export function postingEbook(ebookId) {
  return {
    type: POSTING_EBOOK,
    ebookId
  }
}

export function postedEbook(ebook) {
  return {
    type: POSTED_EBOOK,
    ebook
  }
}

export function postEbook(ebookId) {
  return dispatch => {
    dispatch(postingEbook(ebookId))
    var url = '/api/ebook/' + ebookId + '/post'
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(response => response.json())
    .then(json => dispatch(postedEbook(json)))
  }
}
