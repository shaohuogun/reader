import React from 'react'
import {Route} from 'react-router-dom'

import ToolPage from '../containers/tool/ToolPage'
import EbookWizard from '../containers/tool/EbookWizard'

export default (
  <div>
  <Route path="/tool" component={ToolPage}/>
  <Route path="/tool/wizard" component={EbookWizard}/>
  </div>
)
