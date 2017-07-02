import React from 'react'
import PropTypes from 'prop-types'
import {Route, Link} from "react-router-dom"
import {Card, CardHeader, CardText} from 'material-ui/Card'

const CustomLink = ({activeOnlyWhenExact, to, label}) => (
  <Route exact={activeOnlyWhenExact} path={to} children={({match}) => (
    <span>
    {match ? '[' : ''}<Link to={to}>{label}</Link>{match ? ']' : ''}
    </span>
  )}/>
)

export default class Navigator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card {...this.props} zDepth={1}>
      <CardHeader title="个人中心" />
      <CardText>
      <ul>
      <li><CustomLink to="/html/usercenter/readinglists" label="阅读清单"/></li>
      <li><CustomLink to="/html/usercenter/channels" label="媒体频道"/></li>
      <li><CustomLink to="/html/usercenter/ebooks" label="电子书籍"/></li>
      </ul>
      </CardText>
      </Card>
    );
  }
}

Navigator.propTypes = {
};
