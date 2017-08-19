import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import ChannelList from '../../components/channel/ChannelList'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block',
}

export default class ChannelPage extends Component {
  static propTypes = {
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <ChannelList style={pageStyle} />
      </MuiThemeProvider>
    )
  }
}
