import React, {Component, PropTypes} from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import FontIcon from 'material-ui/FontIcon'

import MineNavigator from './MineNavigator'

const contentStyle = {
  margin: '0 auto',
}

const navigatorStyle = {
  width: 300,
  marginTop: 15,
  float: 'left',
  display: 'inline-block',
  backgroundColor: '#fff',
}

export default class MineLayout extends Component {
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
      <a href="/home">首页</a>
      <ToolbarSeparator />
      <a href="/tool">伴读服务</a>
      <ToolbarSeparator />
      <a href="/mine">我的主页</a>
      </ToolbarGroup>
      </Toolbar>
      </MuiThemeProvider>
      
      <div style={contentStyle}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <MineNavigator style={navigatorStyle} />
      </MuiThemeProvider>
      {this.props.children}
      </div>
      </div>
    )
  }
}
