import React from 'react';
import {submit} from 'redux-form'
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

const RemoteSubmitButton = ({dispatch}) => (
  <RaisedButton
  label='下一步'
  primary={true}
  onTouchTap={() => dispatch(submit('channelForm'))}
  />
)

export default connect()(RemoteSubmitButton)
