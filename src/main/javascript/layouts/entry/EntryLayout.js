import React, {Component} from 'react'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import EntryNavigator from './EntryNavigator'
import EntryFooter from './EntryFooter'

const navigatorStyle = {
  marginTop: 100,
  textAlign: 'center',
  backgroundColor: '#fafafa',
}

const footerStyle = {
  marginTop: 100,
  textAlign: 'center',
  backgroundColor: '#fafafa',
}

export default class EntryLayout extends Component {
  render() {
    return (
      <div>
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <EntryNavigator style={navigatorStyle} />
      </MuiThemeProvider>
      {this.props.children}
      </div>

      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <EntryFooter style={footerStyle} />
      </MuiThemeProvider>
      </div>
    )
  }
}

EntryLayout.propTypes = {
}
