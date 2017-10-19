import React from 'react'
import PropTypes from 'prop-types'

import ChannelFirstPage from './ChannelFirstPage'
import ChannelSecondPage from './ChannelSecondPage'
import ChannelThirdPage from './ChannelThirdPage'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block',
  backgroundColor: '#fff'
}

const ChannelWizard = (props) => (
  <div style={pageStyle}>
  {props.pageIndex === 1 && (
    <ChannelFirstPage onSubmit={props.createChannel} progress={props.progress.pickingMessage} />
  )}

  {props.pageIndex === 2 && (
    <ChannelSecondPage pagination={props.pagination} loadMessages={props.loadMessages}
    progress={props.progress.generatingEbook} restart={props.restart} generateEbook={props.generateEbook} />
  )}

  {props.pageIndex === 3 && (
    <ChannelThirdPage ebook={props.ebook} downloadEbook={props.downloadEbook}
    postEbook={props.postEbook} restart={props.restart} />
  )}
  </div>
)

ChannelWizard.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  channel: PropTypes.object.isRequired,
  progress: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  ebook: PropTypes.object.isRequired,
  createChannel: PropTypes.func.isRequired,
  loadMessages: PropTypes.func.isRequired,
  generateEbook: PropTypes.func.isRequired,
  downloadEbook: PropTypes.func.isRequired,
  postEbook: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired
}

export default ChannelWizard
