import $ from "jquery";
import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardText, CardActions} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


const toolbarStyle = {
  textAlign: 'center',
};

export default class ChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "blog",
      url: "",
      name: "",
      publisher: "",
      description: "",
      pickingAmount: 1,
    };
  }

  handleSelectFieldChange = (event, key, payload) => {
    this.setState({category: payload});
  }

  handleTextFieldChange = (event, newValue) => {
    var fieldId = event.target.id;
    if (fieldId == "url") {
      this.setState({url: newValue});
    } else if (fieldId == "name") {
      this.setState({name: newValue});
    } else if (fieldId == "publisher") {
      this.setState({publisher: newValue});
    } else if (fieldId == "description") {
      this.setState({description: newValue});
    } else if (fieldId == "pickingAmount") {
      this.setState({pickingAmount: newValue});
    }
  };

  handleReset = () => {
    this.setState({
      category: "blog",
      url: "",
      name: "",
      publisher: "",
      description: "",
      pickingAmount: 1,
    });
  };

  handleSubmit = () => {
    var data = JSON.stringify({
      category: this.state.category,
      url: this.state.url,
      name: this.state.name,
      publisher: this.state.publisher,
      description: this.state.description,
      pickingAmount: parseInt(this.state.pickingAmount),
    });

    $.ajax({
      url: "/api/channel",
      type: "POST",
      data: data,
      contentType: "application/json;charset=utf-8",
      dataType: "json"
    }).then(function(data) {
      var channel = data;
    });
  };

  render() {
    return (
      <Card
      {...this.props}
      zDepth={0}
      >
      <CardText>
      <SelectField
        id="category"
        floatingLabelText="类别"
        value={this.state.category}
        fullWidth={true}
        onChange={this.handleSelectFieldChange}
      >
        <MenuItem key={1} value={"book"} primaryText="书籍" />
        <MenuItem key={2} value={"blog"} primaryText="博客" />
      </SelectField>
      <br />

      <TextField
      id="url"
      value={this.state.url}
      hintText="http://blog.csdn.net/futurelight/article/list/"
      floatingLabelText="频道地址"
      fullWidth={true}
      onChange={this.handleTextFieldChange}
      />
      <br />

      <TextField
      id="name"
      value={this.state.name}
      floatingLabelText="频道名称"
      fullWidth={true}
      onChange={this.handleTextFieldChange}
      />
      <br />

      <TextField
      id="publisher"
      value={this.state.publisher}
      floatingLabelText="频道作者"
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
      <br />

      <TextField
      id="pickingAmount"
      value={this.state.pickingAmount}
      hintText="1"
      floatingLabelText="采集页数"
      fullWidth={true}
      onChange={this.handleTextFieldChange}
      />
      </CardText>
      <CardActions style={toolbarStyle}>
      <FlatButton label="重置" secondary={true} onTouchTap={this.handleReset} />
      <RaisedButton label="下一步" primary={true} onTouchTap={this.handleSubmit} />
      </CardActions>
      </Card>
    );
  }

};

ChannelForm.propTypes = {
};
