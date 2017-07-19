import React from 'react'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import EntryNavigator from './EntryNavigator'

const navigatorStyle = {
  width: 300,
  marginTop: 15,
  float: 'left',
  display: 'inline-block',
  backgroundColor: '#fff',
}

export default class EntryPage extends React.Component {
  render() {
    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <EntryNavigator style={navigatorStyle} />
      </MuiThemeProvider>
      {this.props.children}
      </div>
    )
  }
}

EntryPage.propTypes = {
}
