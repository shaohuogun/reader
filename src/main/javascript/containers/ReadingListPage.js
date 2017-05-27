import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ReadingListList from '../components/read/ReadingListList';
import ReadingListForm from '../components/read/ReadingListForm';

const pageStyle = {
  width: 800,
  marginTop: 20,
  marginLeft: 20,
  marginBottom: 20,
  float: 'left',
  display: 'inline-block',
};

const listStyle = {
  marginTop: 20,
};

export default class ReadingListPage extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={pageStyle}>
      <ReadingListForm />
      <ReadingListList style={listStyle} />
      </div>
      </MuiThemeProvider>
    );
  }
};

ReadingListPage.propTypes = {
};
