import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, hashHistory, browserHistory, Link} from 'react-router-dom';

import ChannelInfo from './channel/ChannelInfo';
import MessageList from './message/MessageList';

export class Links extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      </nav>
    );
  }
}

const Home = () => <div><Links /></div>;
const About = () => <ChannelInfo channelId="db1de718-ca88-4a4c-90f1-891032685689" />;
const Contact = () => <MessageList channelId="db1de718-ca88-4a4c-90f1-891032685689" />;

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Home}>
        <Route path="/about" component={About}/>
        <Route path="/contact" component={Contact}/>
        </Route>
      </Router>
    );
  }
}

let app = document.createElement('div');
ReactDOM.render(<App />, app);
document.body.appendChild(app);
