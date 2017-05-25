import $ from "jquery";
import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Pagination from 'material-ui-pagination';

import {connect} from 'react-redux'

import {ansyncPagination} from '../../actions'

const toolbarStyle = {
	textAlign: 'center',
};

export class MessageListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: {},
		};
	}

	handleExpandChange(newExpandedState) {
		if (!newExpandedState) {
			return;
		}

    var self = this;
    $.ajax({
      url: "/api/message/" + self.props.message.id + "/content",
			type: "GET",
			data: {},
    }).then(function(data) {
      self.setState({
        content: data,
      });
    });
  }

	render() {
		var message = this.props.message;
		return (
			<Card
			{...this.props}
			zDepth={0}
			onExpandChange={this.handleExpandChange.bind(this)}
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
			{this.state.content.original}
			</CardText>
			</Card>
		);
	}

};

MessageListItem.propTypes = {
	message: PropTypes.object.isRequired,
};

class MessageList extends React.Component {
	loadPagination = (page) => {
		const {dispatch, channel} = this.props
		dispatch(ansyncPagination(channel.id, page))
	}

	componentDidMount() {
		this.loadPagination(1)
	}
	
	render() {
		const {pagination} = this.props
		var messages = pagination.objects
		if (messages == null) {
			return (<Card {...this.props} zDepth={1}></Card>)
		}

		var rows = [];
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
			<Card {...this.props} zDepth={1}>
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
		);
	}

};

MessageList.propTypes = {
	channel: PropTypes.object.isRequired,
	pagination: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  channel: state.channel,
	pagination: state.pagination
})

export default connect(mapStateToProps)(MessageList)
