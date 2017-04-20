import $ from "jquery";
import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardText, CardActions} from 'material-ui/Card';
import {ListItem, List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Pagination from 'material-ui-pagination';

const paginationStyle = {
	textAlign: 'center',
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
			url: "/api/channel/" + self.props.channelId + "/message?page=" + page.toString(),
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
			return (<List></List>);
		}

		var rows = [];
		var messageCount = messages.length;
		for (var i = 0; i < messageCount; i++) {
			var message = messages[i];
			rows.push(
				<ListItem
				primaryText={<span>[<a href={message.url}>原文地址</a>]：{message.title}</span>}
				secondaryText={message.digest}
				secondaryTextLines={2}
				key={message.id}
				/>
			);

			if (i < (messageCount - 1)) {
				rows.push(<Divider />);
			}
		}

		return (
			<Card style={this.props.style} zDepth={1}>
			<CardText>
			<List>
			{rows}
			</List>
			</CardText>
			<CardActions style={paginationStyle}>
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
