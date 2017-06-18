import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import EbookGrid from '../components/ebook/EbookGrid';

const pageStyle = {
  width: 800,
  marginTop: 20,
  marginLeft: 20,
  marginBottom: 20,
  float: 'left',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
};

export default class EbookPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <EbookGrid style={pageStyle} />
      </MuiThemeProvider>
    );
  }
};

EbookPage.propTypes = {
};
