import React from 'react'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import ReadingListForm from '../components/read/ReadingListForm'
import ReadingListTabs from '../components/read/ReadingListTabs'

const pageStyle = {
  width: 800,
  marginTop: 20,
  marginLeft: 20,
  marginBottom: 20,
  float: 'left',
  display: 'inline-block',
}

const tabsStyle = {
  marginTop: 20,
}

export default class ReadingListPage extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={pageStyle}>
      <ReadingListForm />
      <ReadingListTabs style={tabsStyle} />
      </div>
      </MuiThemeProvider>
    )
  }
}

ReadingListPage.propTypes = {
}
