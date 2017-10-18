import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {reset, submit} from 'redux-form'
import {connect} from 'react-redux'

import {updateCatalogs} from '../../../actions/catalog'
import {
  submitMessage, updateMessage
} from '../../../actions/message'
import MessageStepper from '../../presentation/message/MessageStepper'

class MessageStepperContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stepIndex: 0
    }

    // Tips: The best place to bind your member functions is in the component constructor
    this.previousStep = this.previousStep.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.loadCatalogs = this.loadCatalogs.bind(this)
    this.createMessage = this.createMessage.bind(this)
  }

  restart = () => {
    const {dispatch} = this.props
    dispatch(reset("messageForm"))
    this.setState({
      stepIndex: 0
    })
  }

  previousStep = () => {
    this.setState({
      stepIndex: this.state.stepIndex - 1
    })
  }

  nextStep = () => {
    this.setState({
      stepIndex: this.state.stepIndex + 1
    })
  }

  loadCatalogs = () => {
    const {dispatch} = this.props
    fetch('/api/mycatalogs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(response => response.json())
    .then(json => {
      dispatch(updateCatalogs(json))
      this.nextStep()
    })
  }

  createMessage = (message) => {
    const {dispatch} = this.props
    dispatch(submitMessage(message))
    fetch('/api/message?categoryType=Catalog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(message)
    }).then(response => response.json())
    .then(json => {
      dispatch(updateMessage(json))
      this.restart()
    })
  }

  render() {
    const {catalogs} = this.props
    return (
      <MessageStepper stepIndex={this.state.stepIndex}
      catalogs={catalogs} previousStep={this.previousStep} nextStep={this.nextStep}
      loadCatalogs={this.loadCatalogs} createMessage={this.createMessage} />
    )
  }
}

MessageStepperContainer.propTypes = {
  catalogs: PropTypes.array.isRequired,
  message: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  catalogs: state.catalogs,
  message: state.message
})

export default connect(mapStateToProps)(MessageStepperContainer)
