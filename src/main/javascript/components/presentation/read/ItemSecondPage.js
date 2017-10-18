import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'
import {RadioButtonGroup, TextField} from 'redux-form-material-ui'
import RadioButton from 'material-ui/RadioButton'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

const toolbarStyle = {
  marginTop: 15,
  marginBottom: 15,
  textAlign: 'center'
}

class ItemSecondPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.refs.listName // the Field
    .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    .focus() // on TextField
  }

  render() {
    const {readingLists, previousStep, handleSubmit, pristine, submitting} = this.props
    return (
      <form onSubmit={handleSubmit}>
      <Field
      name="listId"
      component={RadioButtonGroup}
      floatingLabelText="阅读清单">
      {readingLists.map(readingList =>
        <RadioButton
        key={readingList.id}
        value={readingList.id}
        label={readingList.name}
        />
      )}
      </Field>

      <Field
      name="listName"
      component={TextField}
      hintText="请填写阅读清单名称！"
      floatingLabelText="阅读清单"
      fullWidth={true}
      ref="listName"
      withRef
      />

      <div style={toolbarStyle}>
      <FlatButton
      label="上一步"
      disableTouchRipple={true}
      disableFocusRipple={true}
      disabled={pristine || submitting}
      onTouchTap={previousStep}
      style={{margin: '0 15px 0 0'}}
      />
      <RaisedButton
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

ItemSecondPage.propTypes = {
  readingLists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  previousStep: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'readingItemForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ItemSecondPage)
