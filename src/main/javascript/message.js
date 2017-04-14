import $ from "jquery";
import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import MessageList from './message/MessageList';

class App extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = { messages: [] };
  }

  loadMessagesFromServer() {
    var self = this;
    $.ajax({
      url: "/api/channel/b6840c19-501d-49e7-a809-24fcd3015c78/message",
    }).then(function(data) {
      self.setState({ messages: data.objects });
    });
  }

  componentDidMount() {
    this.loadMessagesFromServer();
  }

  render() {
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

};

App.propTypes = {
  initialValue: React.PropTypes.string
};

App.defaultProps = {
  initialValue: ''
};

let app = document.createElement('div');
ReactDOM.render(<App />, app);
document.body.appendChild(app);
