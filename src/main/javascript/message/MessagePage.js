import $ from "jquery";
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Link} from 'react-router-dom';

import ChannelInfo from '../channel/ChannelInfo';
import MessageList from './MessageList';

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
      channelId: props.location.query.channelId,
    };
  }

  render() {
    return (
      <div>
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
