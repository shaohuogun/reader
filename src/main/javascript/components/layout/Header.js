import React from 'react'
import PropTypes from 'prop-types'
import {GridList, GridTile} from 'material-ui/GridList'

const logoStyle = {
  padding: '15px',
  textAlign: 'left',
}

const navigatorStyle = {
  padding: '20px',
  textAlign: 'right',
}

const Header = ({style}) => (
  <GridList
  cols={2}
  cellHeight={50}
  style={style}
  >
  <GridTile
  key='logo'
  cols={1}
  style={logoStyle}
  >
  <a href="/home">TAIZIDU</a>
  </GridTile>

  <GridTile
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
  </GridTile>
  </GridList>
)

Header.propTypes = {
}

export default Header
