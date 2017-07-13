import React from 'react'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Route, Link} from 'react-router-dom'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import FontIcon from 'material-ui/FontIcon'

const CustomLink = ({activeOnlyWhenExact, to, label}) => (
  <Route exact={activeOnlyWhenExact} path={to} children={({match}) => (
    <span>
    {match ? '[' : ''}<Link to={to}>{label}</Link>{match ? ']' : ''}
    </span>
  )}/>
)

const contentStyle = {
  margin: '0 auto',
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
      <CustomLink to="/index" label="首页"/>
      <ToolbarSeparator />
      <CustomLink to="/index/wizard" label="创建向导"/>
      <ToolbarSeparator />
      <CustomLink to="/usercenter" label="用户中心"/>
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
