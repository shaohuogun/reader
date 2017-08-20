import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'
import {TextField} from 'redux-form-material-ui'

import storeProvider from '../../store/storeProvider'
import {
  submitChannel, updateChannel, asyncPickingProgress
} from '../../actions/tool'

export function createChannel(channel) {
  const store = storeProvider.getStore()
  store.dispatch(submitChannel(channel))
  fetch('/api/channel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(channel)
  }).then(response => response.json())
  .then(json => {
    store.dispatch(updateChannel(json))
    store.dispatch(asyncPickingProgress('P-' + json.id))
  })
}

// Validation Functions
const required = value => (value == null ? '必填属性，请填写！' : undefined)
const urlRegrex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
const url = value => (value && !urlRegrex.test(value) ? '无效URL，请检查！' : undefined)
const nonzero = value => (value <= 0 ? '采集数量必须大于0！' : undefined)

class ChannelForm extends Component {
  componentDidMount() {
    this.refs.url // the Field
    .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    .focus() // on TextField
  }

  render() {
    const {handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit}>
      <Field
      name="url"
      component={TextField}
      hintText="请填写媒体的网址！"
      floatingLabelText="媒体网址"
      fullWidth={true}
      validate={[required, url]}
      ref="url"
      withRef
      />

      <Field
      name="name"
      component={TextField}
      hintText="请填写媒体的名称！"
      floatingLabelText="媒体名称"
      fullWidth={true}
      validate={required}
      />

      <Field
      name="description"
      component={TextField}
      hintText="请填写媒体的简介！"
      floatingLabelText="媒体简介"
      fullWidth={true}
      validate={required}
      />

      <Field
      name="amount"
      component={TextField}
      hintText="请填写采集的页数！"
      floatingLabelText="采集页数"
      fullWidth={true}
      validate={[required, nonzero]}
      />
      </form>
    )
  }
}

ChannelForm.propTypes = {
}

export default reduxForm({
  form: 'channelForm',
  onSubmit: createChannel,
  initialValues: {
    amount: 1
  }
})(ChannelForm)
