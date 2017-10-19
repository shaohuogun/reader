import React from 'react'
import {Route} from 'react-router-dom'

import SignupPage from '../components/container/entry/SignupPage'
import SigninPage from '../components/container/entry/SigninPage'

export default (
  <div>
  <Route path="/entry/signup" component={SignupPage}/>
  <Route path="/entry/signin" component={SigninPage}/>
  </div>
)
