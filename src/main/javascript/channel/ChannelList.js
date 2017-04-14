import React from 'react';
import {ListItem, List} from 'material-ui/List';
import Divider from 'material-ui/Divider';

export class ChannelListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
		return (
			<ListItem
			primaryText={<a href={this.props.channel.url}>{this.props.channel.name}</a>}
			/>
		);
  }

};

export default class ChannelList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
		var rows = [];
		this.props.channels.forEach(function(channel) {
			rows.push(
				<div>
				<ChannelListItem channel={channel} key={channel.id} />
				<Divider />
				</div>
			);
		});
		return (
			<List>
			{rows}
			</List>
		);
  }

};
