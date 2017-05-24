import {SubmissionError} from 'redux-form'
import storeProvider from '../../store/storeProvider';

import {
  requestChannel, receiveChannel
} from '../../actions'

export function createChannel(channelForm) {
  const store = storeProvider.getStore()
  store.dispatch(requestChannel(channelForm))
  fetch('/api/channel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(channelForm)
  }).then(response => response.json())
  .then(json => store.dispatch(receiveChannel(json)))
}
