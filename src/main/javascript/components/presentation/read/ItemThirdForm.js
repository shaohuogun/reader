import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'
import {TextField} from 'redux-form-material-ui'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

const toolbarStyle = {
  marginTop: 15,
  marginBottom: 15,
  textAlign: 'center'
}

class ItemThirdForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {handleSubmit, reset} = this.props
    return (
      <form onSubmit={handleSubmit}>
      <div style={toolbarStyle}>
      <FlatButton
      label="重置"
      disableTouchRipple={true}
      disableFocusRipple={true}
      onTouchTap={reset}
      style={{margin: '0 15px 0 0'}}
      />
      <RaisedButton
      label="完成"
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

ItemThirdForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'readingItemForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ItemThirdForm)
