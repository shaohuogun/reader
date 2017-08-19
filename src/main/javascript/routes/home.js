import React from 'react'
import {Route} from 'react-router-dom'

import HomePage from '../containers/home/HomePage'

export default (
  <div>
  <Route path="/home" component={HomePage}/>
  </div>
)
