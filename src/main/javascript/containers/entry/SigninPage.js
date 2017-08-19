import React, {Component} from 'react'
import PropTypes from 'prop-types'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block',
}

export default class SigninPage extends Component {
  render() {
    return (
      <div style={pageStyle}>
      <span>This is the signin page.</span>
      </div>
    );
  }
}

SigninPage.propTypes = {
}
