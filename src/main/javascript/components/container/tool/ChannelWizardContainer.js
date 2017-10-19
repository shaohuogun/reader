import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {reset, submit} from 'redux-form'
import {connect} from 'react-redux'

import {
  submitChannel, updateChannel, asyncProgressOfPickingMessage, asyncProgressOfGeneratingEbook
} from '../../../actions/channel'
import {asyncMessagesInChannel} from '../../../actions/message'
import {generateEbook, postEbook} from '../../../actions/ebook'
import ChannelWizard from '../../presentation/channel/ChannelWizard'

class ChannelWizardContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageIndex: 1
    }

    // Tips: The best place to bind your member functions is in the component constructor
    this.restart = this.restart.bind(this)
    this.createChannel = this.createChannel.bind(this)
    this.loadMessages = this.loadMessages.bind(this)
    this.generateEbook = this.generateEbook.bind(this)
    this.downloadEbook = this.downloadEbook.bind(this)
    this.postEbook = this.postEbook.bind(this)
  }

  componentWillReceiveProps() {
    const {progress} = this.props
    if ((this.state.pageIndex === 1) && (progress.pickingMessage === 100)) {
      this.setState({
        pageIndex: this.state.pageIndex + 1
      })
    }

    if ((this.state.pageIndex === 2) && (progress.generatingEbook === 100)) {
      this.setState({
        pageIndex: this.state.pageIndex + 1
      })
    }
  }

  restart = () => {
    const {dispatch} = this.props
    dispatch(reset('channelForm'))
    this.setState({
      pageIndex: 1
    })
  }

  createChannel = (channel) => {
    const {dispatch} = this.props
    dispatch(submitChannel(channel))
    fetch('/api/channel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(channel)
    }).then(response => response.json())
    .then(json => {
      dispatch(updateChannel(json))
      dispatch(asyncProgressOfPickingMessage('P-' + json.id))
    })
  }

  loadMessages = (page) => {
    const {dispatch, channel} = this.props
    dispatch(asyncMessagesInChannel(channel.id, page))
  }

  generateEbook = () => {
    const {dispatch, channel} = this.props
    dispatch(generateEbook(channel.id))
    dispatch(asyncProgressOfGeneratingEbook('G-' + channel.id))
  }

  downloadEbook = (ebookId) => {
    var downloadUrl = "/api/ebook/" + ebookId + "/download";
    window.open(downloadUrl, "_blank");
  }

  postEbook = (ebookId) => {
    alert('尚未实现此功能！');
  }

  render() {
    const {channel, progress, pagination, ebook} = this.props
    return (
      <ChannelWizard pageIndex={this.state.pageIndex}
      channel={channel} progress={progress} pagination={pagination} ebook={ebook}
      createChannel={this.createChannel} loadMessages={this.loadMessages} generateEbook={this.generateEbook}
      downloadEbook={this.downloadEbook} postEbook={this.postEbook} restart={this.restart} />
    )
  }
}

ChannelWizardContainer.propTypes = {
  channel: PropTypes.object.isRequired,
  progress: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  ebook: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  channel: state.channel,
  progress: state.progress,
  pagination: state.pagination,
  ebook: state.ebook
})

export default connect(mapStateToProps)(ChannelWizardContainer)
