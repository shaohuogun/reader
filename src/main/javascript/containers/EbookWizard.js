import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {Step, Stepper, StepLabel} from 'material-ui/Stepper'
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import LinearProgress from 'material-ui/LinearProgress'

import ChannelForm from './ChannelForm'
import ChannelInfo from '../components/channel/ChannelInfo'
import MessageList from '../components/message/MessageList'
import EbookInfo from '../components/ebook/EbookInfo'

import {submit} from 'redux-form'
import {connect} from 'react-redux'
import {updateWizard} from '../actions/service'
import {generateEbook, postEbook} from '../actions/mine'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block'
}

const contentStyle = {
  margin: '0 16px'
}

const toolbarStyle = {
  marginTop: 15,
  textAlign: 'center'
}

class EbookWizard extends React.Component {

  handleNext = () => {
    const {dispatch, wizard, channelId} = this.props
    if (wizard.stepIndex === 0) {
      dispatch(submit('channelForm'))
    } else if (wizard.stepIndex === 1) {
      dispatch(generateEbook(channelId))
    } else {
      dispatch(updateWizard({
        finished: wizard.stepIndex >=2,
        stepIndex: wizard.stepIndex + 1
      }))
    }
  }

  handlePrev = () => {
    const {dispatch, wizard} = this.props
    dispatch(updateWizard({
      finished: wizard.stepIndex >=2,
      stepIndex: wizard.stepIndex - 1
    }))
  }

  getStepContent(stepIndex) {
    const {dispatch, progress, channelId, ebook} = this.props
    switch (stepIndex) {
      case 0:
      return (
        <div>
        <ChannelForm />
        <LinearProgress mode="determinate" value={progress} />
        </div>
      )
      case 1:
      return (
        <div>
        <MessageList channelId={channelId}/>
        <LinearProgress mode="determinate" value={progress} />
        </div>
      );
      case 2:
      return (
        <EbookInfo
        ebook={ebook}
        downloadEbook={ebookId => {
          var downloadUrl = "/api/ebook/" + ebookId + "/download"
      		window.open(downloadUrl, "_blank")
        }}
        postEbook={ebookId =>
          dispatch(postEbook(ebookId))} />
      )
      default:
      return (
        <p>
        <a
        href="#"
        onClick={(event) => {
          event.preventDefault()
          const {dispatch} = this.props
          dispatch(updateWizard({
            finished: false,
            stepIndex: 0
          }))
        }}
        >
        点击此处
        </a> 再来一次！
        </p>
      )
    }
  }

  render() {
    const {wizard} = this.props
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={pageStyle}>

      <Stepper activeStep={wizard.stepIndex} connector={<ArrowForwardIcon />}>
      <Step>
      <StepLabel>输入目标频道信息</StepLabel>
      </Step>
      <Step>
      <StepLabel>采集频道下的消息</StepLabel>
      </Step>
      <Step>
      <StepLabel>导出消息到电子书</StepLabel>
      </Step>
      </Stepper>

      <div style={contentStyle}>
      {this.getStepContent(wizard.stepIndex)}
      </div>

      {!wizard.finished ? (
        <div style={toolbarStyle}>
        <FlatButton
        label={wizard.stepIndex === 0 ? '重置' : '上一步'}
        onTouchTap={this.handlePrev}
        style={{marginRight: 12}}
        />
        <RaisedButton
        label={wizard.stepIndex === 2 ? '完成' : '下一步'}
        primary={true}
        onTouchTap={this.handleNext}
        />
        </div>
      ) : ''}

      </div>
      </MuiThemeProvider>
    )
  }
}

EbookWizard.propTypes = {
  wizard: PropTypes.object.isRequired,
  progress: PropTypes.number.isRequired,
  channelId: PropTypes.string.isRequired,
  ebook: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  wizard: state.wizard,
  progress: state.progress,
  channelId: state.channel.id,
  ebook: state.ebook
})

export default connect(mapStateToProps)(EbookWizard)
