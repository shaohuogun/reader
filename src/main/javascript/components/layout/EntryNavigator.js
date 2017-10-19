import React from 'react'
import PropTypes from 'prop-types'
import {Route, Link} from 'react-router-dom'
import {GridList, GridListTile} from 'material-ui/GridList'

const CustomLink = ({activeOnlyWhenExact, to, label}) => (
  <Route exact={activeOnlyWhenExact} path={to} children={({match}) => (
    <span>
    {match ? '[' : ''}<Link to={to}>{label}</Link>{match ? ']' : ''}
    </span>
  )}/>
)

const EntryNavigator = (props) => (
  <GridList
  cols={2}
  cellHeight={50}
  {...props}
  >
  <GridListTile
  key='signup'
  cols={1}
  >
  <CustomLink to="/entry/signup" label="注册" />
  </GridListTile>

  <GridListTile
  key='signin'
  cols={1}
  >
  <CustomLink to="/entry/signin" label="登录" />
  </GridListTile>
  </GridList>
)

EntryNavigator.propTypes = {
}

export default EntryNavigator
