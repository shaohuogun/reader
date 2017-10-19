import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'
import {FormLabel, FormControlLabel, FormGroup} from 'material-ui/Form'
import Switch from 'material-ui/Switch'
import {TextField} from 'redux-form-material-ui'
import Radio, {RadioGroup} from 'material-ui/Radio'
import Button from 'material-ui/Button'

const toolbarStyle = {
  marginTop: 15,
  marginBottom: 15,
  textAlign: 'center'
}

class ItemSecondPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCreatingNew : false
    }

    this.isCreatingNew = this.isCreatingNew.bind(this)
  }

  componentDidMount() {
    // this.refs.listName // the Field
    // .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    // .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    // .focus() // on TextField
  }

  isCreatingNew = (event, checked) => {
    this.setState({
      isCreatingNew: !this.state.isCreatingNew
    })
  }

  render() {
    const {readingLists, previousStep, handleSubmit, pristine, submitting} = this.props
    return (
      <FormGroup>
      <FormLabel component="legend">步骤二，选择目标阅读清单：</FormLabel>
      <FormControlLabel
      control={
        <Switch
        checked={false}
        onChange={this.isCreatingNew}
        />
      }
      label="创建一个新的阅读清单"
      />

      <form onSubmit={handleSubmit}>
      {!this.state.isCreatingNew && (
        <Field
        name="listId"
        component={RadioGroup}
        floatingLabelText="阅读清单">
        {readingLists.map(readingList =>
          <FormControlLabel key={readingList.id} value={readingList.id} control={<Radio />} label={readingList.name} />
        )}
        </Field>
      )}

      {this.state.isCreatingNew && (
        <Field
        name="listName"
        component={TextField}
        hintText="请填写阅读清单名称！"
        floatingLabelText="阅读清单"
        fullWidth={true}
        ref="listName"
        withRef
        />
      )}

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
      </FormGroup>

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
