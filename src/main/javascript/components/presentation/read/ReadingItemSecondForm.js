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

class ReadingItemSecondForm extends Component {
  render() {
    const {handleSubmit, readingLists} = this.props
    var radios = []
		if (readingLists != null) {
      var readingListCount = readingLists.length
  		for (var i = 0; i < readingListCount; i++) {
  			var readingList = readingLists[i]
  			radios.push(
          <RadioButton
            key={readingList.id}
            value={readingList.id}
            label={readingList.name}
            checkedIcon={<ActionFavorite style={styles.checkedIcon} />}
            uncheckedIcon={<ActionFavoriteBorder />}
            style={styles.radioButton}
          />
  			)
  		}
		}

    return (
      <form onSubmit={handleSubmit}>
      <Field
        name="listId"
        component={RadioButtonGroup}
        floatingLabelText="阅读清单">
        {radios}
      </Field>

      <Field
      name="listName"
      component={TextField}
      hintText="请填写阅读清单名称！"
      floatingLabelText="阅读清单"
      fullWidth={true}
      />
      </form>
    )
  }
}

ReadingItemSecondForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  readingLists: PropTypes.array.isRequired
}

export default reduxForm({
  form: 'readingItemForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ReadingItemSecondForm)
