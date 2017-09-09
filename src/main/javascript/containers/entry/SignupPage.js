import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardText, CardActions} from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import {submit} from 'redux-form'
import {connect} from 'react-redux'

import {
  updateAgreement
} from '../../actions/entry'
import SignupForm from '../../components/user/SignupForm'

const agreementStyle = {
  textAlign: 'left'
}

const toolbarStyle = {
  marginTop: 15,
  marginBottom: 15,
  textAlign: 'center'
}

class SignupPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      agreed: false,
    }
    // Tips: The best place to bind your member functions is in the component constructor
    this.createUser = this.createUser.bind(this)
  }

  createUser = (signupForm) => {
    const {dispatch} = this.props
    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(signupForm)
    }).then(response => response.json())
    .then(json => {
      window.location.href = '/entry/signin';
    })
  }

  updateAgreement = () => {
    const {dispatch, agreed} = this.props
    dispatch(updateAgreement(!agreed))
  }

  submitForm = () => {
    const {dispatch} = this.props
    dispatch(submit('signupForm'))
  }

  render() {
    const {agreed} = this.props
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Card {...this.props} zDepth={0}>
      <CardText>
      <SignupForm onSubmit={this.createUser} />
      </CardText>
      <CardText style={agreementStyle}>
      <Checkbox
      label="我已经认真阅读并同意太子读的《使用协议》。"
      checked={agreed}
      onCheck={this.updateAgreement.bind(this)}
      />
      </CardText>
      <CardActions style={toolbarStyle}>
      <RaisedButton
      label="注册"
      disableTouchRipple={true}
      disableFocusRipple={true}
      fullWidth={true}
      primary={true}
      onTouchTap={this.submitForm}
      disabled={!agreed}
      />
      </CardActions>
      </Card>
      </MuiThemeProvider>
    )
  }
}

SignupPage.propTypes = {
  agreed: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  agreed: state.agreed
})

export default connect(mapStateToProps)(SignupPage)
