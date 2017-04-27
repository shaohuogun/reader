import $ from "jquery";
import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Pagination from 'material-ui-pagination';

const paginationStyle = {
	textAlign: 'center',
};

export default class EbookTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pagination: {},
		};
	}

	loadPagination = (page) => {
		var self = this;
		$.ajax({
			url: "/api/channel/" + self.props.channelId + "/ebook",
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

	downloadEbook = (ebookId) => {
		var downloadUrl = "/api/ebook/" + ebookId + "/download";
		window.open(downloadUrl, "_blank");
  }

	render() {
		var ebooks = this.state.pagination.objects;
		if (ebooks == null) {
			return (<TableRow></TableRow>);
		}

		var rows = [];
		var ebookCount = ebooks.length;
		for (var i = 0; i < ebookCount; i++) {
			var ebook = ebooks[i];
			rows.push(
				<TableRow>
					<TableRowColumn>{ebook.createDate}</TableRowColumn>
					<TableRowColumn>{ebook.name}</TableRowColumn>
					<TableRowColumn>{ebook.downloads}</TableRowColumn>
					<TableRowColumn>
						<FlatButton
						label="下载"
						secondary={true}
						onTouchTap={this.downloadEbook.bind(this, ebook.id)}
						/>
					</TableRowColumn>
				</TableRow>
			);
		}

		return (
			<Card {...this.props} zDepth={1}>
			<CardText>
			<Table>
		    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
		      <TableRow>
		        <TableHeaderColumn>创建时间</TableHeaderColumn>
		        <TableHeaderColumn>名称</TableHeaderColumn>
		        <TableHeaderColumn>下载数量</TableHeaderColumn>
						<TableHeaderColumn>操作</TableHeaderColumn>
		      </TableRow>
		    </TableHeader>
		    <TableBody displayRowCheckbox={false}>
				{rows}
		    </TableBody>
		  </Table>
			</CardText>
			<CardActions style={paginationStyle}>
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

EbookTable.propTypes = {
	channelId: PropTypes.string.isRequired,
};
