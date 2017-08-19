import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {Step, Stepper, StepLabel, StepContent} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import LinearProgress from 'material-ui/LinearProgress'

import {submit} from 'redux-form'
import {connect} from 'react-redux'

import ChannelForm from './ChannelForm'
import ChannelDetail from '../../components/channel/ChannelDetail'
import MessageList from '../../components/message/MessageList'
import EbookDetail from '../../components/ebook/EbookDetail'

import {updateEbookStepper} from '../../actions/tool'
import {generateEbook, postEbook} from '../../actions/mine'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block'
}

const toolbarStyle = {
  marginTop: 15,
  textAlign: 'center'
}

class EbookStepper extends Component {
  handleNext = () => {
    const {dispatch, ebookStepper, channelId} = this.props
    if (ebookStepper.stepIndex === 0) {
      dispatch(submit('channelForm'))
    } else if (ebookStepper.stepIndex === 1) {
      dispatch(generateEbook(channelId))
    } else {
      dispatch(updateEbookStepper({
        finished: ebookStepper.stepIndex >= 2,
        stepIndex: ebookStepper.stepIndex + 1
      }))
    }
  }

  handlePrev = () => {
    const {dispatch, ebookStepper} = this.props
    dispatch(updateEbookStepper({
      finished: ebookStepper.stepIndex >= 2,
      stepIndex: ebookStepper.stepIndex - 1
    }))
  }

  downloadEbook = (ebookId) => {
    var downloadUrl = "/api/ebook/" + ebookId + "/download";
    window.open(downloadUrl, "_blank");
  }

  postEbook = (ebookId) => {
  }

  renderStepActions = (stepIndex) => {
    return (
      <div style={toolbarStyle}>
      {stepIndex > 0 && (
        <FlatButton
        label={'上一步'}
        disabled={stepIndex === 0}
        disableTouchRipple={true}
        disableFocusRipple={true}
        onTouchTap={this.handlePrev}
        />
      )}
      <RaisedButton
      label={stepIndex === 2 ? '完成' : '下一步'}
      disableTouchRipple={true}
      disableFocusRipple={true}
      primary={true}
      onTouchTap={this.handleNext}
      />
      </div>
    )
  }

  render() {
    const {dispatch, ebookStepper, progress, channelId, ebook} = this.props
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
      <MessageList channelId={channelId}/>
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

      {ebookStepper.finished && (
        <p>
        <a
        href="#"
        onClick={(event) => {
          event.preventDefault()
          const {dispatch} = this.props
          dispatch(updateEbookStepper({
            finished: false,
            stepIndex: 0
          }))
        }}
        >
        点击此处
        </a> 再来一次！
        </p>
      )}

      </div>
      </MuiThemeProvider>
    )
  }
}

EbookStepper.propTypes = {
  ebookStepper: PropTypes.object.isRequired,
  channelId: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  ebook: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  ebookStepper: state.ebookStepper,
  channelId: state.channel.id,
  progress: state.progress,
  ebook: state.ebook
})

export default connect(mapStateToProps)(EbookStepper)
