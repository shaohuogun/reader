import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Link} from 'react-router-dom'
import {GridList, GridTile} from 'material-ui/GridList'

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
      <GridList
      cols={2}
      cellHeight={50}
      padding={15}
      {...this.props}
      >
      <GridTile
      key='signup'
      cols={1}
      >
      <CustomLink to="/entry/signup" label="注册" />
      </GridTile>

      <GridTile
      key='signin'
      cols={1}
      >
      <CustomLink to="/entry/signin" label="登录" />
      </GridTile>
      </GridList>
    )
  }
}

EntryNavigator.propTypes = {
}
