import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ChannelList from './ChannelList';
import ChannelForm from './ChannelForm';

const pageStyle = {
  width: 800,
  marginTop: 20,
  marginLeft: 20,
  float: 'left',
  display: 'inline-block',
};

const listStyle = {
  marginTop: 20,
};

export default class ChannelPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={pageStyle}>
      <ChannelForm />
      <ChannelList style={listStyle} />
      </div>
      </MuiThemeProvider>
    );
  }
};

ChannelPage.propTypes = {
};
