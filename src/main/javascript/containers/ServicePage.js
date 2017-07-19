import React, {Component, PropTypes} from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import ServiceCatalog from './ServiceCatalog'

const catalogStyle = {
  width: 300,
  marginTop: 15,
  float: 'left',
  display: 'inline-block',
  backgroundColor: '#fff',
}

export default class ServicePage extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <ServiceCatalog style={catalogStyle} />
      </MuiThemeProvider>
      {this.props.children}
      </div>
    )
  }
}
