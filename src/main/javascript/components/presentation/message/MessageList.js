import React from 'react'
import PropTypes from 'prop-types'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import Pagination from 'material-ui-pagination'

import MessageListItem from './MessageListItem'

const toolbarStyle = {
	textAlign: 'center'
}

const MessageList = (props) => {
	if (!props.pagination.objects) {
		return (<Card {...props} zDepth={0}></Card>)
	}

	var rows = []
	var messages = props.pagination.objects
	var messageCount = messages.length
	for (var i = 0; i < messageCount; i++) {
		rows.push(
			<MessageListItem message={messages[i]} />
		)

		if (i < (messageCount - 1)) {
			rows.push(<Divider />)
		}
	}

	return (
		<Card zDepth={0}>
		<CardText>
		{rows}
		</CardText>
		<CardActions style={toolbarStyle}>
		<Pagination
		total = {props.pagination.pageCount}
		current = {props.pagination.pageIndex}
		display = {props.pagination.pageShow}
		onChange = {current => props.loadPagination(current)}
		/>
		</CardActions>
		</Card>
	)
}

MessageList.propTypes = {
	pagination: PropTypes.object.isRequired,
	loadPagination: PropTypes.func.isRequired
}

export default MessageList
