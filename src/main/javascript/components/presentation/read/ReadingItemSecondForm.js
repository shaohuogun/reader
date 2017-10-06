import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'
import {RadioButtonGroup} from 'redux-form-material-ui'
import {RadioButton} from 'material-ui/RadioButton'
import {TextField} from 'redux-form-material-ui'

class ReadingItemSecondForm extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.refs.listName // the Field
    .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    .focus() // on TextField
  }
  
  render() {
    const {handleSubmit, readingLists} = this.props
    return (
      <form onSubmit={handleSubmit}>
      <Field
      name="listId"
      component={RadioButtonGroup}
      floatingLabelText="阅读清单">
      {readingLists.map(readingList =>
        <RadioButton
        key={readingList.id}
        value={readingList.id}
        label={readingList.name}
        />
      )}
      </Field>

      <Field
      name="listName"
      component={TextField}
      hintText="请填写阅读清单名称！"
      floatingLabelText="阅读清单"
      fullWidth={true}
      ref="listName"
      withRef
      />
      </form>
    )
  }
}

ReadingItemSecondForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  readingLists: PropTypes.array.isRequired
}

export default reduxForm({
  form: 'readingItemForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ReadingItemSecondForm)
