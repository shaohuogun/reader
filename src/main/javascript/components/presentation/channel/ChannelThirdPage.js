import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, CardHeader, CardActions} from 'material-ui/Card'
import Button from 'material-ui/Button'

const toolbarStyle = {
  marginTop: 15,
  marginBottom: 15,
  textAlign: 'center'
}

export default class ChannelThirdPage extends Component {
	render() {
		const {ebook, downloadEbook, postEbook, pristine, submitting, restart} = this.props
		return (
      <div>
      <span>步骤三，导出文章到电子书：</span>
			<Card zDepth={0}>
			<CardHeader
			title={ebook.name}
			subtitle={ebook.createDate}
			/>
			<CardActions style={toolbarStyle}>
			<Button
			label="下载"
			secondary={true}
			onTouchTap={downloadEbook.bind(this, ebook.id)}
			/>
			<Button
			label="发送"
			secondary={true}
			onTouchTap={postEbook.bind(this, ebook.id)}
			/>
			</CardActions>

			<CardActions style={toolbarStyle}>
			<Button raised
			label="重新开始"
			disableTouchRipple={true}
			disableFocusRipple={true}
      disabled={pristine || submitting}
			primary={true}
			onTouchTap={restart}
			/>
			</CardActions>
			</Card>
      </div>
		)
	}

}

ChannelThirdPage.propTypes = {
	ebook: PropTypes.object.isRequired,
	downloadEbook: PropTypes.func.isRequired,
	postEbook: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired
}
