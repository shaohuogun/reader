import React from 'react'
import {Redirect, Route} from 'react-router-dom'

import ProfilePage from '../containers/about/ProfilePage'
import ContactPage from '../containers/about/ContactPage'

export default (
  <div>
  <Redirect from="/about" to="/about/profile"/>
  <Route path="/about/profile" component={ProfilePage}/>
  <Route path="/about/contact" component={ContactPage}/>
  </div>
)
