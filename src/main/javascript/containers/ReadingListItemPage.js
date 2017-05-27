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
  render() {
    var listId = this.props.match.params.listId
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={pageStyle}>
      <ReadingListInfo listId={listId} />
      <ReadingListItemForm listId={listId} />
      <ReadingListItemList style={listStyle} listId={listId} />
      </div>
      </MuiThemeProvider>
    );
  }

};

ReadingListItemPage.propTypes = {
};
