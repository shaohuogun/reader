import React from 'react'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Header from './Header'
import Footer from './Footer'

const headerStyle = {
  backgroundColor: '#eeeeee',
}

const contentStyle = {
  margin: '0 auto',
}

const HomeLayout = (props) => (
  <div>
  <MuiThemeProvider muiTheme={getMuiTheme()}>
  <Header style={headerStyle} />
  </MuiThemeProvider>

  <div style={contentStyle}>
  {props.children}
  </div>
  </div>
)

HomeLayout.propTypes = {
}

export default HomeLayout
