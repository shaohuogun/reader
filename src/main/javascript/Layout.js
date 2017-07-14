import React, {Component, PropTypes} from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import FontIcon from 'material-ui/FontIcon'

const contentStyle = {
  margin: '0 auto',
}

export default class Layout extends Component {
  static propTypes = {
  }
  
  render() {
    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Toolbar>
      <ToolbarGroup firstChild={true}>
      <FontIcon className="muidocs-icon-action-home" />
      <ToolbarTitle text="TAIZIDU" />
      </ToolbarGroup>
      <ToolbarGroup>
      <a href="/index">首页</a>
      <ToolbarSeparator />
      <a href="/service">服务目录</a>
      <ToolbarSeparator />
      <a href="/mine">我的主页</a>
      </ToolbarGroup>
      </Toolbar>
      </MuiThemeProvider>

      <div style={contentStyle}>
      {this.props.children}
      </div>
      </div>
    );
  }
}
