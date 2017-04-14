import $ from "jquery";
import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import MessageList from './message/MessageList';

var App = React.createClass({
  loadMessagesFromServer: function() {
    var self = this;
    $.ajax({
      url: "/api/channel/b6840c19-501d-49e7-a809-24fcd3015c78/message",
    }).then(function(data) {
      self.setState({ messages: data.objects });
    });
  },

  getInitialState: function() {
    return { messages: [] };
  },

  componentDidMount: function() {
    this.loadMessagesFromServer();
  },

  render: function() {
    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <AppBar title="阅读网络" />
      </MuiThemeProvider>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <MessageList messages={this.state.messages} />
      </MuiThemeProvider>
      </div>
    );
  }
});

let app = document.createElement('div');
ReactDOM.render(<App />, app);
document.body.appendChild(app);
