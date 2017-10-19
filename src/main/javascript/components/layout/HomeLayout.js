import React from 'react'
import PropTypes from 'prop-types'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'

import Header from './Header'
import Footer from './Footer'

const headerStyle = {
  backgroundColor: '#eeeeee',
}

const contentStyle = {
  margin: '0 auto',
}

const theme = createMuiTheme()

const HomeLayout = (props) => (
  <div>
  <MuiThemeProvider theme={theme}>
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
