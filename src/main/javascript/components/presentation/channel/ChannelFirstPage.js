import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'
import {TextField} from 'redux-form-material-ui'
import LinearProgress from 'material-ui/LinearProgress'
import RaisedButton from 'material-ui/RaisedButton'

const toolbarStyle = {
  marginTop: 15,
  marginBottom: 15,
  textAlign: 'center'
}

// Validation Functions
const required = value => (value == null ? '必填属性，请填写！' : undefined)
const urlRegrex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i
const urlValidator = value => (!urlRegrex.test(value) ? '无效URL，请检查！' : undefined)
const nonzero = value => (value <= 0 ? '采集数量必须大于0！' : undefined)

class ChannelFirstPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.refs.url // the Field
    .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    .focus() // on TextField
  }

  render() {
    const {handleSubmit, pristine, submitting, progress} = this.props
    return (
      <form onSubmit={handleSubmit}>
      <Field
      name="url"
      component={TextField}
      hintText="请填写媒体的网址！"
      floatingLabelText="媒体网址"
      fullWidth={true}
      validate={[required, urlValidator]}
      ref="url"
      withRef
      />

      <Field
      name="name"
      component={TextField}
      hintText="请填写媒体的名称！"
      floatingLabelText="媒体名称"
      fullWidth={true}
      validate={[required]}
      />

      <Field
      name="description"
      component={TextField}
      hintText="请填写媒体的简介！"
      floatingLabelText="媒体简介"
      multiLine={true}
      rows={3}
      fullWidth={true}
      validate={[required]}
      />

      <Field
      name="amount"
      component={TextField}
      hintText="请填写采集的页数！"
      floatingLabelText="采集页数"
      fullWidth={true}
      validate={[required, nonzero]}
      />

      <LinearProgress mode="determinate" value={progress} />

      <div style={toolbarStyle}>
      <RaisedButton
      label="提交采集"
      disableTouchRipple={true}
      disableFocusRipple={true}
      disabled={pristine || submitting}
      primary={true}
      onTouchTap={handleSubmit}
      />
      </div>
      </form>
    )
  }
}

ChannelFirstPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired
}

export default reduxForm({
  form: 'channelForm',
  initialValues: {
    amount: 1
  }
})(ChannelFirstPage)
