import React, {Component, PropTypes} from 'react'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block',
}

export default class SigninPage extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div style={pageStyle}>
      <span>This is the signin page.</span>
      </div>
    );
  }
}
