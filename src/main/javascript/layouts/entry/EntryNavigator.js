import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Link} from 'react-router-dom'
import {List, ListItem} from 'material-ui/List'

const CustomLink = ({activeOnlyWhenExact, to, label}) => (
  <Route exact={activeOnlyWhenExact} path={to} children={({match}) => (
    <span>
    {match ? '[' : ''}<Link to={to}>{label}</Link>{match ? ']' : ''}
    </span>
  )}/>
)

export default class EntryNavigator extends Component {
  render() {
    return (
      <List {...this.props}>
      <ListItem primaryText={<CustomLink to="/entry/signup" label="注册" />} />
      <ListItem primaryText={<CustomLink to="/entry/signin" label="登录" />} />
      </List>
    )
  }
}

EntryNavigator.propTypes = {
}
