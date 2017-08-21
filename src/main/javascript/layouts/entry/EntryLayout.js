import React, {Component} from 'react'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {GridList, GridTile} from 'material-ui/GridList'

import EntryNavigator from './EntryNavigator'

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

export default class EntryLayout extends Component {
  render() {
    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <GridList
			cols={5}
			cellHeight={600}
			padding={15}
			>
      <GridTile
      key='albumArea'
      cols={3}
      >
      <img src="/image/cover-default.jpg" />
      </GridTile>

      <GridTile
      key='formArea'
      cols={2}
      >
      <div style={contentStyle}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <EntryNavigator style={navigatorStyle} />
      </MuiThemeProvider>
      {this.props.children}
      </div>
      </GridTile>
			</GridList>
      </MuiThemeProvider>
      </div>
    )
  }
}

EntryLayout.propTypes = {
}
