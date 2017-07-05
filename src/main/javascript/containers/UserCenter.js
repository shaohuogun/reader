import React from 'react'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import MyNavigator from './MyNavigator'

const myNavigatorStyle = {
  width: 300,
  marginTop: 15,
  float: 'left',
  display: 'inline-block',
  backgroundColor: '#fff',
}

export default class UserCenter extends React.Component {
  render() {
    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <MyNavigator style={myNavigatorStyle} />
      </MuiThemeProvider>
      {this.props.children}
      </div>
    )
  }
}

UserCenter.propTypes = {
}
