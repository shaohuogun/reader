import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import EbookGrid from '../../components/ebook/EbookGrid'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
}

export default class EbookPage extends Component {
  static propTypes = {
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <EbookGrid style={pageStyle} />
      </MuiThemeProvider>
    )
  }
}
