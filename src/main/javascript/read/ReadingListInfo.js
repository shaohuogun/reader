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
      <CardActions style={toolbarStyle}>
      <RaisedButton
        label="添加阅读子项"
        labelPosition="before"
        primary={true}
        icon={<ActionBook />}
        onTouchTap={this.addItem.bind(this)}
      />
      </CardActions>
      </Card>
    );
  }

};

ReadingListInfo.propTypes = {
  listId: PropTypes.string.isRequired,
};
