import React from 'react';
import {ListItem, List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

var MessageListItem = React.createClass({
	render: function() {
		return (
			<ListItem
			primaryText={<a href={this.props.message.url}>{this.props.message.title}</a>}
			secondaryText={this.props.message.digest}
			secondaryTextLines={2}
			/>
		);
	}
});

var MessageList = React.createClass({
	render: function() {
		var rows = [];
		this.props.messages.forEach(function(message) {
			rows.push(
				<div>
				<MessageListItem message={message} key={message.id} />
				<Divider />
				</div>
			);
		});
		return (
			<List>
			<Subheader>Messages</Subheader>
			{rows}
			</List>
		);
	}
});

export default MessageList;
