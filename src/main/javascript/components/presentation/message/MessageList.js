import React from 'react'
import PropTypes from 'prop-types'
import {Card, CardText, CardActions} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import Pagination from 'material-ui-pagination'

import MessageListItem from './MessageListItem'

const toolbarStyle = {
  marginTop: 15,
  marginBottom: 15,
  textAlign: 'center'
}

const MessageList = (props) => {
  if (!props.pagination.objects) {
    return (<Card zDepth={0}></Card>)
  }

  var rows = []
  var messages = props.pagination.objects
  var messageCount = messages.length
  for (var i = 0; i < messageCount; i++) {
    var curMessage = messages[i]
    var keyOne = 'ML-' + curMessage.id
    var KeyTwo = 'DV-' + curMessage.id
    rows.push(
      <MessageListItem key={keyOne} message={curMessage} />
    )

    if (i < (messageCount - 1)) {
      rows.push(<Divider key={KeyTwo} />)
    }
  }

  return (
    <Card zDepth={0}>
    <CardText>
    {rows}
    </CardText>
    <CardActions style={toolbarStyle}>
    <Pagination
    total = {props.pagination.pageCount}
    current = {props.pagination.pageIndex}
    display = {props.pagination.pageShow}
    onChange = {current => props.loadMessages(current)}
    />
    </CardActions>
    </Card>
  )
}

MessageList.propTypes = {
  pagination: PropTypes.object.isRequired,
  loadMessages: PropTypes.func.isRequired
}

export default MessageList
