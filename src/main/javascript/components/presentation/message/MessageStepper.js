import React from 'react'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Step, Stepper, StepLabel, StepContent} from 'material-ui/Stepper'

import MessageFirstPage from './MessageFirstPage'
import MessageSecondPage from './MessageSecondPage'
import MessageThirdPage from './MessageThirdPage'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block',
  backgroundColor: '#fff'
}

const MessageStepper = (props) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
  <div style={pageStyle}>
  <Stepper activeStep={props.stepIndex} orientation="vertical">

  <Step>
  <StepLabel>步骤一，填写目标文章网址：</StepLabel>
  <StepContent>
  <MessageFirstPage onSubmit={props.loadCatalogs} />
  </StepContent>
  </Step>

  <Step>
  <StepLabel>步骤二，选择文章收藏分类：</StepLabel>
  <StepContent>
  <MessageSecondPage catalogs={props.catalogs} previousStep={props.previousStep} onSubmit={props.nextStep} />
  </StepContent>
  </Step>

  <Step>
  <StepLabel>步骤三，确认文章分类信息：</StepLabel>
  <StepContent>
  <MessageThirdPage previousStep={props.previousStep} onSubmit={props.createMessage} />
  </StepContent>
  </Step>

  </Stepper>
  </div>
  </MuiThemeProvider>
)

MessageStepper.propTypes = {
  stepIndex: PropTypes.number.isRequired,
  previousStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  catalogs: PropTypes.array.isRequired,
  loadCatalogs: PropTypes.func.isRequired,
  createMessage: PropTypes.func.isRequired
}

export default MessageStepper
