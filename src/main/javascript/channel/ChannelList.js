import React from 'react';
import PropTypes from 'prop-types';
import {ListItem, List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';

export default class ChannelList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleItemCLick = (channelIndex) => {
    var selectedChannel = this.props.parent.state.channels[channelIndex];
    this.props.parent.setState({ selectedChannel: selectedChannel });
  }

  render() {
    var rows = [];
    var channelCount = this.props.channels.length;
		for (var i = 0; i < channelCount; i++) {
			var channel = this.props.channels[i];
      rows.push(
        <ListItem
        primaryText={ channel.name }
        key={ channel.id }
        onTouchTap={ this.handleItemCLick.bind(this, i) }
        />
      );

      if (i < (channelCount - 1)) {
        rows.push(<Divider />);
      }
    };

    return (
      <Card style={ this.props.style }>
      <CardHeader title="频道列表" />
      <CardText>
      <List>
      {rows}
      </List>
      </CardText>
      </Card>
    );
  }

};

ChannelList.propTypes = {
  channels: PropTypes.array.isRequired,
  parent: PropTypes.object.isRequired,
};
