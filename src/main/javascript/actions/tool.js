export const UPDATE_WIZARD = 'UPDATE_WIZARD'
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS'
export const SUBMIT_CHANNEL = 'SUBMIT_CHANNEL'
export const UPDATE_CHANNEL = 'UPDATE_CHANNEL'

export function updateWizard(wizard) {
  return {
    type: UPDATE_WIZARD,
    wizard
  }
}

export function updateProgress(progress) {
  return {
    type: UPDATE_PROGRESS,
    progress
  }
}

export function asyncProgressWithInterval(progressId) {
  return dispatch => {
    const interval = setInterval(() => {
      var url = '/api/progress/' + progressId
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(response => response.json())
      .then(json => {
        dispatch(updateProgress(json))
        if (json === 100) {
          clearInterval(interval);
          dispatch(updateWizard({
            stepIndex: 1
          }))
        }
      })
    }, 1000)
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
