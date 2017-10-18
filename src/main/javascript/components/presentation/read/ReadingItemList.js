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

export default class ReadingItemList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pagination: {},
		};
	}

	loadMessages = (page) => {
		var self = this;
		$.ajax({
			url: "/api/readinglist/" + self.props.listId + "/items",
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
		this.loadMessages(1);
	}

	render() {
		var listItems = this.state.pagination.objects;
		if (listItems == null) {
			return (<Card {...this.props} zDepth={0}></Card>);
		}

		var rows = [];
		var listItemCount = listItems.length;
		for (var i = 0; i < listItemCount; i++) {
			var listItem = listItems[i];
			rows.push(
				<ListItem
				key={listItem.id}
				primaryText={listItem.bookName}
				secondaryText={<span>{listItem.status}</span>}
				secondaryTextLines={1}
				/>
			);

			if (i < (listItemCount - 1)) {
				rows.push(<Divider key={listItem.id} />);
			}
		}

		return (
			<Card {...this.props} zDepth={0}>
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
			onChange = {current => this.loadMessages(current)}
			/>
			</CardActions>
			</Card>
		);
	}

};

ReadingItemList.propTypes = {
	listId: PropTypes.string.isRequired,
};
