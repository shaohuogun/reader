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

import MessageFirstForm from '../../components/message/MessageFirstForm'
import MessageSecondForm from '../../components/message/MessageSecondForm'

import {
  updateMessageStepper, submitMessage, updateMessage
} from '../../actions/tool'

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

class MessageStepper extends Component {
  constructor(props) {
    super(props)

    // Tips: The best place to bind your member functions is in the component constructor
    this.createMessage = this.createMessage.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.handleNext = this.handleNext.bind(this)
  }

  createMessage = (message) => {
    const {dispatch} = this.props
    dispatch(submitMessage(message))
    fetch('/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(message)
    }).then(response => response.json())
    .then(json => {
      dispatch(updateMessage(json))
      dispatch(updateMessageStepper({
        finished: true,
        stepIndex: 2
      }))
    })
  }

  handlePrev = () => {
    const {dispatch, messageStepper} = this.props
    if (messageStepper.stepIndex === 0) {
      dispatch(reset('messageForm'))
    } else {
      dispatch(updateMessageStepper({
        finished: messageStepper.stepIndex >= 2,
        stepIndex: messageStepper.stepIndex - 1
      }))
    }
  }

  handleNext = () => {
    const {dispatch, messageStepper, message} = this.props
    if (messageStepper.stepIndex === 0) {
      dispatch(updateMessageStepper({
        finished: false,
        stepIndex: 1
      }))
    } else if (messageStepper.stepIndex === 1) {
      dispatch(submit('messageForm'))
    } else if (messageStepper.stepIndex === 2) {
      dispatch(updateMessageStepper({
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
    const {dispatch, messageStepper} = this.props
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={pageStyle}>
      <Stepper activeStep={messageStepper.stepIndex} orientation="vertical">

      <Step>
      <StepLabel>步骤一，填写目标文章网址：</StepLabel>
      <StepContent>
      <MessageFirstForm onSubmit={this.handleNext} />
      {this.renderStepActions(0)}
      </StepContent>
      </Step>

      <Step>
      <StepLabel>步骤二，选择文章收藏分类：</StepLabel>
      <StepContent>
      <MessageSecondForm onSubmit={this.createMessage} />
      {this.renderStepActions(1)}
      </StepContent>
      </Step>

      <Step>
      <StepLabel>步骤三，确认文章分类信息：</StepLabel>
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

MessageStepper.propTypes = {
  messageStepper: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  messageStepper: state.messageStepper,
  message: state.message
})

export default connect(mapStateToProps)(MessageStepper)
