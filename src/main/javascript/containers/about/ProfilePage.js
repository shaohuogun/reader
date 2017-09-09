import React, {Component} from 'react'
import PropTypes from 'prop-types'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block',
};

export default class ProfilePage extends Component {
  render() {
    return (
      <div style={pageStyle}>
      <span>Profile page of the reader...</span>
      </div>
    );
  }
}

ProfilePage.propTypes = {
}
