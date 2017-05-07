import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import EbookGridList from './EbookGridList';

const rightStyle = {
  width: 800,
  marginLeft: 10,
  float: 'left',
  textAlign: 'center',
  display: 'inline-block',
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
      <EbookGridList style={rightStyle} />
      </MuiThemeProvider>
    );
  }
};

EbookPage.propTypes = {
};
