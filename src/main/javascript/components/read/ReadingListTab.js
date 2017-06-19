import $ from "jquery"
import React from 'react'
import PropTypes from 'prop-types'
import Tab from 'material-ui/Tabs'
import {Card, CardText, CardActions} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import ReadingItemForm from './ReadingItemForm';
import ReadingItemList from './ReadingItemList';

const listStyle = {
  marginTop: 20,
}

const toolbarStyle = {
	textAlign: 'center',
}

export default class ReadingListTab extends React.Component {
  constructor(props) {
		super(props)
	}

  deleteReadingList = (listId) => {
    var self = this;
    $.ajax({
      url: "/api/readinglist/" + listId,
      type: "DELETE",
      data: {},
    }).then(function(data) {

    });
  }

	render() {
		var listId = this.props.id
		var listName = this.props.name
		var listDescription = this.props.description

		return (
			<Tab {...this.props} label={listName}>
			<Card>
			<CardText>
			{listDescription}
			</CardText>
			<CardText>
			<ReadingItemForm listId={listId} />
			<ReadingItemList style={listStyle} listId={listId} />
			</CardText>
			<CardActions style={toolbarStyle}>
			<FlatButton
			label="删除"
			secondary={true}
			onTouchTap={this.deleteReadingList.bind(this, listId)}
			/>
			</CardActions>
			</Card>
			</Tab>
		)
	}
}

ReadingListTab.propTypes = {
	listId: PropTypes.string.isRequired,
}
