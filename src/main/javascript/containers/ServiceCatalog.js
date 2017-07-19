import React, {Component, PropTypes} from 'react'
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

export default class ServiceCatalog extends Component {
  static propTypes = {
  }

  render() {
    return (
      <List {...this.props}>
      <Subheader>服务目录</Subheader>
      <ListItem
      primaryText={<CustomLink to="/service/readinglist" label="阅读清单" />}
      leftAvatar={<Avatar src="/image/reading-list.jpg" />}
      />
      <ListItem
      primaryText={<CustomLink to="/service/favorites" label="好文收藏" />}
      leftAvatar={<Avatar src="/image/favorites.jpg" />}
      />
      <ListItem
      primaryText={<CustomLink to="/service/wizard" label="聚文成册" />}
      leftAvatar={<Avatar src="/image/wizard.jpg" />}
      />
      </List>
    )
  }
}
