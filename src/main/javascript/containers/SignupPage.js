import React from 'react';
import PropTypes from 'prop-types';

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block',
};

export default class SignupPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={pageStyle}>
      <span>This is the signup page.</span>
      </div>
    );
  }
}

SignupPage.propTypes = {
};
