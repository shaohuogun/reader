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

import ChannelForm from './ChannelForm'
import ChannelDetail from '../../components/channel/ChannelDetail'
import MessageList from '../../components/message/MessageList'
import EbookDetail from '../../components/ebook/EbookDetail'

import {updateEbookStepper, asyncGeneratingProgress} from '../../actions/tool'
import {generateEbook, postEbook} from '../../actions/mine'

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

class EbookStepper extends Component {
  handlePrev = () => {
    const {dispatch, ebookStepper} = this.props
    if (ebookStepper.stepIndex === 0) {
      dispatch(reset('channelForm'))
    } else {
      dispatch(updateEbookStepper({
        finished: ebookStepper.stepIndex >= 2,
        stepIndex: ebookStepper.stepIndex - 1
      }))
    }
  }

  handleNext = () => {
    const {dispatch, ebookStepper, channel} = this.props
    if (ebookStepper.stepIndex === 0) {
      dispatch(submit('channelForm'))
    } else if (ebookStepper.stepIndex === 1) {
      dispatch(generateEbook(channel.id))
      dispatch(asyncGeneratingProgress('G-' + channel.id))
    } else if (ebookStepper.stepIndex === 2) {
      dispatch(updateEbookStepper({
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
    const {dispatch, ebookStepper, channel, progress, ebook} = this.props
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={pageStyle}>
      <Stepper activeStep={ebookStepper.stepIndex} orientation="vertical">

      <Step>
      <StepLabel>输入目标频道信息</StepLabel>
      <StepContent>
      <ChannelForm />
      <LinearProgress mode="determinate" value={progress} />
      {this.renderStepActions(0)}
      </StepContent>
      </Step>

      <Step>
      <StepLabel>采集频道下的文章</StepLabel>
      <StepContent>
      <MessageList channelId={channel.id}/>
      <LinearProgress mode="determinate" value={progress} />
      {this.renderStepActions(1)}
      </StepContent>
      </Step>

      <Step>
      <StepLabel>导出文章到电子书</StepLabel>
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

EbookStepper.propTypes = {
  ebookStepper: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired,
  progress: PropTypes.number.isRequired,
  ebook: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  ebookStepper: state.ebookStepper,
  channel: state.channel,
  progress: state.progress,
  ebook: state.ebook
})

export default connect(mapStateToProps)(EbookStepper)
