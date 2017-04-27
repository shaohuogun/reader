import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ChannelList from './ChannelList';
import ChannelForm from './ChannelForm';

const leftStyle = {
  width: 800,
  marginLeft: 20,
  float: 'left',
  display: 'inline-block',
};

const rightStyle = {
  width: 350,
  marginLeft: 10,
  float: 'left',
  display: 'inline-block',
};

export default class ChannelPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <ChannelList style={leftStyle} />
      </MuiThemeProvider>

      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <ChannelForm style={rightStyle} />
      </MuiThemeProvider>
      </div>
    );
  }
};

ChannelPage.propTypes = {
};
