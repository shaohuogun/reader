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

class ItemThirdPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {previousStep, handleSubmit, pristine, submitting} = this.props
    return (
      <form onSubmit={handleSubmit}>
      <span>步骤三，确认阅读清单信息：</span>
      <div style={toolbarStyle}>
      <Button
      label="上一步"
      disableTouchRipple={true}
      disableFocusRipple={true}
      disabled={pristine || submitting}
      onTouchTap={previousStep}
      style={{margin: '0 15px 0 0'}}
      />
      <Button raised
      label="完成"
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

ItemThirdPage.propTypes = {
  previousStep: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'readingItemForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ItemThirdPage)
