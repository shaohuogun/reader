import React from 'react'
import {Redirect, Route} from 'react-router-dom'

import ReadingListPage from '../containers/mine/ReadingListPage'
import ChannelPage from '../containers/mine/ChannelPage'
import MessagePage from '../containers/mine/MessagePage'
import EbookPage from '../containers/mine/EbookPage'

export default (
  <div>
  <Redirect from="/mine" to="/mine/readinglists"/>
  <Route path="/mine/readinglists" component={ReadingListPage}/>
  <Route path="/mine/channels" component={ChannelPage}/>
  <Route path="/mine/channel/:channelId" component={MessagePage}/>
  <Route path="/mine/ebooks" component={EbookPage}/>
  </div>
)
