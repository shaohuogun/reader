import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {Step, Stepper, StepLabel, StepContent} from 'material-ui/Stepper'
import {Card, CardActions} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import {reset, submit} from 'redux-form'
import {connect} from 'react-redux'

import ReadingItemFirstForm from './ReadingItemFirstForm'

import {updateReadingStepper} from '../../actions/tool'

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

class ReadingStepper extends Component {
  handlePrev = () => {
    const {dispatch, readingStepper} = this.props
    if (readingStepper.stepIndex === 0) {
      dispatch(reset('readingItemForm'))
    } else {
      dispatch(updateReadingStepper({
        finished: readingStepper.stepIndex >= 2,
        stepIndex: readingStepper.stepIndex - 1
      }))
    }
  }

  handleNext = () => {
    const {dispatch, readingStepper, readingItem} = this.props
    if (readingStepper.stepIndex === 0) {
      dispatch(submit('readingItemForm'))
    } else if (readingStepper.stepIndex === 1) {

    } else if (readingStepper.stepIndex === 2) {
      dispatch(updateReadingStepper({
        finished: false,
        stepIndex: 0
      }))
    }
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
    const {dispatch, readingStepper, readingItem} = this.props
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={pageStyle}>
      <Stepper activeStep={readingStepper.stepIndex} orientation="vertical">

      <Step>
      <StepLabel>步骤一，填写待阅读的书名：</StepLabel>
      <StepContent>
      <ReadingItemFirstForm />
      {this.renderStepActions(0)}
      </StepContent>
      </Step>

      <Step>
      <StepLabel>步骤二，选择目标阅读清单：</StepLabel>
      <StepContent>

      {this.renderStepActions(1)}
      </StepContent>
      </Step>

      <Step>
      <StepLabel>步骤三，确认阅读清单信息：</StepLabel>
      <StepContent>

      {this.renderStepActions(2)}
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
  readingItem: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  readingStepper: state.readingStepper,
  readingItem: state.readingItem
})

export default connect(mapStateToProps)(ReadingStepper)
