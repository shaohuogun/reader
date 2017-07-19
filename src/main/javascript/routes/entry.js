import React from 'react'
import {Route} from 'react-router-dom'

import EntryPage from '../containers/EntryPage'
import SignupPage from '../containers/SignupPage'
import SigninPage from '../containers/SigninPage'

export default (
  <div>
  <Route path="/entry" component={EntryPage}/>
  <Route path="/entry/signin" component={SignupPage}/>
  <Route path="/entry/signup" component={SigninPage}/>
  </div>
)
