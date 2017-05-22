import $ from "jquery";
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Link} from 'react-router-dom';

import ReadingListInfo from '../components/read/ReadingListInfo';
import ReadingListItemForm from '../components/read/ReadingListItemForm';
import ReadingListItemList from '../components/read/ReadingListItemList';

const pageStyle = {
  width: 800,
  marginTop: 20,
  marginLeft: 20,
  marginBottom: 20,
  float: 'left',
  display: 'inline-block',
};

const listStyle = {
  marginTop: 20,
};

export default class ReadingListItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listId: props.location.query.listId,
    };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={pageStyle}>
      <ReadingListInfo listId={this.state.listId} />
      <ReadingListItemForm listId={this.state.listId} />
      <ReadingListItemList style={listStyle} listId={this.state.listId} />
      </div>
      </MuiThemeProvider>
    );
  }

};

ReadingListItemPage.propTypes = {
};
