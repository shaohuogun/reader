import React, {Component} from 'react'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Navigator from '../Navigator'

const contentStyle = {
  margin: '0 auto',
}

export default class HomeLayout extends Component {
  render() {
    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Navigator />
      </MuiThemeProvider>

      <div style={contentStyle}>
      {this.props.children}
      </div>
      </div>
    )
  }
}

HomeLayout.propTypes = {
}
