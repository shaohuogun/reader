import React from 'react'
import {Redirect, Route} from 'react-router-dom'

import MessageStepper from '../containers/tool/MessageStepper'
import ReadingStepper from '../containers/tool/ReadingStepper'
import ChannelStepper from '../containers/tool/ChannelStepper'

export default (
  <div>
  <Redirect from="/tool" to="/tool/reading"/>
  <Route path="/tool/message" component={MessageStepper}/>
  <Route path="/tool/reading" component={ReadingStepper}/>
  <Route path="/tool/channel" component={ChannelStepper}/>
  </div>
)
