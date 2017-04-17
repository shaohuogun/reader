import React from 'react';
import {ListItem, List} from 'material-ui/List';
import Divider from 'material-ui/Divider';

export default class ChannelList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleListItemCLick = (channelId) => {
    this.props.parent.setState({ selectedChannelId: channelId});
    this.props.parent.gotoPage(1);
  }

  render() {
    var rows = [];
    var channelCount = this.props.channels.length;
		for (var i = 0; i < channelCount; i++) {
			var channel = this.props.channels[i];
      rows.push(
        <div>
        <ListItem
        primaryText={<a href={channel.url}>{channel.name}</a>}
        onTouchTap={this.handleListItemCLick.bind(this, channel.id)}
        />
        <Divider />
        </div>
      );
    };

    return (
      <List>
      {rows}
      </List>
    );
  }

};
