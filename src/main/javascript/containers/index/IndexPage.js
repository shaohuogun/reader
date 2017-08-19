import React, {Component, PropTypes} from 'react'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block',
};

export default class IndexPage extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div style={pageStyle}>
      <span>Index of the reader...</span>
      </div>
    );
  }
}
