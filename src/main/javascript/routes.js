import React from 'react'
import {createBrowserHistory} from 'history'
import {syncHistoryWithStore} from 'react-router-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import storeProvider from './store/storeProvider'
import * as containers from './containers'

const store = storeProvider.getStore()
const history = syncHistoryWithStore(createBrowserHistory(), store)

const {
  IndexPage, EbookWizard, UserCenterPage, ReadingListPage, ChannelPage, MessagePage, EbookPage
} = containers


export default function createElements (history) {
  const elements = [
    <Router key="router" history={history} >
    <Route exact path="/index" component={IndexPage}/>
    <Route path="/index/wizard" component={EbookWizard}/>
    <Route exact path="/usercenter" component={UserCenterPage}/>
    <Route path="/usercenter/readinglists" component={ReadingListPage}/>
    <Route path="/usercenter/channels" component={ChannelPage}/>
    <Route path="/usercenter/channel/:channelId" component={MessagePage}/>
    <Route path="/usercenter/ebooks" component={EbookPage}/>
    </Router>
  ]

  // if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
  //   const DevTools = require('./DevTools')
  //   elements.push(<DevTools key="devtools" />)
  // }

  return elements
}
