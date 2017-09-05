import React from 'react'
import {Route} from 'react-router-dom'

import SignupPage from '../containers/entry/SignupPage'
import SigninPage from '../containers/entry/SigninPage'

export default (
  <div>
  <Route path="/entry/signup" component={SignupPage}/>
  <Route path="/entry/signin" component={SigninPage}/>
  </div>
)
