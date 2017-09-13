import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import ChannelList from '../../presentation/channel/ChannelList'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block',
}

export default class ChannelPage extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <ChannelList style={pageStyle} />
      </MuiThemeProvider>
    )
  }
}

ChannelPage.propTypes = {
}
