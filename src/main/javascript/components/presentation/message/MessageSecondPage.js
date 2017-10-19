import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'
import {TextField} from 'redux-form-material-ui'
import Radio, {RadioGroup} from 'material-ui/Radio'
import Button from 'material-ui/Button'

const toolbarStyle = {
  marginTop: 15,
  marginBottom: 15,
  textAlign: 'center'
}

class MessageSecondPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.refs.categoryName // the Field
    .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    .focus() // on TextField
  }

  render() {
    const {catalogs, previousStep, handleSubmit, pristine, submitting} = this.props
    return (
      <form onSubmit={handleSubmit}>
      <span>步骤二，选择文章收藏分类：</span>      
      <Field
      name="categoryId"
      component={RadioGroup}
      floatingLabelText="文章分类">
      {catalogs.map(catalog =>
        <Radio
        key={catalog.id}
        value={catalog.id}
        label={catalog.name}
        />
      )}
      </Field>

      <Field
      name="categoryName"
      component={TextField}
      hintText="请填写文章分类名称！"
      floatingLabelText="文章分类"
      fullWidth={true}
      ref="categoryName"
      withRef
      />

      <div style={toolbarStyle}>
      <Button
      label="上一步"
      disableTouchRipple={true}
      disableFocusRipple={true}
      disabled={pristine || submitting}
      onTouchTap={previousStep}
      style={{margin: '0 15px 0 0'}}
      />
      <Button raised
      label="下一步"
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

MessageSecondPage.propTypes = {
  catalogs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  previousStep: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'messageForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(MessageSecondPage)
