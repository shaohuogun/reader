import $ from "jquery";
import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import {ListItem, List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Pagination from 'material-ui-pagination';

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
			<CardActions style={toolbarStyle}>
			</CardActions>
			</Card>
		);
	}

};

MessageListItem.propTypes = {
	message: PropTypes.object.isRequired,
};

export default class MessageList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pagination: {},
		};
	}

	loadPagination = (page) => {
		var self = this;
		$.ajax({
			url: "/api/channel/" + self.props.channelId + "/messages",
			type: "GET",
			data: {
				page: page.toString(),
			},
		}).then(function(data) {
			self.setState({
				pagination: data,
			});
		});
	}

	componentDidMount() {
		this.loadPagination(1);
	}

	render() {
		var messages = this.state.pagination.objects;
		if (messages == null) {
			return (<Card {...this.props} zDepth={1}></Card>);
		}

		var rows = [];
		var messageCount = messages.length;
		for (var i = 0; i < messageCount; i++) {
			var message = messages[i];
			rows.push(
				<MessageListItem message={message} />
			);

			if (i < (messageCount - 1)) {
				rows.push(<Divider />);
			}
		}

		return (
			<Card {...this.props} zDepth={1}>
			<CardText>
			{rows}
			</CardText>
			<CardActions style={toolbarStyle}>
			<Pagination
			total = {this.state.pagination.pageCount}
			current = {this.state.pagination.pageIndex}
			display = {this.state.pagination.pageShow}
			onChange = {current => this.loadPagination(current)}
			/>
			</CardActions>
			</Card>
		);
	}

};

MessageList.propTypes = {
	channelId: PropTypes.string.isRequired,
};
