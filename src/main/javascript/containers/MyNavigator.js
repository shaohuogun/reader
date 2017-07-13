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

export default class MyNavigator extends React.Component {
  render() {
    return (
      <List {...this.props}>
      <Subheader>我的读伴</Subheader>
      <ListItem
      primaryText={<CustomLink to="/usercenter/readinglists" label="阅读书单" />}
      leftAvatar={<Avatar src="/image/reading-list.jpg" />}
      />
      <ListItem
      primaryText={<CustomLink to="/usercenter/channels" label="自媒体集" />}
      leftAvatar={<Avatar src="/image/channel.jpg" />}
      />
      <ListItem
      primaryText={<CustomLink to="/usercenter/ebooks" label="电子书籍" />}
      leftAvatar={<Avatar src="/image/ebook.jpg" />}
      />
      </List>
    )
  }
}

MyNavigator.propTypes = {
}