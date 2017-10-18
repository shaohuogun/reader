import React from 'react'
import PropTypes from 'prop-types'
import {Card, CardHeader, CardText} from 'material-ui/Card'

const MessageListItem = (props) => {
  const {message} = props
  return (
    <Card zDepth={0}>
    <CardHeader
    title={<span>[<a href={message.url}>原文地址</a>]：{message.title}</span>}
    subtitle={<span>发布日期：{message.releaseDate}   浏览数量：{message.pageview}   评论数量：{message.commentCount}</span>}
    actAsExpander={true}
    showExpandableButton={true}
    />
    <CardText expandable={false}>
    {message.digest}
    </CardText>
    <CardText expandable={true}>
    {message.content}
    </CardText>
    </Card>
  )
}

MessageListItem.propTypes = {
  message: PropTypes.object.isRequired
}

export default MessageListItem
