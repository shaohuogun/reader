import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import ChannelList from './channel/ChannelList';
import ChannelForm from './channel/ChannelForm';

const channelListStyle = {
  width: 800,
  marginLeft: 20,
  float: 'left',
  display: 'inline-block',
};

const channelFormStyle = {
  width: 350,
  marginLeft: 10,
  float: 'left',
  display: 'inline-block',
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      <ChannelList style={channelListStyle} />
      </MuiThemeProvider>

      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <ChannelForm style={channelFormStyle} />
      </MuiThemeProvider>
      </div>
    );
  }
};

let app = document.createElement('div');
ReactDOM.render(<App />, app);
document.body.appendChild(app);
