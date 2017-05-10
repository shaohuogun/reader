import $ from "jquery";
import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText} from 'material-ui/Card';

const toolbarStyle = {
	textAlign: 'center',
};

export default class EbookInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ebook: {},
    };
  }

  loadEbook() {
    var self = this;
    $.ajax({
      url: "/api/ebook/" + self.props.ebookId,
			type: "GET",
			data: {},
    }).then(function(data) {
      self.setState({
        ebook: data,
      });
    });
  }

  componentDidMount() {
    this.loadEbook();
  }

  addItem = () => {

  }

  render() {
    return (
      <Card {...this.props} zDepth={1}>
      <CardHeader
      title={this.state.ebook.name}
      />
      <CardText>
      {this.state.ebook.createDate}
      </CardText>
      </Card>
    );
  }

};

EbookInfo.propTypes = {
  ebookId: PropTypes.string.isRequired,
};
