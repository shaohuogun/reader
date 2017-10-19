import React, {Component} from 'react'
import PropTypes from 'prop-types'

import EbookGrid from '../../presentation/ebook/EbookGrid'

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
  render() {
    return (
      <EbookGrid style={pageStyle} />
    )
  }
}

EbookPage.propTypes = {
}
