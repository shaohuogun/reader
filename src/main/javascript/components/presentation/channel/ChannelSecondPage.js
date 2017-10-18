import React, {Component} from 'react'
import PropTypes from 'prop-types'

import LinearProgress from 'material-ui/LinearProgress'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import MessageList from '../message/MessageList'

const toolbarStyle = {
  marginTop: 15,
  marginBottom: 15,
  textAlign: 'center'
}

export default class ChannelSecondPage extends Component {
	componentDidMount() {
		const {loadMessages} = this.props
		loadMessages(1)
	}

	render() {
		const {pagination, loadMessages, progress, pristine, submitting, restart, generateEbook} = this.props
		return (
			<div>
			<MessageList pagination={pagination} loadMessages={loadMessages} />
			<LinearProgress mode="determinate" value={progress} />

			<div style={toolbarStyle}>
      <FlatButton
      label="重新开始"
      disableTouchRipple={true}
      disableFocusRipple={true}
      disabled={pristine || submitting}
      onTouchTap={restart}
      style={{margin: '0 15px 0 0'}}
      />
      <RaisedButton
      label="生成电子书"
      disableTouchRipple={true}
      disableFocusRipple={true}
      disabled={pristine || submitting}
      primary={true}
      onTouchTap={generateEbook}
      />
      </div>
			</div>
		)
	}
}

ChannelSecondPage.propTypes = {
	pagination: PropTypes.object.isRequired,
	loadMessages: PropTypes.func.isRequired,
	progress: PropTypes.number.isRequired,
  restart: PropTypes.func.isRequired,
  generateEbook: PropTypes.func.isRequired
}
