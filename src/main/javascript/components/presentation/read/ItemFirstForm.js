import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'
import {TextField} from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'

const toolbarStyle = {
  marginTop: 15,
  marginBottom: 15,
  textAlign: 'center'
}

// Validation Functions
const required = value => (value == null ? '必填属性，请填写！' : undefined)

class ItemFirstForm extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.refs.bookName // the Field
    .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    .focus() // on TextField
  }

  render() {
    const {handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit}>
      <Field
      name="bookName"
      component={TextField}
      hintText="请填写书籍的名称！"
      floatingLabelText="书籍名称"
      fullWidth={true}
      validate={[required]}
      ref="bookName"
      withRef
      />

      <div style={toolbarStyle}>
      <RaisedButton
      label="下一步"
      disableTouchRipple={true}
      disableFocusRipple={true}
      primary={true}
      onTouchTap={handleSubmit}
      />
      </div>
      </form>
    )
  }
}

ItemFirstForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'readingItemForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ItemFirstForm)
