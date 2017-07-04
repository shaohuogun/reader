import React from 'react'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Navigator from './Navigator'

const navigatorStyle = {
  width: 350,
  marginTop: 20,
  marginBottom: 20,
  float: 'left',
  display: 'inline-block',
  backgroundColor: '#fff',  
}

export default class UserCenter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Navigator style={navigatorStyle} />
      </MuiThemeProvider>

      {this.props.children}

      </div>
    );
  }
}

UserCenter.propTypes = {
};
