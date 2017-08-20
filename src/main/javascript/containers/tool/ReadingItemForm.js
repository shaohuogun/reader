
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, CardText} from 'material-ui/Card'
import {Field, reduxForm} from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import {SelectField, TextField} from 'redux-form-material-ui'

import storeProvider from '../../store/storeProvider'
import {
  submitReadingItem, updateReadingItem
} from '../../actions/tool'

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

class ReadingItemForm extends Component {
  componentDidMount() {
    this.refs.bookName // the Field
    .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    .focus() // on TextField
  }

  render() {
    const {handleSubmit} = this.props
    return (
      <Card
      {...this.props}
      zDepth={0}
      >
      <CardText>
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
      </CardText>
      </Card>
    )
  }
}

ReadingItemForm.propTypes = {
}

export default reduxForm({
  form: 'readingItemForm',
  onSubmit: createReadingItem
})(ReadingItemForm)
