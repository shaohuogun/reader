import React from 'react'
import {Route} from 'react-router-dom'

import ReadingStepper from '../containers/tool/ReadingStepper'
import EbookStepper from '../containers/tool/EbookStepper'

export default (
  <div>
  <Route path="/tool/reading" component={ReadingStepper}/>
  <Route path="/tool/ebook" component={EbookStepper}/>
  </div>
)
