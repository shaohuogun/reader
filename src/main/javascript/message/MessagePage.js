import $ from "jquery";
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';

import ChannelInfo from './channel/ChannelInfo';
import MessageList from './message/MessageList';

// Needed for onTouchTap
injectTapEventPlugin();

const channelInfoStyle = {
  width: 350,
  marginLeft: 20,
  float: 'left',
  display: 'inline-block',
};

const messageListStyle = {
  width: 800,
  marginLeft: 10,
  marginRight: 20,
  float: 'left',
  display: 'inline-block',
};

export default class MessagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channelId: "db1de718-ca88-4a4c-90f1-891032685689",
    };
  }

  render() {
    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AppBar title="阅读网络" />
      </MuiThemeProvider>

      <br />

      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <ChannelInfo style={channelInfoStyle} channelId={this.state.channelId} />
      </MuiThemeProvider>

      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <MessageList style={messageListStyle} channelId={this.state.channelId} />
      </MuiThemeProvider>
      </div>
    );
  }

};

MessagePage.propTypes = {
};
