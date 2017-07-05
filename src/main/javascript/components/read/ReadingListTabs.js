import $ from "jquery"
import React from 'react'
import PropTypes from 'prop-types'
import {Tabs, Tab} from 'material-ui/Tabs'
import {Card, CardText, CardActions} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import ReadingItemForm from './ReadingItemForm'
import ReadingItemList from './ReadingItemList'

const tabStyle = {
  marginTop: 15,
}

const listStyle = {
  marginTop: 15,
}

const toolbarStyle = {
	textAlign: 'center',
}

export default class ReadingListTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      readingLists: {},
    }
  }

  loadMyReadingLists = () => {
    var self = this;
    $.ajax({
      url: "/api/myreadinglists",
      type: "GET",
      data: {},
    }).then(function(data) {
      self.setState({
        readingLists: data,
      });
    });
  }

  componentDidMount() {
    this.loadMyReadingLists()
  }

  deleteReadingList = (listId) => {
    var self = this
    $.ajax({
      url: "/api/readinglist/" + listId,
      type: "DELETE",
      data: {},
    }).then(function(data) {

    })
  }

  render() {
    var lists = this.state.readingLists
    if (lists == null) {
      return (<Tabs {...this.props} zDepth={0} style={tabStyle}></Tabs>);
    }

    var tabs = [];
    var listCount = lists.length;
    for (var i = 0; i < listCount; i++) {
      var list = lists[i];
      tabs.push(
        <Tab label={list.name} zDepth={0}>
  			<Card zDepth={0}>
  			<CardText>
  			{list.description}
  			</CardText>
  			<CardText>
  			<ReadingItemForm listId={list.id} />
  			<ReadingItemList style={listStyle} listId={list.id} />
  			</CardText>
  			<CardActions style={toolbarStyle}>
  			<FlatButton
  			label="删除"
  			secondary={true}
  			onTouchTap={this.deleteReadingList.bind(this, list.id)}
  			/>
  			</CardActions>
  			</Card>
  			</Tab>
      )
    }

    return (
      <Tabs {...this.props} style={tabStyle}>
      {tabs}
      </Tabs>
    )
  }

}

ReadingListTabs.propTypes = {
}
