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
      name: "",
      url: "",
      basePath: "",
      pickingStrategy: "",
      pickingAmount: 1,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleFieldChange = (event, newValue) => {
    var fieldId = event.target.id;
    if (fieldId == "name") {
      this.setState({name: newValue});
    } else if (fieldId == "url") {
      this.setState({url: newValue});
    } else if (fieldId == "basePath") {
      this.setState({basePath: newValue});
    } else if (fieldId == "pickingStrategy") {
      this.setState({pickingStrategy: newValue});
    } else if (fieldId == "pickingAmount") {
      this.setState({pickingAmount: newValue});
    }
  };

  handleCancel = () => {
    this.setState({
      expanded: false,
      name: "",
      url: "",
      basePath: "",
      pickingStrategy: "",
      pickingAmount: 1,
    });
  };

  handleSubmit = () => {
    var data = JSON.stringify({
      url: this.state.url,
      name: this.state.name,
      basePath: this.state.basePath,
      pickingStrategy: this.state.pickingStrategy,
      pickingAmount: parseInt(this.state.pickingAmount),
    });

    $.ajax({
      type: "POST",
      url: "/api/publisher/c9ceea1d-967c-488b-a6ee-6582d622bad5/channel",
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
      id="name"
      value={this.state.name}
      hintText="霍泰稳的编辑空间"
      floatingLabelText="频道名称"
      fullWidth={true}
      onChange={this.handleFieldChange}
      />
      <br />
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
      id="basePath"
      value={this.state.basePath}
      hintText="http://blog.csdn.net"
      floatingLabelText="基准地址"
      fullWidth={true}
      onChange={this.handleFieldChange}
      />
      <br />
      <TextField
      id="pickingStrategy"
      value={this.state.pickingStrategy}
      hintText="csdn-channel"
      floatingLabelText="采集策略"
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
