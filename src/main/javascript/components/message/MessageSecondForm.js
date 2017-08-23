import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'
import {RadioButtonGroup} from 'redux-form-material-ui'
import {RadioButton} from 'material-ui/RadioButton'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'

export const fields = ['bookName', 'listId']

const styles = {
  checkedIcon: {
    color: '#F44336',
  },
  radioButton: {
    marginBottom: 16,
  },
}

class MessageSecondForm extends Component {
  render() {
    const {
      fields: {listId},
      handleSubmit
    } = this.props
    return (
      <form onSubmit={handleSubmit}>
      <Field
        name="listId"
        component={RadioButtonGroup}
        floatingLabelText="阅读清单">
        <RadioButton
          value="ab321255-2113-4505-8d49-0067a2a865d9"
          label="生活书单"
          checkedIcon={<ActionFavorite style={styles.checkedIcon} />}
          uncheckedIcon={<ActionFavoriteBorder />}
          style={styles.radioButton}
        />
        <RadioButton
          value="d457e980-c8a7-4187-b5a7-2fb079ae0691"
          label="工作书单"
          checkedIcon={<ActionFavorite style={styles.checkedIcon} />}
          uncheckedIcon={<ActionFavoriteBorder />}
          style={styles.radioButton}
        />
      </Field>
      </form>
    )
  }
}

MessageSecondForm.propTypes = {
  fields: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'readingItemForm',
  fields,
  destroyOnUnmount: false
})(MessageSecondForm)
