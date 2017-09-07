import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardText, CardActions} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import {reset, submit} from 'redux-form'
import {connect} from 'react-redux'

import SigninForm from '../../components/user/SigninForm'

const pageStyle = {
  width: 685,
  marginTop: 15,
  marginLeft: 15,
  float: 'left',
  display: 'inline-block',
}

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

  createSession = (loginForm) => {
    const {dispatch} = this.props
    fetch('/api/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(loginForm)
    }).then(response => response.json())
    .then(json => {
      window.location.href = '/home';
    })
  }

  resetForm = () => {
    const {dispatch} = this.props
    dispatch(reset('loginForm'))
  }

  submitForm = () => {
    const {dispatch} = this.props
    dispatch(submit('loginForm'))
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Card zDepth={0}>
      <CardText>
      <SigninForm style={pageStyle} onSubmit={this.createSession} />
      </CardText>
      <CardActions style={toolbarStyle}>
      <FlatButton
      label="重置"
      disableTouchRipple={true}
      disableFocusRipple={true}
      onTouchTap={this.resetForm}
      style={{margin: '0 15px 0 0'}}
      />
      <RaisedButton
      label="提交"
      disableTouchRipple={true}
      disableFocusRipple={true}
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
