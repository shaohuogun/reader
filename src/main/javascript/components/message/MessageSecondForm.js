import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'
import {RadioButtonGroup} from 'redux-form-material-ui'
import {RadioButton} from 'material-ui/RadioButton'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import {TextField} from 'redux-form-material-ui'

const styles = {
  checkedIcon: {
    color: '#F44336',
  },
  radioButton: {
    marginBottom: 16,
  },
}

// Validation Functions
const validate = values => {
  const errors = {}
  if (!values.categoryName && !values.categoryId) {
    errors.categoryId = '必填属性，请选择！'
  }

  if (!values.categoryId && !values.categoryName) {
    errors.categoryName = '必填属性，请填写！'
  }
  return errors
}

class MessageSecondForm extends Component {
  render() {
    const {handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit}>
      <Field
        name="categoryId"
        component={RadioButtonGroup}
        floatingLabelText="文章分类">
        <RadioButton
          value="ab321255-2113-4505-8d49-0067a2a865d9"
          label="鸡汤励志"
          checkedIcon={<ActionFavorite style={styles.checkedIcon} />}
          uncheckedIcon={<ActionFavoriteBorder />}
          style={styles.radioButton}
        />
        <RadioButton
          value="d457e980-c8a7-4187-b5a7-2fb079ae0691"
          label="工作技能"
          checkedIcon={<ActionFavorite style={styles.checkedIcon} />}
          uncheckedIcon={<ActionFavoriteBorder />}
          style={styles.radioButton}
        />
      </Field>

      <Field
      name="categoryName"
      component={TextField}
      hintText="请填写文章分类名称！"
      floatingLabelText="文章分类"
      fullWidth={true}
      />
      </form>
    )
  }
}

MessageSecondForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'messageForm',
  destroyOnUnmount: false
})(MessageSecondForm)
