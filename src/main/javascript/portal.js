import $ from "jquery";
import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Pagination from 'material-ui-pagination';

import ChannelList from './channel/ChannelList';
import MessageList from './message/MessageList';

injectTapEventPlugin();

const channelListStyle = {
  width: 300,
  margin: 20,
  float: 'left',
  display: 'inline-block',
};

const messageListStyle = {
  width: 800,
  margin: 20,
  float: 'left',
  display: 'inline-block',
};

const paginationStyle = {
  textAlign: 'center',
};

class App extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {
      channels: [],
      messages: [],
      selectedChannelId: "",
      total: 0,
      display: 0,
      number: 0,
    };
  }

  gotoPage = (page) => {
    var self = this;
    $.ajax({
      url: "/api/channel/" + self.state.selectedChannelId + "/message?page=" + page.toString(),
    }).then(function(pagination) {
      self.setState({
        messages: pagination.objects,
        total: pagination.pageCount,
        display: 9,
        number: pagination.pageIndex,
      });
    });
  }

  loadMessagesFromServer() {
    var self = this;

    $.ajax({
      url: "/api/channel?creator=a11039eb-4ba1-441a-bfdb-0d40f61a53dd",
    }).then(function(data) {
      self.setState({ channels: data });
    });

    this.gotoPage(1);
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
      <CardHeader title="媒体频道" />
      <ChannelList channels={this.state.channels} parent={this} />
      </Card>
      </MuiThemeProvider>

      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Card style={messageListStyle} zDepth={0}>
      <CardHeader
      title="霍泰稳的编辑空间"
      subtitle="http://blog.csdn.net/futurelight"
      />
      <CardText>
      <MessageList messages={this.state.messages} />
      </CardText>
      <CardActions style={paginationStyle}>
      <Pagination
      total = { this.state.total }
      current = { this.state.number }
      display = { this.state.display }
      onChange = { number => this.gotoPage(number) }
      />
      </CardActions>
      </Card>
      </MuiThemeProvider>

      </div>
    );
  }

};

let app = document.createElement('div');
ReactDOM.render(<App />, app);
document.body.appendChild(app);
