import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import FontIcon from 'material-ui/FontIcon'

export default class Navigator extends Component {
  render() {
    return (
      <Toolbar>
      <ToolbarGroup firstChild={true}>
      <FontIcon className="muidocs-icon-action-home" />
      <ToolbarTitle text="TAIZIDU" />
      </ToolbarGroup>
      <ToolbarGroup>
      <a href="/home">网站首页</a>
      <ToolbarSeparator />
      <a href="/tool">伴读服务</a>
      <ToolbarSeparator />
      <a href="/mine">我的空间</a>
      <ToolbarSeparator />
      <a href="/entry">退出系统</a>      
      </ToolbarGroup>
      </Toolbar>
    )
  }
}

Navigator.propTypes = {
}
