import React from 'react'
import {Route} from 'react-router-dom'

import ProfilePage from '../components/container/about/ProfilePage'
import ContactPage from '../components/container/about/ContactPage'

export default (
  <div>
  <Route path="/about/profile" component={ProfilePage}/>
  <Route path="/about/contact" component={ContactPage}/>
  </div>
)
