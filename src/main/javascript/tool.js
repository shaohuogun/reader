import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Provider} from 'react-redux'
import {createBrowserHistory} from 'history'
import {syncHistoryWithStore} from 'react-router-redux'
import {BrowserRouter as Router} from 'react-router-dom'

import configureStore from './store/configureStore'
import storeProvider from './store/storeProvider'

import ToolLayout from './layout/ToolLayout'
import routes from './routes/tool'


// Needed for onTouchTap
injectTapEventPlugin();

const layoutStyle = {
  margin: '0 auto',
  backgroundColor: '#f5f5f5',
}

storeProvider.init(configureStore({
  wizard: {
    finished: false,
    stepIndex: 0
  },
  progress: 0,
  pagination: {}
}))

const store = storeProvider.getStore()
const history = syncHistoryWithStore(createBrowserHistory(), store)

export default class Tool extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render () {
    return (
      <Provider key="provider" store={store}>
      <Router key="router" history={this.props.history} >
      <ToolLayout style={layoutStyle}>
      {routes}
      </ToolLayout>
      </Router>
      </Provider>
    )
  }
}

ReactDOM.render(
  <Tool history={history} />,
  document.getElementById('root')
)
