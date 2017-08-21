import React, {Component} from 'react'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Navigator from '../Navigator'
import MineNavigator from './MineNavigator'

const contentStyle = {
  margin: '0 auto',
}

const navigatorStyle = {
  width: 300,
  marginTop: 15,
  float: 'left',
  display: 'inline-block',
  backgroundColor: '#fff',
}

export default class MineLayout extends Component {
  render() {
    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Navigator />
      </MuiThemeProvider>

      <div style={contentStyle}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <MineNavigator style={navigatorStyle} />
      </MuiThemeProvider>
      {this.props.children}
      </div>
      </div>
    )
  }
}

MineLayout.propTypes = {
}
