import React from 'react'
import {Route} from 'react-router-dom'

import ServicePage from '../containers/ServicePage'
import EbookWizard from '../containers/EbookWizard'

export default (
  <div>
  <Route path="/service" component={ServicePage}/>
  <Route path="/service/wizard" component={EbookWizard}/>
  </div>
)
