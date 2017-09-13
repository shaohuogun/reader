import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Tabs, Tab} from 'material-ui/Tabs'

import ChannelDetail from '../../presentation/channel/ChannelDetail'
import MessageList from '../../presentation/message/MessageList'
import EbookTable from '../../presentation/ebook/EbookTable'

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
  render() {
    var channelId = this.props.match.params.channelId
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={pageStyle}>
      <ChannelDetail channelId={channelId} />
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

MessagePage.propTypes = {
}
