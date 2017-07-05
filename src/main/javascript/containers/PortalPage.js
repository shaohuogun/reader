import React from 'react';
import PropTypes from 'prop-types';

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
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
