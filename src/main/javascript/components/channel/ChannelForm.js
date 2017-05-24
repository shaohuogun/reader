import React from 'react'
import {connect} from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import {Field, reduxForm} from 'redux-form'
import {Card, CardText} from 'material-ui/Card'
import {
  SelectField,
  TextField
} from 'redux-form-material-ui'

import {createChannel} from './submit'

// validation functions
const required = value => (value == null ? '此字段不允许为空！' : undefined)
const urlRegrex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
const url = value =>
(value && !urlRegrex.test(value)
? '请填写有效的URL地址！'
: undefined)
const nonzero = value => (value <= 0 ? '采集数量不可以低于等于0！' : undefined)

class ChannelForm extends React.Component {
  componentDidMount() {
    this.refs.url // the Field
    .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    .focus(); // on TextField
  }

  render() {
    const {error, handleSubmit} = this.props

    return (
      <Card
      {...this.props}
      zDepth={0}
      >
      <CardText>
      <form onSubmit={handleSubmit}>
      <div>
      <Field
      name="category"
      component={SelectField}
      hintText="请选择待采集内容的媒体类型：博客 or 书籍？"
      floatingLabelText="媒体类型"
      validate={required}
      >
      <MenuItem value="blog" primaryText="博客" />
      <MenuItem value="book" primaryText="书籍" />
      </Field>
      </div>

      <div>
      <Field
      name="url"
      component={TextField}
      hintText="请填写媒体的网络地址！"
      floatingLabelText="媒体网址"
      validate={[required, url]}
      ref="url"
      withRef
      />
      </div>

      <div>
      <Field
      name="name"
      component={TextField}
      hintText="请填写媒体的名称！"
      floatingLabelText="媒体名称"
      validate={required}
      />
      </div>

      <div>
      <Field
      name="publisher"
      component={TextField}
      hintText="请填写媒体的作者！"
      floatingLabelText="频道作者"
      validate={required}
      />
      </div>

      <div>
      <Field
      name="description"
      component={TextField}
      hintText="请填写频道的简介！"
      floatingLabelText="频道简介"
      validate={required}
      />
      </div>

      <div>
      <Field
      name="pickingAmount"
      component={TextField}
      hintText="请填写采集的页数！"
      floatingLabelText="采集页数"
      validate={[required, nonzero]}
      />
      </div>
      </form>
      </CardText>
      </Card>
    )
  }
}

ChannelForm = reduxForm({
  form: 'channelForm',
  onSubmit: createChannel,
  initialValues: {
    category: 'blog',
    pickingAmount: 1
  }
})(ChannelForm)

export default connect(state => state.form)(ChannelForm)
