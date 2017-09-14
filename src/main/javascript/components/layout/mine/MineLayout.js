import React from 'react'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Header from '../Header'
import MineNavigator from './MineNavigator'
import Footer from '../Footer'

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

const MineLayout = (props) => (
  <div>
  <MuiThemeProvider muiTheme={getMuiTheme()}>
  <Header style={headerStyle} />
  </MuiThemeProvider>

  <div style={contentStyle}>
  <MuiThemeProvider muiTheme={getMuiTheme()}>
  <div style={sidebarStyle}>
  <MineNavigator style={navigatorStyle} />
  <Footer />
  </div>
  </MuiThemeProvider>
  {props.children}
  </div>
  </div>
)

MineLayout.propTypes = {
}

export default MineLayout