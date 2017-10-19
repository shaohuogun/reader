import React from 'react'
import {Route} from 'react-router-dom'

import MessageStepperContainer from '../components/container/tool/MessageStepperContainer'
import ReadingStepperContainer from '../components/container/tool/ReadingStepperContainer'
import ChannelStepperContainer from '../components/container/tool/ChannelStepperContainer'

export default (
  <div>
  <Route path="/tool/message" component={MessageStepperContainer}/>
  <Route path="/tool/reading" component={ReadingStepperContainer}/>
  <Route path="/tool/channel" component={ChannelStepperContainer}/>
  </div>
)
