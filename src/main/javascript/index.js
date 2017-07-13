import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Provider} from 'react-redux'

import {createBrowserHistory} from 'history'
import {syncHistoryWithStore} from 'react-router-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import storeProvider from './store/storeProvider'
import configureStore from './store/configureStore'

import * as containers from './containers'
import Layout from './Layout'

// Needed for onTouchTap
injectTapEventPlugin();

const layoutStyle = {
  margin: '0 auto',
  backgroundColor: '#f5f5f5',
}

storeProvider.init(configureStore({
  wizard: {
    finished: false,
    stepIndex: 0
  },
  progress: 0,
  pagination: {}
}))

const store = storeProvider.getStore()
const history = syncHistoryWithStore(createBrowserHistory(), store)

const {
  IndexPage, EbookWizard, UserCenterPage, ReadingListPage, ChannelPage, MessagePage, EbookPage
} = containers

export default class Index extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render () {
    return (
      <Provider key="provider" store={store}>
      <Router key="router" history={this.props.history} >
      <Layout style={layoutStyle}>
      <Route exact path="/index" component={IndexPage}/>
      <Route path="/index/wizard" component={EbookWizard}/>
      <Route path="/usercenter" component={UserCenterPage}/>
      <Route path="/usercenter/readinglists" component={ReadingListPage}/>
      <Route path="/usercenter/channels" component={ChannelPage}/>
      <Route path="/usercenter/channel/:channelId" component={MessagePage}/>
      <Route path="/usercenter/ebooks" component={EbookPage}/>
      </Layout>
      </Router>
      </Provider>
    )
  }
}

ReactDOM.render(
  <Index history={history} />,
  document.getElementById('root')
)
