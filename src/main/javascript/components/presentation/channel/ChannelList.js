import $ from "jquery";
import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import {ListItem, List} from 'material-ui/List';
import {Link} from 'react-router-dom';
import Divider from 'material-ui/Divider';
import Pagination from 'material-ui-pagination';

const toolbarStyle = {
	textAlign: 'center',
};

export default class ChannelList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pagination: {},
		};
	}

	loadPagination = (page) => {
		var self = this;
		$.ajax({
			url: "/api/mychannels",
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

	handleItemCLick = (channelId) => {

	}

	render() {
		var channels = this.state.pagination.objects;
		if (channels == null) {
			return (<Card {...this.props} zDepth={0}></Card>);
		}

		var rows = [];
		var channelCount = channels.length;
		for (var i = 0; i < channelCount; i++) {
			var channel = channels[i];
			var uri = '/mine/channel/' + channel.id
			rows.push(
				<ListItem
				primaryText={<span>[<a href={channel.url}>原文地址</a>]：<Link to={uri}>{channel.name}</Link></span>}
				secondaryText={channel.description}
				secondaryTextLines={1}
				key={channel.id}
				onTouchTap={this.handleItemCLick.bind(this, channel.id)}
				/>
			);

			if (i < (channelCount - 1)) {
				rows.push(<Divider />);
			}
		}

		return (
			<Card {...this.props} zDepth={0}>
			<CardHeader title="频道列表" />
			<CardText>
			<List>
			{rows}
			</List>
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

ChannelList.propTypes = {
};