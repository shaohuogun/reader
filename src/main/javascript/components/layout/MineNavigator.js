import React from 'react'
import PropTypes from 'prop-types'
import {Route, Link} from 'react-router-dom'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, {ListItem, ListItemText} from 'material-ui/List'

const MineNavigator = (props) => (
  <List {...props}>
  <ListSubheader>我的读伴</ListSubheader>

  <ListItem button component="a" href="/mine/readinglists">
    <ListItemText primary="阅读书单" />
  </ListItem>

  <ListItem button component="a" href="/mine/channels">
    <ListItemText primary="自媒体集" />
  </ListItem>

  <ListItem button component="a" href="/mine/ebooks">
    <ListItemText primary="电子书籍" />
  </ListItem>
  </List>
)

MineNavigator.propTypes = {
}

export default MineNavigator
