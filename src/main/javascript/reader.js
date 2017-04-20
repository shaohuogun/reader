import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {BrowserRouter as Router, browserHistory, Route, Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import PortalPage from './portal/PortalPage';
import ChannelPage from './channel/ChannelPage';
import MessagePage from './message/MessagePage';

// Needed for onTouchTap
injectTapEventPlugin();

export class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <Link to="/portal">首页</Link>
      <Link to="/channel">频道</Link>
      </div>
    );
  }
}

Navigation.propTypes = {
};

export default class Reader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={browserHistory}>
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AppBar title="阅读网络" />
      </MuiThemeProvider>

      <Route path="/" component={Navigation} />
      <Redirect from="/" to="/portal" />
      <Route path="/portal" component={PortalPage}/>
      <Route path="/channel" component={ChannelPage}/>
      <Route path="/message" component={MessagePage}/>
      </div>
      </Router>
    );
  }
}

let root = document.createElement('div');
ReactDOM.render(<Reader />, root);
document.body.appendChild(root);
