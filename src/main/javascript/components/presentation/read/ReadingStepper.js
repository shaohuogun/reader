import React from 'react'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Step, Stepper, StepLabel, StepContent} from 'material-ui/Stepper'

import ItemFirstPage from './ItemFirstPage'
import ItemSecondPage from './ItemSecondPage'
import ItemThirdPage from './ItemThirdPage'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block',
  backgroundColor: '#fff'
}

const ReadingStepper = (props) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
  <div style={pageStyle}>
  <Stepper activeStep={props.stepIndex} orientation="vertical">

  <Step>
  <StepLabel>步骤一，填写待阅读的书名：</StepLabel>
  <StepContent>
  <ItemFirstPage onSubmit={props.loadReadingLists} />
  </StepContent>
  </Step>

  <Step>
  <StepLabel>步骤二，选择目标阅读清单：</StepLabel>
  <StepContent>
  <ItemSecondPage readingLists={props.readingLists} previousStep={props.previousStep} onSubmit={props.nextStep} />
  </StepContent>
  </Step>

  <Step>
  <StepLabel>步骤三，确认阅读清单信息：</StepLabel>
  <StepContent>
  <ItemThirdPage previousStep={props.previousStep} onSubmit={props.createReadingItem} />
  </StepContent>
  </Step>
  </Stepper>
  </div>
  </MuiThemeProvider>
)

ReadingStepper.propTypes = {
  stepIndex: PropTypes.number.isRequired,
  previousStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  readingLists: PropTypes.array.isRequired,
  loadReadingLists: PropTypes.func.isRequired,
  createReadingItem: PropTypes.func.isRequired
}

export default ReadingStepper