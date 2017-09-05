import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'
import {TextField} from 'redux-form-material-ui'

// Validation Functions
const required = value => (value == null ? '必填属性，请填写！' : undefined)
const emailRegrex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const email = value => (value && !emailRegrex.test(value) ? '无效的Email地址，请检查！' : undefined)

class SignupForm extends Component {
  componentDidMount() {
    this.refs.email // the Field
    .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    .focus() // on TextField
  }

  render() {
    const {handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit}>
      <Field
      name="email"
      component={TextField}
      hintText="请填写电子邮箱的地址！"
      floatingLabelText="电子邮箱"
      fullWidth={true}
      validate={[required, email]}
      ref="email"
      withRef
      />

      <Field
      name="nickname"
      component={TextField}
      hintText="请填写昵称的信息！"
      floatingLabelText="网络昵称"
      fullWidth={true}
      validate={required}
      />

      <Field
      name="password"
      component={TextField}
      hintText="请填写登录的密码！"
      floatingLabelText="媒体简介"
      fullWidth={true}
      validate={required}
      />
      </form>
    )
  }
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'channelForm',
  initialValues: {
    amount: 1
  }
})(SignupForm)
