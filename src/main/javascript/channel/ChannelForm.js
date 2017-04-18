import $ from "jquery";
import React from 'react';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const toolbarStyle = {
  textAlign: 'center',
};

export default class ChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      url: "",
      name: "",
      description: "",
      pickingAmount: 1,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleFieldChange = (event, newValue) => {
    var fieldId = event.target.id;
    if (fieldId == "url") {
      this.setState({url: newValue});
    } else if (fieldId == "name") {
      this.setState({name: newValue});
    } else if (fieldId == "description") {
      this.setState({description: newValue});
    } else if (fieldId == "pickingAmount") {
      this.setState({pickingAmount: newValue});
    }
  };

  handleCancel = () => {
    this.setState({
      expanded: false,
      url: "",
      name: "",
      description: "",
      pickingAmount: 1,
    });
  };

  handleSubmit = () => {
    var data = JSON.stringify({
      url: this.state.url,
      name: this.state.name,
      description: this.state.description,
      pickingAmount: parseInt(this.state.pickingAmount),
    });

    $.ajax({
      url: "/api/publisher/27ce8721-01fb-4471-9060-614457b4532d/channel",
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
      <Card style={this.props.style} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
      <CardHeader
      title="新增订阅频道"
      actAsExpander={true}
      showExpandableButton={true}
      />
      <CardText expandable={true}>
      <TextField
      id="url"
      value={this.state.url}
      hintText="http://blog.csdn.net/futurelight/article/list/"
      floatingLabelText="频道地址"
      fullWidth={true}
      onChange={this.handleFieldChange}
      />
      <br />

      <TextField
      id="name"
      value={this.state.name}
      floatingLabelText="频道名称"
      fullWidth={true}
      onChange={this.handleFieldChange}
      />
      <br />

      <TextField
      id="description"
      value={this.state.description}
      floatingLabelText="频道简介"
      fullWidth={true}
      onChange={this.handleFieldChange}
      />
      <br />

      <TextField
      id="pickingAmount"
      value={this.state.pickingAmount}
      hintText="1"
      floatingLabelText="采集页数"
      fullWidth={true}
      onChange={this.handleFieldChange}
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
