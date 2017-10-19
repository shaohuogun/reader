import React from 'react'
import PropTypes from 'prop-types'

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
  <div style={pageStyle}>
  {props.stepIndex === 1 && (
    <ItemFirstPage onSubmit={props.loadReadingLists} />
  )}

  {props.stepIndex === 2 && (
    <ItemSecondPage readingLists={props.readingLists} previousStep={props.previousStep} onSubmit={props.nextStep} />
  )}

  {props.stepIndex === 3 && (
    <ItemThirdPage previousStep={props.previousStep} onSubmit={props.createReadingItem} />
  )}
  </div>
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
