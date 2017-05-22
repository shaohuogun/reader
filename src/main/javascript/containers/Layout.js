import React from 'react'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'

import Navigator from './Navigator'

const navigatorStyle = {
  width: 350,
  marginTop: 20,
  marginBottom: 20,
  float: 'left',
  display: 'inline-block',
};

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AppBar title="阅读网络" zDepth={0} />
      </MuiThemeProvider>

      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Navigator style={navigatorStyle} />
      </MuiThemeProvider>

      {this.props.children}

      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AppBar title="阅读网络" zDepth={0} />
      </MuiThemeProvider>
      </div>
    );
  }
}

Layout.propTypes = {
};
