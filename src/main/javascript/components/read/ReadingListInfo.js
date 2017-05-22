import $ from "jquery";
import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText} from 'material-ui/Card';

const toolbarStyle = {
	textAlign: 'center',
};

export default class ReadingListInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: {},
    };
  }

  loadReadingList() {
    var self = this;
    $.ajax({
      url: "/api/readinglist/" + self.props.listId,
			type: "GET",
			data: {},
    }).then(function(data) {
      self.setState({
        list: data,
      });
    });
  }

  componentDidMount() {
    this.loadReadingList();
  }

  addItem = () => {

  }

  render() {
    return (
      <Card {...this.props} zDepth={1}>
      <CardHeader
      title={this.state.list.name}
      />
      <CardText>
      {this.state.list.description}
      </CardText>
      </Card>
    );
  }

};

ReadingListInfo.propTypes = {
  listId: PropTypes.string.isRequired,
};
