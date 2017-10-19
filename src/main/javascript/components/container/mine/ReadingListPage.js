import React, {Component} from 'react'
import PropTypes from 'prop-types'

import ReadingListTabs from '../../presentation/read/ReadingListTabs'

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
      <div style={pageStyle}>
      <ReadingListTabs style={tabsStyle} />
      </div>
    )
  }
}

ReadingListPage.propTypes = {
}
