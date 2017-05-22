import {SubmissionError} from 'redux-form'
import storeProvider from '../../store/storeProvider';

import {
  requestChannel, receiveChannel
} from '../../actions'

export function createChannel(channelForm) {
  if ((typeof(channelForm.category) == "undefined") || (channelForm.category == null)) {
    throw new SubmissionError({category: '类型不可以为空！', _error: '提交媒体频道失败！'})
  } else if ((typeof(channelForm.url) == "undefined") || (channelForm.url == null)) {
    throw new SubmissionError({url: 'URL不可以为空！', _error: '提交媒体频道失败！'})
  } else if ((typeof(channelForm.name) == "undefined") || (channelForm.name == null)) {
    throw new SubmissionError({name: '名称不可以为空！', _error: '提交媒体频道失败！'})
  } else if ((typeof(channelForm.publisher) == "undefined") || (channelForm.publisher == null)) {
    throw new SubmissionError({publisher: '作者不可以为空！', _error: '提交媒体频道失败！'})
  } else if ((typeof(channelForm.description) == "undefined") || (channelForm.description == null)) {
    throw new SubmissionError({description: '描述不可以为空！', _error: '提交媒体频道失败！'})
  } else if ((typeof(channelForm.pickingAmount) == "undefined") || (channelForm.pickingAmount == null)) {
    throw new SubmissionError({pickingAmount: '采集数量不可以为空！', _error: '提交媒体频道失败！'})
  }
  
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
