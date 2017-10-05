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

import MineLayout from './components/layout/MineLayout'
import routes from './routes/mine'

// Needed for onTouchTap
injectTapEventPlugin();

const layoutStyle = {
  margin: '0 auto',
  backgroundColor: '#f5f5f5',
}

const Mine = ({store, history}) => (
  <Provider key="provider" store={store}>
  <Router key="router" history={history} >
  <MineLayout style={layoutStyle}>
  {routes}
  </MineLayout>
  </Router>
  </Provider>
)

Mine.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

storeProvider.init(configureStore({
  pagination: {}
}))

const store = storeProvider.getStore()
const history = syncHistoryWithStore(createBrowserHistory(), store)

ReactDOM.render(
  <Mine store={store} history={history} />,
  document.getElementById('root')
)
