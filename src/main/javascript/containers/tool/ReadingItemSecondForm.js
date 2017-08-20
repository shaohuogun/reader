import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'

import storeProvider from '../../store/storeProvider'
import {
  submitReadingItem, updateReadingItem
} from '../../actions/tool'

export const fields = ['bookName', 'listId']

export function createReadingItem(readingItem) {
  const store = storeProvider.getStore()
  store.dispatch(submitReadingItem(readingItem))
  fetch('/api/readingitem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(readingItem)
  }).then(response => response.json())
  .then(json => {
    store.dispatch(updateReadingItem(json))
  })
}

// Validation Functions
const required = value => (value == null ? '必填属性，请填写！' : undefined)

class ReadingItemSecondForm extends Component {
  componentDidMount() {
    this.refs.bookName // the Field
    .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    .focus() // on TextField
  }

  render() {
    const {handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit}>
      <Field
      name="bookName"
      component={TextField}
      hintText="请填写书籍的名称！"
      floatingLabelText="书籍名称"
      fullWidth={true}
      validate={required}
      ref="bookName"
      withRef
      />

      </form>
    )
  }
}

ReadingItemSecondForm.propTypes = {
}

export default reduxForm({
  form: 'readingItemForm',
  onSubmit: createReadingItem
})(ReadingItemSecondForm)
