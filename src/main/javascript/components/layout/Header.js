import React from 'react'
import PropTypes from 'prop-types'
import {GridList, GridListTile} from 'material-ui/GridList'

const logoStyle = {
  padding: '20px',
  textAlign: 'left',
}

const navigatorStyle = {
  padding: '20px',
  textAlign: 'right',
}

const Header = ({style}) => (
  <GridList
  cols={2}
  cellHeight={60}
  style={style}
  >
  <GridListTile
  key='logo'
  cols={1}
  style={logoStyle}
  >
  <a href="/home">TAIZIDU</a>
  </GridListTile>

  <GridListTile
  key='navigator'
  cols={1}
  style={navigatorStyle}
  >
  <a href="/home">网站首页</a>
  &nbsp;&nbsp;
  <a href="/tool">伴读服务</a>
  &nbsp;&nbsp;
  <a href="/mine">我的空间</a>
  &nbsp;&nbsp;
  <a href="/entry/signup">注册</a>
  &nbsp;&nbsp;
  <a href="/entry/signin">登录</a>
  &nbsp;&nbsp;
  <a href="/entry">退出</a>
  </GridListTile>
  </GridList>
)

Header.propTypes = {
}

export default Header
