import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {reset, submit} from 'redux-form'
import {connect} from 'react-redux'

import {
  updateReadingLists, submitReadingItem, updateReadingItem
} from '../../../actions/read'

import ReadingStepper from './ReadingStepper'

class ReadingStepperContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stepIndex: 0
    }

    // Tips: The best place to bind your member functions is in the component constructor
    this.previousStep = this.previousStep.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.loadMyLists = this.loadMyLists.bind(this)
    this.createItem = this.createItem.bind(this)
  }

  initializeStep = () => {
    this.setState({
      stepIndex: 0
    })
  }

  previousStep = () => {
    var newStepIndex = this.state.stepIndex - 1
    this.setState({
      stepIndex: newStepIndex
    })
  }

  nextStep = () => {
    var newStepIndex = this.state.stepIndex + 1
    this.setState({
      stepIndex: newStepIndex
    })
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
      dispatch(reset("readingItemForm"))
      this.initializeStep()
    })
  }

  render() {
    const {dispatch, readingLists} = this.props
    return (
      <ReadingStepper stepIndex={this.state.stepIndex}
      readingLists={readingLists} previousStep={this.previousStep} nextStep={this.nextStep}
      loadMyLists={this.loadMyLists} createItem={this.createItem} />
    )
  }
}

ReadingStepperContainer.propTypes = {
  readingLists: PropTypes.array.isRequired,
  readingItem: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  readingLists: state.readingLists,
  readingItem: state.readingItem
})

export default connect(mapStateToProps)(ReadingStepperContainer)
