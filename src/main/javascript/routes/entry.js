import React from 'react'
import {Redirect, Route} from 'react-router-dom'

import SignupPage from '../containers/entry/SignupPage'
import SigninPage from '../containers/entry/SigninPage'

export default (
  <div>
  <Redirect from="/entry" to="/entry/signin"/>
  <Route path="/entry/signup" component={SignupPage}/>
  <Route path="/entry/signin" component={SigninPage}/>
  </div>
)
