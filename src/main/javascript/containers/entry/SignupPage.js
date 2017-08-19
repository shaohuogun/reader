import React, {Component, PropTypes} from 'react'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block',
}

export default class SignupPage extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div style={pageStyle}>
      <span>This is the signup page.</span>
      </div>
    );
  }
}
