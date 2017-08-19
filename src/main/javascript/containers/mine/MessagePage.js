import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Tabs, Tab} from 'material-ui/Tabs'

import ChannelInfo from '../../components/channel/ChannelInfo'
import MessageList from '../../components/message/MessageList'
import EbookTable from '../../components/ebook/EbookTable'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block',
}

const tabStyle = {
  marginTop: 15,
}

export default class MessagePage extends Component {
  static propTypes = {
  }

  render() {
    var channelId = this.props.match.params.channelId
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={pageStyle}>
      <ChannelInfo channelId={channelId} />
      <Tabs style={tabStyle}>
        <Tab label="消息列表">
          <MessageList channelId={channelId} />
        </Tab>
        <Tab label="电子书籍">
          <EbookTable channelId={channelId} />
        </Tab>
      </Tabs>
      </div>
      </MuiThemeProvider>
    )
  }

}
