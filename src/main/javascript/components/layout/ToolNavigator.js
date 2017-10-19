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

const ToolNavigator = (props) => (
  <List {...props}>
  <ListSubheader>服务目录</ListSubheader>

  <ListItem button component="a" href="/tool/reading">
    <ListItemText primary="阅读清单" />
  </ListItem>

  <ListItem button component="a" href="/tool/message">
    <ListItemText primary="好文收藏" />
  </ListItem>

  <ListItem button component="a" href="/tool/channel">
    <ListItemText primary="聚文成册" />
  </ListItem>
  </List>
)

ToolNavigator.propTypes = {
}

export default ToolNavigator
