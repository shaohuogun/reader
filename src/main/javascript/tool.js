import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Provider} from 'react-redux'
import {createBrowserHistory} from 'history'
import {syncHistoryWithStore} from 'react-router-redux'
import {BrowserRouter as Router} from 'react-router-dom'

import configureStore from './store/configureStore'
import storeProvider from './store/storeProvider'

import ToolLayout from './components/layout/ToolLayout'
import routes from './routes/tool'

// Needed for onTouchTap
injectTapEventPlugin();

const layoutStyle = {
  margin: '0 auto',
  backgroundColor: '#f5f5f5',
}

const Tool = ({store, history}) => (
  <Provider key="provider" store={store}>
  <Router key="router" history={history} >
  <ToolLayout style={layoutStyle}>
  {routes}
  </ToolLayout>
  </Router>
  </Provider>
)

Tool.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

storeProvider.init(configureStore({
  readingStepper: {
    finished: false,
    stepIndex: 0
  },
  readingLists: [],
  readingItem: {},
  messageStepper: {
    finished: false,
    stepIndex: 0
  },
  catalogs: [],
  message: {},
  channelStepper: {
    finished: false,
    stepIndex: 0
  },
  channel: {},
  progress: 0,
  pagination: {}
}))

const store = storeProvider.getStore()
const history = syncHistoryWithStore(createBrowserHistory(), store)

ReactDOM.render(
  <Tool store={store} history={history} />,
  document.getElementById('root')
)
