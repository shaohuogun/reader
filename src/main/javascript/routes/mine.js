import React from 'react'
import {Route} from 'react-router-dom'

import MinePage from '../containers/mine/MinePage'
import ReadingListPage from '../containers/mine/ReadingListPage'
import ChannelPage from '../containers/mine/ChannelPage'
import MessagePage from '../containers/mine/MessagePage'
import EbookPage from '../containers/mine/EbookPage'

export default (
  <div>
  <Route path="/mine" component={MinePage}/>
  <Route path="/mine/readinglists" component={ReadingListPage}/>
  <Route path="/mine/channels" component={ChannelPage}/>
  <Route path="/mine/channel/:channelId" component={MessagePage}/>
  <Route path="/mine/ebooks" component={EbookPage}/>
  </div>
)
