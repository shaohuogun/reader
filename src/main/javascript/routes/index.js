import React from 'react'
import {Route} from 'react-router-dom'

import * as containers from '../containers'

const {
  IndexPage
} = containers

export default (
  <div>
  <Route path="/index" component={IndexPage}/>
  </div>
)
