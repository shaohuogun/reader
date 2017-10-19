import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, CardText, CardActions} from 'material-ui/Card'
import Button from 'material-ui/Button'

import {submit} from 'redux-form'
import {connect} from 'react-redux'

import SigninForm from '../../presentation/user/SigninForm'

const toolbarStyle = {
  marginTop: 15,
  marginBottom: 15,
  textAlign: 'center'
}

class SigninPage extends Component {
  constructor(props) {
    super(props)

    // Tips: The best place to bind your member functions is in the component constructor
    this.createSession = this.createSession.bind(this)
  }

  createSession = (signinForm) => {
    const {dispatch} = this.props
    fetch('/api/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(signinForm)
    }).then(response => response.json())
    .then(json => {
      window.location.href = '/home';
    })
  }

  submitForm = () => {
    const {dispatch} = this.props
    dispatch(submit('signinForm'))
  }

  render() {
    return (
      <Card {...this.props} zDepth={0}>
      <CardText>
      <SigninForm onSubmit={this.createSession} />
      </CardText>
      <CardActions style={toolbarStyle}>
      <Button raised
      label="登录"
      disableTouchRipple={true}
      disableFocusRipple={true}
      fullWidth={true}
      primary={true}
      onTouchTap={this.submitForm}
      />
      </CardActions>
      </Card>
    )
  }
}

SigninPage.propTypes = {
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(SigninPage)
