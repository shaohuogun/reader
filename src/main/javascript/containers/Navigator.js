import React from 'react'
import PropTypes from 'prop-types'
import {Route, Link} from "react-router-dom"
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

const CustomLink = ({activeOnlyWhenExact, to, label}) => (
  <Route exact={activeOnlyWhenExact} path={to} children={({match}) => (
    <span>
    {match ? '[' : ''}<Link to={to}>{label}</Link>{match ? ']' : ''}
    </span>
  )}/>
)

export default class Navigator extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <List {...this.props} zDepth={1}>
      <Subheader>个人中心</Subheader>
      <ListItem
      primaryText={<CustomLink to="/html/usercenter/readinglists" label="阅读清单" />}
      leftAvatar={<Avatar src="/image/readinglist.jpg" />}
      />
      <ListItem
      primaryText={<CustomLink to="/html/usercenter/channels" label="媒体频道" />}
      leftAvatar={<Avatar src="/image/channel.jpeg" />}
      />
      <ListItem
      primaryText={<CustomLink to="/html/usercenter/ebooks" label="电子书籍" />}
      leftAvatar={<Avatar src="/image/ebook.jpg" />}
      />
      </List>
    )
  }
}

Navigator.propTypes = {
}
