import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Step, Stepper, StepLabel, StepContent} from 'material-ui/Stepper'

import ItemFirstForm from '../../presentation/read/ItemFirstForm'
import ItemSecondForm from '../../presentation/read/ItemSecondForm'
import ItemThirdForm from '../../presentation/read/ItemThirdForm'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block',
  backgroundColor: '#fff'
}

export default class ReadingStepper extends Component {
  render() {
    const {stepIndex, readingLists, previousStep, nextStep, loadMyLists, createItem} = this.props
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={pageStyle}>
      <Stepper activeStep={stepIndex} orientation="vertical">

      <Step>
      <StepLabel>步骤一，填写待阅读的书名：</StepLabel>
      <StepContent>
      <ItemFirstForm onSubmit={loadMyLists} />
      </StepContent>
      </Step>

      <Step>
      <StepLabel>步骤二，选择目标阅读清单：</StepLabel>
      <StepContent>
      <ItemSecondForm readingLists={readingLists} previousStep={previousStep} onSubmit={nextStep} />
      </StepContent>
      </Step>

      <Step>
      <StepLabel>步骤三，确认阅读清单信息：</StepLabel>
      <StepContent>
      <ItemThirdForm previousStep={previousStep} onSubmit={createItem} />
      </StepContent>
      </Step>
      </Stepper>
      </div>
      </MuiThemeProvider>
    )
  }
}

ReadingStepper.propTypes = {
  stepIndex: PropTypes.number.isRequired,
  readingLists: PropTypes.array.isRequired,
  previousStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  loadMyLists: PropTypes.func.isRequired,
  createItem: PropTypes.func.isRequired
}
