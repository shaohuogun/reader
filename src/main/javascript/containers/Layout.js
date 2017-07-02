import React from 'react'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Route, Link} from "react-router-dom"
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import FontIcon from 'material-ui/FontIcon'

import Navigator from './Navigator'

const CustomLink = ({activeOnlyWhenExact, to, label}) => (
  <Route exact={activeOnlyWhenExact} path={to} children={({match}) => (
    <span>
    {match ? '[' : ''}<Link to={to}>{label}</Link>{match ? ']' : ''}
    </span>
  )}/>
)

const navigatorStyle = {
  width: 350,
  marginTop: 20,
  marginBottom: 20,
  float: 'left',
  display: 'inline-block',
}

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Toolbar>
        <ToolbarGroup firstChild={true}>
        <FontIcon className="muidocs-icon-action-home" />
        <ToolbarTitle text="阅读网络" />
        </ToolbarGroup>
        <ToolbarGroup>
        <CustomLink to="/html" label="首页"/>
        <ToolbarSeparator />
        <CustomLink to="/html/wizard" label="创建向导"/>
        <ToolbarSeparator />
        <CustomLink to="/html/usercenter" label="用户中心"/>
        </ToolbarGroup>
      </Toolbar>
      </MuiThemeProvider>

      {this.props.children}

      </div>
    );
  }
}

Layout.propTypes = {
};
