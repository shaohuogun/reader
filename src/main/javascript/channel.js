import $ from "jquery";
import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';

import ChannelList from './channel/ChannelList';
import ChannelForm from './channel/ChannelForm';

injectTapEventPlugin();

const channelListStyle = {
  width: 300,
  margin: 20,
  float: 'left',
  display: 'inline-block',
};

class App extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {
      channels: [],
      messages: [],
      total: 0,
      display: 0,
      number: 0,
    };
  }

  loadMessagesFromServer() {
    var self = this;

    $.ajax({
      url: "/api/channel?creator=a11039eb-4ba1-441a-bfdb-0d40f61a53dd",
    }).then(function(data) {
      self.setState({ channels: data });
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

      <br />

      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Card style={channelListStyle}>
      <CardHeader title="徐胜勇" />
      <ChannelList channels={this.state.channels} />
      </Card>
      </MuiThemeProvider>

      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <ChannelForm/>
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
