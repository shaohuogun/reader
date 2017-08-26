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
      primaryText={<CustomLink to="/tool/reading" label="阅读清单" />}
      leftAvatar={<Avatar src="/image/tool/reading.jpg" />}
      />
      <ListItem
      primaryText={<CustomLink to="/tool/message" label="好文收藏" />}
      leftAvatar={<Avatar src="/image/tool/favorites.jpg" />}
      />
      <ListItem
      primaryText={<CustomLink to="/tool/channel" label="聚文成册" />}
      leftAvatar={<Avatar src="/image/tool/ebook.jpg" />}
      />
      </List>
    )
  }
}

ToolNavigator.propTypes = {
}
