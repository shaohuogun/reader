import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, CardText, CardActions} from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'
import Button from 'material-ui/Button'

import {submit} from 'redux-form'
import {connect} from 'react-redux'

import {
  updateAgreement
} from '../../../actions/user'
import SignupForm from '../../presentation/user/SignupForm'

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
      <Button raised
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
