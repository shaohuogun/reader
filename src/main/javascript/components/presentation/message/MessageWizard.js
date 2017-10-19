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

const MessageWizard = (props) => (
  <div style={pageStyle}>
  {props.pageIndex === 1 && (
    <MessageFirstPage onSubmit={props.loadCatalogs} />
  )}

  {props.pageIndex === 2 && (
    <MessageSecondPage catalogs={props.catalogs} previousStep={props.previousStep} onSubmit={props.nextStep} />
  )}

  {props.pageIndex === 3 && (
    <MessageThirdPage previousStep={props.previousStep} onSubmit={props.createMessage} />
  )}
  </div>
)

MessageWizard.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  previousStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  catalogs: PropTypes.array.isRequired,
  loadCatalogs: PropTypes.func.isRequired,
  createMessage: PropTypes.func.isRequired
}

export default MessageWizard
