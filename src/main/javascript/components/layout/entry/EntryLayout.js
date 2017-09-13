import React, {Component} from 'react'
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

export default class EntryLayout extends Component {
  render() {
    return (
      <div {...this.props}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <EntryNavigator style={navigatorStyle} />
      </MuiThemeProvider>
      {this.props.children}

      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Footer />
      </MuiThemeProvider>
      </div>
    )
  }
}

EntryLayout.propTypes = {
}
