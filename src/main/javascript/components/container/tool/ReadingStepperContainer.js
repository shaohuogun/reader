import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {reset, submit} from 'redux-form'
import {connect} from 'react-redux'

import {
  updateReadingLists, submitReadingItem, updateReadingItem
} from '../../../actions/read'

import ReadingStepper from '../../presentation/read/ReadingStepper'

class ReadingStepperContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stepIndex: 0
    }

    // Tips: The best place to bind your member functions is in the component constructor
    this.previousStep = this.previousStep.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.loadReadingLists = this.loadReadingLists.bind(this)
    this.createReadingItem = this.createReadingItem.bind(this)
  }

  initializeStepper = () => {
    this.setState({
      stepIndex: 0
    })
  }

  previousStep = () => {
    var curStepIndex = this.state.stepIndex - 1
    this.setState({
      stepIndex: curStepIndex
    })
  }

  nextStep = () => {
    var curStepIndex = this.state.stepIndex + 1
    this.setState({
      stepIndex: curStepIndex
    })
  }

  loadReadingLists = () => {
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

  createReadingItem = (readingItem) => {
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
      this.initializeStepper()
    })
  }

  render() {
    const {dispatch, readingLists} = this.props
    return (
      <ReadingStepper stepIndex={this.state.stepIndex}
      readingLists={readingLists} previousStep={this.previousStep} nextStep={this.nextStep}
      loadReadingLists={this.loadReadingLists} createReadingItem={this.createReadingItem} />
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
