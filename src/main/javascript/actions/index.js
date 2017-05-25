export const UPDATE_WIZARD = 'UPDATE_WIZARD'
export const SUBMIT_CHANNEL = 'SUBMIT_CHANNEL'
export const UPDATE_CHANNEL = 'UPDATE_CHANNEL'

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

export function ansyncRequest(channel) {
  return dispatch => {
    dispatch(submitChannel(channel))
    return fetch('/api/channel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(channel)
    }).then(response => response.json())
    .then(json => dispatch(updateChannel(json)))
  }
}
