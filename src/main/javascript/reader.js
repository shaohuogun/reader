import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {BrowserRouter as Router, browserHistory, Route, IndexRoute, Link, Redirect} from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import PortalPage from './portal/PortalPage';
import ReadingListPage from './read/ReadingListPage';
import ReadingListItemPage from './read/ReadingListItemPage';
import EbookWizard from './wizard/EbookWizard';
import ChannelPage from './channel/ChannelPage';
import MessagePage from './message/MessagePage';
import EbookPage from './ebook/EbookPage';

// Needed for onTouchTap
injectTapEventPlugin();

const navigatorStyle = {
  width: 350,
  marginTop: 20,
  marginBottom: 20,
  float: 'left',
  display: 'inline-block',
};

const CustomLink = ({activeOnlyWhenExact, to, label}) => (
  <Route exact={activeOnlyWhenExact} path={to} children={({match}) => (
    <span>
    {match ? '[' : ''}<Link to={to}>{label}</Link>{match ? ']' : ''}
    </span>
  )}/>
)

export class Navigator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card {...this.props} zDepth={1}>
      <CardHeader title="个人中心" />
      <CardText>
      <ul>
      <li><CustomLink activeOnlyWhenExact={true} to="/html" label="首页"/></li>
      <li><CustomLink to="/html/readinglist" label="阅读清单"/></li>
      <li><CustomLink to="/html/wizard" label="创建向导"/></li>
      <li><CustomLink to="/html/channel" label="媒体频道"/></li>
      <li><CustomLink to="/html/ebook" label="电子书籍"/></li>
      </ul>
      </CardText>
      </Card>
    );
  }
}

Navigator.propTypes = {
};

export class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AppBar title="阅读网络" zDepth={0} />
      </MuiThemeProvider>

      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Navigator style={navigatorStyle} />
      </MuiThemeProvider>

      {this.props.children}

      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AppBar title="阅读网络" zDepth={0} />
      </MuiThemeProvider>
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
      <Route exact path="/html" component={PortalPage}/>
      <Route path="/html/readinglist" component={ReadingListPage}/>
      <Route path="/html/readinglistitem" component={ReadingListItemPage}/>
      <Route path="/html/wizard" component={EbookWizard}/>
      <Route path="/html/channel" component={ChannelPage}/>
      <Route path="/html/message" component={MessagePage}/>
      <Route path="/html/ebook" component={EbookPage}/>
      </Layout>
      </Router>
    );
  }
}

let root = document.createElement('div');
ReactDOM.render(<Reader />, root);
document.body.appendChild(root);
