import $ from "jquery";
import React from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const channelFormStyle = {
  width: 800,
  margin: 20,
  float: 'left',
  display: 'inline-block',
};

const toolbarStyle = {
  textAlign: 'center',
};

export default class ChannelForm extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
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
      <Card style={channelFormStyle} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
      <CardHeader
      title="新增订阅频道"
      actAsExpander={true}
      showExpandableButton={true}
      />
      <CardText expandable={true}>
      <TextField
      id="url"
      value={this.state.url}
      hintText="http://blog.csdn.net/futurelight"
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
      <FlatButton label="取消" onTouchTap={this.handleCancel} />
      <FlatButton label="提交" onTouchTap={this.handleSubmit} />
      </CardActions>
      </Card>
    );
  }

};
