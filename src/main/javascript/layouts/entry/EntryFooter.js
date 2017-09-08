import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {GridList, GridTile} from 'material-ui/GridList'

export default class EntryFooter extends Component {
  render() {
    return (
      <GridList
      cols={5}
      cellHeight={200}
      padding={15}
      {...this.props}
      >
      <GridTile
      key='about'
      cols={1}
      >
      <a href="/about">关于我们</a>
      </GridTile>

      <GridTile
      key='contact'
      cols={1}
      >
      <a href="/contact">联系方式</a>
      </GridTile>

      <GridTile
      key='jobs'
      cols={1}
      >
      <a href="/jobs">招贤纳士</a>
      </GridTile>

      <GridTile
      key='mobile'
      cols={1}
      >
      <a href="/mobile">移动应用</a>
      </GridTile>

      <GridTile
      key='suggest'
      cols={1}
      >
      <a href="/suggest">问题反馈</a>
      </GridTile>
      </GridList>
    )
  }
}

EntryFooter.propTypes = {
}
