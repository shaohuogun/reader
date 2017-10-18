import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, CardHeader, CardActions} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

const toolbarStyle = {
  marginTop: 15,
  marginBottom: 15,
  textAlign: 'center'
}

export default class ChannelThirdPage extends Component {
	render() {
		const {ebook, downloadEbook, postEbook, pristine, submitting, restart} = this.props
		return (
			<Card zDepth={0}>
			<CardHeader
			title={ebook.name}
			subtitle={ebook.createDate}
			/>
			<CardActions style={toolbarStyle}>
			<FlatButton
			label="下载"
			secondary={true}
			onTouchTap={downloadEbook.bind(this, ebook.id)}
			/>
			<FlatButton
			label="发送"
			secondary={true}
			onTouchTap={postEbook.bind(this, ebook.id)}
			/>
			</CardActions>

			<CardActions style={toolbarStyle}>
			<RaisedButton
			label="重新开始"
			disableTouchRipple={true}
			disableFocusRipple={true}
      disabled={pristine || submitting}
			primary={true}
			onTouchTap={restart}
			/>
			</CardActions>
			</Card>
		)
	}

}

ChannelThirdPage.propTypes = {
	ebook: PropTypes.object.isRequired,
	downloadEbook: PropTypes.func.isRequired,
	postEbook: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired
}
