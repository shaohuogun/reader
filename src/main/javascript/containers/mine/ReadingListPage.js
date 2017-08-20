import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import ReadingListTabs from '../../components/read/ReadingListTabs'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block',
}

const tabsStyle = {
  marginTop: 15,
}

export default class ReadingListPage extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={pageStyle}>
      <ReadingListTabs style={tabsStyle} />
      </div>
      </MuiThemeProvider>
    )
  }
}

ReadingListPage.propTypes = {
}
