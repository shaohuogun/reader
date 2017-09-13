import React from 'react'
import {Redirect, Route} from 'react-router-dom'

import MessageStepper from '../components/container/tool/MessageStepper'
import ReadingStepper from '../components/container/tool/ReadingStepper'
import ChannelStepper from '../components/container/tool/ChannelStepper'

export default (
  <div>
  <Redirect from="/tool" to="/tool/reading"/>
  <Route path="/tool/message" component={MessageStepper}/>
  <Route path="/tool/reading" component={ReadingStepper}/>
  <Route path="/tool/channel" component={ChannelStepper}/>
  </div>
)
