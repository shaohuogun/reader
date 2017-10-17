export const SUBMIT_CHANNEL = 'SUBMIT_CHANNEL'
export const UPDATE_CHANNEL = 'UPDATE_CHANNEL'

export const UPDATE_PROGRESS_PICKING_MESSAGE = 'UPDATE_PROGRESS_PICKING_MESSAGE'
export const UPDATE_PROGRESS_GENERATING_EBOOK = 'UPDATE_PROGRESS_GENERATING_EBOOK'

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

export function updateProgressOfPickingMessage(progress) {
  return {
    type: UPDATE_PROGRESS_PICKING_MESSAGE,
    progress
  }
}

export function asyncProgressOfPickingMessage(progressId) {
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
        dispatch(updateProgressOfPickingMessage(json))
        if (json === 100) {
          clearInterval(interval)
          dispatch(updateProgressOfPickingMessage(0))
        }
      })
    }, 1000)
  }
}

export function updateProgressOfGeneratingEbook(progress) {
  return {
    type: UPDATE_PROGRESS_GENERATING_EBOOK,
    progress
  }
}

export function asyncProgressOfGeneratingEbook(progressId) {
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
        dispatch(updateProgressOfGeneratingEbook(json))
        if (json === 100) {
          clearInterval(interval)
          dispatch(updateProgressOfGeneratingEbook(0))
        }
      })
    }, 1000)
  }
}
