import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'
import {TextField} from 'redux-form-material-ui'
import Button from 'material-ui/Button'

const toolbarStyle = {
  marginTop: 15,
  marginBottom: 15,
  textAlign: 'center'
}

// Validation Functions
const required = value => (value == null ? '必填属性，请填写！' : undefined)

class ItemFirstPage extends Component {
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
    const {handleSubmit, pristine, submitting} = this.props
    return (
      <form onSubmit={handleSubmit}>
      <span>步骤一，填写待阅读的书名：</span>
      
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
      <Button raised
      label="下一步"
      disableTouchRipple={true}
      disableFocusRipple={true}
      disabled={pristine || submitting}
      primary={true}
      onTouchTap={handleSubmit}
      />
      </div>
      </form>
    )
  }
}

ItemFirstPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'readingItemForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ItemFirstPage)
