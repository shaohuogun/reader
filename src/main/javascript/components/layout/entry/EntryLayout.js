import React from 'react'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import EntryNavigator from './EntryNavigator'
import Footer from '../Footer'

const navigatorStyle = {
  marginTop: 100,
  textAlign: 'center',
  backgroundColor: '#fafafa',
}

const EntryLayout = (props) => (
      <div {...props}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <EntryNavigator style={navigatorStyle} />
      </MuiThemeProvider>
      {props.children}

      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Footer />
      </MuiThemeProvider>
      </div>
    )

EntryLayout.propTypes = {
}

export default EntryLayout
