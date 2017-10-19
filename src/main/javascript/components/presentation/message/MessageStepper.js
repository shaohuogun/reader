import React from 'react'
import PropTypes from 'prop-types'

import MessageFirstPage from './MessageFirstPage'
import MessageSecondPage from './MessageSecondPage'
import MessageThirdPage from './MessageThirdPage'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block',
  backgroundColor: '#fff'
}

const MessageStepper = (props) => (
  <div style={pageStyle}>
  {props.stepIndex === 1 && (
    <MessageFirstPage onSubmit={props.loadCatalogs} />
  )}

  {props.stepIndex === 2 && (
    <MessageSecondPage catalogs={props.catalogs} previousStep={props.previousStep} onSubmit={props.nextStep} />
  )}

  {props.stepIndex === 3 && (
    <MessageThirdPage previousStep={props.previousStep} onSubmit={props.createMessage} />
  )}
  </div>
)

MessageStepper.propTypes = {
  stepIndex: PropTypes.number.isRequired,
  previousStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  catalogs: PropTypes.array.isRequired,
  loadCatalogs: PropTypes.func.isRequired,
  createMessage: PropTypes.func.isRequired
}

export default MessageStepper
