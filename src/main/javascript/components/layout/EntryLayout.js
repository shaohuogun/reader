import React from 'react'
import PropTypes from 'prop-types'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'

import Footer from './Footer'
import EntryNavigator from './EntryNavigator'

const navigatorStyle = {
  marginTop: 100,
  textAlign: 'center',
  backgroundColor: '#fafafa',
}

const footerStyle = {
  marginTop: '15px',
  textAlign: 'center',
  fontSize: '12px',
  backgroundColor: '#fafafa'
}

const theme = createMuiTheme()

const EntryLayout = (props) => (
  <div {...props}>
  <MuiThemeProvider theme={theme}>
  <EntryNavigator style={navigatorStyle} />
  </MuiThemeProvider>
  {props.children}

  <MuiThemeProvider theme={theme}>
  <Footer style={footerStyle} />
  </MuiThemeProvider>
  </div>
)

EntryLayout.propTypes = {
}

export default EntryLayout
