import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

var Message = React.createClass({
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
				<Message message={message} key={message.id} />
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
