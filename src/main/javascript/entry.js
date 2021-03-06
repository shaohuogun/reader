import React from 'react'
import PropTypes from 'prop-types'
import {render} from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Provider} from 'react-redux'
import {createBrowserHistory} from 'history'
import {syncHistoryWithStore} from 'react-router-redux'
import {Router} from 'react-router-dom'

import configureStore from './store/configureStore'
import storeProvider from './store/storeProvider'

import EntryLayout from './components/layout/EntryLayout'
import routes from './routes/entry'

// Needed for onTouchTap
injectTapEventPlugin();

const layoutStyle = {
  margin: '0 auto',
  width: '400px',
  textAlign: 'center',
  backgroundColor: '#fafafa',
}

const Entry = ({store, history}) => (
  <Provider key="provider" store={store}>
  <Router key="router" history={history} >
  <EntryLayout style={layoutStyle}>
  {routes}
  </EntryLayout>
  </Router>
  </Provider>
)

Entry.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

storeProvider.init(configureStore({
  agreed: false,
}))

const store = storeProvider.getStore()
const history = syncHistoryWithStore(createBrowserHistory(), store)

render(
  <Entry store={store} history={history} />,
  document.getElementById('root')
)
