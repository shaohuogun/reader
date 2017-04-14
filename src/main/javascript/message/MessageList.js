import React from 'react';
import {ListItem, List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

export class MessageListItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ListItem
			primaryText={<a href={this.props.message.url}>{this.props.message.title}</a>}
			secondaryText={this.props.message.digest}
			secondaryTextLines={2}
			/>
		);
	}

};

export default class MessageList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var rows = [];
		var messageCount = this.props.messages.length;
		for (var i = 0; i < messageCount; i++) {
			var message = this.props.messages[i];
			rows.push(
				<MessageListItem message={message} key={message.id} />
			);

			if (i < (messageCount - 1)) {
				rows.push(
					<Divider />
				);
			}
		}

		return (
			<List>
			{rows}
			</List>
		);
	}

};
