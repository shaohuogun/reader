import React from 'react'
import {Route} from 'react-router-dom'

import * as containers from '../containers'

const {
  EbookWizard
} = containers

export default (
  <div>
  <Route path="/product" component={EbookWizard}/>
  </div>
)
