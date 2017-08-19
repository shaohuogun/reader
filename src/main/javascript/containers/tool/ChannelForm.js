import React, {Component, PropTypes} from 'react'
import {Card, CardText} from 'material-ui/Card'
import {Field, reduxForm} from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import {SelectField, TextField} from 'redux-form-material-ui'

import storeProvider from '../../store/storeProvider'
import {
  submitChannel, updateChannel, asyncProgressWithInterval
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
    store.dispatch(asyncProgressWithInterval(json.id))
  })
}

// validation functions
const required = value => (value == null ? '此内容属于必填项，请填写！' : undefined)
const urlRegrex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
const url = value =>
(value && !urlRegrex.test(value)
? '请填写有效的URL地址！'
: undefined)
const nonzero = value => (value <= 0 ? '采集数量必须要大于0！' : undefined)

class ChannelForm extends Component {
  static propTypes = {
  }

  componentDidMount() {
    this.refs.url // the Field
    .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    .focus() // on TextField
  }

  render() {
    const {handleSubmit} = this.props
    return (
      <Card
      {...this.props}
      zDepth={0}
      >
      <CardText>
      <form onSubmit={handleSubmit}>
      <Field
      name="category"
      component={SelectField}
      hintText="请选择待采集媒体的类型：博客 or 书籍？"
      floatingLabelText="媒体类型"
      fullWidth={true}
      validate={required}
      >
      <MenuItem value="blog" primaryText="博客" />
      <MenuItem value="book" primaryText="书籍" />
      </Field>

      <Field
      name="url"
      component={TextField}
      hintText="请填写媒体的网络地址！"
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
      name="publisher"
      component={TextField}
      hintText="请填写媒体的作者！"
      floatingLabelText="频道作者"
      fullWidth={true}
      validate={required}
      />

      <Field
      name="description"
      component={TextField}
      hintText="请填写频道的简介！"
      floatingLabelText="频道简介"
      fullWidth={true}
      validate={required}
      />

      <Field
      name="pickingAmount"
      component={TextField}
      hintText="请填写采集的页数！"
      floatingLabelText="采集页数"
      fullWidth={true}
      validate={[required, nonzero]}
      />
      </form>
      </CardText>
      </Card>
    )
  }
}

export default reduxForm({
  form: 'channelForm',
  onSubmit: createChannel,
  initialValues: {
    category: 'blog',
    pickingAmount: 1
  }
})(ChannelForm)
