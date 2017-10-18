import React from 'react'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Step, Stepper, StepLabel, StepContent} from 'material-ui/Stepper'

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

const ChannelStepper = (props) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
  <div style={pageStyle}>
  <Stepper activeStep={props.stepIndex} orientation="vertical">

  <Step>
  <StepLabel>步骤一，填写目标媒体信息：</StepLabel>
  <StepContent>
  <ChannelFirstPage onSubmit={props.createChannel} progress={props.progress.pickingMessage} />
  </StepContent>
  </Step>

  <Step>
  <StepLabel>步骤二，确认媒体文章列表：</StepLabel>
  <StepContent>
  <ChannelSecondPage pagination={props.pagination} loadMessages={props.loadMessages} progress={props.progress.generatingEbook} restart={props.restart} generateEbook={props.generateEbook} />
  </StepContent>
  </Step>

  <Step>
  <StepLabel>步骤三，导出文章到电子书：</StepLabel>
  <StepContent>
  <ChannelThirdPage ebook={props.ebook} downloadEbook={props.downloadEbook} postEbook={props.postEbook} restart={props.restart} />
  </StepContent>
  </Step>

  </Stepper>
  </div>
  </MuiThemeProvider>
)

ChannelStepper.propTypes = {
  stepIndex: PropTypes.number.isRequired,
  channel: PropTypes.object.isRequired,
  progress: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  ebook: PropTypes.object.isRequired,
  previousStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  createChannel: PropTypes.func.isRequired,
  loadMessages: PropTypes.func.isRequired,
  generateEbook: PropTypes.func.isRequired,
  downloadEbook: PropTypes.func.isRequired,
  postEbook: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired
}

export default ChannelStepper
