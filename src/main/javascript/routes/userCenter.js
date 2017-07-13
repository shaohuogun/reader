import React from 'react'
import {Route} from 'react-router-dom'

import * as containers from '../containers'

const {
  UserCenterPage, ReadingListPage, ChannelPage, MessagePage, EbookPage
} = containers

export default (
  <div>
  <Route path="/usercenter" component={UserCenterPage}/>
  <Route path="/usercenter/readinglists" component={ReadingListPage}/>
  <Route path="/usercenter/channels" component={ChannelPage}/>
  <Route path="/usercenter/channel/:channelId" component={MessagePage}/>
  <Route path="/usercenter/ebooks" component={EbookPage}/>
  </div>
)
