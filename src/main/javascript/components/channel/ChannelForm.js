import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {Card, CardText} from 'material-ui/Card'

import {createChannel} from './submit'

const renderField = ({input, label, type, meta: {touched, error}}) => (
  <div>
  <label>{label}</label>
  <input {...input} placeholder={label} type={type}/>
  {touched && error && <span>{error}</span>}
  </div>
)

class ChannelForm extends React.Component {
  render() {
    const {error, handleSubmit} = this.props
    return (
      <Card
      {...this.props}
      zDepth={0}
      >
      <CardText>
      <form onSubmit={handleSubmit}>
      <div>
      <label>类别：</label>
      <Field name="category" component="select">
      <option></option>
      <option value="book">书籍</option>
      <option value="blog">博客</option>
      </Field>
      </div>

      <Field name="url" type="text" component={renderField} label="频道地址："/>
      <Field name="name" type="text" component={renderField} label="频道名称："/>
      <Field name="publisher" type="text" component={renderField} label="频道作者："/>
      <Field name="description" type="text" component={renderField} label="频道简介："/>
      <Field name="pickingAmount" type="text" component={renderField} label="采集页数："/>

      {error && <strong>{error}</strong>}
      </form>
      </CardText>
      </Card>
    )
  }
}

ChannelForm = reduxForm({
  form: 'channelForm',
  onSubmit: createChannel
})(ChannelForm)

export default connect(state => state.form)(ChannelForm)
