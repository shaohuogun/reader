import $ from "jquery";
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Link} from 'react-router-dom';
import {Tabs, Tab} from 'material-ui/Tabs';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';

import ChannelInfo from '../channel/ChannelInfo';
import MessageList from './MessageList';
import EbookTable from '../ebook/EbookTable';

const leftStyle = {
  width: 350,
  marginLeft: 20,
  float: 'left',
  display: 'inline-block',
};

const rightStyle = {
  width: 800,
  marginLeft: 10,
  marginRight: 20,
  float: 'left',
  display: 'inline-block',
};

export default class MessagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channelId: props.location.query.channelId,
    };
  }

  render() {
    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <ChannelInfo style={leftStyle} channelId={this.state.channelId} />
      </MuiThemeProvider>

      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Tabs style={rightStyle}>
        <Tab
          icon={<MapsPersonPin />}
          label="消息列表">
          <MessageList channelId={this.state.channelId} />
        </Tab>
        <Tab
          icon={<MapsPersonPin />}
          label="电子书籍">
          <EbookTable channelId={this.state.channelId} />
        </Tab>
      </Tabs>
      </MuiThemeProvider>
      </div>
    );
  }

};

MessagePage.propTypes = {
};
