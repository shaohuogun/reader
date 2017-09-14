import $ from "jquery";
import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Pagination from 'material-ui-pagination';

import {connect} from 'react-redux'
import {asyncPagination} from '../../../actions/mine'

const toolbarStyle = {
	textAlign: 'center'
}

export class MessageListItem extends React.Component {
	render() {
		var message = this.props.message
		return (
			<Card
			{...this.props}
			zDepth={0}
			>
			<CardHeader
			title={<span>[<a href={message.url}>原文地址</a>]：{message.title}</span>}
			subtitle={<span>发布日期：{message.releaseDate}   浏览数量：{message.pageview}   评论数量：{message.commentCount}</span>}
			actAsExpander={true}
			showExpandableButton={true}
			/>
			<CardText expandable={false}>
			{message.digest}
			</CardText>
			<CardText expandable={true}>
			{message.content}
			</CardText>
			</Card>
		)
	}
}

MessageListItem.propTypes = {
	message: PropTypes.object.isRequired
}

class MessageList extends React.Component {
	loadPagination = (page) => {
		const {dispatch, channelId} = this.props
		dispatch(asyncPagination(channelId, page))
	}

	componentDidMount() {
		this.loadPagination(1)
	}

	render() {
		const {pagination} = this.props
		var messages = pagination.objects
		if (messages == null) {
			return (<Card {...this.props} zDepth={0}></Card>)
		}

		var rows = []
		var messageCount = messages.length
		for (var i = 0; i < messageCount; i++) {
			var message = messages[i]
			rows.push(
				<MessageListItem message={message} />
			)

			if (i < (messageCount - 1)) {
				rows.push(<Divider />)
			}
		}

		return (
			<Card {...this.props} zDepth={0}>
			<CardText>
			{rows}
			</CardText>
			<CardActions style={toolbarStyle}>
			<Pagination
			total = {pagination.pageCount}
			current = {pagination.pageIndex}
			display = {pagination.pageShow}
			onChange = {current => this.loadPagination(current)}
			/>
			</CardActions>
			</Card>
		)
	}
}

MessageList.propTypes = {
	channelId: PropTypes.string.isRequired,
	pagination: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	pagination: state.pagination
})

export default connect(mapStateToProps)(MessageList)