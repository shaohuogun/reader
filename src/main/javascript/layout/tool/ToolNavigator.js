import React, {Component} from 'react'
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

export default class ToolNavigator extends Component {
  render() {
    return (
      <List {...this.props}>
      <Subheader>服务目录</Subheader>
      <ListItem
      primaryText={<CustomLink to="/tool/readinglist" label="阅读清单" />}
      leftAvatar={<Avatar src="/image/reading-list.jpg" />}
      />
      <ListItem
      primaryText={<CustomLink to="/tool/favorites" label="好文收藏" />}
      leftAvatar={<Avatar src="/image/favorites.jpg" />}
      />
      <ListItem
      primaryText={<CustomLink to="/tool/ebookstepper" label="聚文成册" />}
      leftAvatar={<Avatar src="/image/ebook-stepper.jpg" />}
      />
      </List>
    )
  }
}

ToolNavigator.propTypes = {
}
