import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {Step, Stepper, StepLabel, StepContent} from 'material-ui/Stepper'
import LinearProgress from 'material-ui/LinearProgress'
import {Card, CardActions} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import {reset, submit} from 'redux-form'
import {connect} from 'react-redux'

import ChannelForm from '../../presentation/channel/ChannelForm'
import ChannelDetail from '../../presentation/channel/ChannelDetail'
import MessageList from '../../presentation/message/MessageList'
import EbookDetail from '../../presentation/ebook/EbookDetail'

import {
  updateChannelStepper, submitChannel, updateChannel, asyncPickingProgress, asyncGeneratingProgress
} from '../../../actions/tool'
import {generateEbook, postEbook} from '../../../actions/mine'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block',
  backgroundColor: '#fff'
}

const toolbarStyle = {
  marginTop: 15,
  marginBottom: 15,
  textAlign: 'center'
}

class ChannelStepper extends Component {
  constructor(props) {
    super(props)

    // Tips: The best place to bind your member functions is in the component constructor
    this.createChannel = this.createChannel.bind(this)
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
      dispatch(asyncPickingProgress('P-' + json.id))
    })
  }

  handlePrev = () => {
    const {dispatch, channelStepper} = this.props
    if (channelStepper.stepIndex === 0) {
      dispatch(reset('channelForm'))
    } else {
      dispatch(updateChannelStepper({
        finished: channelStepper.stepIndex >= 2,
        stepIndex: channelStepper.stepIndex - 1
      }))
    }
  }

  handleNext = () => {
    const {dispatch, channelStepper, channel} = this.props
    if (channelStepper.stepIndex === 0) {
      dispatch(submit('channelForm'))
    } else if (channelStepper.stepIndex === 1) {
      dispatch(generateEbook(channel.id))
      dispatch(asyncGeneratingProgress('G-' + channel.id))
    } else if (channelStepper.stepIndex === 2) {
      dispatch(updateChannelStepper({
        finished: false,
        stepIndex: 0
      }))
    }
  }

  downloadEbook = (ebookId) => {
    var downloadUrl = "/api/ebook/" + ebookId + "/download";
    window.open(downloadUrl, "_blank");
  }

  postEbook = (ebookId) => {
    alert('尚未实现此功能！');
  }

  renderStepActions = (stepIndex) => {
    return (
      <Card zDepth={0}>
      <CardActions style={toolbarStyle}>
      <FlatButton
      label={stepIndex === 0 ? '重置' : '上一步'}
      disableTouchRipple={true}
      disableFocusRipple={true}
      onTouchTap={this.handlePrev}
      style={{margin: '0 15px 0 0'}}
      />
      <RaisedButton
      label={stepIndex === 2 ? '完成' : '下一步'}
      disableTouchRipple={true}
      disableFocusRipple={true}
      primary={true}
      onTouchTap={this.handleNext}
      />
      </CardActions>
      </Card>
    )
  }

  render() {
    const {dispatch, channelStepper, channel, progress, ebook} = this.props
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={pageStyle}>
      <Stepper activeStep={channelStepper.stepIndex} orientation="vertical">

      <Step>
      <StepLabel>步骤一，填写目标媒体信息：</StepLabel>
      <StepContent>
      <ChannelForm onSubmit={this.createChannel} />
      <LinearProgress mode="determinate" value={progress} />
      {this.renderStepActions(0)}
      </StepContent>
      </Step>

      <Step>
      <StepLabel>步骤二，确认媒体文章列表：</StepLabel>
      <StepContent>
      <MessageList channelId={channel.id}/>
      <LinearProgress mode="determinate" value={progress} />
      {this.renderStepActions(1)}
      </StepContent>
      </Step>

      <Step>
      <StepLabel>步骤三，导出文章到电子书：</StepLabel>
      <StepContent>
      <EbookDetail
      ebook={ebook}
      downloadEbook={this.downloadEbook}
      postEbook={this.postEbook} />
      {this.renderStepActions(2)}
      </StepContent>
      </Step>

      </Stepper>
      </div>
      </MuiThemeProvider>
    )
  }
}

ChannelStepper.propTypes = {
  channelStepper: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired,
  progress: PropTypes.number.isRequired,
  ebook: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  channelStepper: state.channelStepper,
  channel: state.channel,
  progress: state.progress,
  ebook: state.ebook
})

export default connect(mapStateToProps)(ChannelStepper)
