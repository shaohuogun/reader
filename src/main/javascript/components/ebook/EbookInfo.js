import React from 'react'
import PropTypes from 'prop-types'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const toolbarStyle = {
	textAlign: 'center',
}

export default class EbookInfo extends React.Component {
	
	render() {
		const {ebook, downloadEbook, postEbook} = this.props
		return (
			<Card {...this.props} zDepth={1}>
			<CardHeader
			title={ebook.name}
			/>
			<CardText>
			{ebook.createDate}
			</CardText>
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
			</Card>
		)
	}

}

EbookInfo.propTypes = {
	ebook: PropTypes.object.isRequired,
	downloadEbook: PropTypes.func.isRequired,
	postEbook: PropTypes.func.isRequired
}
