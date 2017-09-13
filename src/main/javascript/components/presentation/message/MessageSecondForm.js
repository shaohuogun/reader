import React from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'
import {RadioButtonGroup} from 'redux-form-material-ui'
import {RadioButton} from 'material-ui/RadioButton'
import {TextField} from 'redux-form-material-ui'

// Validation Functions
const validate = values => {
  const errors = {}
  if (!values.categoryName && !values.categoryId) {
    errors.categoryId = '必填属性，请选择！'
  }

  if (!values.categoryId && !values.categoryName) {
    errors.categoryName = '必填属性，请填写！'
  }

  return errors
}

const MessageSecondForm = ({handleSubmit, catalogs}) => (
  <form onSubmit={handleSubmit}>
  <Field
  name="categoryId"
  component={RadioButtonGroup}
  floatingLabelText="文章分类">
  {catalogs.map(catalog =>
    <RadioButton
    key={catalog.id}
    value={catalog.id}
    label={catalog.name}
    />
  )}
  </Field>

  <Field
  name="categoryName"
  component={TextField}
  hintText="请填写文章分类名称！"
  floatingLabelText="文章分类"
  fullWidth={true}
  />
  </form>
)

MessageSecondForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  catalogs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default reduxForm({
  form: 'messageForm',
  destroyOnUnmount: false
})(MessageSecondForm)
