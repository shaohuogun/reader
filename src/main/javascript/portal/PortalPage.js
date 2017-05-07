import React from 'react';
import PropTypes from 'prop-types';

const pageStyle = {
  width: 800,
  marginTop: 20,
  marginLeft: 20,
  float: 'left',
  display: 'inline-block',
};

export default class PortalPage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div style={pageStyle}>
      <span>Portal to reader...</span>
      </div>
    );
  }
}

PortalPage.propTypes = {
};
