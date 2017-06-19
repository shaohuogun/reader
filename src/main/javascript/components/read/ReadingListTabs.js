import $ from "jquery"
import React from 'react'
import PropTypes from 'prop-types'
import Tabs from 'material-ui/Tabs'

import ReadingListTab from './ReadingListTab'

const tabStyle = {
  marginTop: 20,
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

  render() {
    var lists = this.state.readingLists
    if (lists == null) {
      return (<Tabs {...this.props} style={tabStyle} zDepth={1}></Tabs>);
    }

    var tabs = [];
    var listCount = lists.length;
    for (var i = 0; i < listCount; i++) {
      var list = lists[i];
      tabs.push(
        <ReadingListTab
        id={list.id}
        name={list.name}
        description={list.description}
        />
      )
    }

    return (
      <Tabs {...this.props} style={tabStyle} zDepth={1}>
      {tabs}
      </Tabs>
    )
  }

}

ReadingListTabs.propTypes = {
}
