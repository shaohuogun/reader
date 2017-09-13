import React, {Component} from 'react'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Header from '../Header'
import AboutNavigator from './AboutNavigator'

const headerStyle = {
  backgroundColor: '#eeeeee',
}

const contentStyle = {
  margin: '0 auto',
}

const navigatorStyle = {
  backgroundColor: '#fff',
}

const sidebarStyle = {
  width: 300,
  marginTop: 15,
  float: 'left',
  display: 'inline-block',
}

export default class AboutLayout extends Component {
  render() {
    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Header style={headerStyle} />
      </MuiThemeProvider>

      <div style={contentStyle}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={sidebarStyle}>
        <AboutNavigator style={navigatorStyle} />
      </div>
      </MuiThemeProvider>
      {this.props.children}
      </div>
      </div>
    )
  }
}

AboutLayout.propTypes = {
}
