import $ from "jquery";
import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ActionBook from 'material-ui/svg-icons/action/book';
import FontIcon from 'material-ui/FontIcon';

const toolbarStyle = {
	textAlign: 'center',
};

export default class ChannelInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: {},
    };
  }

  loadChannel() {
    var self = this;
    $.ajax({
      url: "/api/channel/" + self.props.channelId,
			type: "GET",
			data: {},
    }).then(function(data) {
      self.setState({
        channel: data,
      });
    });
  }

  componentDidMount() {
    this.loadChannel();
  }

  generateEbook = () => {
    var self = this;
    $.ajax({
      url: "/api/ebook/generate",
			type: "GET",
			data: {
				targetType: "1",
				targetId: self.props.channelId,
			},
    }).then(function(data) {
      var downloadUrl = "/api/ebook/download?targetType=1&targetId=" + self.props.channelId;
      window.open(downloadUrl, "_blank");
    });
  }

  render() {
    return (
      <Card {...this.props} zDepth={1}>
      <CardHeader
      title={this.state.channel.name}
      subtitle={<span>[ <a href={this.state.channel.url}>原文地址</a> ]</span>}
      />
      <CardText>
      {this.state.channel.description}
      </CardText>
      <CardActions style={toolbarStyle}>
      <RaisedButton
        label="生成电子书"
        labelPosition="before"
        primary={true}
        icon={<ActionBook />}
        onTouchTap={this.generateEbook.bind(this)}
      />
      </CardActions>
      </Card>
    );
  }

};

ChannelInfo.propTypes = {
  channelId: PropTypes.string.isRequired,
};
