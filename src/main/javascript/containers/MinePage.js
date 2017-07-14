import React from 'react'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import MineNavigator from './MineNavigator'

const mineNavigatorStyle = {
  width: 300,
  marginTop: 15,
  float: 'left',
  display: 'inline-block',
  backgroundColor: '#fff',
}

export default class MinePage extends React.Component {
  render() {
    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <MineNavigator style={mineNavigatorStyle} />
      </MuiThemeProvider>
      {this.props.children}
      </div>
    )
  }
}

MinePage.propTypes = {
}
