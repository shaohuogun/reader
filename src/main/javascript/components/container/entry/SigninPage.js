import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardText, CardActions} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

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
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Card {...this.props} zDepth={0}>
      <CardText>
      <SigninForm onSubmit={this.createSession} />
      </CardText>
      <CardActions style={toolbarStyle}>
      <RaisedButton
      label="登录"
      disableTouchRipple={true}
      disableFocusRipple={true}
      fullWidth={true}
      primary={true}
      onTouchTap={this.submitForm}
      />
      </CardActions>
      </Card>
      </MuiThemeProvider>
    )
  }
}

SigninPage.propTypes = {
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(SigninPage)
