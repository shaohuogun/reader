import React from 'react'
import {Route} from 'react-router-dom'

import MinePage from '../containers/MinePage'
import ReadingListPage from '../containers/ReadingListPage'
import ChannelPage from '../containers/ChannelPage'
import MessagePage from '../containers/MessagePage'
import EbookPage from '../containers/EbookPage'

export default (
  <div>
  <Route path="/mine" component={MinePage}/>
  <Route path="/mine/readinglists" component={ReadingListPage}/>
  <Route path="/mine/channels" component={ChannelPage}/>
  <Route path="/mine/channel/:channelId" component={MessagePage}/>
  <Route path="/mine/ebooks" component={EbookPage}/>
  </div>
)
