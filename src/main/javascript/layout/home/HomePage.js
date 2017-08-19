import React, {Component, PropTypes} from 'react'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block',
};

export default class HomePage extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div style={pageStyle}>
      <span>Home page of the reader...</span>
      </div>
    );
  }
}
