import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'
import {RadioButtonGroup} from 'redux-form-material-ui'
import {RadioButton} from 'material-ui/RadioButton'
import {TextField} from 'redux-form-material-ui'

class MessageSecondForm extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.refs.categoryName // the Field
    .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    .focus() // on TextField
  }

  render() {
    const {handleSubmit, catalogs} = this.props
    return (
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
      ref="categoryName"
      withRef
      />
      </form>
    )
  }
}

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
