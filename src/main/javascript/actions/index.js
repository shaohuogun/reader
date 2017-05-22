export const REQUEST_CHANNEL = 'REQUEST_CHANNEL'
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL'

export function requestChannel(channel) {
  return {
    type: REQUEST_CHANNEL,
    channel
  }
}

export function receiveChannel(channel) {
  return {
    type: RECEIVE_CHANNEL,
    channel,
    receivedAt: Date.now()
  }
}

export function ansyncRequest(channel) {
  return dispatch => {
    dispatch(requestChannel(channel))
    return fetch('/api/channel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(channel)
    }).then(response => response.json())
    .then(json => dispatch(receiveChannel(json)))
  }
}
