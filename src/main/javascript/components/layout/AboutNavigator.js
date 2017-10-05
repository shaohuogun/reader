import React from 'react'
import PropTypes from 'prop-types'
import {Route, Link} from 'react-router-dom'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'

const CustomLink = ({activeOnlyWhenExact, to, label}) => (
  <Route exact={activeOnlyWhenExact} path={to} children={({match}) => (
    <span>
    {match ? '[' : ''}<Link to={to}>{label}</Link>{match ? ']' : ''}
    </span>
  )}/>
)

const AboutNavigator = (props) => (
  <List {...props}>
  <Subheader>关于</Subheader>
  <ListItem
  primaryText={<CustomLink to="/about/profile" label="网站简介" />}
  leftAvatar={<Avatar src="/image/about/profile.jpg" />}
  />
  <ListItem
  primaryText={<CustomLink to="/about/contact" label="联系方式" />}
  leftAvatar={<Avatar src="/image/about/contact.jpg" />}
  />
  </List>
)

AboutNavigator.propTypes = {
}

export default AboutNavigator
