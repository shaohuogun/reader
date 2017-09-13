import React from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'
import {TextField} from 'redux-form-material-ui'

// Validation Functions
const urlRegrex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = '必填属性，请填写！'
  } else if (!urlRegrex.test(values.email)) {
    errors.email = '无效URL，请检查！'
  }
  return errors
}

const MessageFirstForm = ({handleSubmit}) => (
  <form onSubmit={handleSubmit}>
  <Field
  name="url"
  component={TextField}
  hintText="请填写目标文章网址！"
  floatingLabelText="文章网址"
  fullWidth={true}
  />
  </form>
)

MessageFirstForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'messageForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(MessageFirstForm)
