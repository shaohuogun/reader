import React from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'
import {TextField} from 'redux-form-material-ui'

// Validation Functions
const required = value => (value == null ? '必填属性，请填写！' : undefined)
const emailRegrex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const email = value => (value && !emailRegrex.test(value) ? '无效的Email地址，请检查！' : undefined)

const SigninForm = ({handleSubmit}) => (
  <form onSubmit={handleSubmit}>
  <Field
  name="email"
  component={TextField}
  hintText="请填写邮箱地址！"
  floatingLabelText="邮箱"
  fullWidth={true}
  validate={[required, email]}
  />

  <Field
  name="password"
  component={TextField}
  hintText="请填写登录密码！"
  floatingLabelText="密码"
  fullWidth={true}
  validate={required}
  />
  </form>
)

SigninForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'signinForm'
})(SigninForm)
