import React from 'react'
import {Redirect, Route} from 'react-router-dom'

import MessageStepperContainer from '../components/container/tool/MessageStepperContainer'
import ReadingStepperContainer from '../components/container/tool/ReadingStepperContainer'
import ChannelStepperContainer from '../components/container/tool/ChannelStepperContainer'

export default (
  <div>
  <Redirect from="/tool" to="/tool/reading"/>
  <Route path="/tool/message" component={MessageStepperContainer}/>
  <Route path="/tool/reading" component={ReadingStepperContainer}/>
  <Route path="/tool/channel" component={ChannelStepperContainer}/>
  </div>
)
