import $ from "jquery";
import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const toolbarStyle = {
  textAlign: 'center',
};

export default class ReadingItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      bookName: "",
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleTextFieldChange = (event, newValue) => {
    var fieldId = event.target.id;
    if (fieldId == "bookName") {
      this.setState({bookName: newValue});
    }
  };

  handleCancel = () => {
    this.setState({
      expanded: false,
      bookName: "",
    });
  };

  handleSubmit = () => {
    var data = JSON.stringify({
      listId: this.props.listId,
      bookId: "123456789",
      bookName: this.state.bookName,
    });

    $.ajax({
      url: "/api/readingitem",
      type: "POST",
      data: data,
      contentType: "application/json;charset=utf-8",
      dataType: "json"
    }).then(function() {
      this.setState({expanded: {false}});
    });
  };

  render() {
    return (
      <Card {...this.props} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
      <CardHeader
      title="新增清单子项"
      actAsExpander={true}
      showExpandableButton={true}
      />
      <CardText expandable={true}>
      <TextField
      id="bookName"
      value={this.state.bookName}
      floatingLabelText="书籍名称"
      fullWidth={true}
      onChange={this.handleTextFieldChange}
      />
      </CardText>
      <CardActions style={toolbarStyle} expandable={true}>
      <RaisedButton label="取消" secondary={true} onTouchTap={this.handleCancel} />
      <RaisedButton label="提交" primary={true} onTouchTap={this.handleSubmit} />
      </CardActions>
      </Card>
    );
  }

};

ReadingItemForm.propTypes = {
	listId: PropTypes.string.isRequired,
};
