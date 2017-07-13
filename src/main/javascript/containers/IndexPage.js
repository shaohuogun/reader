import React from 'react';
import PropTypes from 'prop-types';

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block',
};

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={pageStyle}>
      <span>Index of the reader...</span>
      </div>
    );
  }
}

IndexPage.propTypes = {
};
