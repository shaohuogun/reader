import React from 'react'
import PropTypes from 'prop-types'
import {GridList, GridListTile} from 'material-ui/GridList'

const Footer = ({style}) => (
  <GridList
  cols={5}
  cellHeight={200}
  style={style}
  >
  <GridListTile
  key='profile'
  cols={1}
  >
  <a href="/about/profile">网站简介</a>
  </GridListTile>

  <GridListTile
  key='contact'
  cols={1}
  >
  <a href="/about/contact">联系方式</a>
  </GridListTile>

  <GridListTile
  key='business'
  cols={1}
  >
  <a href="/about/profile">商务合作</a>
  </GridListTile>

  <GridListTile
  key='disclaimer'
  cols={1}
  >
  <a href="/about/disclaimer">免责声明</a>
  </GridListTile>

  <GridListTile
  key='suggest'
  cols={1}
  >
  <a href="/about/contact">建议反馈</a>
  </GridListTile>
  </GridList>
)

Footer.propTypes = {
}

export default Footer
