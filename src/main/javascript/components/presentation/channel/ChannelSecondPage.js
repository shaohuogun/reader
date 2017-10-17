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
		const {loadPagination} = this.props
		loadPagination(1)
	}

	render() {
		const {pagination, loadPagination, progress, restartStepper, generateEbook} = this.props
		return (
			<div>
			<MessageList pagination={pagination} loadPagination={loadPagination} />
			<LinearProgress mode="determinate" value={progress} />

			<div style={toolbarStyle}>
      <FlatButton
      label="重新开始"
      disableTouchRipple={true}
      disableFocusRipple={true}
      onTouchTap={restartStepper}
      style={{margin: '0 15px 0 0'}}
      />
      <RaisedButton
      label="生成电子书"
      disableTouchRipple={true}
      disableFocusRipple={true}
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
	loadPagination: PropTypes.func.isRequired,
	progress: PropTypes.number.isRequired,
  restartStepper: PropTypes.func.isRequired,
  generateEbook: PropTypes.func.isRequired
}
