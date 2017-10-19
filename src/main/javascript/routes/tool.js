import React from 'react'
import {Route} from 'react-router-dom'

import MessageWizardContainer from '../components/container/tool/MessageWizardContainer'
import ReadingWizardContainer from '../components/container/tool/ReadingWizardContainer'
import ChannelWizardContainer from '../components/container/tool/ChannelWizardContainer'

export default (
  <div>
  <Route path="/tool/message" component={MessageWizardContainer}/>
  <Route path="/tool/reading" component={ReadingWizardContainer}/>
  <Route path="/tool/channel" component={ChannelWizardContainer}/>
  </div>
)
