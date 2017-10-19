import $ from "jquery"
import React from 'react'
import PropTypes from 'prop-types'
import {Card, CardText, CardActions} from 'material-ui/Card'
import {GridList, GridListTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import FavoriteBorder from 'material-ui-icons/FavoriteBorder'
import Snackbar from 'material-ui/Snackbar'
import Pagination from 'material-ui-pagination'

const toolbarStyle = {
	textAlign: 'center',
}

export default class EbookGrid extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			pagination: {},
			open: false,
		}
	}

	loadMessages = (page) => {
		var self = this
		$.ajax({
			url: "/api/myebooks",
			type: "GET",
			data: {
				page: page.toString(),
			},
		}).then(function(data) {
			self.setState({
				pagination: data,
			})
		})
	}

	componentDidMount() {
		this.loadMessages(1)
	}

	downloadEbook = (ebookId) => {
		var downloadUrl = "/api/ebook/" + ebookId + "/download"
		window.open(downloadUrl, "_blank")
	}

	postEbook = (ebookId) => {
		var self = this
		$.ajax({
			url: "/api/ebook/" + ebookId + "/post",
			type: "GET",
			data: {},
		}).then(function(data) {
			self.setState({
				open: true,
			})
		})
	}

	handleRequestClose = () => {
		this.setState({
			open: false,
		})
	}

	render() {
		var ebooks = this.state.pagination.objects
		if (ebooks == null) {
			return (<GridList {...this.props} zDepth={0}></GridList>)
		}

		var rows = []
		var ebookCount = ebooks.length
		for (var i = 0; i < ebookCount; i++) {
			var ebook = ebooks[i]
			rows.push(
				<GridListTile
				key={ebook.id}
				title={ebook.name}
				subtitle={<span>by <b>{ebook.createDate}</b></span>}
				actionIcon={<IconButton><FavoriteBorder color="white" /></IconButton>}
				>
				<img src="/image/cover-default.jpg" />
				</GridListTile>
			)
		}

		return (
			<Card {...this.props} zDepth={0}>
			<CardText>
			<GridList
			cols={4}
			cellHeight={200}
			padding={30}
			>
			{rows}
			</GridList>
			<Snackbar
			open={this.state.open}
			message="已经通过邮件将电子书籍发送出去，谢谢！"
			autoHideDuration={4000}
			onRequestClose={this.handleRequestClose}
			/>
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
		)
	}
}

EbookGrid.propTypes = {
}
