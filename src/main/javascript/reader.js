import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {BrowserRouter as Router, browserHistory, Route, IndexRoute, Link, Redirect} from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import PortalPage from './portal/PortalPage';
import ChannelPage from './channel/ChannelPage';
import MessagePage from './message/MessagePage';

// Needed for onTouchTap
injectTapEventPlugin();

export class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AppBar title="阅读网络" />
      </MuiThemeProvider>

      <ul>
      <li><Link to="/">首页</Link></li>
      <li><Link to="/channel">频道</Link></li>
      </ul>
      {this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
};

export default class Reader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={browserHistory}>
      <Layout>
      <Route exact path="/" component={PortalPage}/>
      <Route path="/channel" component={ChannelPage}/>
      <Route path="/message" component={MessagePage}/>
      </Layout>
      </Router>
    );
  }
}

let root = document.createElement('div');
ReactDOM.render(<Reader />, root);
document.body.appendChild(root);
