import React, {Component, PropTypes} from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import FontIcon from 'material-ui/FontIcon'

const contentStyle = {
  margin: '0 auto',
}

export default class Layout extends Component {
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
      <ToolbarTitle text="伴读网络" />
      </ToolbarGroup>
      <ToolbarGroup>
      <a href="/index">首页</a>
      <ToolbarSeparator />
      <a href="/product">产品服务</a>
      <ToolbarSeparator />
      <a href="/usercenter">用户中心</a>
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

Layout.propTypes = {
};
