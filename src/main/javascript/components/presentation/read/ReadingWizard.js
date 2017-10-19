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

const ReadingWizard = (props) => (
  <div style={pageStyle}>
  {props.pageIndex === 1 && (
    <ItemFirstPage onSubmit={props.loadReadingLists} />
  )}

  {props.pageIndex === 2 && (
    <ItemSecondPage readingLists={props.readingLists} previousStep={props.previousStep} onSubmit={props.nextStep} />
  )}

  {props.pageIndex === 3 && (
    <ItemThirdPage previousStep={props.previousStep} onSubmit={props.createReadingItem} />
  )}
  </div>
)

ReadingWizard.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  previousStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  readingLists: PropTypes.array.isRequired,
  loadReadingLists: PropTypes.func.isRequired,
  createReadingItem: PropTypes.func.isRequired
}

export default ReadingWizard
