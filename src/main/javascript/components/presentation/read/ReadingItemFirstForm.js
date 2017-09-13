import React from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'
import {TextField} from 'redux-form-material-ui'

// Validation Functions
const required = value => (value == null ? '必填属性，请填写！' : undefined)

const ReadingItemFirstForm = ({handleSubmit}) => (
  <form onSubmit={handleSubmit}>
  <Field
  name="bookName"
  component={TextField}
  hintText="请填写书籍的名称！"
  floatingLabelText="书籍名称"
  fullWidth={true}
  validate={required}
  />
  </form>
)

ReadingItemFirstForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'readingItemForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ReadingItemFirstForm)
