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

import HomeLayout from './components/layout/HomeLayout'
import routes from './routes/home'

// Needed for onTouchTap
injectTapEventPlugin();

const layoutStyle = {
  margin: '0 auto',
  backgroundColor: '#f5f5f5',
}

const Home = ({store, history}) => (
  <Provider key="provider" store={store}>
  <Router key="router" history={history} >
  <HomeLayout style={layoutStyle}>
  {routes}
  </HomeLayout>
  </Router>
  </Provider>
)

Home.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

storeProvider.init(configureStore({
  pagination: {}
}))

const store = storeProvider.getStore()
const history = syncHistoryWithStore(createBrowserHistory(), store)

ReactDOM.render(
  <Home store={store} history={history} />,
  document.getElementById('root')
)
