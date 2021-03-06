import React from 'react'
import PropTypes from 'prop-types'
import {Card, CardHeader, CardActions} from 'material-ui/Card'
import Button from 'material-ui/Button'

const toolbarStyle = {
	textAlign: 'center',
}

export default class EbookDetail extends React.Component {
	render() {
		const {ebook, downloadEbook, postEbook} = this.props
		return (
			<Card {...this.props} zDepth={0}>
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
			</Card>
		)
	}

}

EbookDetail.propTypes = {
	ebook: PropTypes.object.isRequired,
	downloadEbook: PropTypes.func.isRequired,
	postEbook: PropTypes.func.isRequired
}
