import React from 'react'
import PropTypes from 'prop-types'
import {Route, Link} from 'react-router-dom'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, {ListItem, ListItemText} from 'material-ui/List'

const CustomLink = ({activeOnlyWhenExact, to, label}) => (
  <Route exact={activeOnlyWhenExact} path={to} children={({match}) => (
    <span>
    {match ? '[' : ''}<Link to={to}>{label}</Link>{match ? ']' : ''}
    </span>
  )}/>
)

const AboutNavigator = (props) => (
  <List {...props}>
  <ListSubheader>关于</ListSubheader>

  <ListItem button component="a" href="/about/profile">
    <ListItemText primary="网站简介" />
  </ListItem>

  <ListItem button component="a" href="/about/contact">
    <ListItemText primary="联系方式" />
  </ListItem>
  </List>
)

AboutNavigator.propTypes = {
}

export default AboutNavigator
