import React, {Component} from 'react'
import PropTypes from 'prop-types'

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
      <ChannelList style={pageStyle} />
    )
  }
}

ChannelPage.propTypes = {
}
