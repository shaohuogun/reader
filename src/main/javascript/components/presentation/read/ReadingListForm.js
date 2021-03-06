import $ from "jquery";
import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button'

const toolbarStyle = {
  textAlign: 'center',
};

export default class ReadingListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      name: "",
      description: "",
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  }

  handleTextFieldChange = (event, newValue) => {
    var fieldId = event.target.id;
    if (fieldId == "name") {
      this.setState({name: newValue});
    } else if (fieldId == "description") {
      this.setState({description: newValue});
    }
  };

  handleCancel = () => {
    this.setState({
      expanded: false,
      name: "",
      description: "",
    });
  };

  handleSubmit = () => {
    var data = JSON.stringify({
      name: this.state.name,
      description: this.state.description,
    });

    $.ajax({
      url: "/api/readinglist",
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
      <Card {...this.props} zDepth={0} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
      <CardHeader
      title="新增阅读清单"
      actAsExpander={true}
      showExpandableButton={true}
      />
      <CardText expandable={true}>
      <TextField
      id="name"
      value={this.state.name}
      floatingLabelText="清单名称"
      fullWidth={true}
      onChange={this.handleTextFieldChange}
      />
      <br />

      <TextField
      id="description"
      value={this.state.description}
      floatingLabelText="频道简介"
      fullWidth={true}
      onChange={this.handleTextFieldChange}
      />
      </CardText>
      <CardActions style={toolbarStyle} expandable={true}>
      <Button raised label="取消" secondary={true} onTouchTap={this.handleCancel} />
      <Button raised label="提交" primary={true} onTouchTap={this.handleSubmit} />
      </CardActions>
      </Card>
    );
  }

};

ReadingListForm.propTypes = {
};
