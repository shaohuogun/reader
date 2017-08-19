export const SUBMIT_CHANNEL = 'SUBMIT_CHANNEL'
export const UPDATE_CHANNEL = 'UPDATE_CHANNEL'
export const UPDATE_EBOOK_STEPPER = 'UPDATE_EBOOK_STEPPER'
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS'


export function submitChannel(channel) {
  return {
    type: SUBMIT_CHANNEL,
    channel
  }
}

export function updateChannel(channel) {
  return {
    type: UPDATE_CHANNEL,
    channel
  }
}

export function updateEbookStepper(ebookStepper) {
  return {
    type: UPDATE_EBOOK_STEPPER,
    ebookStepper
  }
}

export function updateProgress(progress) {
  return {
    type: UPDATE_PROGRESS,
    progress
  }
}

export function asyncProgress(progressId) {
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
          dispatch(updateEbookStepper({
            stepIndex: 1
          }))
        }
      })
    }, 1000)
  }
}
