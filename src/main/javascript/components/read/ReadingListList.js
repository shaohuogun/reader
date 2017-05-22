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

export default class ReadingListList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pagination: {},
		};
	}

	loadPagination = (page) => {
		var self = this;
		$.ajax({
			url: "/api/readinglists",
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

	handleItemCLick = (listId) => {

	}

	render() {
		var lists = this.state.pagination.objects;
		if (lists == null) {
			return (<Card {...this.props} zDepth={1}></Card>);
		}

		var rows = [];
		var listCount = lists.length;
		for (var i = 0; i < listCount; i++) {
			var list = lists[i];
			rows.push(
				<ListItem
				primaryText={<Link to={{pathname: "/html/readinglistitem", query: {listId: list.id}}}>{list.name}</Link>}
				secondaryText={list.description}
				secondaryTextLines={1}
				key={list.id}
				onTouchTap={this.handleItemCLick.bind(this, list.id)}
				/>
			);

			if (i < (listCount - 1)) {
				rows.push(<Divider />);
			}
		}

		return (
			<Card {...this.props} zDepth={1}>
			<CardHeader title="清单列表" />
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

ReadingListList.propTypes = {
};
