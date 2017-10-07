import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Step, Stepper, StepLabel, StepContent} from 'material-ui/Stepper'

import {reset, submit} from 'redux-form'
import {connect} from 'react-redux'

import ItemFirstForm from '../../presentation/read/ItemFirstForm'
import ItemSecondForm from '../../presentation/read/ItemSecondForm'
import ItemThirdForm from '../../presentation/read/ItemThirdForm'

import {
  updateReadingStepper, updateReadingLists, submitReadingItem, updateReadingItem
} from '../../../actions/read'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block',
  backgroundColor: '#fff'
}

class ReadingStepper extends Component {
  constructor(props) {
    super(props)

    // Tips: The best place to bind your member functions is in the component constructor
    this.loadMyLists = this.loadMyLists.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.createItem = this.createItem.bind(this)
  }

  previousStep = () => {
    const {dispatch, readingStepper} = this.props
    dispatch(updateReadingStepper({
      finished: false,
      stepIndex: readingStepper.stepIndex - 1
    }))
  }

  nextStep = () => {
    const {dispatch, readingStepper} = this.props
    var nextStepIndex = readingStepper.stepIndex + 1
    dispatch(updateReadingStepper({
      finished: nextStepIndex == 2,
      stepIndex: nextStepIndex
    }))
  }

  loadMyLists = () => {
    const {dispatch} = this.props
    fetch('/api/myreadinglists', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(response => response.json())
    .then(json => {
      dispatch(updateReadingLists(json))
      this.nextStep()
    })
  }

  createItem = (readingItem) => {
    const {dispatch} = this.props
    dispatch(submitReadingItem(readingItem))
    fetch('/api/readingitem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(readingItem)
    }).then(response => response.json())
    .then(json => {
      dispatch(updateReadingItem(json))
      dispatch(updateReadingStepper({
        finished: false,
        stepIndex: 0
      }))
      dispatch(reset("readingItemForm"))
    })
  }

  render() {
    const {dispatch, readingStepper, readingLists} = this.props
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={pageStyle}>
      <Stepper activeStep={readingStepper.stepIndex} orientation="vertical">

      <Step>
      <StepLabel>步骤一，填写待阅读的书名：</StepLabel>
      <StepContent>
      <ItemFirstForm onSubmit={this.loadMyLists} />
      </StepContent>
      </Step>

      <Step>
      <StepLabel>步骤二，选择目标阅读清单：</StepLabel>
      <StepContent>
      <ItemSecondForm readingLists={readingLists} previousStep={this.previousStep} onSubmit={this.nextStep} />
      </StepContent>
      </Step>

      <Step>
      <StepLabel>步骤三，确认阅读清单信息：</StepLabel>
      <StepContent>
      <ItemThirdForm previousStep={this.previousStep} onSubmit={this.createItem} />
      </StepContent>
      </Step>
      </Stepper>
      </div>
      </MuiThemeProvider>
    )
  }
}

ReadingStepper.propTypes = {
  readingStepper: PropTypes.object.isRequired,
  readingLists: PropTypes.array.isRequired,
  readingItem: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  readingStepper: state.readingStepper,
  readingLists: state.readingLists,
  readingItem: state.readingItem
})

export default connect(mapStateToProps)(ReadingStepper)
